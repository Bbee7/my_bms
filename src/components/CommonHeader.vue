<template>
  <div class="header-container">

    <!-- 左侧区域 -->
    <div class="left">
      <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <!-- 面包屑 -->
      <span class="text">首页</span>
    </div>
    <!-- 右侧区域 -->
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    }
  }
}
</script>

<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }

  .right {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>