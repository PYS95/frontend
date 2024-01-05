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
            name: 'title',
            sortingType: 'desc',
            sortable: true,
          },
          {
            header: '작성자',
            name: 'name',
            sortingType: 'desc',
            sortable: true,
          },
          {
            header: '댓글 수',
            name: 'commentCount',
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
        this.$router.push(`/detail/${rowData.id}`);
      }
    },
    getBoardList() {
      this.$axios
          .get("/api/boardList")
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
      if (ev.columnName === 'title' && rowData) {
        this.openDetailPage(rowData);
      }
    });
    this.user_id = this.$route.params.user_id;
    this.getBoardList();
  },
};
</script>

<style>
</style>
