<template>
  <!-- 페이지 목록 컴포넌트의 루트 엘리먼트 -->
  <div class="container">
    <!-- TuiGrid 컴포넌트: 그리드 데이터를 표시하고 인터랙션을 제공 -->
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
import axios from "axios";
// import { mapState, mapMutations } from 'vuex';

export default {
  name: "ListPage",
  components: {
    TuiGrid, // TuiGrid 컴포넌트를 현재 컴포넌트에 등록
  },
  // computed: {
  //   // Vuex 스토어에서 상태를 매핑하여 사용
  //   ...mapState('grid', ['gridData']),
  // },
// import { mapState, mapMutations } from 'vuex';
  data() {
    // 컴포넌트의 데이터 영역: 그리드와 관련된 속성 및 상태
    return {
      gridProps: {
        // 그리드의 컬럼 설정
        //그리드의 컬럼 설정
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
            name: 'comment',
            sortingType: 'desc',
            sortable: true,
          },
        ],
        //그리드의 기타 옵션 설정
        options: {
          rowHeaders: ['rowNum'],
        },
        gridData: "",
      },
      // gridInstance: null, // TuiGrid 인스턴스를 저장하는 변수
    };
  },
  methods: {
    // // Vuex mutations을 매핑하여 사용
    // ...mapMutations('grid', ['setCurrentGridData']),
    //
    // // 그리드 인스턴스가 생성될 때 호출되는 콜백 함수
    // handleGridInstance(gridInstance) {
    //   this.gridInstance = gridInstance;
    // },
    //
    // // 상세 페이지로 이동하는 메소드
    // openDetailPage(rowData) {
    //   if (rowData) {
    //     // Vuex mutations를 사용하여 현재 선택된 그리드 데이터 변경
    //     this.setCurrentGridData(rowData.id);
    //     // Vue Router를 사용하여 상세 페이지로 이동
    //     this.$router.push(`/detail/${rowData.id}`);
    //   }
    // },
    get() {
      axios.get("/api/getMemberList").then((response) => {
        console.log(response)
        this.gridData = response.data;
      });
    },
  },
  mounted() {
    // // 그리드 행을 클릭할 때 발생하는 이벤트 처리
    // this.gridInstance.on('click', (ev) => {
    //   const rowData = this.gridInstance.getRow(ev.rowKey);
    //
    //   // '제목' 열을 클릭하면 상세 페이지로 이동하는 메소드 호출
    //   if (ev.columnName === 'title' && rowData) {
    //     this.openDetailPage(rowData);
    //   }
    // });
    this.get();
  },
};
</script>

<style>
</style>