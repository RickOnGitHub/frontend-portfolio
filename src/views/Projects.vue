<template>
    <div class="projects-page">
        <div class="container">
            <div v-if="loading" class="loading">
                <p>Loading projects...</p>
            </div>

            <div v-else-if="error" class="error">
                <p>Error loading projects: {{ error }}</p>
                <button @click="loadProjects">Retry</button>
            </div>

            <div v-else>
                <header class="projects-header">
                    <h1>My Projects</h1>
                    <p>A collection of my work and personal projects</p>
                </header>

                <div v-if="projects && projects.length > 0" class="projects-grid">
                    <div v-for="project in projects" :key="project.id" class="project-card">
                        <h2>{{ project.title }}</h2>
                        <p v-if="project.excerpt" class="project-excerpt">{{ project.excerpt }}</p>

                        <!-- Custom Fields -->
                        <div v-if="project.custom_fields" class="project-meta">
                            <div v-if="project.custom_fields.technologies" class="technologies">
                                <span class="tech-label">Technologies:</span>
                                <span v-for="tech in project.custom_fields.technologies" :key="tech" class="tech-tag">
                                    {{ tech }}
                                </span>
                            </div>

                            <div v-if="project.custom_fields.project_status" class="status">
                                <span class="status-label">Status:</span>
                                <span class="status-value">{{ project.custom_fields.project_status }}</span>
                            </div>

                            <div class="project-links">
                                <a v-if="project.custom_fields.github_url" :href="project.custom_fields.github_url"
                                    target="_blank" class="project-link">
                                    GitHub
                                </a>
                                <a v-if="project.custom_fields.demo_url" :href="project.custom_fields.demo_url"
                                    target="_blank" class="project-link">
                                    Live Demo
                                </a>
                            </div>
                        </div>

                        <!-- Project Content -->
                        <div v-if="project.content" class="project-content" v-html="project.content"></div>
                    </div>
                </div>

                <div v-else class="no-projects">
                    <h2>No projects found</h2>
                    <p>Projects will appear here once they are added to the CMS.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import cmsApi from '../services/cmsApi.js'

const loading = ref(true)
const error = ref(null)
const projects = ref([])

const loadProjects = async () => {
    loading.value = true
    error.value = null

    try {
        const response = await cmsApi.getProjects()
        if (response && response.data.data) {
            projects.value = response.data.data
        }
    } catch (err) {
        console.error('Error loading projects:', err)
        error.value = err.response?.data?.message || 'Failed to load projects'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadProjects()
})
</script>

<style scoped>
.projects-page {
    min-height: calc(100vh - 200px);
    padding: 2rem 0;
    background-color: #fff;
    font-family: 'Quicksand', 'Segoe UI', sans-serif;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0;
}

.projects-header {
    text-align: center;
    margin-bottom: 3rem;
}

.projects-header h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.projects-header p {
    font-size: 1.2rem;
    color: #666;
}

.loading,
.error,
.no-projects {
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

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    .container {
        padding: 0 1rem;
    }
}

.project-card {
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 2rem;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.project-card h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
}

.project-excerpt {
    color: #666;
    margin-bottom: 1.5rem;
    font-style: italic;
}

.project-meta {
    margin-bottom: 1.5rem;
}

.technologies {
    margin-bottom: 1rem;
}

.tech-label,
.status-label {
    font-weight: 500;
    color: #333;
    margin-right: 0.5rem;
}

.tech-tag {
    display: inline-block;
    background: #000;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;
    transition: all 0.3s ease;
}

.tech-tag:hover {
    background: #333;
}

.status {
    margin-bottom: 1rem;
}

.status-value {
    color: #333;
    font-weight: 500;
}

.project-links {
    margin-top: 1rem;
}

.project-link {
    display: inline-block;
    background: #fff;
    color: #000;
    border: 1px solid #000;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 14px;
    transition: all 0.3s ease;
}

.project-link:hover {
    background: #000;
    color: #fff;
}

.project-content {
    color: #333;
    line-height: 1.6;
    margin-top: 1rem;
}
</style>
