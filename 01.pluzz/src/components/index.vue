<template>
  <div class="main">
    <div class="tui-puzzle-box">
      <!--选择难度-->
      <!-- <div class="tui-puzzle-choose" v-show='chooseType'>
        <p class='tui-puzzle-choose-name'>选择难度</p>
        <div class="tui-puzzle-btn" v-for='(item, index) in levelArr' :key='index' @click='getType(item)'>
          {{item.text}}
        </div>
      </div> -->
      <!--选择图片-->
      <div class='tui-puzzle-choose' v-show='!puzzleFlag '>
        <p class='tui-puzzle-choose-name'>选择图片</p>
        <div class="scroll">
          <div class="tui-puzzle-img" v-for = '(item, index) in imgArr' :key = 'index' :style="{backgroundImage:'url(' + item + ')'}" @click='getUrl(item)'></div>
        </div>
      </div>
      <!--游戏开始-->
      <div class="" v-show='puzzleFlag ' :style="{height:HEIGHT + 'px', width: WIDTH + 'px', position: 'relative', float: 'left'}" @touchstart='onTouchStart' @touchmove='onTouchMove' @touchend='onTouchEnd'>
        <div class="" v-for='(item, index) in imgPoints' :key = 'index'>
          <div class="tui-puzzle-li" v-for='(val, key) in item' :key='key'
          :style="{width: width + 'px',
          height: height + 'px',
          backgroundImage: 'url(' + imgUrl + ')',
          top: val.y * height + 'px',
          left: val.x * width + 'px',
          backgroundSize: cover,
          backgroundPositionX: val.px * Width + 'px',
          backgroundPositionY: val.py * Height + 'px' }">
          </div>
        </div>
        <div  class="tui-puzzle-li" res='cover' :style="{backgroundImage:'url(' + imgUrl + ')',
         backgroundPositionX: currentPX * Width + 'px',
         backgroundPositionY: currentPY * Height + 'px',
        backgroundSize: cover,
         top: currentY + 'px',
         left: currentX + 'px',
         width: width + 'px',
         height: height + 'px',
         display : (status ? 'block' : 'none'),
         zIndex: '1000' }">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Puzzle } from './../assets/js/h5puzzle.js'
// const Puzzle = require('./../assets/js/h5puzzle.js')
export default {
  data () {
    return {
      puzzle: null,
      imgPoints: [],
      imgArr: [
        require('./../assets/images/timg.png'),
        require('./../assets/images/timg1.png'),
        require('./../assets/images/timg2.png'),
        require('./../assets/images/timg3.png')
      ],
      imgUrl: '',
      levelArr: [
        {
          id: 2,
          text: 'A'
        }, {
          id: 3,
          text: 'B'
        }, {
          id: 4,
          text: 'C'
        }, {
          id: 5,
          text: 'D'
        }, {
          id: 6,
          text: 'E'
        }, {
          id: 7,
          text: 'F'
        }, {
          id: 8,
          text: 'G'
        }, {
          id: 9,
          text: 'H'
        }, {
          id: 10,
          text: 'I'
        }, {
          id: 11,
          text: 'J'
        }
      ],
      puzzleFlag: false,
      chooseType: true,
      WIDTH: 0,
      HEIGHT: 0,
      width: 0,
      height: 0,
      status: false,
      trans: 0,
      currentX: 0,
      currentY: 0,
      currentPX: 0,
      currentPY: 0,
      type0: 4,
      Width: 0,
      Height: 0,
      cover: null
    }
  },
  methods: {
    getType (e) {
      this.trans = this.WIDTH
      this.type0 = e.id
      this.chooseType = false
      this.puzzle = new Puzzle(this, {
        type: e.id
      })
    },
    getUrl (e) {
      this.imgUrl = e
      this.trans = this.WIDTH * 2
      this.puzzleFlag = true
    },
    onTouchStart () {
      return this.puzzle.page.onTouchStart()
    },
    onTouchMove () {
      return this.puzzle.page.onTouchMove()
    },
    onTouchEnd () {
      return this.puzzle.page.onTouchEnd()
    }
  },
  created () {

  },
  mounted () {
    this.puzzle = new Puzzle(this)
  },
  watch: {
    width: function (val) {
      this.Width = -val
    },
    height: function (val) {
      this.Height = -val
    },
    WIDTH: function (val) {
      this.cover = this.WIDTH + 'px' + ' ' + this.HEIGHT + 'px'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
body,html{
  display: inline-block;
  width:100%;
  height:100%;
}
.scroll{
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: space-between;
  .tui-puzzle-img{
    flex-grow: 2;
    width:45%;
    height:280px;
    background-size:100% 100%;
  }
}
.tui-fixed{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.tui-puzzle-li{
  width: 33.3333333%;
  height: 33.3333333%;
  /* height:60px; */
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  overflow: hidden;
  background-repeat: no-repeat;
}

.tui-puzzle-choose-name{
  color: rgba(255, 3, 56, 1);
  display: block;
  margin: 10px auto;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  font-size: 25px;
}
.tui-puzzle-btn{
  display: block;
  border: 1px solid rgb(143, 94, 39);
  width: 90px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  color: rgb(143, 94, 39);
  border-radius: 5px;
  margin: 10px auto;
  cursor: pointer;
}
.tui-puzzle-box{
  transform: translateX(0);
  transition: all .3s;
}
.scroll::-webkit-scrollbar{width: 0;}
.tui-puzzle-img{
  float:left;
  width:45.5%;
  height:260px;
  margin:5px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0 1px 1px rgba(241, 241, 241, 1)
}
</style>
