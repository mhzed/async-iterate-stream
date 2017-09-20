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
            if (iterator != null && !end) {
                iterator.rejecter(err);
                end = true;
                next('stop');
            }
            else
                setTimeout(next, 1);
        }, (err) => {
        });
    });
    class NextQueue {
        constructor() {
            this.cbqueue = [];
            this.valuequeue = [];
        }
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
            if (this.cbqueue.length > 0) {
                this.cbqueue.shift()();
            }
        }
    }
    let queue = new NextQueue();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmF0ZVN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIml0ZXJhdGVTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBMEM7QUFDMUMscUNBQWtEO0FBRWxEOzs7Ozs7Ozs7O0dBVUc7QUFDVSxRQUFBLGFBQWEsR0FBRyxDQUFDLEdBQWEsRUFBRSxVQUFtQjtJQUU5RCxJQUFJLFFBQVEsR0FBTyxJQUFJLENBQUM7SUFDeEIsSUFBSSxHQUFHLEdBQWEsS0FBSyxDQUFDO0lBRTFCLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRztRQUNsQixtQkFBWSxDQUFDLENBQUMsSUFBSTtZQUNoQixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDZixDQUFDO1lBQUMsSUFBSTtnQkFBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUMsRUFBRSxDQUFDLEdBQUc7UUFDUCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUg7UUFBQTtZQUNVLFlBQU8sR0FBRyxFQUFFLENBQUM7WUFDYixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBaUIxQixDQUFDO1FBZkMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLO1lBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUNELFNBQVM7WUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFDRCxTQUFTO1lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakMsQ0FBQztRQUNELE1BQU07WUFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDekIsQ0FBQztRQUNILENBQUM7S0FDRjtJQUNELElBQUksS0FBSyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7SUFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFRLENBQUMsRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ25ELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUksZ0ZBQWdGO1lBQ3RHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFDSCxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNoQixHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ1gsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQztRQUNMLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDWixRQUFRLEdBQUcsWUFBSyxFQUFFLENBQUM7Z0JBQ25CLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFLLGlCQUFpQjtnQkFDckMsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsc0NBQXNDO2dCQUM5RCxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLENBQUM7UUFDSCxDQUFDO0tBQ0YsQ0FBQTtBQUVILENBQUMsQ0FBQSJ9