<template>
  <div>
    <div style="margin-bottom: 30px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Sample</el-breadcrumb-item>
        <el-breadcrumb-item>Instructions</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <p class="word-v-middle"><span>Welcome to the NB-IoT Data Collection and Monitoring Platform!</span></p>
    <img style=" width: 150px;height: 150px;margin-top: 60px; margin-left: 45%" src="./csu.png"/>
    <p style="margin-top:50px; font-size: 25px">I. Instructions</p>
    <p style="margin-top:20px">  1, By selecting the corresponding label in the sidebar can use different functions</p>
    <p style="margin-top:15px">  2、In the ‘Form Display’, you can use the following functions:</p>
    <p style="margin-top:15px; margin-left: 30px"> (1) Search: You can search for multiple conditions in the input box according to the prompts, when the input is empty, it means that the conditions are not needed, and you can click ‘reset’ when re-entering the conditions;</p>
    <p style="margin-top:15px; margin-left: 30px"> (2) Export: The file will be exported as an Excel spreadsheet, and the download will start automatically in the local browser after clicking;</p>
    <p style="margin-top:15px; margin-left: 30px"> (3) Batch Delete: Select multiple rows of data simultaneously for deletion;</p>
    <p style="margin-top:15px; margin-left: 30px"> (4) Start: You can first select an appropriate sampling interval in "Sampling Interval" and then click "Start." After a period of time, clicking "Search" will display the data collected by the sensor;</p>
    <p style="margin-top:15px; margin-left: 30px"> (5) Pause: Clicking "Pause" will stop the data collection;</p>
    <p style="margin-top:15px; margin-left: 30px"> (6) Warning: After entering a warning value, data in the "Sampling Value" column greater than the warning value will turn red; otherwise, it will be green;</p>
    <p style="margin-top:15px; margin-left: 30px"> (7) Edit: In the "Actions" column, you can modify the data as needed;</p>
    <p style="margin-top:15px; margin-left: 30px"> (8) Delete: In the "Actions" column, you can delete a specific row of data by clicking "Delete";</p>
    <p style="margin-top:15px">  3. In the "Chart Display" section, you can zoom the image horizontally by dragging the scroll bar at the bottom or using the mouse wheel to better observe the visualized data;</p>
    <p style="margin-top:50px; font-size: 25px">II. Declaration</p>
    <p style="margin-top:15px;">  This platform was independently developed by Buan and is only for use in the 2022 undergraduate graduation project!</p>


    <div style="width: 1200px;height:200px;"></div>
  </div>
</template>

<script>
export default {
  name: "tempState"
}
</script>

<style scoped>

</style>