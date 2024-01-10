<template>
  <div v-if="currentGridData" class="detail-page">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" @click="goToPostEditPage">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red" @click="handleDeletePost">삭제</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" @click="goBack">목록</button>
    </div>
    <div class="header">
      <h1>{{ currentGridData.post_title }}</h1>
      <p class="author">작성자: {{ currentGridData.user_id }}</p>
    </div>
    <div class="content-section">
      <h2>내용</h2>
      <div class="content" v-html="currentGridData.post_content"></div>
    </div>
    <h2>댓글</h2>
    <template v-if="hasComments">
      <div v-for="comment in reversedComments" :key="comment.comment_no">
        <div class="comment">
          <div class="comment-content">
            <p>{{ comment.comment_content }} | {{ comment.user_id }}</p>
          </div>
          <button @click="handleDeleteComment(comment.comment_no)">삭제</button>
        </div>
      </div>
    </template>
    <div class="comment-input">
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
      newComment: '',
      currentGridData: {
        post_no: 0,
        post_title: '',
        user_id: '',
        post_content: '',
        comment: [],
      },
    };
  },
  computed: {
    hasComments() {
      return this.currentGridData.comment && this.currentGridData.comment.length > 0;
    },
    reversedComments() {
      return this.currentGridData.comment.slice().reverse();
    },
  },
  methods: {
    handleAddComment() {
      if (this.newComment && this.currentGridData) {
        const userId = localStorage.getItem('userId');
        axios.post(`/api/comment/add`, { post_no: this.currentGridData.post_no, comment_content: this.newComment, user_id: userId })
            .then(response => {
              if (response.data) {
                if (!this.currentGridData.comment) {
                  this.$set(this.currentGridData, 'comment', []);
                }
                this.currentGridData.comment.push(response.data);
                this.newComment = '';

                // Reload comments after adding a new comment
                this.fetchData();
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
      const listId = this.$route.params.post_no;

      axios.get(`/api/post/${listId}`)
          .then(response => {
            this.currentGridData = response.data;
          })
          .catch(error => {
            console.error('게시물 데이터 가져오기 오류:', error);
          });

      axios.get(`/api/comment/list/${listId}`)
          .then(response => {
            if (response.data && response.data.length > 0) {
              this.$set(this.currentGridData, 'comment', response.data);
            } else {
              this.$set(this.currentGridData, 'comment', []);
            }
          })
          .catch(error => {
            console.error('댓글 데이터 가져오기 오류:', error);
            this.$set(this.currentGridData, 'comment', []);
          });
    },

    goBack() {
      this.$router.go(-1);
    },

    goToPostEditPage() {
      const isAuthor = this.currentGridData.user_id === localStorage.getItem('userId');
      if (isAuthor) {
        this.$router.push(`/edit/${this.currentGridData.post_no}`);
      } else {
        alert('게시글 작성자만 수정할 수 있습니다.');
      }
    },

    handleDeletePost() {
      const userId = localStorage.getItem('userId');
      const isAuthor = this.currentGridData.user_id === userId;

      if (!isAuthor) {
        alert('게시글 작성자만 삭제할 수 있습니다.');
        return;
      }

      const confirmation = confirm('정말로 이 게시물을 삭제하시겠습니까?');
      if (!confirmation) {
        return;
      }

      axios.delete(`/api/post/${this.currentGridData.post_no}`)
          .then(response => {
            alert(response.data);
            this.$router.go(-1);
          })
          .catch(error => {
            console.error('게시물 삭제 오류:', error);
            alert('게시물 삭제에 실패했습니다.');
          });
    },

    handleDeleteComment(commentId) {
      const userId = localStorage.getItem('userId');
      const isAuthor = this.currentGridData.comment.find(comment => comment.comment_no === commentId && comment.user_id === userId);

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
            this.fetchData();
          })
          .catch(error => {
            console.error('댓글 삭제 오류:', error);
            alert('댓글 삭제에 실패했습니다.');
          });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
</style>
