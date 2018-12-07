async-iterate-stream
--------

Turns a nodejs stream.Readable into an Iterable or AsyncIterable so that it can be iterated in an async
function.  Stream back-pressure is maintained duration iteration: the readable source's data events are never dropped and back-pressure is applied to stream if iteration can not keep up.

### Usage

There are two ways to use this.  The simple way is the bleeding edge way (https://github.com/tc39/proposal-async-iteration):

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


    