"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncForever = require("async.forever");
exports.asyncForever = asyncForever;
exports.makeP = () => {
    let resolver, rejecter;
    let promise = new Promise((resolve, reject) => {
        resolver = resolve;
        rejecter = reject;
    });
    return { promise, resolver, rejecter };
};
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
exports.NextQueue = NextQueue;
// // same as async.forever
// export const asyncForever = (cb : ( next: (err?:any)=>void )=>void, done: (err?:any)=>void ) => {
//  let next = (err?: any) => {
//    if (err) done(err);
//   
//  } 
//  
//  
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBOEM7QUFtQ3RDLG9DQUFZO0FBNUJQLFFBQUEsS0FBSyxHQUFHLEdBQU8sRUFBRTtJQUM1QixJQUFJLFFBQVEsRUFBRSxRQUFRLENBQUM7SUFDdkIsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLEVBQUU7UUFDM0MsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUNuQixRQUFRLEdBQUcsTUFBTSxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUE7QUFDRDtJQUFBO1FBQ1UsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLGVBQVUsR0FBRyxFQUFFLENBQUM7SUFpQjFCLENBQUM7SUFmQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUs7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsU0FBUztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNELFNBQVM7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsTUFBTTtRQUNKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3pCLENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUFuQkQsOEJBbUJDO0FBRUQsMkJBQTJCO0FBQzNCLG9HQUFvRztBQUNwRywrQkFBK0I7QUFDL0IseUJBQXlCO0FBQ3pCLEtBQUs7QUFDTCxNQUFNO0FBQ04sSUFBSTtBQUNKLElBQUk7QUFDSixJQUFJIn0=