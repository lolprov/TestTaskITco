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
        <input type="file" @change="handleFileUpload" accept="image/*" >
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
  
  let file = ""
  let startImage = ""

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
      try{
        if (file != ""){
        const imageUrl = await uploadImage(file)
        form.image = imageUrl
        }
        await updateProject(projectId.value, { ...form })
        if (form.image != startImage){
        await deleteImage(startImage)
        }

        router.push('/')
        form.name = ''
        form.desc = ''
        form.image = ''
      } catch (error){
        alert("Вы загрузили не картинку!")
      }
    }

  const handleFileUpload = async (event) => {
    if (event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png"){
    file = event.target.files[0];
    form.image = URL.createObjectURL(file);
    }
    else{
      alert("Выбран неверный тип файла. Картинка не будет изменена")
    }
  }

    const fromEditToHome = async () => {
      router.push('/')
    }

    return { form, update, handleFileUpload, fromEditToHome }
  }
}
  </script>