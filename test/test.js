"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncIterator) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const stream_1 = require("stream");
const fs = require("fs");
const sleep = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
};
class DelayedSrc extends stream_1.Readable {
    constructor(n) {
        super({ objectMode: true });
        for (let i = 0; i < n; i++) {
            setTimeout(() => {
                this.push(i);
            }, i * 2);
        }
        setTimeout(() => {
            this.push(null);
        }, n * 2 + 1);
    }
    _read(size) {
    }
}
class Src extends stream_1.Readable {
    constructor(n) {
        super({ objectMode: true });
        for (let i = 0; i < n; i++) {
            this.push(i);
        }
        this.push(null);
    }
    _read(size) {
    }
}
const Expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
exports.testAsyncIterateStreamFastSrc = (test) => {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let beg = Date.now();
            let vals = [];
            try {
                for (var _a = __asyncValues(__1.asyncIterateStream(new Src(10), true)), _b; _b = yield _a.next(), !_b.done;) {
                    const v = yield _b.value;
                    vals.push(v);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            let elapsed = Date.now() - beg;
            test.ok(elapsed < 15, `${elapsed}ms is not fast enough`);
            test.deepEqual(vals, Expected, 'Got all values');
            var e_1, _c;
        });
    })().catch(test.ifError).then(test.done);
};
exports.testAsyncIterateStreamSlowSrc = (test) => {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let vals = [];
            try {
                for (var _a = __asyncValues(__1.asyncIterateStream(new DelayedSrc(10), true)), _b; _b = yield _a.next(), !_b.done;) {
                    const v = yield _b.value;
                    vals.push(v);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
            test.deepEqual(vals, Expected, 'Got all values');
            var e_2, _c;
        });
    })().catch(test.ifError).then(test.done);
};
exports.testAsyncIterateStreamFile = (test) => {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            // try buffered mode
            let beg = Date.now();
            let content = '';
            try {
                for (var _a = __asyncValues(__1.asyncIterateStream(fs.createReadStream(__filename), false)), _b; _b = yield _a.next(), !_b.done;) {
                    const chunk = yield _b.value;
                    content += chunk.toString();
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
            }
            let elapsed = Date.now() - beg;
            test.ok(elapsed < 10, `${elapsed}ms is not fast enough`);
            test.ok(/asyncIterateStream/.test(content), "read this file");
            var e_3, _c;
        });
    })().catch(test.ifError).then(test.done);
};
exports.testIterateStream = (test) => {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let vals = [];
            for (const promise of __1.iterateStream(new DelayedSrc(10), true)) {
                let v = yield promise;
                if (v !== undefined)
                    vals.push(v);
            }
            test.deepEqual(vals, Expected, 'Got all values');
            // try buffered mode
            let content = '';
            for (const p of __1.iterateStream(fs.createReadStream(__filename), false)) {
                let chunk = (yield p);
                if (chunk)
                    content += chunk.toString();
            }
            test.ok(/iterateStream/.test(content), "read this file");
        });
    })().catch(test.ifError).then(test.done);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsMEJBQXFEO0FBQ3JELG1DQUFnQztBQUNoQyx5QkFBeUI7QUFFekIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFVO0lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ2pDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRCxnQkFBaUIsU0FBUSxpQkFBUTtJQUMvQixZQUFZLENBQVM7UUFDbkIsS0FBSyxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN2QixVQUFVLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNkLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDO1FBQ0QsVUFBVSxDQUFDO1lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQixDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztJQUVYLENBQUM7SUFDRCxLQUFLLENBQUMsSUFBSTtJQUNWLENBQUM7Q0FDRjtBQUNELFNBQVUsU0FBUSxpQkFBUTtJQUN4QixZQUFZLENBQVM7UUFDbkIsS0FBSyxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFF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