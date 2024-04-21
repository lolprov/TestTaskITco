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
              <input type="checkbox" :value="{ id, name, desc, image }" v-model="selectedProjects" class="large-checkbox" >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p></p>
    <router-link :to="`/addproject`">
    <button type="button" class="btn btn-success">Добавить</button>
    </router-link>
    <p></p>
    <button type="button" class="btn btn-danger" @click="deleteSelected">Удалить выбранные</button>
    
  </template>
  

  
  <script>
  import { getProjects, deleteProject, uploadImage, deleteImage } from '@/firebase'
  
  export default {
  data() {
    return {
      projects: [],
      selectedProjects: [],
      deleteProject,
      uploadImage
    };
  },
  methods: {
    async deleteSelected() {
      if (confirm("Вы действительно хотите удалить выбранные проекты?")) {
        if (this.selectedProjects.length != 0){
        for (const project of this.selectedProjects) {
          console.log(project)
          await deleteImage(project.image)
          await deleteProject(project.id)
        }
        this.projects = await getProjects()
        this.selectedProjects = [] // сброс выбранных проектов после удаления
      }
    }
    },
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
  },
  
};
  </script>

<style>
.truncate-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.large-checkbox {
  transform: scale(1.5);
  margin-left: 10px;
}
</style>