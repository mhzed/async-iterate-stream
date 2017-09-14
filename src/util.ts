import {Writable, WritableOptions} from 'stream';
import * as asyncForever from 'async.forever';

export interface P {
  promise: Promise<any>;
  resolver: (any?)=>void;
  rejecter:  (any?)=>void;
}
export const makeP = () : P => {
  let resolver, rejecter;
  let promise = new Promise((resolve, reject)=>{
    resolver = resolve;
    rejecter = reject;
  });
  return {promise, resolver, rejecter};
}

export {asyncForever};
// // same as async.forever
// export const asyncForever = (cb : ( next: (err?:any)=>void )=>void, done: (err?:any)=>void ) => {
//  let next = (err?: any) => {
//    if (err) done(err);
//   
//  } 
//  
//  
// }
