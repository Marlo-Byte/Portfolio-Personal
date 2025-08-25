<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  isDark: boolean
}

defineProps<Props>()
defineEmits<{
  'toggle-theme': []
}>()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <!-- Logo -->
        <div class="logo">
          <a href="/" class="logo-link">
            <i class="fab fa-node-js"></i>
            <span>Mariano López</span>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="nav-links desktop-nav">
          <a href="#hero" @click.prevent="scrollToSection('hero')">Inicio</a>
          <a href="#about" @click.prevent="scrollToSection('about')">Sobre Mí</a>
          <a href="#skills" @click.prevent="scrollToSection('skills')">Habilidades</a>
          <a href="#projects" @click.prevent="scrollToSection('projects')">Proyectos</a>
          <a href="#contact" @click.prevent="scrollToSection('contact')">Contacto</a>
        </div>

        <!-- Theme Toggle & Mobile Menu Button -->
        <div class="nav-actions">
          <button @click="$emit('toggle-theme')" class="theme-toggle" :title="isDark ? 'Modo claro' : 'Modo oscuro'">
            <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <button @click="toggleMenu" class="mobile-menu-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="mobile-nav" :class="{ active: isMenuOpen }">
        <a href="#hero" @click.prevent="scrollToSection('hero')">Inicio</a>
        <a href="#about" @click.prevent="scrollToSection('about')">Sobre Mí</a>
        <a href="#skills" @click.prevent="scrollToSection('skills')">Habilidades</a>
        <a href="#projects" @click.prevent="scrollToSection('projects')">Proyectos</a>
        <a href="#contact" @click.prevent="scrollToSection('contact')">Contacto</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--bg-primary);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.logo-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

.logo-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.4s ease;
}

.logo-link:hover::before {
  left: 100%;
}

.logo-link .fab.fa-node-js {
  font-size: 1.8rem;
  color: #68a063;
  animation: rotate 3s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(104, 160, 99, 0.3));
}

@keyframes rotate {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

.logo-link span {
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 700;
  transition: color 0.3s ease;
}

.logo-link:hover span {
  color: var(--text-primary);
}

.desktop-nav {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background-color: var(--bg-secondary);
  color: var(--primary-color);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-nav {
  display: none;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid var(--border-color);
  margin-top: 1rem;
}

.mobile-nav.active {
  display: flex;
}

.mobile-nav a {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.mobile-nav a:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .logo h2 {
    font-size: 1.25rem;
  }
}
</style>