<template>
  <Head></Head>
    <div class="card card-body mt-4">
      <h3>Редактирование проекта</h3>
      <form @submit.prevent="update">
        <div class="form-group">
          <label>Название проекта</label>
          <input v-model="form.name" class="form-control" required />
        </div>
  
        <div class="form-group mt-3">
          <label>Описание</label>
          <input
            v-model="form.desc"
            class="form-control"
            required
          />
        </div>

        <div class="form-group mt-3">
        <input type="file" @change="handleFileUpload" accept="image/*" required>
        <p></p>
        </div>
        <div class="container-fluid mt-3">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="d-flex justify-content-start">
                <button type="submit" class="btn btn-success me-2" >
                  Сохранить
                </button>

                <button type="button" class="btn btn-primary" @click="fromEditToHome">
                  Назад
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
      <div class="container-fluid">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-6">
            <img v-if="form.image" :src="form.image" style="max-width: 600px;">
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { getProject, updateProject, uploadImage, deleteImage } from '@/firebase'
  import Head from '@/components/Head.vue'
  import router from '@/router'
  
  let startImage = ''

  export default {
  components: { Head },
  setup() {
    const form = reactive({ name: '', desc: '', image: '' })
    const route = useRoute()
    const projectId = computed(() => route.params.id)

    onMounted(async () => {
      const project = await getProject(projectId.value)
      form.name = project.name
      form.desc = project.desc
      form.image = project.image
      startImage = project.image
    })

    const update = async () => {
      // console.log(form.image)
      // console.log(startImage)
      // console.log('Я фрик')
      if (form.image != startImage){
        await deleteImage(startImage)
      }
      await updateProject(projectId.value, { ...form })
      router.push('/')
      form.name = ''
      form.desc = ''
      form.image = ''
    }

    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      try {
        const imageUrl = await uploadImage(file);
        form.image = imageUrl;
        alert("Картинка успешно загружена")
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    const fromEditToHome = async () => {
      if (form.image !== startImage) {
        await deleteImage(form.image)
      }
      router.push('/')
    }

    return { form, update, handleFileUpload, fromEditToHome }
  }
}
  </script>