
export class Puzzle {
  constructor (page, opts) {
    opts = opts || {}
    this.page = page
    this.type = opts.type || 3
    this.width = 0
    this.height = 0
    this.init()
  }
  init () {
    // let _this = this
    this.page.WIDTH = document.documentElement.clientWidth
    // this.page.HEIGHT = document.body.clientHeight      // 用这个获取经常为0
    this.page.HEIGHT = document.documentElement.clientHeight
    this.page.width = this.page.WIDTH / this.type
    this.page.height = this.page.HEIGHT / this.type
    this.width = this.page.WIDTH / this.type
    this.height = this.page.HEIGHT / this.type
    // console.log(this.width, document.documentElement.clientHeight)
    this.originX = 0
    this.originY = 0
    this.originPX = 0
    this.originPY = 0
    this.currentX = 0
    this.currentY = 0
    this.cval = null
    this.val = null
    this.typeArr = []
    this.newTypeArr = []
    this.pointsArr = []
    this.initTypeArr()
    this.randomArr()
    this.page.imgPoints = this.newTypeArr
    this.bindEvent()
  }
  initTypeArr () {
    let arr = []
    let count = 0
    for (let i = 0; i < this.type; i++) {
      arr[i] = []
      for (let j = 0; j < this.type; j++) {
        arr[i].push({
          x: j,
          y: i,
          px: j,
          py: i,
          count: count
        })
        this.pointsArr.push(count)
        count++
      }
    }
    this.typeArr = arr
  }
  randomArr () {
    let len = this.pointsArr.length - 1
    for (let i = 0; i < len; i++) {
      let index = parseInt(Math.random() * len)
      let current = this.pointsArr[i]
      this.pointsArr[i] = this.pointsArr[index]
      this.pointsArr[index] = current
    }
    for (let j = 0, le = this.typeArr.length; j < le; j++) {
      let arr = this.typeArr[j]
      this.newTypeArr[j] = []
      for (let k = 0, l = arr.length; k < l; k++) {
        let val = arr[k]
        this.newTypeArr[j].push({
          x: val.x,
          y: val.y,
          px: this.pointsArr[val.count] % this.type,
          py: parseInt(this.pointsArr[val.count] / this.type),
          count: val.count
        })
      }
    }
  }
  checkWin () {
    return JSON.stringify(this.typeArr) === JSON.stringify(this.newTypeArr)
  }
  bindEvent () {
    let _this = this
    let page = this.page
    page.onTouchStart = function (e) {
      let x = parseInt(e.touches[0].pageX / _this.width)
      let y = parseInt(e.touches[0].pageY / _this.height)
      let val = _this.newTypeArr[y][x]
      _this.cval = _this.newTypeArr[y][x]
      _this.page.status = true
      _this.page.currentX = val.x * _this.width
      _this.page.currentY = val.y * _this.height
      _this.page.currentPX = val.px
      _this.page.currentPY = val.py
      _this.originX = val.x * _this.width
      _this.originY = val.y * _this.height
      _this.originPX = val.px
      _this.originPY = val.py
      _this.currentX = e.touches[0].pageX
      _this.currentY = e.touches[0].pageY
    }
    page.onTouchMove = function (e) {
      let x = parseInt(e.touches[0].pageX / _this.width)
      let y = parseInt(e.touches[0].pageY / _this.height)
      let cx = e.touches[0].pageX
      let cy = e.touches[0].pageY
      let cgx = cx - _this.currentX
      let cgy = cy - _this.currentY

      _this.val = _this.newTypeArr[y][x]
      _this.page.status = true
      _this.page.currentX = _this.originX + cgx
      _this.page.currentY = _this.originY + cgy
      _this.page.currentPX = _this.originPX
      _this.page.currentPY = _this.originPY
    }
    page.onTouchEnd = function (e) {
      _this.cval.px = _this.val.px
      _this.cval.py = _this.val.py
      _this.val.px = _this.originPX
      _this.val.py = _this.originPY
      _this.page.imgPoints = _this.newTypeArr
      _this.page.status = false
      _this.page.currentX = 0
      _this.page.currentY = 0
      _this.page.currentPX = 0
      _this.page.currentPY = 0
      _this.originX = 0
      _this.originY = 0
      _this.originPX = 0
      _this.originPY = 0
      _this.currentX = 0
      _this.currentY = 0
      if (_this.checkWin()) {
        let text = '恭喜您闯关成功'
        alert(text)
        // wx.showModal({
        //   title: '过关提醒',
        //   content: text,
        //   success (res) {
        //     if (res.confirm) {
        //       _this.type++
        //       _this.init()
        //     } else if (res.cancel) {
        //       wx.showToast({
        //         title: '您将永远成为一个' + page.data.levelArr[_this.type - 2].text,
        //         success () {
        //           wx.navigateBack({
        //             delta: 1
        //           })
        //         }
        //       })
        //     }
        //   }
        // })
      }
    }
  }
}
// module.exports = Puzzle
// export default Puzzle
