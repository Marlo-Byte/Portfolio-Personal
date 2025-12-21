<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import NavbarComponent from './components/layout/NavbarComponent.vue'
import FooterSection from './components/layout/FooterSection.vue'
import ChatWidget from './components/layout/ChatWidget.vue'
import HeroSection from './components/sections/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import ContactSection from './components/sections/ContactSection.vue'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div id="app" :class="{ dark: isDark }">
    <NavbarComponent :isDark="isDark" @toggle-theme="toggleTheme" />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <FooterSection />

    <!-- Chat Widget -->
    <ChatWidget :isDark="isDark" />
  </div>
</template>

<style>
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1e40af;
  --accent-color: #f59e0b;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --border-color: #e5e7eb;
}

:root.dark {
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --border-color: #374151;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: all 0.3s ease;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section {
  padding: 5rem 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}

.btn-outline {
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  background-color: transparent;
}

.btn-outline:hover {
  background-color: var(--primary-color);
  color: white;
}

@media (max-width: 768px) {
  .section {
    padding: 8rem 0 3rem 0; /* Compensar navbar fixed en móvil */
  }

  .section-title {
    font-size: 2rem;
  }
}

/* Asegurar que todas las secciones tengan espacio para el navbar fixed */
.section {
  scroll-margin-top: 80px;
}

@media (max-width: 768px) {
  .section {
    scroll-margin-top: 120px;
  }
}
</style>
