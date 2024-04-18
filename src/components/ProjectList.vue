<template>
    <div class="card mt-4">
      <table class="table m-0">
        <thead>
          <tr>
            <th scope="col">Название проекта</th>
            <th scope="col">Описание</th>
            <th scope="col">Картинка</th>
            <th scope="col">Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ id, name, desc, image } in projects" :key="id">
            <td class="col-3">{{ name }}</td>
            <td class="col-3">{{ desc }}</td>
            <td class="col-3">
              <img :src="image" alt="Изображение проекта" style="max-width: 200px;">
            </td>
            <td>
              <router-link :to="`/edit/${id}`">
                <button class="btn btn-primary btn-sm me-2">
                  Edit
                </button>
              </router-link>
              <button class="btn btn-danger btn-sm" @click="delAndUp(id, image)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p></p>
    <router-link :to="`/addproject`">
    <button type="button" class="btn btn-success">Добавить</button>
    </router-link>
    
  </template>
  

  
  <script>
  import { getProjects, deleteProject, uploadImage, deleteImage } from '@/firebase'
  
  export default {
  data() {
    return {
      projects: [], 
      deleteProject,
      uploadImage
    };
  },
  methods: {
    async delAndUp(id, image){
      if (confirm("Вы действительно хотите удалить этот проект?")){
      await deleteImage(image)
      await deleteProject(id)
      this.projects = await getProjects()
      }
      else{
        return
      }
    }
  },  
  async created() {
    this.projects = await getProjects();
    console.log(this.projects)
  }
};
  </script>

<style>
.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>