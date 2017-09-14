
import * as nodeunit from 'nodeunit';
import {iterateStream, asyncIterateStream} from "..";
import {Readable} from 'stream';
import * as fs from 'fs';

class Src extends Readable {
  constructor() {
    super({objectMode: true});
    const N = 10;
    for (let i=0; i<N; i++) {
      setTimeout(()=>{
        this.push(i)
      },i);
    }
    setTimeout(()=>{
      this.push(null)
    },N+1);
    
  }
  _read(size) {
  }
}

const Expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
exports.testIterateStream = (test: nodeunit.Test) => {
  (async function(){

    let vals = [];
    for (const promise of iterateStream(new Src(), true)) {
      vals.push(await promise);
    }
    test.deepEqual(vals, Expected, 'Got all values');

    // try buffered mode
    let content = '';
    for (const p of iterateStream(fs.createReadStream(__filename), false)) {
      let chunk = (await p);
      if (chunk) content += chunk.toString();
    }
    test.ok(/iterateStream/.test(content), "read this file");

  })().catch(test.ifError).then(test.done);
}

exports.testAsyncIterateStream = (test: nodeunit.Test) => {
  (async function(){
    let vals = [];
    for await (const v of asyncIterateStream(new Src(), true)) {
      vals.push(v);
    }
    test.deepEqual(vals, Expected, 'Got all values');

    // try buffered mode
    let content = '';
    for await (const chunk of asyncIterateStream(fs.createReadStream(__filename), false)) {
      content += chunk.toString();
    }
    test.ok(/asyncIterateStream/.test(content), "read this file");
  })().catch(test.ifError).then(test.done);
}
