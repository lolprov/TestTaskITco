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

let file = ""
  export default {
    setup() {
      const form = reactive({ name: '', desc: '', image: '' })
      const router = useRouter()
      const onSubmit = async () => {
    try {
        const imageUrl = await uploadImage(file);
        form.image = imageUrl;
          await createProject({ ...form })
          form.name = ''
          form.desc = ''
          form.image = ''
        router.push('/')
      } catch (error) {
        alert("Вы загрузили не картинку!")
      }
      }
      const handleFileUpload = async (event) => {
      file = event.target.files[0];
      form.image = URL.createObjectURL(file);
    }
    const redirectToHome = async () => {
      router.push('/')
    }
      return { form, onSubmit, handleFileUpload, redirectToHome }
    },

  methods: {

  }

}

  </script>