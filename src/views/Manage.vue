<template>
  <!-- Main container that takes up the full height of the viewport -->
  <el-container style="min-height: 100vh">
    <!-- Sidebar component, passing isCollapse and logoTextShow as props -->
    <Aside :isCollapse="isCollapse" :logTextShow="logoTextShow"/>
    <el-container>
      <!-- Header container with a bottom border -->
      <el-header style="border-bottom: 1px solid #ccc;">
        <!-- Header component, passing collapseBtnClass and collapse method as props -->
        <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse"/>
      </el-header>
      <!-- Main content area where the router view will be injected -->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// Importing Aside and Header components from the components directory
import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: 'Managa',  // Component name

  data() {
    return {
      msg: "Buan",  // Example message (not used in this template)
      collapseBtnClass: 'el-icon-s-fold',  // CSS class for the collapse button icon
      isCollapse: false,  // Sidebar collapse state (false means expanded)
      sideWidth: 200,  // Default sidebar width
      logoTextShow: true,  // Controls whether the logo text is shown
    }
  },

  components: {
    Aside,  // Register Aside component
    Header  // Register Header component
  },

  methods: {
    // Method triggered when the collapse button is clicked
    collapse() {
      this.isCollapse = !this.isCollapse  // Toggle the collapse state
      if (this.isCollapse) {  // When collapsed
        this.sideWidth = 64  // Set the sidebar width to 64px
        this.collapseBtnClass = 'el-icon-s-unfold'  // Change the collapse button icon to "unfold"
        this.logoTextShow = false  // Hide the logo text
      } else {  // When expanded
        this.sideWidth = 200  // Reset the sidebar width to 200px
        this.collapseBtnClass = 'el-icon-s-fold'  // Change the collapse button icon to "fold"
        this.logoTextShow = true  // Show the logo text
      }
    },
  }
}
</script>

<style>

</style>
