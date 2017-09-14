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
    src.pipe(new stream_1.Writable({ objectMode, write: (o, enc, cb) => {
            callUponArrival(() => {
                arrival.resolver(o);
                arrival = null;
                cb();
            });
        } })).on('finish', () => {
        end = true;
        callUponArrival(() => arrival.resolver()); // make sure loop terminates
    });
    return {
        [Symbol.iterator]: function* () {
            while (!end) {
                arrival = util_1.makeP();
                yield arrival.promise;
            }
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmF0ZVN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIml0ZXJhdGVTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBMEM7QUFDMUMscUNBQWtEO0FBRWxEOzs7Ozs7Ozs7O0dBVUc7QUFDVSxRQUFBLGFBQWEsR0FBRyxDQUFDLEdBQWEsRUFBRSxVQUFtQjtJQUM5RCxJQUFJLE9BQU8sR0FBTyxJQUFJLENBQUM7SUFDdkIsSUFBSSxHQUFHLEdBQWEsS0FBSyxDQUFDO0lBRTFCLE1BQU0sZUFBZSxHQUFHLENBQUMsRUFBRTtRQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixFQUFFLEVBQUUsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLG1CQUFZLENBQUMsQ0FBQyxJQUFJO2dCQUNoQixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDcEIsRUFBRSxFQUFFLENBQUM7b0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNmLENBQUM7Z0JBQUMsSUFBSTtvQkFBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdCLENBQUMsRUFBRSxDQUFDLEdBQUc7WUFDUCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7SUFDSCxDQUFDLENBQUE7SUFFRCxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUc7UUFDbEIsZUFBZSxDQUFDO1lBQ2QsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNuRCxlQUFlLENBQUM7Z0JBQ2QsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDZixFQUFFLEVBQUUsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUMsQ0FDRixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDYixHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ1gsZUFBZSxDQUFDLE1BQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBRSw0QkFBNEI7SUFDeEUsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUM7UUFDTCxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqQixPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ1osT0FBTyxHQUFHLFlBQUssRUFBRSxDQUFDO2dCQUNsQixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQztRQUNILENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=