"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const util_1 = require("./src/util");
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
exports.iterateStream = (src, objectMode) => {
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
                iterator.resolver(queue.stepValue());
            }
        } })).on('finish', () => {
        end = true;
        if (iterator != null) {
            iterator.resolver();
        }
    });
    return {
        [Symbol.iterator]: function* () {
            while (!end) {
                iterator = util_1.makeP();
                queue.stepCb(); // advance stream
                yield iterator.promise; // wait for stream to get next element
                iterator = null;
            }
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmF0ZVN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIml0ZXJhdGVTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBMEM7QUFDMUMscUNBQTZEO0FBRTdEOzs7Ozs7Ozs7O0dBVUc7QUFDVSxRQUFBLGFBQWEsR0FBRyxDQUFDLEdBQWEsRUFBRSxVQUFtQixFQUFrQixFQUFFO0lBRWxGLElBQUksUUFBUSxHQUFPLElBQUksQ0FBQztJQUN4QixJQUFJLEdBQUcsR0FBYSxLQUFLLENBQUM7SUFFMUIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUMsRUFBRTtRQUNyQixtQkFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDcEIsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUFDLElBQUk7Z0JBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNYLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLEtBQUssR0FBRyxJQUFJLGdCQUFTLEVBQUUsQ0FBQztJQUM1QixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQVEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBQyxFQUFFO1lBQ3RELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUksZ0ZBQWdGO1lBQ3RHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFDSCxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFFLEVBQUU7UUFDcEIsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNYLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUM7UUFDTCxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLENBQUM7WUFDMUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNaLFFBQVEsR0FBRyxZQUFLLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUssaUJBQWlCO2dCQUNyQyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxzQ0FBc0M7Z0JBQzlELFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDbEIsQ0FBQztRQUNILENBQUM7S0FDRixDQUFBO0FBRUgsQ0FBQyxDQUFBIn0=