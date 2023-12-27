<template>
  <div class="edit">
    <input v-model="title" placeholder="제목을 입력하세요" />
    <br>
    <input v-model="name" placeholder="닉네임을 입력하세요" />
    <br>
    <input v-model="content" placeholder="내용을 입력하세요" />
    <br>
    <input v-model="pw" placeholder="패스워드를 입력하세요" />
    <br>
    <button type="submit">등록</button>
    <router-link to="/">취소</router-link>
  </div>
</template>

<script>

</script>

<style>

</style>