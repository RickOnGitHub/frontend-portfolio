import axios from 'axios'

const API_BASE = 'http://localhost:8000/api'
const api = axios.create({ 
  baseURL: API_BASE,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Add auth token if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  // Public endpoints (no auth required)
  getPages: () => api.get('/pages'),
  getProjects: () => api.get('/pages/type/project'),
  getPageBySlug: (slug) => api.get(`/pages/slug/${slug}`),
  getAboutPage: () => api.get('/pages/type/about'),
  getContactPage: () => api.get('/pages/type/contact'),
  getHomePage: () => api.get('/pages/type/home'),
  
  // Auth endpoints
  login: (credentials) => api.post('/token', credentials),
  
  // Admin endpoints (requires auth)
  createPage: (data) => api.post('/admin/pages', data),
  updatePage: (id, data) => api.patch(`/admin/pages/${id}`, data),
  deletePage: (id) => api.delete(`/admin/pages/${id}`)
}
