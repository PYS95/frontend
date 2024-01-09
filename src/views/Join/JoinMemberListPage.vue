<!-- JoinMemberListPage.vue -->
<template>
  <div class="container">
    <div class="common-buttons">
      <h5>{{ user_id }}님 환영합니다</h5>
      <button type="button" class="w3-button w3-round w3-blue-gray" @click="goToBoardEditPage">게시글 남기기</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-light-gray" @click="goToEditMyPage">마이페이지</button>
    </div>
    <div class="CheckboxRender">
      <TuiGrid
          :data="gridData"
          :columns="gridProps.columns"
          :options="gridProps.options"
          :rowHeaders="gridProps.rowHeaders"
          class="custom-grid"
          @grid-instance="handleGridInstance"
      ></TuiGrid>
    </div>
  </div>
</template>

<script>
import 'tui-grid/dist/tui-grid.css';
import 'tui-pagination/dist/tui-pagination.css';
import TuiGrid from "@/components/TuiGrid.vue";

export default {
  name: "JoinMemberListPage",
  components: {
    TuiGrid,
  },
  data() {
    return {
      user_id: '',
      gridProps: {
        columns: [
          {
            header: '제목',
            name: 'post_title',
            align: 'center',
          },
          {
            header: '작성자',
            name: 'user_id',
            align: 'center',
          },
          {
            header: '댓글 수',
            name: 'post_comment_cnt',
            align: 'center',
          },
        ],
        options: {
          scrollX: false,
          scrollY: false,
          headerHeight: 40,
          rowHeight: 40,
          showDummyRows: true,
          bodyHeight: 400,
          pageOptions: {
            perPage: 10,
          },
        },
      },
      gridData: [],
      gridInstance: null,
    };
  },
  methods: {
    handleGridInstance(gridInstance) {
      this.gridInstance = gridInstance;
    },

    openDetailPage(rowData) {
      if (rowData) {
        this.$router.push(`/join/${rowData.user_id}/${rowData.post_no}`);
      }
    },

    getPostList() {
      this.$axios
          .get("http://localhost:8080/api/post/list")
          .then((res) => {
            console.log(res.status)
            console.log(res.data)
            this.gridData = res.data.map(item => ({...item, select: false}));
          });
    },

    goToBoardEditPage() {
      this.$router.push('/edit')
    },

    goToEditMyPage() {
      this.$router.push({
        path: '/mypage',
        query: {
          user_id: this.user_id,
          user_pw: '',
        },
      });
    },
  },
  mounted() {
    this.gridInstance.on('click', (ev) => {
      const rowData = this.gridInstance.getRow(ev.rowKey);
      if (ev.columnName === 'post_title' && rowData) {
        this.openDetailPage(rowData);
      }
    });
    this.user_id = this.$route.params.user_id;
    this.getPostList();
  },
};
</script>

<style>
</style>
