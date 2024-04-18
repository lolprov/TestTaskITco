<template>
    <Head></Head>
    <ProjectCreate />
</template>
  
  <script>
  import ProjectCreate from '@/components/ProjectCreate.vue'
  import Head from '@/components/Head.vue'
  
  export default {
    name: 'Add',
    components: { ProjectCreate, Head }
  }
  </script>