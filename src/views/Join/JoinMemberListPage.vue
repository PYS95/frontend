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

    getCommentCount(postId) {
      return this.$axios.get(`/api/comment/list/${postId}`)
          .then((response) => response.data.length)
          .catch(() => {
            console.error("댓글 수 가져오기 오류");
            return 0; // 에러 시 댓글 수를 0으로 반환
          });
    },

    getPostList() {
      this.$axios
          .get("http://localhost:8080/api/post/list")
          .then((res) => {
            console.log(res.status);
            console.log(res.data);
            this.gridData = res.data;

            const updateCommentCounts = this.gridData.map(async (item) => {
              try {
                const commentCount = await this.getCommentCount(item.post_no);
                return {
                  ...item,
                  post_comment_cnt: commentCount,
                };
              } catch (error) {
                console.error("댓글 수 가져오기 오류:", error);
                return item;
              }
            });

            Promise.all(updateCommentCounts)
                .then((updatedItems) => {
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

    goToBoardEditPage() {
      this.$router.push('/edit');
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

    registerComment(commentDto) {
      this.$axios
          .post("http://localhost:8080/api/comment/add", commentDto)
          .then((res) => {
            // 댓글이 삭제된 경우 서버 응답에서 댓글 카운트가 반환되지 않을 수 있음
            const commentCount = res.data.commentCount || 0;

            // 업데이트된 댓글 수로 gridData 업데이트
            const postId = commentDto.post_no;
            const updatedGridData = this.gridData.map((item) => {
              if (item.post_no === postId) {
                item.post_comment_cnt = commentCount;
              }
              return item;
            });

            // gridData 업데이트하여 반응성 활성화
            this.gridData = [...updatedGridData];

            // 댓글 등록 후 업데이트가 완료되면 그때 화면 갱신
            this.$nextTick(() => {
            });
          })
          .catch((error) => {
            console.error("댓글 등록 오류:", error);
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
