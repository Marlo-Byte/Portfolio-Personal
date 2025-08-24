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
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'Vue.js', level: 85, color: '#4FC08D' },
      { name: 'React', level: 80, color: '#61DAFB' },
      { name: 'JavaScript', level: 90, color: '#F7DF1E' },
      { name: 'TypeScript', level: 75, color: '#3178C6' },
      { name: 'HTML5', level: 95, color: '#E34F26' },
      { name: 'CSS3', level: 90, color: '#1572B6' },
      { name: 'Tailwind CSS', level: 85, color: '#06B6D4' },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 80, color: '#339933' },
      { name: 'Python', level: 70, color: '#3776AB' },
      { name: 'PHP', level: 65, color: '#777BB4' },
    ],
  },
  {
    title: 'Base de Datos',
    icon: '🗄️',
    skills: [
      { name: 'MySQL', level: 80, color: '#4479A1' },
      { name: 'PostgreSQL', level: 75, color: '#336791' },
      { name: 'MongoDB', level: 70, color: '#47A248' },
      { name: 'Firebase', level: 65, color: '#FFCA28' },
      { name: 'Postman', level: 65, color: '#FFCA28' },
    ],
  },
  {
    title: 'Herramientas & DevOps',
    icon: '🛠️',
    skills: [
      { name: 'Git', level: 85, color: '#F05032' },
      { name: 'Vite', level: 80, color: '#646CFF' },
      { name: 'Webpack', level: 70, color: '#8DD6F9' },
      { name: 'VS Code', level: 95, color: '#007ACC' },
      { name: 'Figma', level: 75, color: '#F24E1E' },
      { name: 'Sourcetree', level: 75, color: '#F24E1E' },
    ],
  },
]

const softSkills = [
  {
    name: 'Resolución de Problemas',
    icon: '🧩',
    description: 'Capacidad para analizar y resolver problemas complejos de manera eficiente',
  },
  {
    name: 'Trabajo en Equipo',
    icon: '👥',
    description: 'Colaboración efectiva en equipos multidisciplinarios y diversos',
  },
  {
    name: 'Comunicación',
    icon: '💬',
    description: 'Habilidad para explicar conceptos técnicos de manera clara y concisa',
  },
  {
    name: 'Aprendizaje Continuo',
    icon: '📚',
    description: 'Pasión por mantenerse actualizado con las últimas tecnologías',
  },
  {
    name: 'Gestión del Tiempo',
    icon: '⏰',
    description: 'Organización eficiente de tareas y cumplimiento de deadlines',
  },
  {
    name: 'Creatividad',
    icon: '💡',
    description: 'Enfoque innovador para crear soluciones únicas y atractivas',
  },
]
</script>

<template>
  <section id="skills" ref="sectionRef" class="section skills">
    <div class="container">
      <div class="skills-content" :class="{ visible: isVisible }">
        <div class="skills-header">
          <h2 class="section-title">Habilidades Técnicas</h2>
          <p class="section-subtitle">
            Tecnologías y herramientas que domino para crear soluciones completas
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
              <h3 class="category-title">{{ category.title }}</h3>
            </div>
            <div class="skills-grid">
              <div
                v-for="(skill, skillIndex) in category.skills"
                :key="skillIndex"
                class="skill-item"
                :style="{ animationDelay: `${categoryIndex * 0.1 + skillIndex * 0.05}s` }"
              >
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-percentage">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div
                    class="skill-progress"
                    :style="{
                      width: isVisible ? `${skill.level}%` : '0%',
                      backgroundColor: skill.color,
                      animationDelay: `${categoryIndex * 0.2 + skillIndex * 0.1}s`,
                    }"
                  ></div>
                </div>
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-icon {
  font-size: 2rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  animation: fadeInLeft 0.6s ease forwards;
  opacity: 0;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 600;
  color: var(--text-primary);
}

.skill-percentage {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.skill-bar {
  height: 8px;
  background-color: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  border-radius: 4px;
  transition: width 1.5s ease;
  position: relative;
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
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
}

.learning-content p {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.learning-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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
