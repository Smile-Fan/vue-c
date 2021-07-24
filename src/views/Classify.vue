<template>
  <div class="classify">
    <SearchBtn />
    <ClassifyTab @navdata="renderNav" />
    <div class="content">
      <div class="left"><NavList :listData="this.navlist" /></div>
      <div class="right">
        <CardContent
          v-for="(c, index) in this.prolist"
          :key="index"
          :info="c"
        />
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
      navlist: [],
      prolist: [],
    };
  },
  components: {
    SearchBtn,
    ClassifyTab,
    NavList,
    CardContent,
  },
  async created() {
    this.navlist = await getSecNav('时令水果').then((res) => res);
    this.prolist = await getProInfo({ type: 2 }).then((res) => res.list);
  },
  methods: {
    async renderNav(val) {
      if (val === this.navlist) {
        return;
      }
      console.log(val);
      this.prolist = await getProInfo({ type: val[0] }).then((res) => res.list);
      console.log(this.prolist);
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
    }
  }
}
</style>
