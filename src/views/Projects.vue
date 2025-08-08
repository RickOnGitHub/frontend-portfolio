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
    border: 1px solid #f1f1f1;
    border-radius: 20px;
    padding: 2rem;
    background: #fff;
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: default;
}

/* .project-card:hover {
    box-shadow: 0 3px 6px rgba(239, 156, 255, 0.25);
} */

.project-card h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 0;
    transition: color 0.4s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
    border-radius: 2px;
}

.project-card h2::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
            #b518d4,
            #c0a9fc,
            #8400ff,
            #f2a6cf,
            #fa158fdd);
    background-size: 400% 100%;
       animation: gradientMove 30s linear infinite;
    transition: left 0.4s ease;
    z-index: -1;
    clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 100%, 0 100%);
}

.project-card:hover h2 {
    color: #fff;
}

.project-card:hover h2::before {
    left: 0;
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
    background: linear-gradient(90deg,
            #b518d4,
            #c0a9fc,
            #8400ff,
            #f2a6cf,
            #fa158fdd);
    background-size: 400% 100%;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;
    cursor: pointer;
    animation: gradientMove 30s linear infinite;
    transition: all 0.3s ease;
    text-decoration: none;
}

.tech-tag:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@keyframes gradientMove {
    0% {
        background-position: 0% 50%;
    }

    25% {
        background-position: 50% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    75% {
        background-position: 50% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
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
