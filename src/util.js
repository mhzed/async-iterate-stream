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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4Q0FBOEM7QUFtQ3RDLG9DQUFZO0FBNUJQLFFBQUEsS0FBSyxHQUFHO0lBQ25CLElBQUksUUFBUSxFQUFFLFFBQVEsQ0FBQztJQUN2QixJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ3hDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDbkIsUUFBUSxHQUFHLE1BQU0sQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFBO0FBQ0Q7SUFBQTtRQUNVLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixlQUFVLEdBQUcsRUFBRSxDQUFDO0lBaUIxQixDQUFDO0lBZkMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELFNBQVM7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxTQUFTO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUNELE1BQU07UUFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztRQUN6QixDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBbkJELDhCQW1CQztBQUVELDJCQUEyQjtBQUMzQixvR0FBb0c7QUFDcEcsK0JBQStCO0FBQy9CLHlCQUF5QjtBQUN6QixLQUFLO0FBQ0wsTUFBTTtBQUNOLElBQUk7QUFDSixJQUFJO0FBQ0osSUFBSSJ9