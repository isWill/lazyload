class Lazyload {
  constructor(images) {
    this.images = images
    this.srcReg = new RegExp('images/default')
    this.atleast = 3000
    this.delay = 1500
    this.init()
  }

  getClientHeight() {
    return document.documentElement.clientHeight || document.body.clientHeight
  }

  getCurrentImgSite(img) {
    return img.getBoundingClientRect().top
  }

  listenAllImgs() {
    let self = this
    let imagesArr = Array.prototype.slice.call(this.images)
    let len = imagesArr.length
    let n = 0

    return function () {
      for (let i = n; i < len; i++) {
        if (self.getCurrentImgSite(imagesArr[i]) < self.getClientHeight() && self.srcReg.test(imagesArr[i].src)) {
          imagesArr[i].src = imagesArr[i].dataset.src
          // n++ // 此方式只适用于 img 加载顺序不是跳跃的
        }
      }
    }
  }

  throttle(fn, atleast, delay) {
    let timeout = null
    let startTime = + new Date()

    return function () {
      let curTime = + new Date()
      clearTimeout(timeout)
      if (curTime - startTime >= atleast) {
        fn()
      } else {
        timeout = setTimeout(fn, delay)
      }
    }
  }

  init() {
    let loadImages = this.listenAllImgs()
    loadImages()
    window.addEventListener('scroll', this.throttle(loadImages, this.atleast, this.delay), false)
  }
}