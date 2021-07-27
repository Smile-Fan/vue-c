<template>
  <div class="classify">
    <SearchBtn />
    <ClassifyTab @navdata="renderNav" />
    <div class="content">
      <div class="left">
        <NavList :listData="this.navlist" @data="fliterData" />
      </div>
      <div class="right" ref="content" @scroll="getMore">
        <div class="sortBar" v-show="flag">
          <div
            class="sortText"
            :class="{ active: sort === 'price-up' }"
            @touchend="changeType('price-up')"
          >
            价格升序
          </div>
          <div
            class="sortText"
            :class="{ active: sort === 'price-down' }"
            @touchend="changeType('price-down')"
          >
            价格降序
          </div>
          <div
            class="sortText"
            :class="{ active: sort === 'sale' }"
            @touchend="changeType('sale')"
          >
            销量
          </div>
          <div
            class="sortText"
            :class="{ active: sort === 'all' }"
            @touchend="changeType('all')"
          >
            综合
          </div>
        </div>
        <CardContent
          v-for="(c, index) in this.prolist"
          :key="index"
          :dataInfo="c"
        />
        <van-empty description="暂时没有数据~~" v-show="!flag" />
        <div class="no-data" v-show="flag">
          {{ this.more ? '加载中...' : '没有更多了' }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchBtn from '../components/SearchBar.vue';
import ClassifyTab from '../components/ClassifyTab.vue';
import NavList from '../components/NavList.vue';
import CardContent from '../components/CardContent.vue';
import { getSecNav, getProInfo } from '../api/request';

export default {
  data() {
    return {
      type: '2',
      page: 1,
      sort: 'all',
      navlist: [],
      prolist: [],
      moreList: [],
      more: true,
      flag: true,
      size: 10,
      clock: true,
    };
  },
  components: {
    SearchBtn,
    ClassifyTab,
    NavList,
    CardContent,
  },
  async created() {
    this.$store.commit('startList');
    this.navlist = await getSecNav('时令水果').then((res) => res);
    this.prolist = await getProInfo({ type: 2 }).then((res) => res.list);
  },
  methods: {
    async getMore() {
      if (this.$refs.content.scrollTop
        + this.$refs.content.offsetHeight
        >= this.$refs.content.scrollHeight - 150 && this.more && this.clock) {
        this.clock = false;
        this.page += 1;
        this.moreList = await getProInfo({ sort: this.sort, type: this.type, page: this.page })
          .then((res) => res);
        Object.keys(this.moreList.list).forEach((item) => {
          this.prolist.push(this.moreList.list[item]);
        });
        if (this.moreList.total === this.prolist.length) {
          this.more = false;
          this.size = this.prolist.length;
        } else {
          this.more = true;
          this.size = this.prolist.length;
        }
        this.clock = true;
      }
    },
    async changeType(sort) {
      this.prolist = [];
      this.sort = sort;
      this.prolist = await getProInfo({ sort, type: this.type, size: this.size })
        .then((res) => res.list);
    },
    fliterData(data) {
      this.prolist = [];
      if (this.moreList.total !== this.prolist.length) {
        this.more = true;
      }
      this.type = data.c;
      this.prolist = data.data.list;
      if (this.prolist.length === 0) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    async renderNav(val) {
      this.prolist = [];
      this.clock = true;
      this.more = true;
      const [a] = val;
      this.type = a;
      if (val === this.navlist) {
        return;
      }
      this.prolist = await getProInfo({ type: val[0], sort: this.sort, size: this.size })
        .then((res) => res.list);
      this.navlist = val;
    },
  },
};
</script>
<style lang="less" scoped>
.classify {
  .content {
    display: flex;
    position: fixed;
    bottom: 50px;
    top: 140px;
    left: 0;
    right: 0;
    .left {
      height: 100%;
      width: 80px;
      background-color: rgb(250, 250, 250);
      overflow: auto;
      box-sizing: border-box;
      border-right: 1px solid #eee;
    }
    .right {
      height: 100%;
      width: 295px;
      background-color: rgb(238, 238, 238);
      overflow: auto;
      .active {
        font-weight: bold;
        font-size: 14px;
        color: red;
      }
      .sortBar {
        height: 20px;
        background-color: #fff;
        .sortText {
          float: right;
          height: 20px;
          font-size: 12px;
          margin-right: 15px;
        }
      }
      .no-data {
        text-align: center;
      }
      .tip {
        text-align: center;
        font-size: 16px;
      }
    }
  }
}
</style>
