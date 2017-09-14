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
class Src extends stream_1.Readable {
    constructor() {
        super({ objectMode: true });
        const N = 10;
        for (let i = 0; i < N; i++) {
            setTimeout(() => {
                this.push(i);
            }, i);
        }
        setTimeout(() => {
            this.push(null);
        }, N + 1);
    }
    _read(size) {
    }
}
const Expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
exports.testIterateStream = (test) => {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let vals = [];
            for (const promise of __1.iterateStream(new Src(), true)) {
                vals.push(yield promise);
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
exports.testAsyncIterateStream = (test) => {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let vals = [];
            try {
                for (var _a = __asyncValues(__1.asyncIterateStream(new Src(), true)), _b; _b = yield _a.next(), !_b.done;) {
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
            test.deepEqual(vals, Expected, 'Got all values');
            // try buffered mode
            let content = '';
            try {
                for (var _d = __asyncValues(__1.asyncIterateStream(fs.createReadStream(__filename), false)), _e; _e = yield _d.next(), !_e.done;) {
                    const chunk = yield _e.value;
                    content += chunk.toString();
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_f = _d.return)) yield _f.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
            test.ok(/asyncIterateStream/.test(content), "read this file");
            var e_1, _c, e_2, _f;
        });
    })().catch(test.ifError).then(test.done);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsMEJBQXFEO0FBQ3JELG1DQUFnQztBQUNoQyx5QkFBeUI7QUFFekIsU0FBVSxTQUFRLGlCQUFRO0lBQ3hCO1FBQ0UsS0FBSyxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN2QixVQUFVLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNkLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxVQUFVLENBQUM7WUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFFVCxDQUFDO0lBQ0QsS0FBSyxDQUFDLElBQUk7SUFDVixDQUFDO0NBQ0Y7QUFFRCxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hELE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLElBQW1CO0lBQzlDLENBQUM7O1lBRUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsR0FBRyxDQUFDLENBQUMsTUFBTSxPQUFPLElBQUksaUJBQWEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUVqRCxvQkFBb0I7WUFDcEIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlCQUFhLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFM0QsQ0FBQztLQUFBLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUE7QUFFRCxPQUFPLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxJQUFtQjtJQUNuRCxDQUFDOztZQUNDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQzs7Z0JBQ2QsR0FBRyxDQUFDLENBQWtCLElBQUEsS0FBQSxjQUFBLHNCQUFrQixDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUEsSUFBQTtvQkFBOUMsTUFBTSxDQUFDLGlCQUFBLENBQUE7b0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2Q7Ozs7Ozs7OztZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBRWpELG9CQUFvQjtZQUNwQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7O2dCQUNqQixHQUFHLENBQUMsQ0FBc0IsSUFBQSxLQUFBLGNBQUEsc0JBQWtCLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBLElBQUE7b0JBQXpFLE1BQU0sS0FBSyxpQkFBQSxDQUFBO29CQUNwQixPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUM3Qjs7Ozs7Ozs7O1lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzs7UUFDaEUsQ0FBQztLQUFBLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUEifQ==