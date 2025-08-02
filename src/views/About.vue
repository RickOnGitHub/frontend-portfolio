<template>
  <div class="about-page">
    <div class="container">
      <div v-if="loading" class="loading">
        <p>Loading...</p>
      </div>
      
      <div v-else-if="error" class="error">
        <p>Error loading about page: {{ error }}</p>
        <button @click="loadAboutContent">Retry</button>
      </div>
      
      <div v-else-if="aboutPage" class="about-content">
        <h1>{{ aboutPage.title }}</h1>
        <div v-if="aboutPage.excerpt" class="about-excerpt">
          <p>{{ aboutPage.excerpt }}</p>
        </div>
        <div v-if="aboutPage.content" class="about-body" v-html="aboutPage.content"></div>
      </div>
      
      <div v-else class="no-content">
        <h1>About</h1>
        <p>About page content is not available yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import cmsApi from '../services/cmsApi.js'

const loading = ref(true)
const error = ref(null)
const aboutPage = ref(null)

const loadAboutContent = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await cmsApi.getAboutPage()
    if (response && response.data.data && response.data.data.length > 0) {
      aboutPage.value = response.data.data[0]
    }
  } catch (err) {
    console.error('Error loading about content:', err)
    error.value = err.response?.data?.message || 'Failed to load content'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadAboutContent()
})
</script>

<style scoped>
.about-page {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
  background-color: #fff;
  font-family: 'Quicksand', 'Segoe UI', sans-serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.loading, .error, .no-content {
  text-align: center;
  padding: 4rem 2rem;
  color: #333;
}

.error {
  color: #d73527;
}

.error button {
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.error button:hover {
  background-color: #333;
}

.about-content h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
}

.about-excerpt {
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
  font-style: italic;
}

.about-body {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
}

.about-body h2 {
  color: #333;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.about-body p {
  margin-bottom: 1rem;
}
</style>
