<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const observer = ref<IntersectionObserver | null>(null)
const sectionRef = ref<HTMLElement | null>(null)

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

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: '🎨',
    description: 'Interfaces modernas y experiencias de usuario excepcionales',
    skills: [
      { name: 'Vue.js 3', iconClass: 'devicon-vuejs-plain', color: '#4FC08D', featured: true },
      { name: 'JavaScript ES6+', iconClass: 'devicon-javascript-plain', color: '#F7DF1E', featured: true },
      { name: 'TypeScript', iconClass: 'devicon-typescript-plain', color: '#3178C6', featured: true },
      { name: 'HTML5', iconClass: 'devicon-html5-plain', color: '#E34F26' },
      { name: 'CSS3', iconClass: 'devicon-css3-plain', color: '#1572B6' },
      { name: 'Tailwind CSS', iconClass: 'devicon-tailwindcss-plain', color: '#06B6D4' },
      { name: 'Vuetify', iconClass: 'devicon-vuetify-plain', color: '#1867C0' },
      { name: 'React', iconClass: 'devicon-react-original', color: '#61DAFB' },
    ],
  },
  {
    title: 'Backend Development',
    icon: '⚙️',
    description: 'APIs robustas y arquitecturas escalables',
    skills: [
      { name: 'Node.js', iconClass: 'devicon-nodejs-plain', color: '#339933', featured: true },
      { name: 'Express.js', iconClass: 'devicon-express-original', color: '#68CC00', featured: true },
      { name: 'REST APIs', icon: '🔗', color: '#FF6B35', featured: true },
      { name: 'Python', iconClass: 'devicon-python-plain', color: '#3776AB' },
      { name: 'Serverless Functions', icon: '☁️', color: '#FF9500' },
    ],
  },
  {
    title: 'Inteligencia Artificial',
    icon: '🤖',
    description: 'Integración de IA y procesamiento de lenguaje natural',
    skills: [
      { name: 'Google Gemini API', icon: '🔮', color: '#4285F4', featured: true },
      { name: 'AI Prompt Engineering', icon: '🧠', color: '#FF6B6B', featured: true },
      { name: 'ChatGPT Integration', icon: '💬', color: '#10A37F' },
      { name: 'Natural Language Processing', icon: '📝', color: '#4ECDC4' },
    ],
  },
  {
    title: 'Bases de Datos',
    icon: '🗄️',
    description: 'Gestión eficiente de datos y persistencia',
    skills: [
      { name: 'MySQL', iconClass: 'devicon-mysql-plain', color: '#4479A1', featured: true },
      { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain', color: '#336791' },
      { name: 'MongoDB', iconClass: 'devicon-mongodb-plain', color: '#47A248' },
      { name: 'Firebase', iconClass: 'devicon-firebase-plain', color: '#FFCA28' },
    ],
  },
  {
    title: 'DevOps & Herramientas',
    icon: '🛠️',
    description: 'Desarrollo, despliegue y colaboración eficiente',
    skills: [
      { name: 'Git & GitHub', iconClass: 'devicon-git-plain', color: '#F05032', featured: true },
      { name: 'Vercel', icon: '▲', color: '#000000', featured: true },
      { name: 'VS Code', iconClass: 'devicon-vscode-plain', color: '#007ACC' },
      { name: 'Vite', iconClass: 'devicon-vitejs-plain', color: '#646CFF' },
      { name: 'Postman', icon: '📮', color: '#FF6C37' },
      { name: 'Docker', iconClass: 'devicon-docker-plain', color: '#2496ED' },
    ],
  },
  {
    title: 'Especialidades Profesionales',
    icon: '🎓',
    description: 'Certificaciones y conocimientos especializados',
    skills: [
      { name: 'Higiene y Seguridad Laboral', icon: '🛡️', color: '#28A745', featured: true },
      { name: 'Gestión de Transporte', icon: '🚛', color: '#FFC107', featured: true },
      { name: 'Entrenamiento Laboral (PEL)', icon: '👥', color: '#17A2B8' },
      { name: 'Análisis de Datos (Excel)', icon: '📊', color: '#217346' },
    ],
  },
]

const softSkills = [
  {
    name: 'Resolución de Problemas',
    icon: '🧩',
    description: 'Análisis sistemático y resolución eficiente de problemas técnicos complejos',
  },
  {
    name: 'Adaptabilidad',
    icon: '🔄',
    description: 'Capacidad para adaptarse rápidamente a nuevas tecnologías y metodologías',
  },
  {
    name: 'Comunicación Técnica',
    icon: '💬',
    description: 'Habilidad para explicar conceptos técnicos complejos de manera clara',
  },
  {
    name: 'Aprendizaje Continuo',
    icon: '📚',
    description: 'Pasión por mantenerse actualizado con las últimas tendencias tecnológicas',
  },
  {
    name: 'Gestión de Proyectos',
    icon: '📋',
    description: 'Organización eficiente de tareas, recursos y cumplimiento de deadlines',
  },
  {
    name: 'Pensamiento Analítico',
    icon: '🔍',
    description: 'Capacidad para analizar datos y tomar decisiones basadas en evidencia',
  },
  {
    name: 'Innovación',
    icon: '💡',
    description: 'Enfoque creativo para desarrollar soluciones únicas y eficientes',
  },
  {
    name: 'Trabajo Colaborativo',
    icon: '🤝',
    description: 'Colaboración efectiva en equipos multidisciplinarios y remotos',
  },
]
</script>

<template>
  <section id="skills" ref="sectionRef" class="section skills">
    <div class="container">
      <div class="skills-content" :class="{ visible: isVisible }">
        <div class="skills-header">
          <h2 class="section-title">Stack Tecnológico & Habilidades</h2>
          <p class="section-subtitle">
            Tecnologías modernas, herramientas especializadas y competencias profesionales que utilizo para desarrollar soluciones completas e innovadoras
          </p>
        </div>

        <div class="technical-skills">
          <div
            v-for="(category, categoryIndex) in skillCategories"
            :key="categoryIndex"
            class="skill-category"
            :style="{ animationDelay: `${categoryIndex * 0.1}s` }"
          >
            <div class="category-header">
              <span class="category-icon">{{ category.icon }}</span>
              <div class="category-info">
                <h3 class="category-title">{{ category.title }}</h3>
                <p class="category-description">{{ category.description }}</p>
              </div>
            </div>
            <div class="skills-tags">
              <div
                v-for="(skill, skillIndex) in category.skills"
                :key="skillIndex"
                class="skill-tag"
                :class="{ featured: skill.featured }"
                :style="{
                  '--skill-color': skill.color,
                  animationDelay: `${categoryIndex * 0.1 + skillIndex * 0.05}s`
                }"
              >
                <i
                  v-if="skill.iconClass"
                  :class="skill.iconClass"
                  class="skill-icon-devicon"
                ></i>
                <span
                  v-else
                  class="skill-icon"
                >{{ skill.icon }}</span>
                <span class="skill-name">{{ skill.name }}</span>
                <div
                  v-if="skill.featured"
                  class="featured-indicator"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="soft-skills-section">
          <h3 class="soft-skills-title">Habilidades Blandas</h3>
          <div class="soft-skills-grid">
            <div
              v-for="(skill, index) in softSkills"
              :key="index"
              class="soft-skill-item"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="soft-skill-icon">{{ skill.icon }}</div>
              <h4 class="soft-skill-name">{{ skill.name }}</h4>
              <p class="soft-skill-description">{{ skill.description }}</p>
            </div>
          </div>
        </div>

        <div class="learning-section">
          <div class="learning-card">
            <div class="learning-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div class="learning-content">
              <h3>Siempre Aprendiendo</h3>
              <p>
                Actualmente explorando nuevas tecnologías como Vue 3, Vite, y profundizando en
                arquitecturas de microservicios. La tecnología evoluciona constantemente, y yo
                evoluciono con ella.
              </p>
              <div class="learning-tags">
                <span class="learning-tag">Vue.js</span>
                <span class="learning-tag">Vite</span>
                <span class="learning-tag">Pinia</span>
                <span class="learning-tag">ESLint</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  background-color: var(--bg-primary);
  position: relative;
}

.skills-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.skills-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.skills-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-top: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.technical-skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.skill-category {
  background-color: var(--bg-secondary);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.category-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.category-info {
  flex: 1;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.category-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  cursor: default;
}

.skill-icon {
  font-size: 1rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
  filter: grayscale(100%);
}

.skill-icon-devicon {
  font-size: 1.2rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
  filter: grayscale(100%);
}

.skill-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--skill-color);
  background: var(--skill-color);
  color: white;
}

.skill-tag:hover .skill-icon,
.skill-tag:hover .skill-icon-devicon {
  filter: grayscale(0%);
}

.skill-tag.featured {
  background: var(--bg-primary);
  border-color: var(--border-color);
  color: var(--text-primary);
  font-weight: 600;
}

.skill-tag.featured:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  background: var(--skill-color);
  border-color: var(--skill-color);
  color: white;
}

.featured-indicator {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--text-secondary);
  opacity: 0.4;
  transition: all 0.3s ease;
}

.skill-tag.featured:hover .featured-indicator {
  background: rgba(255, 255, 255, 0.9);
  opacity: 1;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.soft-skills-section {
  margin-bottom: 4rem;
}

.soft-skills-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 2rem;
}

.soft-skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.soft-skill-item {
  background-color: var(--bg-secondary);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  text-align: center;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.soft-skill-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.soft-skill-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.soft-skill-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.soft-skill-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.learning-section {
  display: flex;
  justify-content: center;
}

.learning-card {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: 2px solid var(--border-color);
  color: white;
  max-width: 600px;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.learning-icon {
  flex-shrink: 0;
  opacity: 0.9;
}

.learning-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: inherit;
}

.learning-content p {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  color: inherit;
}

.learning-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

:root.dark .learning-card {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
  border-color: var(--primary-color);
  color: var(--text-primary);
}

.learning-tag {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
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

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .technical-skills {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .skill-category {
    padding: 1.5rem;
  }

  .soft-skills-grid {
    grid-template-columns: 1fr;
  }

  .learning-card {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }

  .learning-tags {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .category-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .soft-skill-item {
    padding: 1.5rem;
  }

  .learning-card {
    padding: 1.5rem;
  }
}
</style>
