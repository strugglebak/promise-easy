class PromiseEasy {
  succeed = null // 用来保存成功回调
  fail = null // 用来保存失败回调
  resolve() {
    setTimeout(() => {
      this.succeed()
    }, 0)
  }
  reject() {
    setTimeout(() => {
      this.fail()
    }, 0)
  }
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('这里只接受函数')
    }
    fn(this.resolve.bind(this), this.reject.bind(this))
  }

  then(succeed, fail) {
    this.succeed = succeed
    this.fail = fail
  }
}

export default PromiseEasy