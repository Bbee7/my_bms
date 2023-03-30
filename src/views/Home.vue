<template>
  <el-row>
    <!-- 左侧部分 -->
    <el-col :span="8" style="padding-right: 10px">
      <!-- 左侧上半部分 -->
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.png" alt="">
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>

        <div class="login-info">
          <p class="">上次登录时间：<span>2021-7-9</span></p>
          <p class="">上次登录地点：<span>四川</span></p>
        </div>
      </el-card>
      <!-- 左侧下半部分 -->
      <el-card style="margin-top: 20px;height: 460px;">
        <el-table :data="tableData" stripe style="width: 100%">
          <!-- <el-table-column prop="name" label="课程">
          </el-table-column>
          <el-table-column prop="todayBuy" label="今日购买">
          </el-table-column>
          <el-table-column prop="monthBuy" label="本月购买">
          </el-table-column>
          <el-table-column prop="totalBuy" label="总购买">
          </el-table-column> -->

          <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!-- 右侧部分 -->
    <el-col :span="16" style="padding-left: 10px">
      <!-- 右侧上半部分 -->
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <!-- 右侧下半部分 -->
      <el-card style="height: 280px">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px"></el-card>
        <el-card style="height: 260px"></el-card>
      </div>

    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ]
    }
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data
      // console.log(tableData)
      this.tableData = tableData


      // 基于准备好的 dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 指定图表的配置项和数据
      var echarts1Option = {}
      // 处理数据 xAxis
      const { orderData } = data.data
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData = {
        data: xAxis
      }
      echarts1Option.xAxis = xAxisData
      echarts1Option.yAxis = {}
      echarts1Option.legend = xAxisData
      echarts1Option.series = []
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name: key,
          type: 'line',
          data: orderData.data.map(item => item[key])
        })
      })
      // console.log(xAxis)
      // console.log(echarts1Option)
      // 使用刚指定的配置项和数据显示图表。
      echarts1.setOption(echarts1Option)
    })

  }
}
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .userInfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;

    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }

  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .price {
      font-size: 30px;
      margin-bottom: 10px;
      height: 30%;
      line-height: 30px;
    }

    .desc {
      font-size: 14px;
      text-align: center;
      color: #999;
    }
  }

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 48%;
  }
}
</style>