<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const isVisible = ref(false)
const observer = ref<IntersectionObserver | null>(null)
const sectionRef = ref<HTMLElement | null>(null)
const activeFilter = ref('all')

onMounted(() => {
  // Usar threshold más bajo en móvil para mejor detección
  const isMobile = window.innerWidth <= 768
  const threshold = isMobile ? 0.1 : 0.3

  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold },
  )

  if (sectionRef.value) {
    observer.value.observe(sectionRef.value)
  }
})

const projects = [
  {
    id: 1,
    title: 'Royal Logistic S.R.L.',
    description:
      'Desarrollado en WordPress, el sitio ofrece una navegación clara, moderna y adaptativa, diseñada para transmitir confianza, profesionalismo y accesibilidad.',
    image: '/Portfolio-Personal/images/projects/Royal-Logistic.jpg',
    technologies: ['Wordpress', 'Elementor Pro', 'Envato Elements'],
    category: 'wordpress',
    github: 'https://github.com',
    demo: 'https://royallogistic.com.ar',
    featured: true,
  },
  {
    id: 2,
    title: 'Adivina Numero',
    description:
      'Proyecto desafío, que realizamos junto a mi equipo de pasantia para la empresa TECLAB',
    image: '/Portfolio-Personal/images/projects/adivina-numero.jpg',
    technologies: ['JavaScript', 'CSS', 'HTML'],
    category: 'fullstack',
    github: 'https://github.com/Marlo-Byte/Adivina-numero',
    demo: 'https://adivina--numero.puter.site/',
    featured: true,
  },
  {
    id: 3,
    title: 'TicTacTareas',
    description:
      'Proyecto desafío, que realizamos junto a mi equipo de pasantia para la empresa TECLAB',
    image: '/Portfolio-Personal/images/projects/project3.svg',
    technologies: ['Vue.js 3', 'JavaScript', 'CSS', 'HTML'],
    category: 'frontend',
    github: 'https://github.com/Marlo-Byte/TicTacTareas',
    demo: 'https://demo.com',
    featured: false,
  },
  {
    id: 4,
    title: 'BOT Whatsapp con IA',
    description:
      'Este proyecto es un bot de WhatsApp y eficiente diseñado para automatizar la atención a clientes y proveedores. Su enfoque principal es guiar a los usuarios a través de un menú interactivo para resolver consultas comunes de forma automática.',
    image: '/Portfolio-Personal/images/projects/bot-whatsapp.svg',
    technologies: ['JavaScript'],
    category: 'fullstack',
    github: 'https://github.com/Marlo-Byte/Bot-Whatsapp',
    demo: 'https://demo.com',
    featured: false,
  },
  {
    id: 5,
    title: 'Portfolio Personal de Mariano López',
    description:
      'Incluye secciones de presentación, habilidades, proyectos y contacto, con un ChatWidget interactivo responsive. Cuenta con diseño moderno, modo oscuro/claro, animaciones suaves y formulario de contacto funcional. Desplegado en GitHub Pages con automatización completa.',
    image: '/Portfolio-Personal/images/projects/portfolio-personal.jpg',
    technologies: ['Vue.js 3', 'Vite', 'TypeScript'],
    category: 'fullstack',
    github: 'https://github.com/Marlo-Byte/Portfolio-Personal',
    demo: 'https://marlo-byte.github.io/Portfolio-Personal/',
    featured: false,
  },
]

const filters = [
  { key: 'all', label: 'Todos' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'wordpress', label: 'Wordpress' },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects
  }
  return projects.filter((project) => project.category === activeFilter.value)
})

const setFilter = (filter: string) => {
  activeFilter.value = filter
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  console.error('Error loading image:', target.src)
  target.style.backgroundColor = '#f0f0f0'
  target.style.border = '2px dashed #ccc'
  target.alt = 'Error cargando imagen: ' + target.src
}
</script>

<template>
  <section id="projects" ref="sectionRef" class="section projects">
    <div class="container">
      <div class="projects-content" :class="{ visible: isVisible }">
        <div class="projects-header">
          <h2 class="section-title">Mis Proyectos</h2>
          <p class="section-subtitle">
            Una selección de proyectos que demuestran mis habilidades y experiencia
          </p>
        </div>

        <div class="filter-tabs">
          <button
            v-for="filter in filters"
            :key="filter.key"
            @click="setFilter(filter.key)"
            class="filter-tab"
            :class="{ active: activeFilter === filter.key }"
          >
            {{ filter.label }}
          </button>
        </div>

        <div class="projects-grid">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="project-card"
            :class="{ featured: project.featured }"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="project-image">
              <img
                :src="project.image"
                :alt="project.title"
                class="project-img"
                @error="handleImageError"
              />
              <div class="project-overlay">
                <div class="project-actions">
                  <a
                    :href="project.demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="action-btn demo-btn"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15,3 21,3 21,9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Demo
                  </a>
                  <a
                    :href="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="action-btn github-btn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                    Código
                  </a>
                </div>
              </div>
              <div v-if="project.featured" class="featured-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon
                    points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  />
                </svg>
                Destacado
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-technologies">
                <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="projects-cta">
          <div class="cta-content">
            <h3>¿Interesado en colaborar?</h3>
            <p>Siempre estoy abierto a nuevos proyectos y oportunidades emocionantes.</p>
            <a href="#contact" class="btn btn-primary cta-btn"> Hablemos </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  background-color: var(--bg-secondary);
  position: relative;
}

.projects-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.projects-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.projects-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-top: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--border-color);
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-tab.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.project-card {
  background-color: var(--bg-primary);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.project-card.featured {
  border: 2px solid var(--primary-color);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
}

.project-card:hover .project-img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.demo-btn {
  background-color: var(--primary-color);
  color: white;
}

.demo-btn:hover {
  background-color: var(--secondary-color);
}

.github-btn {
  background-color: var(--text-primary);
  color: var(--bg-primary);
}

.github-btn:hover {
  background-color: var(--text-secondary);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, var(--accent-color), #f59e0b);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--border-color);
}

.projects-cta {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 1.5rem;
  color: white;
  border: 2px solid var(--border-color);
  transition: all 0.3s ease;
}

/* Adaptación para modo oscuro */
:root.dark .projects-cta {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-color: var(--primary-color);
  color: var(--text-primary);
}

.cta-content h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: inherit;
}

.cta-content p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  color: inherit;
}

.cta-btn {
  background-color: white;
  color: white;
  border: 2px skyblue solid;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  background-color: var(--bg-secondary);
  transform: translateY(-2px);
  border-color: var(--primary-color);
}

/* Botón adaptado para modo oscuro */
:root.dark .cta-btn {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

:root.dark .cta-btn:hover {
  background-color: var(--secondary-color);
  color: white;
  border-color: var(--secondary-color);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .filter-tabs {
    gap: 0.5rem;
  }

  .filter-tab {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .project-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .projects-cta {
    padding: 2rem 1rem;
  }

  /* Make overlay and buttons visible on mobile/tablet */
  .project-overlay {
    opacity: 1;
    background: rgba(0, 0, 0, 0.3);
  }

  .project-actions {
    flex-direction: row;
    opacity: 1;
    transform: translateY(0);
  }

  .project-card:hover {
    transform: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-content {
    padding: 1rem;
  }

  .cta-content h3 {
    font-size: 1.5rem;
  }
}
</style>
