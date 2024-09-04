<template>
  <div>

    <div style="margin-bottom: 30px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Sampling</el-breadcrumb-item>
        <el-breadcrumb-item>Table Display</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div style="margin: 10px 0">
      <el-input v-model="deviceId" placeholder="Please enter device ID" style="width: 200px"
                suffix-icon="el-icon-search"></el-input>
      <el-input v-model="sensorId" class="ml-5" placeholder="Please enter sensor ID" style="width: 200px"
                suffix-icon="el-icon-search"></el-input>
      <el-input v-model="createDate" class="ml-5" placeholder="Please enter sampling time" style="width: 200px"
                suffix-icon="el-icon-time"></el-input>
      <el-button class="ml-5" type="primary" @click="load">Search<i class="el-icon-search"></i></el-button>
      <el-button type="warning" @click="reset">Reset<i class="el-icon-refresh-right"></i></el-button>
      <el-button class="ml-5" type="primary" @click="exportall">Export<i class="el-icon-top"></i></el-button>
      <el-popconfirm
          cancel-button-text='I will reconsider'
          class="ml-5"
          confirm-button-text='Confirm'
          icon="el-icon-info"
          icon-color="red"
          title="Are you sure you want to delete?"
          @confirm="delBatch">
        <el-button slot="reference" type="danger">Batch Delete <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
    </div>

    <div style="margin: 10px 0" class="ml-5">
      <el-button type="primary">Sampling Object</el-button>
      <el-select v-model="typevalue" placeholder="Please select" style="width: 85px;">
        <el-option
            v-for="item in typeoptions"
            :key="item.typevalue"
            :label="item.typelabel"
            :value="item.typevalue">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 66px">Sampling Interval</el-button>
      <el-select v-model="period" placeholder="Please select" style="width: 85px;">
        <el-option
            v-for="item in options"
            :key="item.period"
            :label="item.label"
            :value="item.period">
        </el-option>
      </el-select>
      <el-button-group>
        <el-button style="margin-left: 66px" type="primary" :plain='currSelect1' size="mini" :disabled='btnDisabledStart' @click="startRec">Start <i class="el-icon-check"></i></el-button>
        <el-button type="primary" :plain='currSelect2' size="mini" @click="stopRec">Pause <i class="el-icon-close"></i></el-button>
      </el-button-group>
      <el-button type="primary" style="margin-left: 63px">Warning Value</el-button>
      <el-input v-model="warnData" placeholder="Please set" style="width: 70px;"></el-input>
    </div>

    <el-table :data="tableData" :header-cell-class-name="headerBg" border stripe
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="Device ID" prop="deviceId" width="200"></el-table-column>
      <el-table-column align="center" label="Sensor ID" prop="sensorId" width="200"></el-table-column>
      <el-table-column align="center" label="Sampling Value" prop="senValue" width="150">
        <template scope="scope">
          <span v-if="scope.row.senValue>=warnData" style="color:red">{{ scope.row.senValue }}</span>
          <span v-else style="color: #37B328">{{ scope.row.senValue }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Sampling Time" prop="createDate"></el-table-column>
      <el-table-column align="center" label="Actions" width="200">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">Edit<i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              cancel-button-text='I will reconsider'
              class="ml-5"
              confirm-button-text='Confirm'
              icon="el-icon-info"
              icon-color="red"
              title="Are you sure you want to delete?"
              @confirm="del(scope.row.id)">
            <el-button slot="reference" type="danger">Delete <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="padding: 10px 0">
      <el-pagination
          :page-size="pageSize"
          :page-sizes="[10,20,50,100]"
          :total="total"
          current-page="pageNum"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" title="Data Information" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="Device ID">
          <el-input v-model="form.deviceId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Sensor ID">
          <el-input v-model="form.sensorId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Sampling Value">
          <el-input v-model="form.senValue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Sampling Time">
          <el-input v-model="form.createDate" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">Confirm</el-button>
      </div>
    </el-dialog>
    <div style="width: 1200px;height:580px;"></div>
  </div>
</template>

<script>
export default {
  name: "Table",

  data() {
    return {
      options: [{
        period: 10,
        label: '10s'
      }, {
        period: 15,
        label: '15s'
      },{
        period: 20,
        label: '20s'
      }, {
        period: 30,
        label: '30s',
      }, {
        period: 60,
        label: '60s'
      }],
      typeoptions: [{
        typevalue: 1,
        typelabel: 'Temperature'
      }, {
        typevalue: 2,
        typelabel: 'Humidity'
      }],
      period:"",
      typevalue:"",
      btnDisabledStart:false,
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      deviceId: "",
      sensorId: "",
      senValue: "",
      createDate: "",
      dialogFormVisible: false,
      multipleSelection: [],
      form: {},
      currSelect1:true,
      currSelect2:true,
      warnData:"",
      headerBg: 'headerBg',
    }
  },

  created() {
    this.load()
  },

  methods:{
    startRec() {
      this.btnDisabledStart=true;
      this.request.get("/data/start",{
        params: {
          key: this.typevalue,
          period: this.period,
        }
      })
    },

    stopRec() {
      this.btnDisabledStart=false;
      this.request.get("/data/stop",{
        params: {
          key: this.typevalue,
        }
      })
    },

    exportall(){
      if(this.typevalue===1){
        window.open("http://localhost:9090/data/tempexport")
      }
      if(this.typevalue===2){
        window.open("http://localhost:9090/data/humexport")
      }

    },

    save() {
      if(this.typevalue===1){
        this.request.post("/data/saveTemp",this.form).then(res => {
          if (res) {
            this.$message.success("Successfully modified")
            this.dialogFormVisible = false
            this.load()
          } else {
            this.$message.error("Modification failed")
          }
        })
      }
      if(this.typevalue===2){
        this.request.post("/data/saveHum",this.form).then(res => {
          if (res) {
            this.$message.success("Successfully modified")
            this.dialogFormVisible = false
            this.load()
          } else {
            this.$message.error("Modification failed")
          }
        })
      }
    },

    del(id) {
      this.request.delete("/data/delete/" + id,{
        params: {
          key: this.typevalue,
        }
      }).then(res => {
        if (res) {
          this.$message.success("Successfully deleted")
          this.load()
        } else {
          this.$message.error("Deletion failed")
        }
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    delBatch() {
      let ids = this.multipleSelection.map(v => v.id)
      this.request.post("/data/delete/batch", ids, {
        params: {
          key: this.typevalue,
        }
      }).then(res => {
        if (res) {
          this.$message.success("Batch deletion successful")
          this.load()
        } else {
          this.$message.error("Batch deletion failed")
        }
      })
    },

    load() {
      if(this.typevalue===1){
        this.request.get("/data/page/temp", {
              params: {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                deviceId: this.deviceId,
                sensorId: this.sensorId,
                createDate: this.createDate
              }
            }
        ).then(res => {
              this.tableData = res.records
              this.total = res.total
            }
        )
      }

      if(this.typevalue===2){
        this.request.get("/data/page/hum", {
              params: {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                deviceId: this.deviceId,
                sensorId: this.sensorId,
                createDate: this.createDate
              }
            }
        ).then(res => {
              this.tableData = res.records
              this.total = res.total
            }
        )
      }

    },

    reset() {
      this.deviceId = ""
      this.sensorId = ""
      this.createDate = ""
      this.load()
    },

    handleEdit(row) {
      this.form = Object.assign({}, row)
      this.dialogFormVisible = true
    },

    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },

    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
  },
}
</script>

<style >

</style>
