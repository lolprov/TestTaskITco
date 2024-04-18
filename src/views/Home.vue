<template>
  <Head></Head>
  <ProjectList />
</template>
  
  <script>
  import ProjectCreate from '@/components/ProjectCreate.vue'
  import ProjectList from '@/components/ProjectList.vue'
  import Head from '@/components/Head.vue'
  
  export default {
    name: 'Home',
    components: { ProjectCreate, ProjectList, Head }
  }
  </script>

<style>
    .truncate-text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
</style>