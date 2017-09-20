import {Readable, Writable} from 'stream';
import 'core-js/modules/es7.symbol.async-iterator';
import {P, makeP, asyncForever} from "./src/util";

/**
 * Usage:
 * async function() {
 *   for await (const value of asyncIterateStream(fs.createReadStream(...), false)) {
 *     // ...
 *   }
 * }
 *
 * to use, in tsconfig.json make sure:
 * "compilerOptions": {
 * "lib": [
 *    ...
 *    "esnext.asynciterable"
 * ]
 * }
 *
 * And if js engine does not support Symble.asyncIterator, then
 * npm install core-js --save
 *
 *
 * @param {"stream".internal.Readable} src
 * @returns {AsyncIterableIterator<any>}
 */
export async function* asyncIterateStream(src: Readable, objectMode: boolean) : AsyncIterableIterator<any> {
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
  
  class NextQueue {
    private cbqueue = [];
    private valuequeue = [];
    
    save(cb, value) {
      this.cbqueue.push(cb);
      this.valuequeue.push(value);
    }
    hasValues() { 
      return this.valuequeue.length > 0;
    }
    stepValue() {
      return this.valuequeue.shift();
    }
    stepCb() {
      if (this.cbqueue.length>0) {
        this.cbqueue.shift()();
      }
    }
  }
  let queue = new NextQueue();
  src.pipe(new Writable({objectMode, write: (o, enc, cb)=>{
    queue.save(cb, o);    // save stream state only, let async while loop determine when to advance stream
    if (iterator != null) {
      iterator.resolver();
    }
  }})).on('finish', ()=>{
    end = true;
    if (iterator != null) {
      iterator.resolver();
    }
  });
  while (!end) {        // order is very important
    iterator = makeP();
    queue.stepCb();     // advance stream
    await iterator.promise; // wait for stream to get next element
    iterator = null;
    if (queue.hasValues()) yield queue.stepValue();
  }
  while (queue.hasValues()) yield queue.stepValue();
}
