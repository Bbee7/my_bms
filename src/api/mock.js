import Mock from 'mockjs'
import homeApi from './mockServeData/home.js'

// 定义 mock 请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)