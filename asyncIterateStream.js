"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
require("core-js/modules/es7.symbol.async-iterator");
const util_1 = require("./src/util");
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
function asyncIterateStream(src, objectMode) {
    return __asyncGenerator(this, arguments, function* asyncIterateStream_1() {
        let arrival = null;
        let end = false;
        const callUponArrival = (cb) => {
            if (arrival != null) {
                cb();
            }
            else {
                util_1.asyncForever((next) => {
                    if (arrival != null) {
                        cb();
                        next('stop');
                    }
                    else
                        setTimeout(next, 5);
                }, (err) => {
                });
            }
        };
        src.on('error', (err) => {
            callUponArrival(() => {
                arrival.rejecter(err);
                end = true;
            });
        });
        let throttleStream = src.pipe(new stream_1.Writable({ objectMode, write: (o, enc, cb) => {
                callUponArrival(() => {
                    arrival.resolver(o);
                    arrival = null;
                    cb();
                });
            } })).on('finish', () => {
            end = true;
            callUponArrival(() => arrival.resolver()); // make sure loop terminates
        });
        while (!end) {
            arrival = util_1.makeP();
            let value = yield __await(arrival.promise);
            if (value !== undefined)
                yield value;
        }
    });
}
exports.asyncIterateStream = asyncIterateStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNJdGVyYXRlU3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXN5bmNJdGVyYXRlU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQTBDO0FBQzFDLHFEQUFtRDtBQUNuRCxxQ0FBa0Q7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCw0QkFBMEMsR0FBYSxFQUFFLFVBQW1COztRQUMxRSxJQUFJLE9BQU8sR0FBTyxJQUFJLENBQUM7UUFDdkIsSUFBSSxHQUFHLEdBQWEsS0FBSyxDQUFDO1FBRTFCLE1BQU0sZUFBZSxHQUFHLENBQUMsRUFBRTtZQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsRUFBRSxFQUFFLENBQUM7WUFDUCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sbUJBQVksQ0FBQyxDQUFDLElBQUk7b0JBQ2hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixFQUFFLEVBQUUsQ0FBQzt3QkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2YsQ0FBQztvQkFBQyxJQUFJO3dCQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsRUFBRSxDQUFDLEdBQUc7Z0JBQ1AsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBQ0QsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHO1lBQ2xCLGVBQWUsQ0FBQztnQkFDZCxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksY0FBYyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDeEUsZUFBZSxDQUFDO29CQUNkLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ2YsRUFBRSxFQUFFLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNoQixHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ1gsZUFBZSxDQUFDLE1BQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBRSw0QkFBNEI7UUFDeEUsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDWixPQUFPLEdBQUcsWUFBSyxFQUFFLENBQUM7WUFDbEIsSUFBSSxLQUFLLEdBQUcsY0FBTSxPQUFPLENBQUMsT0FBTyxDQUFBLENBQUM7WUFDbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztnQkFBQyxNQUFNLEtBQUssQ0FBQztRQUN2QyxDQUFDO0lBQ0gsQ0FBQztDQUFBO0FBdENELGdEQXNDQyJ9