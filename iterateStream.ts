import {Readable, Writable} from 'stream';
import {P, makeP, asyncForever, NextQueue} from "./src/util";

/**
 * Usage:
 * async function() {
 *   for (const promise of iterateStream(fs.createReadStream(...), false)) {
 *      let value = await promise;
 *      //...
 *   }
 * }
 * @param {"stream".internal.Readable} src
 * @returns {Iterable<any>}
 */
export const iterateStream = (src: Readable, objectMode: boolean) : Iterable<any> => {

  let iterator : P = null;
  let end : boolean = false;

  src.on('error', (err)=>{
    asyncForever((next) => {
      if (iterator != null) {
        iterator.rejecter(err);
        end = true;
        next('stop');
      } else setTimeout(next, 1);
    }, (err) => {
    })
  });
  
  let queue = new NextQueue();
  src.pipe(new Writable({objectMode, write: (o, enc, cb)=>{
    queue.save(cb, o);    // save stream state only, let async while loop determine when to advance stream
    if (iterator != null) {
      iterator.resolver(queue.stepValue());
    }
  }})).on('finish', ()=>{
    end = true;
    if (iterator != null) {
      iterator.resolver();
    }
  });

  return {
    [Symbol.iterator]: function* () {
      while (!end) {
        iterator = makeP();
        queue.stepCb();     // advance stream
        yield iterator.promise; // wait for stream to get next element
        iterator = null;
      }
    }
  }

}
