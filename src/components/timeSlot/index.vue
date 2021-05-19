<template>
  <div class="timeroutine-selector">
    <div class="duration">
      <ul class="header">
        <li class="pull-left info">星期\时间</li>
        <li class="pull-left time">
          <div class="num">00:00 - 12:00</div>
          <ul class="detail clearfix">
            <li
              class="digital pull-left"
              v-for="i in 12"
              :key="i"
              :class="{ last: i == 12 }"
            >
              {{ i - 1 }}
            </li>
          </ul>
        </li>
        <li class="pull-left time">
          <div class="num">12:00 - 24:00</div>
          <ul class="detail clearfix">
            <li
              class="digital pull-left"
              v-for="i in 12"
              :key="i"
              :class="{ last: i == 12 }"
            >
              {{ i + 11 }}
            </li>
          </ul>
        </li>
      </ul>
      <div class="content">
        <ul class="pull-left week">
          <ul class="pull-left week">
            <li class="day">星期一</li>
            <li class="day">星期二</li>
            <li class="day">星期三</li>
            <li class="day">星期四</li>
            <li class="day">星期五</li>
            <li class="day">星期六</li>
            <li class="day">星期日</li>
          </ul>
        </ul>
        <ul
          class="boxzone"
          id="boxzone"
          ref="boxzone"
          @mouseleave="zoneMouseleave"
        >
          <li
            class="box"
            v-for="(item, i) in timeList"
            :key="i"
            :title="item.week + '  ' + item.timeInterval"
            @click="clickTime($event, i)"
            :class="{ active: item.active == 1 }"
            @mousedown="zoneMouseDown($event, i, item)"
            @mousemove="zoneMousemove($event, i, item)"
            @mouseup="zoneMouseup($event, i, item)"
            :data-n="item.n"
            :data-m="item.m"
          ></li>
          <div
            class="moveZone"
            ref="moveZone"
            :style="{
              top: moveZoneStyle.top,
              left: moveZoneStyle.left,
              width: moveZoneStyle.width,
              height: moveZoneStyle.height,
            }"
          ></div>
        </ul>
      </div>
    </div>
    <div class="duration-tipline">
      <span class="color-box color-blue"></span><span>已选</span
      ><span class="color-box"></span><span>未选</span
      ><span class="weektip">可拖动鼠标选择时间段</span
      ><a class="emptied" @click="emptyTime" style="cursor: pointer">清空</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeList: [],
      timeActiveList: [],
      moveflag: false, // 是否开启鼠标拖动
      moveClickflag: false, // 判断是否点击
      moveflagb: false, // 是否开启鼠标拖动
      selectStart: [],
      moveZoneStyle: {
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        width: "0",
        height: "0",
      },
    };
  },
  created() {
    this.intTime();
  },
  watch:{
  },
  methods: {
    // 初始化时段数据
    intTime() {
      let hourtimes = [
        "00:00-00:30",
        "00:30-01:00",
        "01:00-01:30",
        "01:30-02:00",
        "02:00-02:30",
        "02:30-03:00",
        "03:00-03:30",
        "03:30-04:00",
        "04:00-04:30",
        "04:30-05:00",
        "05:00-05:30",
        "05:30-06:00",
        "06:00-06:30",
        "06:30-07:00",
        "07:00-07:30",
        "07:30-08:00",
        "08:00-08:30",
        "08:30-09:00",
        "09:00-09:30",
        "09:30-10:00",
        "10:00-10:30",
        "10:30-11:00",
        "11:00-11:30",
        "11:30-12:00",
        "12:00-12:30",
        "12:30-13:00",
        "13:00-13:30",
        "13:30-14:00",
        "14:00-14:30",
        "14:30-15:00",
        "15:00-15:30",
        "15:30-16:00",
        "16:00-16:30",
        "16:30-17:00",
        "17:00-17:30",
        "17:30-18:00",
        "18:00-18:30",
        "18:30-19:00",
        "19:00-19:30",
        "19:30-20:00",
        "20:00-20:30",
        "20:30-21:00",
        "21:00-21:30",
        "21:30-22:00",
        "22:00-22:30",
        "22:30-23:00",
        "23:00-23:30",
        "23:30-24:00",
      ];

      this.timeList = [];
      for (let n = 0; n < 7; n++) {
        let t =
          n == 0
            ? "一"
            : n == 1
            ? "二"
            : n == 2
            ? "三"
            : n == 3
            ? "四"
            : n == 4
            ? "五"
            : n == 5
            ? "六"
            : n == 6
            ? "日"
            : "";
        let week = "星期" + t;
        hourtimes.forEach((item, index) => {
          let p = {
            n: n,
            m: index,
            active: 0,
          };
          p.week = week;
          p.timeInterval = item;
          this.timeList.push(p);
        });
      }
    },

    clickTime(e, i) {
      this.timeList[i].active = this.timeList[i].active == 1 ? 0 : 1;
      return false;
    },

    zoneMouseDown(e, key, item) {
      this.moveflag = true;
      this.moveClickflag = false;
      this.selectStart = [];
      this.selectStart.push({
        key: key,
        item: item,
      });
      e.preventDefault();
      e.stopPropagation();
    },

    zoneMousemove(e, key, item) {
      this.moveClickflag = true;
      if (!this.moveflag) return;
      var start = {
        key: this.selectStart[0].key,
        item: this.selectStart[0].item,
      };
      var end = {
        key: key,
        item: item,
      };
      let startN, endN, startM, endM;
      startM = end.item.m > start.item.m ? start.item.m : end.item.m;
      endM = end.item.m > start.item.m ? end.item.m : start.item.m;
      startN = end.item.n >= start.item.n ? start.item.n : end.item.n;
      endN = end.item.n >= start.item.n ? end.item.n : start.item.n;
      if (startM == endM && startN == endN) {
        return false;
      }
      for (var i = startN; i <= endN; i++) {
        for (var j = startM; j <= endM; j++) {
          let newkey = i * 48 + j;
          this.timeList[newkey].active = 1;
        }
      }
    },

    zoneMouseup(e, key, item) {
      if (!this.moveflag) return;
      this.clearMoveZone();
      e.preventDefault();
      e.stopPropagation();
    },

    zoneMouseleave() {
      this.clearMoveZone();
    },

    clearMoveZone() {
      this.moveflag = false;
    },

    emptyTime() {
      for (let i = 0; i < this.timeList.length; i++) {
        this.timeList[i].active = 0;
      }
      this.timeActiveList = [];
    },
    joinTime(data) {
      let tempArr = data.slice(0);
      let resultTime = [];
      let n = 0;
      for (let i = 0; i < tempArr.length; i++) {
        let current1 = tempArr[i].slice(0, 5);
        let current2 = tempArr[i].slice(-5);
        if (i == 0) {
          n = 0;
          resultTime.push(`${current1}-${current2}`);
        }
        if (i > 0) {
          if (resultTime[n].slice(-5) == current1) {
            let c = resultTime[n].slice(0, 5);
            resultTime[n] = `${c}-${current2}`;
          } else {
            n++;
            resultTime.push(tempArr[i]);
          }
        }
      }
      return resultTime;
    },
    getData() {
      let launchTimeInterval = "";
      let launchTimeInfo = "";
      let checkTimeList = [];
      this.timeList.map((item, index) => {
        launchTimeInterval = launchTimeInterval + "" + item.active;
        if (item.active == "1") {
          checkTimeList.push(item);
        }
      });

      if (launchTimeInterval.indexOf("1") < 0) {
        this.$message.error("请选取时间段");
        return false;
      }
      if (launchTimeInterval.indexOf("0") < 0) {
        launchTimeInfo = "不限";
      }

      let newTimelist = [];
      for (let n = 0; n < 7; n++) {
        let t =
          n == 0
            ? "一"
            : n == 1
            ? "二"
            : n == 2
            ? "三"
            : n == 3
            ? "四"
            : n == 4
            ? "五"
            : n == 5
            ? "六"
            : n == 6
            ? "日"
            : "";
        let week = "星期" + t;
        let yy = {
          week: week,
          timeIntervals: [],
        };
        checkTimeList.forEach((item, index) => {
          if (item.week == week) {
            yy.timeIntervals.push(item.timeInterval);
          }
        });
        if (yy.timeIntervals.length > 0) {
          newTimelist.push(yy);
        }
      }
      let lastTimelist = [];
      newTimelist.forEach((item, index) => {
        let yyyy = {
          week: item.week,
        };
        let r = this.joinTime(item.timeIntervals);
        yyyy.times = r;
        lastTimelist.push(yyyy);
      });
      launchTimeInfo = JSON.stringify(lastTimelist);
      console.log("launchTimeInfo", launchTimeInfo);
    },
  },
};
</script>
<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
  li {
    list-style: none;
  }
}
// 时间选择UI
.timeroutine-selector {
  margin-top: 20px;
  position: relative;
  display: inline-block;
  font-size: 12px;
  .duration {
    width: 707px;
    border: 1px solid rgba(217, 218, 219, 0.8);
    cursor: default;
    line-height: 1;
    position: relative;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .header {
      height: 52px;
      border-bottom: 1px solid rgba(217, 218, 219, 0.8);
      text-align: center;
      .info {
        width: 82px;
        height: 50px;
        line-height: 50px;
        border-right: 1px solid rgba(217, 218, 219, 0.8);
        color: #888;
      }
      .time {
        background: #f2f4f5;
        border-right: none;
        width: 312px;
        .detail {
          width: 313px;
        }
      }
      .num {
        height: 35px;
        line-height: 34px;
        width: 312px;
        border-bottom: 1px solid rgba(217, 218, 219, 0.8);
        border-right: 1px solid rgba(217, 218, 219, 0.8);
        font-size: 14px;
        box-sizing: border-box;
      }
      .digital {
        width: 26px;
        height: 16px;
        line-height: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        border-right: none;
      }
      .pull-left:last-child {
        .num {
          border-right: none;
        }
      }
    }
    .content {
      clear: both;
      height: 251px;
      overflow: hidden;
      position: relative;
      font-size: inherit;
      .week {
        width: 82px;
        border-right: 1px solid rgba(217, 218, 219, 0.8);
        height: 100%;
        color: #888;
        .day {
          border-bottom: 1px solid rgba(217, 218, 219, 0.8);
          height: 35px;
          line-height: 35px;
          text-align: center;
          background: #fff;
        }
      }
      .boxzone {
        float: left;
        width: 624px;
        height: 100%;
        overflow: hidden;
        position: relative;
        .box {
          width: 13px;
          height: 36px;
          float: left;
          background: #fff;
          border-right: 1px solid rgba(217, 218, 219, 0.8);
          border-bottom: 1px solid rgba(217, 218, 219, 0.8);
          border-color: #fff;
          box-sizing: border-box;
          &:not(.active):not(.choosed):nth-of-type(odd) {
            background: #f8f9fa;
          }
          &:not(.active):not(.choosed):nth-of-type(2n) {
            background: #f0f1f2;
          }
          &.active,
          &.choosed {
            background: #6997f3;
          }
        }
        .moveZone {
          position: absolute;
          background-color: blue;
          opacity: 0.3;
          border: 1px solid #d9d9d9;
          top: 0;
          left: 0;
        }
      }
    }
  }
  .duration-tipline {
    line-height: 40px;
    width: 707px;
    font-size: inherit;
    .color-box {
      display: inline-block;
      vertical-align: middle;
      height: 16px;
      width: 16px;
      border: 1px solid rgba(217, 218, 219, 0.8);
      margin-right: 5px;
      border-radius: 4px;
      &.color-blue {
        width: 15px;
        height: 15px;
        background: #6997f3;
        border-color: #6997f3;
      }
      & + span {
        margin-right: 15px;
      }
    }
    .weektip {
      color: #888;
      padding-left: 5px;
    }
    .emptied {
      float: right;
      cursor: pointer;
      // color: $primary-color;
      color: #4d7cfe;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .pull-left {
    float: left;
  }
}
</style>
