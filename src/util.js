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
// // same as async.forever
// export const asyncForever = (cb : ( next: (err?:any)=>void )=>void, done: (err?:any)=>void ) => {
//  let next = (err?: any) => {
//    if (err) done(err);
//   
//  } 
//  
//  
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4Q0FBOEM7QUFnQnRDLG9DQUFZO0FBVFAsUUFBQSxLQUFLLEdBQUc7SUFDbkIsSUFBSSxRQUFRLEVBQUUsUUFBUSxDQUFDO0lBQ3ZCLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU07UUFDeEMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUNuQixRQUFRLEdBQUcsTUFBTSxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUE7QUFHRCwyQkFBMkI7QUFDM0Isb0dBQW9HO0FBQ3BHLCtCQUErQjtBQUMvQix5QkFBeUI7QUFDekIsS0FBSztBQUNMLE1BQU07QUFDTixJQUFJO0FBQ0osSUFBSTtBQUNKLElBQUkifQ==