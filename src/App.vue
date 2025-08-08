<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Get current year dynamically
const currentYear = computed(() => new Date().getFullYear())

// Get current route to conditionally show header
const route = useRoute()
const showHeader = computed(() => route.path !== '/')
</script>

<template>
    <div id="app">
        <!-- Navigation Header - Hidden on homepage -->
        <header v-if="showHeader" class="app-header">
            <div class="header-content">
                <div class="logo-section">
                    <router-link to="/" class="logo-link">
                        <img src="./assets/logo.svg" class="logo" alt="Rick van Oirschot logo" />
                    </router-link>
                </div>

                <nav class="main-nav">
                    <router-link to="/" class="nav-link" active-class="active">Home</router-link>
                    <router-link to="/about" class="nav-link" active-class="active">About</router-link>
                    <router-link to="/projects" class="nav-link" active-class="active">Projects</router-link>
                    <!-- <router-link to="/admin" class="nav-link admin-link" active-class="active">Admin</router-link> -->
                </nav>
            </div>
        </header>

        <!-- Main Content - Router View -->
        <main class="main-content">
            <router-view />
        </main>

        <!-- Footer -->
        <footer class="app-footer">
            <p>&copy; {{ currentYear }} Rick van Oirschot</p>
        </footer>
    </div>
</template>

<style scoped>
#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    font-family: 'Quicksand', 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1.4em;
}

.app-header {
    background: transparent;
    border: none;
    box-shadow: none;
    position: sticky;
    top: 20px;
    z-index: 100;
    padding: 0 2rem;
}

.header-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0.75rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 1px solid #ddd;
    border-radius: 20px;
    box-shadow: 0px 4px 8px 0px #00000008;
}

.logo-section {
    display: flex;
    align-items: center;
}

.logo-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    transition: all 0.2s;
    color: #333;
    filter: grayscale(0);
}

.logo-link:hover {
    opacity: 0.8;
    filter: grayscale(1);
}

.logo {
    height: 40px;
    width: auto;
}

.site-title {
    font-size: 1.5rem;
    font-weight: 500;
    color: #333;
    margin: 0;
}

.main-nav {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.nav-link {
    color: #333;
    text-decoration: none;
    font-weight: 400;
    padding: 8px 16px;
    border-radius: 20px;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    font-size: 14px;
}

.nav-link:hover {
    background-color: #000000;
    color: #ffffff;
    border-color: #000000;
}

.nav-link.active {
    background-color: #fafafa;
    color: #000000;
    border: 1px solid #e4e4e4;
}

.admin-link {
    background: #f2f9ff;
    color: #000000;
    border: 1px solid #def1ff;
}

.admin-link:hover {
    background: #000000;
    color: #ffffff;
    border-color: #000000;
}

.admin-link.active {
    background: #000000;
    color: #ffffff;
    border-color: #000000;
}

.main-content {
    flex: 1;
    min-height: calc(100vh - 140px);
    background-color: #fff;
    max-width: 800px;
    margin: 0 auto;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
}

.app-footer {
    background: #fff;
    padding: 1rem 2rem;
    text-align: center;
    color: #666;
    font-size: 0.875rem;
    height: 80px;
    max-height: 80px;
}

/* Responsive design */
@media (max-width: 768px) {
    .app-header {
        padding: 0 1rem;
        top: 10px;
    }

    .header-content {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        max-width: calc(100vw - 2rem);
    }

    .main-content {
        padding: 0 1rem;
        max-width: 100%;
    }

    .main-nav {
        gap: 0.5rem;
    }

    .nav-link {
        padding: 8px 12px;
        font-size: 13px;
    }
}
</style>
