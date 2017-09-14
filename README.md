async-iterate-stream
--------

Turns a nodejs stream.Readable into an Iterable or AsyncIterable so that it can be easily iterated in an async
function.

A quick npm search returns a lot of similar modules.  But the few I've tried are "leaky":   If the Readable source 
emits 'data' events faster than the iteration in the async function, then events are lost randomly.  This module is 
strictly non-leaky.  See examples below.

### Usage

There are two ways to use this.  The sipmle way is the bleeding edge way (https://github.com/tc39/proposal-async-iteration):

    import {asyncIterateStream} from "async-iterate-stream/asyncIterateStream";

    let src = fs.createReadableStream("...");  
    for await (const chunk of asyncIterateStream(src, false)) {
      console.log(chunk.toString());
    }
    
Alternatively, the non bleeding edge way is also a bit more verbose:

    import {iterateStream} from "async-iterate-stream/iterateStream";

    let src = fs.createReadableStream("...");  
    for (const p of iterateStream(src, false)) {
      const chunk = await p;
      // it's possible that stream ended while waiting for chunk, in such case chunk is undefined, 
      if (chunk !== undefined)
        console.log(chunk.toString());
    }


    