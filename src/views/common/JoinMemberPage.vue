<!--JoinMemberPage.vue-->
<template>
  <div class="container">
    <div class="common-buttons">
      <h5>{{ user_id }}님 환영합니다</h5>
      <button type="button" class="w3-button w3-round w3-blue-gray" @click="goToBoardEditPage">게시글 남기기</button>
    </div>

    <TuiGrid
        :data="gridData"
        :columns="gridProps.columns"
        :options="gridProps.options"
        class="custom-grid"
        @grid-instance="handleGridInstance"
    ></TuiGrid>
  </div>
</template>

<script>
import 'tui-grid/dist/tui-grid.css';
import 'tui-pagination/dist/tui-pagination.css';
import TuiGrid from "@/components/TuiGrid.vue";

export default {
  name: "JoinMemberPage",
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
            sortingType: 'desc',
            sortable: true,
          },
          {
            header: '작성자',
            name: 'user_id',
            sortingType: 'desc',
            sortable: true,
          },
          {
            header: '댓글 수',
            name: 'post_comment_cnt',
            sortingType: 'desc',
            sortable: true,
          },
        ],
        options: {
          rowHeaders: ['rowNum'],
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
        this.$router.push(`/detail/${rowData.user_id}`);
      }
    },
    getPostList() {
      this.$axios
          .get("http://localhost:8080/api/post/list")
          .then((res) => {
            console.log(res.status)
            console.log(res.data)
            this.gridData = res.data;
          });
    },

    goToBoardEditPage() {
      this.$router.push('/edit')
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
