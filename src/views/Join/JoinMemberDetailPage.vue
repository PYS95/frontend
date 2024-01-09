<template>
  <div v-if="currentGridData" class="detail-page">
    <!-- 게시물 상세 페이지 헤더 -->
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" @click="goToPostEditPage">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red" @click="handleDeletePost">삭제</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" @click="goBack">목록</button>
    </div>
    <div class="header">
      <!-- 게시물 제목 및 작성자 정보 -->
      <h1>{{ currentGridData.post_title }}</h1>
      <p class="author">작성자: {{ currentGridData.user_id }}</p>
    </div>
    <div class="content-section">
      <h2>내용</h2>
      <!-- 게시물 내용 -->
      <div class="content" v-html="currentGridData.post_content"></div>
    </div>
    <h2>댓글</h2>
    <div v-if="currentGridData.comment" class="comment">
      <div v-for="comment in currentGridData.comment" :key="comment.comment_no" class="comment">
        <div class="comment-content">
          <!-- 댓글 내용과 작성자 아이디 출력 -->
          <p>{{ comment.comment_content }} (작성자: {{ comment.user_id }})</p>
        </div>
        <button @click="handleDeleteComment(comment.comment_no, currentGridData.post_no)">삭제</button>
      </div>
    </div>
    <div class="comment-input">
      <!-- 댓글 추가 입력 폼 -->
      <textarea v-model="newComment" placeholder="댓글을 입력하세요."></textarea>
      <button @click="handleAddComment">댓글 추가</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newComment: '', // 새 댓글 내용
      currentGridData: {
        post_no: 0,
        post_title: '',
        user_id: '',
        post_content: '',
        comment: [], // 댓글 목록
      },
    };
  },
  methods: {
    handleAddComment() {
      // 댓글 추가 처리
      if (this.newComment && this.currentGridData) {
        const userId = localStorage.getItem('userId');
        axios.post(`/api/comment/add`, { post_no: this.currentGridData.post_no, comment_content: this.newComment, user_id: userId })
            .then(response => {
              console.log('댓글 추가 응답 데이터:', response.data); // 확인을 위한 콘솔 출력
              if (response.data) {
                if (!this.currentGridData.comment) {
                  this.$set(this.currentGridData, 'comment', []); // Vue.js의 $set을 사용하여 반응성 유지
                }
                this.currentGridData.comment.push(response.data);
                this.newComment = ''; // 입력 필드 초기화
              } else {
                console.error('댓글 추가 오류: 댓글이 제대로 반환되지 않았습니다.');
              }
            })
            .catch(error => {
              console.error('댓글 추가 오류:', error);
            });
      }
    },

    fetchData() {
      // 데이터 로드
      const listId = this.$route.params.post_no;
      axios.get(`/api/post/${listId}`)
          .then(response => {
            this.currentGridData = response.data;
          })
          .catch(error => {
            console.error('데이터 가져오기 오류:', error);
          });
    },
    refreshData() {
      // 데이터 새로고침
      this.fetchData();
    },
    goBack() {
      // 뒤로 가기
      this.$router.go(-1);
    },
    goToPostEditPage() {
      // 게시물 수정 페이지로 이동
      const isAuthor = this.currentGridData.user_id === localStorage.getItem('userId');
      if (isAuthor) {
        this.$router.push(`/edit/${this.currentGridData.post_no}`);
      } else {
        alert('게시글 작성자만 수정할 수 있습니다.');
      }
    },
    handleDeletePost() {
      const confirmation = confirm('정말로 이 게시물을 삭제하시겠습니까?');
      if (!confirmation) {
        return; // 사용자가 취소한 경우 삭제 처리 중단
      }

      axios.delete(`/api/post/${this.currentGridData.post_no}`)
          .then(response => {
            alert(response.data);
            // 게시물 삭제 후 목록 페이지로 이동 또는 다른 작업 수행
            this.$router.push('/list'); // 예시로 목록 페이지로 이동하도록 설정
          })
          .catch(error => {
            console.error('게시물 삭제 오류:', error);
            alert('게시물 삭제에 실패했습니다.');
          });
    },
    handleDeleteComment(commentId, postId) {
      // 댓글 삭제 처리
      const isAuthor = commentId === localStorage.getItem('userId');
      if (!isAuthor) {
        alert('댓글 작성자만 삭제할 수 있습니다.');
        return;
      }

      const confirmation = confirm('정말로 이 댓글을 삭제하시겠습니까?');
      if (!confirmation) {
        return;
      }

      axios.delete(`/api/comment/${commentId}`)
          .then(response => {
            alert(response.data);
            // 댓글 삭제 후 해당 게시물의 데이터만 다시 로드
            this.$root.$emit('refreshData', postId);
          })
          .catch(error => {
            console.error('댓글 삭제 오류:', error);
            alert('댓글 삭제에 실패했습니다.');
          });
    },
  },
  mounted() {
    // 컴포넌트 마운트 시 데이터 로드 및 이벤트 리스너 등록
    this.fetchData();
    this.$root.$on('refreshData', this.refreshData);
  },
};
</script>

<style scoped>
</style>
