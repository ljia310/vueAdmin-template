<template>
  <div class="app-container">
    <el-col :span="4">
      <el-button-group style="margin-bottom:5px;">
        <el-button type="primary" @click="OnAdd">新增</el-button>
        <el-button type="primary" @click="OnDel">修改</el-button>
        <el-button type="primary" @click="OnDel">删除</el-button>
      </el-button-group>
      <el-tree node-key="id" :data="data_tree" :props="defaultProps" :render-content="tree_renderContent" @node-click="handleNodeClick" style="width: 98%"></el-tree>
    </el-col>
    <el-col :span="20">
      <el-button-group style="margin-bottom:5px;">
        <el-button type="primary" @click="OnScan">设备扫描</el-button>
      </el-button-group>
      <el-table :data="data_tb" border style="width: 100%">
        <el-table-column prop="lable" label="标签">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="state" label="状态">
        </el-table-column>
        <el-table-column prop="v_type" label="类型">
        </el-table-column>
        <el-table-column prop="value" label="值">
        </el-table-column>
        <el-table-column prop="times" label="时间戳" width="200">
        </el-table-column>
        <el-table-column label="操作" align="center" width="170">
          <template scope="scope">
            <el-button @click="handleClick" type="info" size="small">历史曲线</el-button>
            <el-button type="danger" size="small">操作</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page_info.page_index" :page-size="page_info.page_size" :total="page_info.total" layout="total, prev, pager, next">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
import { rtscan } from '@/api/devmng'
let id = 1000;
export default {
  data() {
    return {
      data_tree: [{
        label: '一级 1',
        id: 1,
        children: [{
          label: '二级 1-1',
          id: 2,
          children: [{
            id: 6,
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        id: 3,
        children: [{
          label: '二级 2-1',
          id: 4,
          children: [{
            label: '三级 2-1-1',
            id: 5,
          }]
        }, {
          label: '二级 2-2',
          id: 7,
          children: [{
            id: 8,
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        id: 9,
        children: [{
          label: '二级 3-1',
          id: 10,
          children: [{
            id: 11,
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          id: 12,
          children: [{
            id: 13,
            label: '三级 3-2-1'
          }]
        }]
      }],
      data_tb: [
        {
          lable: '温度',
          name: '温度',
          address: '107#1-1',
          state: '值变化',
          v_type: 'FLOAT',
          value: 25.7,
          times: '2017-09-15 10:12:21.123'
        },
        {
          lable: '温度',
          name: '温度',
          address: '107#1-1',
          state: '值变化',
          v_type: 'FLOAT',
          value: 25.7,
          times: '2017-09-15 10:12:21.123'
        },
        {
          lable: '温度',
          name: '温度',
          address: '107#1-1',
          state: '值变化',
          v_type: 'FLOAT',
          value: 25.7,
          times: '2017-09-15 10:12:21.123'
        },
        {
          lable: '温度',
          name: '温度',
          address: '107#1-1',
          state: '值变化',
          v_type: 'FLOAT',
          value: 25.7,
          times: '2017-09-15 10:12:21.123'
        },
        {
          lable: '温度',
          name: '温度',
          address: '107#1-1',
          state: '值变化',
          v_type: 'FLOAT',
          value: 25.7,
          times: '2017-09-15 10:12:21.123'
        },
        {
          lable: '温度',
          name: '温度',
          address: '107#1-1',
          state: '值变化',
          v_type: 'FLOAT',
          value: 25.7,
          times: '2017-09-15 10:12:21.123'
        }

      ],
      page_info:
      {
        page_size: 50,
        page_index: 3,
        total: 123
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    OnAdd(data) {
      this.data_tb.push({
        lable: '温度',
        name: '温度',
        address: '107#1-1',
        state: '值变化',
        v_type: 'FLOAT',
        value: 25.7,
        times: '2017-09-15 10:12:21.123'
      });
    },
    OnScan(data) {
      rtscan('1','1000').then(function(response) {
        alert(JSON.stringify(response));
      });
    }
  }
}
</script>