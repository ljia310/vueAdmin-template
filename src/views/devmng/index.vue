<template>
  <div class="app-container">
    <el-col :span="6">
      <el-button-group style="margin-bottom:5px;">
        <el-button type="primary" @click="OnAddGrp()">新增</el-button>
        <el-button type="primary" @click="OnEditGrp()">修改</el-button>
        <el-button type="primary" @click="OnDel">删除</el-button>
      </el-button-group>
      <el-tree node-key="id" :data="data_tree" :props="defaultProps" @node-click="onCur_data_tree" highlight-current style="width: 98%"></el-tree>
    </el-col>
    <el-col :span="18">
      <el-button-group style="margin-bottom:5px;">
        <el-button type="primary" @click="OnScan">设备扫描</el-button>
      </el-button-group>
      <el-table :data="data_tb" border style="width: 100%">
        <el-table-column prop="rt_id" label="序列号">
        </el-table-column>
        <el-table-column prop="dev_type" label="设备类型">
        </el-table-column>
        <el-table-column prop="ip" label="IP地址">
        </el-table-column>
        <el-table-column prop="mac" label="MAC地址">
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page_info.page_index" :page-size="page_info.page_size" :total="page_info.total" layout="total, prev, pager, next">
      </el-pagination>
    </el-col>

    <el-dialog title="设备扫描" :visible.sync="scan_dialogVisible" size="small" :before-close="handleClose">
      <el-table :data="scan_tb" border style="width: 100%" @selection-change="scanSelectionChange" v-loading="loading" element-loading-text="给我一点时间...">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="rt_id" label="序列号">
        </el-table-column>
        <el-table-column prop="dev_type" label="设备类型">
        </el-table-column>
        <el-table-column prop="ip" label="IP地址">
        </el-table-column>
        <el-table-column prop="mac" label="MAC地址">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loading=false;scan_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="OnDevAdd()" v-show="loading==false">添 加</el-button>
      </span>
    </el-dialog>

    <el-dialog title="组织选择" :visible.sync="tree_dialogVisible" size="small" :before-close="handleClose">
      <el-tree node-key="id" :data="data_tree" :props="defaultProps" @node-click="handleNodeClick" highlight-current style="width: 100%"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tree_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="tree_dialogVisible = false">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增组织" :visible.sync="grp_dialogVisible" size="small" :before-close="handleClose">
      <h5>父节点: {{cur_data_tree != null? cur_data_tree.label:'根节点'}} </h5>
      <br>
      <el-input v-model="grp_input" placeholder="请输入组织名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="grp_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddGrpReq()">确 认</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { rtscan, getGroup, addGroupReq } from '@/api/devmng'
import { convertTreeData } from '@/utils/json2tree'
let id = 1000;
export default {
  data() {
    return {
      loading: true,
      scan_dialogVisible: false,
      tree_dialogVisible: false,
      grp_dialogVisible: false,
      grp_input: null,
      data_tree: [],
      cur_data_tree: null,
      data_tb: [],
      scan_tb: [],
      scan_tb_selected: [],
      page_info:
      {
        page_size: 50,
        page_index: 1,
        total: 0
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  created() {
    getGroup(this.page_info.page_index, 65535).then((response) => {
      if (response.data.code != 0) {
        this.$message({
          message: response.data.msg,
          showClose: true,
          duration: 2 * 1000,
          type: 'error'
        });
      } else {
        var grps = response.data.data.list;
        var tree = [];
        for (var n in grps) {
          var one = {};
          one.label = grps[n].name;
          one.id = grps[n].id;
          one.pid = grps[n].pid;
          tree.push(one);
        }
        /// 属性配置信息
        var attributes = {
          // 标识字段名
          keyField: 'id',
          // 上级标识字段名
          parentKeyField: 'pid',
          // 文本字段名
          textField: 'label',
          // 根节点标识
          rootKey: 0
        };
        this.data_tree = convertTreeData(tree, attributes);
      }
    }).catch((err) => {
      this.$message({
        message: err.message,
        type: 'error',
        duration: 5 * 1000
      });
    });
  },
  methods: {
    OnEditGrp() {
    },
    OnAddGrp() {
      this.grp_input = null;
      this.grp_dialogVisible = true;
    },
    AddGrpReq() {
      if (this.grp_input == null) {
        this.$message({
          message: '请输入组织名称',
          showClose: true,
          duration: 2 * 1000,
          type: 'warning'
        });
        return;
      }
      var grp = {};
      if (this.cur_data_tree == null) {
        grp.pid = 0;
      } else {
        grp.pid = this.cur_data_tree.id;
      }
      grp.tenantId = 1;
      grp.descr = '';
      grp.name = this.grp_input;
      addGroupReq(grp).then((response) => {
        if (response.data.code != 0) {
          this.$message({
            message: response.data.msg,
            showClose: true,
            duration: 2 * 1000,
            type: 'error'
          });
          return;
        } else {
          if (this.cur_data_tree == null) {
            grp.id = response.data.data;
            grp.children = [];
            grp.label = grp.name;
            this.data_tree.push(grp);
          }
        }
      }).catch((err) => {
        this.$message({
          message: err.message,
          type: 'error',
          duration: 5 * 1000
        });
      });

    },
    scanSelectionChange(val) {
      this.scan_tb_selected = val;
    },
    onCur_data_tree(data) {
      this.cur_data_tree = data;
    },
    OnScan() {
      this.scan_tb = null;
      this.scan_dialogVisible = true;
      this.loading = true;
      rtscan('1', '30000').then((response) => {
        try {
        if(response.data instanceof Array ){
          this.scan_tb = response.data;
        }else{
          this.$message({
            message: response.data.msg,
            showClose: true,
            duration: 2 * 1000,
            type: 'error'
          });
        }
          
        } catch (e) {
          this.$message({
            message: e.message,
            showClose: true,
            duration: 2 * 1000,
            type: 'error'
          });
        }
        this.loading = false;
      }).catch((err) => {
      this.scan_dialogVisible = false;
      this.loading = false;
       this.$message({
          message: err.message,
          type: 'error',
          duration: 5 * 1000
        });
        
      });
    },
    OnDevAdd() {
      if (this.scan_tb_selected.length == 0) {
        this.$message({
          message: '巧妇难为无米之炊，请选择一个设备',
          showClose: true,
          duration: 2 * 1000,
          type: 'warning'
        });
      } else {
        this.tree_dialogVisible = true;
      }
    }
  }
}
</script>