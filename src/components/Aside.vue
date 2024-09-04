<template>
  <el-aside :width="sideWidth + 'px'"
            style="background-color: rgb(238, 241, 246); box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
    <el-menu :collapse="isCollapse" :collapse-transition="false"
             :default-openeds="['1', '3']"
             active-text-color="#ffd04b"
             background-color="rgb(48, 65, 86)"
             style="min-height: 100%; overflow-x: hidden"
             text-color="#fff"
             router
    >
      <div style="height: 60px; line-height: 60px; text-align: center">
        <img alt="" src="../assets/image.png" style="width: 20px; position: relative; top: 5px; margin-right: 5px">
        <b v-show="logoTextShow" style="color: white"></b>
      </div>
      <el-submenu >
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">Data Collection</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="temp">Instructions</el-menu-item>
          <el-menu-item index="temptable">Table Display</el-menu-item>
          <el-menu-item index="tempchart">Curve Display</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Aside",
  props:{
    isCollapse:Boolean,
    logoTextShow:Boolean,
    sideWidth:""
  }
}
</script>

<style scoped>

</style>