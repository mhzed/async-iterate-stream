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
        let iterator = null;
        let end = false;
        src.on('error', (err) => {
            util_1.asyncForever((next) => {
                if (iterator != null) {
                    iterator.rejecter(err);
                    end = true;
                    next('stop');
                }
                else
                    setTimeout(next, 1);
            }, (err) => {
            });
        });
        let queue = new util_1.NextQueue();
        src.pipe(new stream_1.Writable({ objectMode, write: (o, enc, cb) => {
                queue.save(cb, o); // save stream state only, let async while loop determine when to advance stream
                if (iterator != null) {
                    iterator.resolver();
                }
            } })).on('finish', () => {
            end = true;
            if (iterator != null) {
                iterator.resolver();
            }
        });
        while (!end) {
            iterator = util_1.makeP();
            queue.stepCb(); // advance stream
            yield __await(iterator.promise); // wait for stream to get next element
            iterator = null;
            if (queue.hasValues())
                yield queue.stepValue();
        }
        while (queue.hasValues())
            yield queue.stepValue();
    });
}
exports.asyncIterateStream = asyncIterateStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNJdGVyYXRlU3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXN5bmNJdGVyYXRlU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQTBDO0FBQzFDLHFEQUFtRDtBQUNuRCxxQ0FBNkQ7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCw0QkFBMEMsR0FBYSxFQUFFLFVBQW1COztRQUMxRSxJQUFJLFFBQVEsR0FBTyxJQUFJLENBQUM7UUFDeEIsSUFBSSxHQUFHLEdBQWEsS0FBSyxDQUFDO1FBRTFCLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUU7WUFDckIsbUJBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNwQixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDckIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkIsR0FBRyxHQUFHLElBQUksQ0FBQztvQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2YsQ0FBQztnQkFBQyxJQUFJO29CQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDWCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO1FBR0gsSUFBSSxLQUFLLEdBQUcsSUFBSSxnQkFBUyxFQUFFLENBQUM7UUFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFRLENBQUMsRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUMsRUFBRTtnQkFDdEQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBSSxnRkFBZ0Y7Z0JBQ3RHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNyQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7WUFDSCxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFFLEVBQUU7WUFDcEIsR0FBRyxHQUFHLElBQUksQ0FBQztZQUNYLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1osUUFBUSxHQUFHLFlBQUssRUFBRSxDQUFDO1lBQ25CLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFLLGlCQUFpQjtZQUNyQyxjQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFDLHNDQUFzQztZQUM5RCxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFBQyxNQUFNLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqRCxDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQUUsTUFBTSxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDcEQsQ0FBQztDQUFBO0FBcENELGdEQW9DQyJ9