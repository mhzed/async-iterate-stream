import {Readable, Writable} from 'stream';
import {P, makeP, asyncForever} from "./src/util";

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
  let arrival : P = null;
  let end : boolean = false;

  const callUponArrival = (cb) => {
    if (arrival!=null) {
      cb();
    } else { // async wait for p is not null, then call next
      asyncForever((next) => {
        if (arrival != null) {
          cb();
          next('stop');
        } else setTimeout(next, 5);
      }, (err) => {
      })
    }
  }

  src.on('error', (err)=>{
    callUponArrival(()=>{
      arrival.rejecter(err);
      end = true;
    })
  });
  src.pipe(new Writable({objectMode, write: (o, enc, cb)=>{
    callUponArrival(()=>{
      arrival.resolver(o);
      arrival = null;
      cb();
    });
  }})
  ).on('finish', ()=>{
    end = true;
    callUponArrival(()=>arrival.resolver());  // make sure loop terminates
  });

  return {
    [Symbol.iterator]: function* () {
      while (!end) {
        arrival = makeP();
        yield arrival.promise;
      }
    }
  }
}
