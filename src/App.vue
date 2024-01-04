<template>
  <!-- 애플리케이션의 루트 엘리먼트, 여기서는 div#app -->
  <div id="app">
    <PageHeader></PageHeader>
    <!-- 라우터 뷰로 현재 경로에 해당하는 컴포넌트를 렌더링 -->
    <router-view></router-view>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'

export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
