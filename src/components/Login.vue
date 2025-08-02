<!-- src/components/Login.vue -->
<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['login-success'])

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const login = async () => {
  error.value = ''
  isLoading.value = true
  try {
    const response = await axios.post('/api/token', {
      email: email.value,
      password: password.value,
      device_name: 'vite-frontend'
    }, {
      headers: {
        Accept: 'application/json'
      }
    })

    const token = response.data
    localStorage.setItem('token', token)
    
    // Get user data
    const userResponse = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    
    emit('login-success', userResponse.data)
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-form">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email"
          v-model="email" 
          type="email" 
          placeholder="Enter your email" 
          required 
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password"
          v-model="password" 
          type="password" 
          placeholder="Enter your password" 
          required 
          class="form-input"
        />
      </div>
      
      <button type="submit" :disabled="isLoading" class="submit-btn">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
      
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 1rem;
}

.submit-btn:hover:not(:disabled) {
  background: #2563eb;
}

.submit-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin: 0;
  text-align: center;
}

/* Dark mode compatibility */
@media (prefers-color-scheme: dark) {
  .form-group label {
    color: rgba(255, 255, 255, 0.87);
  }

  .form-input {
    background: #374151;
    border-color: #4b5563;
    color: rgba(255, 255, 255, 0.87);
  }

  .form-input:focus {
    border-color: #3b82f6;
    background: #374151;
  }

  .form-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
