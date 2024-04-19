<template>
    <div class="card card-body mt-4">
      
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label>Название</label>
          <input v-model="form.name" class="form-control" required />
        </div>
  
        <div class="form-group mt-3">
          <label>Описание</label>
          <input
            v-model="form.desc"
            class="form-control" required
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
                <button type="submit" class="btn btn-success me-2">
                  Добавить проект
                </button>
                <button type="button" class="btn btn-primary" @click="redirectToHome" >
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
  import { createProject, uploadImage, deleteImage } from '@/firebase'
import router from '@/router'
  import { reactive } from 'vue'
  import {  useRouter } from 'vue-router'
  
  export default {
    setup() {
      const form = reactive({ name: '', desc: '', image: '' })
      const router = useRouter()
      const onSubmit = async () => {
        if (form.image != ''){
          await createProject({ ...form })
          form.name = ''
          form.desc = ''
          form.image = ''
        router.push('/')
        }
        else {
          alert("Вы не выбрали (не загрузили картинку!)")
        }
      }
  
      return { form, onSubmit }
    },

  methods: {
    async handleFileUpload(event) {
      const file = event.target.files[0];
      try {
        const imageUrl = await uploadImage(file);
        this.form.image = imageUrl;
        alert("Картинка успешно загружена")
      } catch (error) {
        alert("Вы загрузили не картинку!")
        // console.error('Error uploading image:', error);
      }

    },
    async redirectToHome(){
      if (this.form.image != ''){
          await deleteImage(this.form.image)
      }
      router.push('/')
    }
  }

}

  </script>