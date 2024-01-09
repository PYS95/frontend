<!--JoinMemberListPage.vue-->
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
      <button type="button" class="w3-button w3-round w3-red bottom-left" @click="deleteSelectedRows">삭제</button>
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
          // checkbox: true,
        },
        // rowHeaders: ['checkbox'],
      },
      gridData: [],
      // checkedRows: [], // 체크된 행의 인덱스를 저장하는 배열
      gridInstance: null,
    };
  },
  methods: {
    // 그리드 인스턴스가 생성될 때 호출되는 콜백 함수
    handleGridInstance(gridInstance) {
      this.gridInstance = gridInstance;

      // // 체크박스 비활성화
      // this.gridInstance.on('mousedown', (ev) => {
      //   const target = ev.target;
      //
      //   if (target && target.classList) {
      //     const checkboxClass = 'tui-grid-checkbox';
      //
      //     if (target.classList.contains(checkboxClass)) {
      //       ev.preventDefault();
      //     }
      //   }
      // });
      //
      // this.gridInstance.on('check', (ev) => {
      //   console.log('check', ev);
      // });
      // this.gridInstance.on('uncheck', (ev) => {
      //   console.log('check', ev);
      // });
    },

    openDetailPage(rowData) {
      if (rowData) {
        this.$router.push(`/join/${rowData.user_id}/${rowData.post_no}`);
      }
    },
    // deleteSelectedRows() {
    //   const selectedRows = this.gridInstance.getCheckedRows();
    //
    //   if (selectedRows.length === 0) {
    //     alert('삭제할 게시글을 선택해주세요.');
    //     return;
    //   }
    //
    //   const confirmDelete = window.confirm('선택한 항목을 삭제하시겠습니까?');
    //   if (confirmDelete) {
    //     // Remove selected rows from gridData
    //     this.gridData = this.gridData.filter(row => !selectedRows.includes(row));
    //
    //     console.log('삭제된 행의 rowKey: ', selectedRows);
    //   }
    // },
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
    }
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
.bottom-left {
  position: fixed;
  bottom: 10px;
  left: 10px;
}
</style>
