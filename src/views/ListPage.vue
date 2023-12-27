<!-- ListPage.vue -->
<template>
  <!-- 페이지 목록 컴포넌트의 루트 엘리먼트 -->
  <div class="container">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-dark-gray" @click="goToJoinPage">회원가입</button>
      <button type="button" class="w3-button w3-round w3-light-gray">로그인</button>
      <button type="button" class="w3-button w3-round w3-blue-gray" @click="goToBoardEditPage">등록</button>
    </div>
    <!-- TuiGrid 컴포넌트: 그리드 데이터를 표시하고 인터랙션을 제공-->
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
// 필요한 라이브러리 및 컴포넌트를 가져옴
import 'tui-grid/dist/tui-grid.css';
import 'tui-pagination/dist/tui-pagination.css';
import TuiGrid from "@/components/TuiGrid.vue";

export default {
  name: "ListPage",
  components: {
    TuiGrid, // TuiGrid 컴포넌트를 현재 컴포넌트에 등록
  },
  data() {
    // 컴포넌트의 데이터 영역: 그리드와 관련된 속성 및 상태
    return {
      gridProps: {
        // 그리드의 컬럼 설정
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
        //그리드의 기타 옵션 설정
        options: {
          rowHeaders: ['rowNum'],
        },
      },
      gridData: [],
      gridInstance: null, // TuiGrid 인스턴스를 저장하는 변수
    };
  },
  methods: {
    // 그리드 인스턴스가 생성될 때 호출되는 콜백 함수
    handleGridInstance(gridInstance) {
      this.gridInstance = gridInstance;
    },

    // 상세 페이지로 이동하는 메소드
    openDetailPage(rowData) {
      if (rowData) {
        // this.setCurrentGridData(rowData.id);
        // Vue Router를 사용하여 상세 페이지로 이동
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

    goToJoinPage() {
      this.$router.push('/join')
    },

    goToBoardEditPage() {
      this.$router.push('/edit')
    }

  },
  mounted() {
    // 그리드 행을 클릭할 때 발생하는 이벤트 처리
    this.gridInstance.on('click', (ev) => {
      const rowData = this.gridInstance.getRow(ev.rowKey);

      // '제목' 열을 클릭하면 상세 페이지로 이동하는 메소드 호출
      if (ev.columnName === 'title' && rowData) {
        this.openDetailPage(rowData);
      }
    });
    this.getBoardList();
  },
};
</script>

<style>
</style>
