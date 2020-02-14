class PromiseEasy {
  succeed = null // 用来保存成功回调
  fail = null // 用来保存失败回调
  state = 'pending'
  resolve() {
    setTimeout(() => {
      if (typeof this.succeed === 'function') {
        this.succeed()
      }
    }, 0)
  }
  reject() {
    setTimeout(() => {
      if (typeof this.fail === 'function') {
        this.fail()
      }
    }, 0)
  }
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('这里只接受函数')
    }
    fn(this.resolve.bind(this), this.reject.bind(this))
  }

  then(succeed?, fail?) {
    if (typeof succeed === 'function') {
      this.succeed = succeed
    }
    if (typeof fail === 'function') {
      this.fail = fail
    }
  }
}

export default PromiseEasy