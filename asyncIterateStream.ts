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
  let arrival : P = null;
  let end : boolean = false;

  const callUponArrival = (cb) => {    // call cb until arrival is not null
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
  let throttleStream = src.pipe(new Writable({objectMode, write: (o, enc, cb)=>{
    callUponArrival(()=>{
      arrival.resolver(o);
      arrival = null;
      cb();
    });
  }})).on('finish', ()=>{
    end = true;
    callUponArrival(()=>arrival.resolver());  // make sure loop terminates
  });
  while (!end) {
    arrival = makeP();
    let value = await arrival.promise;
    if (value !== undefined) yield value;
  }
}
