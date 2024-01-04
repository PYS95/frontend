<template>
  <div class="edit">
    <div class="board-contents">
      <input type="text" v-model="post_title" class="w3-input w3-border" placeholder="제목을 입력해주세요.">
      <input type="text" v-model="user_id" class="w3-input w3-border" placeholder="작성자를 입력해주세요."
             v-if="user_id === undefined">
      <input type="text" v-model="post_content" class="w3-input w3-border" placeholder="내용을 입력해주세요.">
      <input type="text" v-model="post_pw" class="w3-input w3-border" placeholder="패스워드를 입력해주세요.">
    </div>


    <!--    <input v-model="post_title" placeholder="제목을 입력하세요"/>-->
    <!--    <br>-->
    <!--    <input v-model="user_id" placeholder="아이디를 입력하세요"/>-->
    <!--    <br>-->
    <!--    <input v-model="post_content" placeholder="내용을 입력하세요"/>-->
    <!--    <br>-->
    <!--    <input v-model="post_pw" placeholder="패스워드를 입력하세요"/>-->
    <br>


    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
      <router-link to="/">취소</router-link>
    </div>
    <!--    <button type="submit">등록</button>-->
    <!--    <router-link to="/">취소</router-link>-->
  </div>
</template>

<script>

</script>

<style>
</style>