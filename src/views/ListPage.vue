<!-- ListPage.vue -->
<template>
  <!-- 페이지 목록 컴포넌트의 루트 엘리먼트 -->
  <div class="container">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-dark-gray" @click="goToJoinPage">회원가입</button>
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
        //그리드의 기타 옵션 설정
        options: {
          headerHeight: 40,
          rowHeight: 40,
          showDummyRows: true,
          bodyHeight: 400,
          pageOptions: {
            useClient: true,
            perPage: 10,
          },
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
        // Vue Router를 사용하여 상세 페이지로 이동
        this.$router.push(`/detail/${rowData.post_no}`);
      }
    },
    getPostList() {
      this.$axios
          .get("/api/post/list")
          .then((res) => {
            console.log(res.status)
            console.log(res.data)
            this.gridData = res.data;

            // 각 항목을 변환하기 위해 map을 사용
            const updatedData = res.data.map((item) => {
              return {
                ...item,
                post_comment_cnt: 0, // 댓글 수의 기본값을 0으로 설정
              };
            });

            // 여러 비동기 요청을 처리하기 위해 Promise.all을 사용
            const updateCommentCounts = updatedData.map((item) => {
              return this.$axios
                  .get(`/api/comment/count/${item.post_no}`)
                  .then((commentRes) => {
                    // 해당 항목의 댓글 수를 업데이트
                    return {
                      ...item,
                      post_comment_cnt: commentRes.data,
                    };
                  })
                  .catch((commentError) => {
                    console.error("댓글 수 가져오기 오류:", commentError);
                    return item; // 오류 발생 시 항목을 변경하지 않은 채로 반환
                  });
            });

            // 모든 비동기 요청이 완료될 때까지 기다림
            Promise.all(updateCommentCounts)
                .then((updatedItems) => {
                  // 댓글 수가 업데이트된 항목으로 gridData 배열을 업데이트
                  this.gridData = updatedItems;
                })
                .catch((error) => {
                  console.error("댓글 수 업데이트 오류:", error);
                });
          })
          .catch((error) => {
            console.error("게시물 리스트 가져오기 오류:", error);
          });
    },

    goToJoinPage() {
      this.$router.push('/join')
    },
  },
  mounted() {
    // 그리드 행을 클릭할 때 발생하는 이벤트 처리
    this.gridInstance.on('click', (ev) => {
      const rowData = this.gridInstance.getRow(ev.rowKey);

      // '제목' 열을 클릭하면 상세 페이지로 이동하는 메소드 호출
      if (ev.columnName === 'post_title' && rowData) {
        this.openDetailPage(rowData);
      }
    });
    this.getPostList();
  },
};
</script>

<style>

</style>
