<template>
<div style="font-size: 12px;  line-height: 60px; display: flex">
  <div style="flex: 1; font-size: 20px">
    <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
  </div>
  <el-dropdown style="width: 70px; cursor: pointer">
    <span>Buan</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>Personal Info</el-dropdown-item>
      <el-dropdown-item>Exit</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>

<script>
export default {
  name: "Header",
  props:{
    collapseBtnClass:String,
    collapse:Function
  }
}
</script>

<style scoped>

</style>