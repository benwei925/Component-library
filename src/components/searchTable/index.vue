<template>
  <div class="search-table-wrapper" :class="wrapperClass.join(' ')">
    <header class="search-header" v-if="showSearchForm">
      <el-form
        class="top-form"
        :model="searchForm"
        :inline="true"
      >
        <el-row class="row">
          <slot name="searchBtn" />
          <el-form-item
            v-for="item in searchCol"
            v-show="!item.hide"
            :key="item.dataKey"
            :prop="item.dataKey"
          >
            <template v-if="item.slot">
              <slot :name="item.slot"/>
            </template>
            <el-radio-group
              v-else-if="item.radioEnum && item.radioEnum.length > 0"
              v-model="searchForm[item.dataKey]"
              @change="item.change">
                <el-radio
                  v-for="opts in item.radioEnum"
                  :key="opts.value"
                  :label="opts.value"
                  :disabled="opts.disabled"
                >
                  {{opts.name}}
                </el-radio>
            </el-radio-group>
            <el-select
              v-else-if="item.valueEnum && item.valueEnum.length > 0 && item.change"
              v-model="searchForm[item.dataKey]"
              @change="item.change"
              clearable
            >
              <el-option
                v-for="opts in item.valueEnum"
                :key="opts.value"
                :label="opts.label || opts.name"
                :value="opts.value"
                :disabled="opts.disabled"
              />
            </el-select>
            <el-select
              v-else-if="item.valueEnum && item.valueEnum.length > 0"
              v-model="searchForm[item.dataKey]"
              @change="searchTable"
              clearable
            >
              <el-option
                v-for="opts in item.valueEnum"
                :key="opts.value"
                :label="opts.label || opts.name"
                :value="opts.value"
                :disabled="opts.disabled"
              />
            </el-select>
            <el-date-picker
              v-else-if="item.valueType === 'dateTime'"
              v-show="!item.show || item.show()"
              v-model="dateTimes"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="item.pickerOptions"
              :default-value="item.defaultValue"
              @change="searchTable"
              @clear="searchTable"
            />
            <el-input
              v-else
              v-model="searchForm[item.dataKey]"
              prefix-icon="el-icon-search"
              type="text"
              clearable
              :placeholder="`输入${item.title}回车搜索`"
              @keyup.enter.native="searchTable"
              @clear="searchTable"
            />
          </el-form-item>
          <div class="rightBtns">
            <slot name="rightBtn" />
          </div>
          <div class="nextLineBtns">
            <slot name="nextLineBtns" />
          </div>
          <!-- <el-button
            type="primary"
            class="search"
            @click="searchTable"
          >查询</el-button> -->
        </el-row>
      </el-form>
    </header>
    <div class="table-box" :class="tableClass.join(' ')">
      <slot name="table-title"/>
      <el-table
        v-loading="loading"
        class="switchTable"
        :data="tableData"
        style="width: 100%"
        @cell-mouse-enter="mouseEnter"
        @cell-mouse-leave="mouseMove"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <div v-if="emptyContentFlag" slot="empty">
          <slot name="emptyContent"/>
        </div>
        <template
          v-for="item in tableCol"
        >
          <el-table-column
            v-if="item.edit"
            :key="item.dataKey"
            :label="item.title"
            :width="item.width"
            :min-width="item.minWidth"
            v-bind="item.attrs"
          >
            <template slot-scope="scope">
              <div class="operation">
                <template v-for="btn in item.renderBtns">
                  <span v-if="btn.type === 'text' && btn.show && btn.show(scope)" :key="btn.name" :class="[btn.disabled && btn.disabled(scope) ? 'disabled' : '']">
                    <svg
                      v-if="btn.iconClass"
                      class="icon-svg textSvg"
                      aria-hidden="true">
                      <use :xlink:href="'#'+btn.iconClass" />
                    </svg>{{ btn.name }}
                    <el-tooltip v-if="btn.tooltip && (typeof btn.tooltipShow !== 'function' || btn.tooltipShow(scope))" class="item" effect popper-class="tooltips2" placement="top">
                      <div slot="content">{{btn.tooltip(scope)}}</div>
                      <i class="icon-ebiz-wenhao1"></i>
                    </el-tooltip>
                  </span>
                  <a v-else-if="typeof btn.show === 'function' && btn.show(scope)" :class="['handel-btn', btn.disabled && btn.disabled(scope) ? 'disabled' : '']" :key="btn.name" @click="btn.click(scope)">
                    {{ btn.name }}
                    <el-tooltip v-if="btn.tooltip && (typeof btn.tooltipShow !== 'function' || btn.tooltipShow(scope))" class="item" effect popper-class="tooltips2" placement="top">
                      <div slot="content">{{btn.tooltip(scope)}}</div>
                      <i class="icon-ebiz-wenhao1"></i>
                    </el-tooltip>
                  </a>
                  <a v-else-if="typeof btn.show !== 'function'  && (!btn.hide || !btn.hide(scope))" :class="['handel-btn', btn.disabled && btn.disabled(scope) ? 'disabled' : '']" :key="btn.name" @click="btn.click(scope)">
                    {{ btn.name }}
                    <el-tooltip v-if="btn.tooltip && (typeof btn.tooltipShow !== 'function' || btn.tooltipShow(scope))" class="item" effect popper-class="tooltips2" placement="top">
                      <div slot="content">{{btn.tooltip(scope)}}</div>
                      <i class="icon-ebiz-wenhao1"></i>
                    </el-tooltip>
                  </a>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.slot"
            :key="item.dataKey"
            :label="item.title"
            :width="item.width"
            :min-width="item.minWidth"
            v-bind="item.attrs"
          >
            <template slot-scope="scope">
              <slot :name="item.slot" :scope="scope"/>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.type === 'index'"
            :key="item.dataKey"
            :prop="item.dataKey"
            :label="item.title"
            :class-name="item.className"
            :width="item.width"
            :min-width="item.minWidth"
            v-bind="item.attrs"
          >
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="!item.hide"
            :key="item.dataKey"
            :prop="item.dataKey"
            :label="item.title"
            :class-name="item.className"
            :formatter="item.type !== 'index' ? item.format : () => ''"
            :type="item.type"
            :index="item.renderTxt"
            :width="item.width"
            :min-width="item.minWidth"
            v-bind="item.attrs"
          >
            <template v-if="item.headerContent" slot="header">
              {{item.title}}
              <el-tooltip class="item" effect="" popper-class="tooltips2" placement="top">
                <div slot="content" v-html="item.headerContent"></div>
                <i class="icon-ebiz-wenhao1"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <footer v-if="showPagination">
        <slot name="footerText" />
        <el-pagination
          background
          layout="total, sizes,prev, pager, next , jumper,->"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="searchForm.pageSize"
          :current-page="searchForm.pageNumber"
          :total="totalPage"
          @size-change="sizeChange"
          @current-change="pageNoChange"
        />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchForm: {
      type: Object,
      default: () => ({})
    },
    showSearchForm: {
      type: Boolean,
      default: true
    },
    searchCol: {
      type: Array,
      default: () => []
    },
    tableCol: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    totalPage: {
      type: Number,
      default: 0
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    tableClass: {
      type: Array,
      default: () => []
    },
    wrapperClass: {
      type: Array,
      default: () => []
    },
    emptyContentFlag: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dateTimes: {
      get() {
        return [this.searchForm.startDate, this.searchForm.endDate]
      },
      set(newValue) {
        if (!newValue || (newValue && newValue.length === 0)) {
          this.searchForm.startDate = ''
          this.searchForm.endDate = ''
          return
        }
        this.searchForm.startDate = newValue[0] + ' 00:00:00'
        this.searchForm.endDate = newValue[1] + ' 23:59:59'
      }
    }
  },
  methods: {
    mouseEnter(row, column, cell, event) {
      cell.parentNode.classList.add('hover')
    },
    mouseMove(row, column, cell, event) {
      cell.parentNode.classList.remove('hover')
    },
    searchTable() {
      this.searchForm.pageNumber = 1
      this.$emit('search', this.searchForm)
    },
    sizeChange(size) {
      // if (Object.keys(this.searchForm).length === 0) {
      //   this.$emit('sizeChange', size)
      //   return
      // }
      this.searchForm.pageSize = size
      this.searchForm.pageNumber = 1
      this.$emit('search', this.searchForm)
    },
    pageNoChange(pageNumber) {
      // if (Object.keys(this.searchForm).length === 0) {
      //   this.$emit('pageNoChange', pageNumber)
      //   return
      // }
      this.searchForm.pageNumber = pageNumber
      this.$emit('search', this.searchForm)
    }
  }
}
</script>
