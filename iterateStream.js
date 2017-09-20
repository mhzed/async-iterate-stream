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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmF0ZVN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIml0ZXJhdGVTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBMEM7QUFDMUMscUNBQTZEO0FBRTdEOzs7Ozs7Ozs7O0dBVUc7QUFDVSxRQUFBLGFBQWEsR0FBRyxDQUFDLEdBQWEsRUFBRSxVQUFtQjtJQUU5RCxJQUFJLFFBQVEsR0FBTyxJQUFJLENBQUM7SUFDeEIsSUFBSSxHQUFHLEdBQWEsS0FBSyxDQUFDO0lBRTFCLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRztRQUNsQixtQkFBWSxDQUFDLENBQUMsSUFBSTtZQUNoQixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDZixDQUFDO1lBQUMsSUFBSTtnQkFBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxLQUFLLEdBQUcsSUFBSSxnQkFBUyxFQUFFLENBQUM7SUFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFRLENBQUMsRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ25ELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUksZ0ZBQWdGO1lBQ3RHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFDSCxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNoQixHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ1gsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQztRQUNMLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDWixRQUFRLEdBQUcsWUFBSyxFQUFFLENBQUM7Z0JBQ25CLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFLLGlCQUFpQjtnQkFDckMsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsc0NBQXNDO2dCQUM5RCxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLENBQUM7UUFDSCxDQUFDO0tBQ0YsQ0FBQTtBQUVILENBQUMsQ0FBQSJ9