
import * as nodeunit from 'nodeunit';
import {iterateStream, asyncIterateStream} from "..";
import {Readable} from 'stream';
import * as fs from 'fs';

class DelayedSrc extends Readable {
  constructor(n: number) {
    super({objectMode: true});
    for (let i=0; i<n; i++) {
      setTimeout(()=>{
        this.push(i)
      },i*2);
    }
    setTimeout(()=>{
      this.push(null)
    },n*2+1);
    
  }
  _read(size) {
  }
}
class Src extends Readable {
  constructor(n: number) {
    super({objectMode: true});
    for (let i=0; i<n; i++) {
      this.push(i)
    }
    this.push(null)
  }
  _read(size) {
  }
}

const Expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

exports.testAsyncIterateStreamFastSrc = (test: nodeunit.Test) => {
  (async function(){

    let beg = Date.now();
    let vals = [];
    for await (const v of asyncIterateStream(new Src(10), true)) {
      vals.push(v);
    }
    let elapsed = Date.now() - beg;
    test.ok(elapsed < 15,  `${elapsed}ms is not fast enough`);
    test.deepEqual(vals, Expected, 'Got all values');

  })().catch(test.ifError).then(test.done);
}

exports.testAsyncIterateStreamSlowSrc = (test: nodeunit.Test) => {
  (async function(){
    let vals = [];
    for await (const v of asyncIterateStream(new DelayedSrc(10), true)) {
      vals.push(v);
    }
    test.deepEqual(vals, Expected, 'Got all values');
  })().catch(test.ifError).then(test.done);
}


exports.testAsyncIterateStreamFile = (test: nodeunit.Test) => {
  (async function(){
    // try buffered mode
    let beg = Date.now();
    let content = '';
    for await (const chunk of asyncIterateStream(fs.createReadStream(__filename), false)) {
      content += chunk.toString();
    }
    let elapsed = Date.now() - beg;
    test.ok(elapsed < 10,  `${elapsed}ms is not fast enough`);
    test.ok(/asyncIterateStream/.test(content), "read this file");
  })().catch(test.ifError).then(test.done);

}


exports.testIterateStream = (test: nodeunit.Test) => {
  (async function(){

    let vals = [];
    for (const promise of iterateStream(new DelayedSrc(10), true)) {
      let v = await promise;
      if (v !== undefined) vals.push(v);
    }
    test.deepEqual(vals, Expected, 'Got all values');

    // try buffered mode
    let content = '';
    for (const p of iterateStream(fs.createReadStream(__filename), false)) {
      let chunk = (await p);
      if (chunk) content += chunk.toString();
    }
    test.ok(/iterateStream/.test(content), "read this file");

  })().catch(test.ifError).then(test.done)}

