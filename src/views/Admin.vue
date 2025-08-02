<template>
  <div class="admin-page">
    <div class="container">
      <div v-if="!user" class="admin-login">
        <div class="login-container">
          <h1>Admin Login</h1>
          <Login @login-success="handleLoginSuccess" />
          <router-link to="/" class="back-link">← Back to Home</router-link>
        </div>
      </div>
      
      <div v-else class="admin-dashboard">
        <header class="admin-header">
          <h1>Admin Dashboard</h1>
          <div class="admin-actions">
            <span class="welcome-text">Welcome, {{ user.name }}</span>
            <button @click="logout" class="logout-btn">Logout</button>
          </div>
        </header>
        
        <div class="admin-content">
          <div class="admin-cards">
            <div class="admin-card">
              <h3>Content Management</h3>
              <p>Manage pages, projects, and other content</p>
              <button class="card-btn" disabled>Coming Soon</button>
            </div>
            
            <div class="admin-card">
              <h3>Media Library</h3>
              <p>Upload and manage images and files</p>
              <button class="card-btn" disabled>Coming Soon</button>
            </div>
            
            <div class="admin-card">
              <h3>Settings</h3>
              <p>Configure site settings and preferences</p>
              <button class="card-btn" disabled>Coming Soon</button>
            </div>
          </div>
          
          <div class="user-info">
            <h3>Current User</h3>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Name:</strong> {{ user.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Login from '../components/Login.vue'
import axios from 'axios'

const router = useRouter()
const user = ref(null)

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const res = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      user.value = res.data
    } catch {
      localStorage.removeItem('token')
    }
  }
})

const handleLoginSuccess = (userData) => {
  user.value = userData
}

const logout = () => {
  localStorage.removeItem('token')
  user.value = null
  router.push('/')
}
</script>

<style scoped>
.admin-page {
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

.admin-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.login-container {
  background: #fff;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  min-width: 400px;
  text-align: center;
}

.login-container h1 {
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
  font-weight: 500;
}

.back-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}

.back-link:hover {
  color: #333;
}

.admin-dashboard {
  padding: 2rem 0;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e4e4e4;
}

.admin-header h1 {
  color: #333;
  font-size: 2.5rem;
  margin: 0;
  font-weight: 500;
}

.admin-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.welcome-text {
  color: #666;
  font-size: 0.9rem;
}

.logout-btn {
  padding: 8px 16px;
  background: #d73527;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background: #b91c1c;
}

.admin-content {
  display: grid;
  gap: 2rem;
}

.admin-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.admin-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.admin-card h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 500;
}

.admin-card p {
  color: #666;
  margin-bottom: 1.5rem;
}

.card-btn {
  padding: 8px 16px;
  background: #f9f9f9;
  color: #ccc;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: not-allowed;
  font-size: 14px;
}

.user-info {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid #ddd;
}

.user-info h3 {
  color: #333;
  margin-bottom: 1rem;
  font-weight: 500;
}

.user-info p {
  color: #333;
  margin-bottom: 0.5rem;
}
</style>
