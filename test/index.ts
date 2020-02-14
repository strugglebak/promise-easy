import * as chai from 'chai'
import { describe, it } from 'mocha'
import Promise from '../src/promise'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

const assert = chai.assert
chai.use(sinonChai)

describe('Promise', () => {
  it('是一个类', () => {
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })

  it('new Promise() 如果接受的不是函数就报错', () => {
    assert.throw(() => {
      // @ts-ignore
      new Promise()
    })
    assert.throw(() => {
      // @ts-ignore
      new Promise(1)
    })
    assert.throw(() => {
      // @ts-ignore
      new Promise(true)
    })
  })
  it('new Promise(fn) 会生成一个对象，该对象会有个 then 方法', () => {
    const promise = new Promise(()=>{})
    assert.isFunction(promise.then)
  })
  it('new Promise(fn) 中的函数立即执行', () => {
    const fn = sinon.fake()
    new Promise(fn)
    assert(fn.called)
  })
  it('new Promise(fn) 中的 fn 执行的时候接受 resolve 和 reject 两个函数', done => {
    new Promise((resolve, reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
      done()
    })
  })
  it('promise.then(success) 中的 success 会在 resolve 被调用后执行', done => {
    let success = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(success.called)
      resolve()
      // 这里只有等一会才能断言 called = true
      // 因为顺序是先 then -> 调用 success -> 调用 succeed
      // 而 succeed 是放入了 setTimeout 中的
      setTimeout(() => { 
        assert.isTrue(success.called)
        // 如果代码里面需要异步的测试，则需要加 done
        // 表示异步测试的完成，告诉 mocha 可以检查其测试结果了
        // 不然很多个任务都是异步测试的话，mocha 就不知道哪个是先完成的(这里 mocha 对于测试用例是一个一个同步执行的)
        done()
      });
    })
    // @ts-ignore
    promise.then(success)
  })
  it('promise.then(null, fail) 中的 fail 会在 reject 被调用后执行', done => {
    let fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(fail.called)
      reject()
      setTimeout(() => { 
        assert.isTrue(fail.called)
        done()
      });
    })
    // @ts-ignore
    promise.then(null, fail)
  })
})
