<template>
<div class="swiper" ref="swiper">
  <div class="swiper-list clearfix" :style="{width: swiperListWidth + 'px', transform: 'translateX(' + translateX + 'px)', transitionDuration: transitionDuration + 's' }" ref="swiperList">
    <slot></slot>
  </div>
  <div class="dot">
    <span v-for="(x, i) in sum" :key="'dot' + x" :class="{'on': i === index}"></span>
  </div>
</div>
</template>


<script>
export default {
  name: 'swiper',
  data () {
    return {
      swiperWidth: '', // 轮播图盒子的宽度
      index: 0, // 轮播图序号
      transitionDuration: 0.7, // 切换动画时长
      timer: '', // 定时器
      startX: '', // touchstart的起始x坐标
      offset: '' // move偏移值
    }
  },
  props: {
    // 我在这里设置了必填的一个属性，为了不去计算轮播图的总数量
    sum: {
      type: Number,
      required: true
    },
    time: {
      type: Number,
      default: 3000
    }
  },
  computed: {
    // 轮播图列表的宽度
    swiperListWidth () {
      return this.swiperWidth * this.sum
    },
    // 轮播图列表偏移值
    translateX () {
      return this.index * this.swiperWidth * -1
    }
  },
  created () {
    this.$nextTick(() => {
      let swiper = this.$refs.swiper
      // 为什么不取屏幕宽度，是因为通用性，由外部的盒子决定轮播图的宽 
      this.swiperWidth = swiper.offsetWidth
      this.autoPlay()
      // addEventListener不可以用匿名函数，因为无法解除绑定
      swiper.addEventListener('touchstart', this.touchStart)
      swiper.addEventListener('touchmove', this.touchMove)
      swiper.addEventListener('touchend', this.touchEnd)
    })
  },
  methods: {
    autoPlay () {
      this.timer = setInterval(() => {
        let index = this.index + 1
        // 取余数运算，0%5=0，1%5=1，5%5=0，当然用if判断语句也是可以的
        this.index = index % this.sum
      }, this.time)
    },
    touchStart (e) {
      this.transitionDuration = 0
      clearInterval(this.timer)
      // 只记录第一根手指触发的值
      this.startX = e.targetTouches[0].clientX
    },
    touchMove (e) {
      this.offset = this.startX - e.targetTouches[0].clientX
      this.$refs.swiperList.style.transform = `translateX(${this.translateX - this.offset}px)`
    },
    touchEnd (e) {
      this.transitionDuration = 0.5
      // 计算偏移值四舍五入，如果拖动距离大于等于0.5则换一张轮播图
      let num = Math.round(this.offset / this.swiperWidth)
      let sum = this.index + num
      // 先计算再赋值给this.index避免重复触发计算属性，为什么这里不取余数，是因为又负数出现
      if (sum > this.sum - 1) {
        sum = 0
      } else if (sum < 0) {
        sum = this.sum - 1
      }
      // 解决拖动距离小于一半，index值无变化，无法触发计算属性，主动还原偏移值
      if (sum === this.index) {
        this.$refs.swiperList.style.transform = `translateX(${this.translateX}px)`
      } else {
        this.index = sum
      }
      this.autoPlay()
    }
  },
  // 实例销毁之前，移除绑定事件
  beforeDestroy () {
    let swiper = this.$refs.swiper
    swiper.removeEventListener('touchstart', this.touchStart)
    swiper.removeEventListener('touchmove', this.touchMove)
    swiper.removeEventListener('touchend', this.touchEnd)
  }
}
</script>

<style>
.swiper {
  position: relative;
  overflow: hidden;
}
.clearfix::after{
  content: "";
  display: block;
  clear: both;
}
/* .swiper-item{
  float: left;
} */
.swiper .swiper-list {
  display: flex;
  /* width: 100%; */
  transition-property: all;
  transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.swiper .swiper-item {
  width: 100%;
}
.swiper img {
  display: block;
}
.swiper .dot {
  display: flex;
  position: absolute;
  width: 100%;
  margin-top: -15px;
  justify-content: center;
}
.swiper .dot span {
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}
.swiper .dot span.on {
  background-color: #fff;
}
.swiper .dot span  + span {
  margin-left: 5px;
}

</style>
