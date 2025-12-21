<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const isVisible = ref(false)
const observer = ref<IntersectionObserver | null>(null)
const sectionRef = ref<HTMLElement | null>(null)

// Función para manejar la visibilidad de elementos individuales
const handleElementVisibility = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Marcar la sección principal como visible
      if (entry.target === sectionRef.value) {
        isVisible.value = true
      }
    }
  })
}

onMounted(async () => {
  await nextTick()

  // Configuración mejorada del IntersectionObserver
  const options = {
    root: null,
    rootMargin: '-10% 0px -10% 0px', // Activar cuando el elemento esté más centrado
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], // Múltiples thresholds para mejor detección
  }

  observer.value = new IntersectionObserver(handleElementVisibility, options)

  // Observar la sección principal
  if (sectionRef.value) {
    observer.value.observe(sectionRef.value)
  }

  // Fallback: activar después de un tiempo si no se detecta
  setTimeout(() => {
    if (!isVisible.value) {
      isVisible.value = true
    }
  }, 1000)
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})

const stats = [
  { number: '2+', label: 'Años de Formación' },
  { number: '10+', label: 'Proyectos Completados' },
  { number: '5+', label: 'Tecnologías Dominadas' },
  { number: '100%', label: 'Dedicación' },
]

const timeline = [
  {
    year: '2024 - 2025',
    title: 'Técnico Superior en Programación',
    institution: 'TECLAB',
    location: 'Online',
    description:
      'Formación integral en desarrollo de software, bases de datos, y metodologías ágiles.',
    certificate: '/Portfolio-Personal/certificates/titulo_tecnico_programacion.pdf', // Agregar link del certificado o ruta del PDF cuando esté disponible
  },
  {
    year: '2025',
    title: 'Actualización Profesional en Inteligencia Artificial',
    institution: 'TECLAB',
    location: 'Online',
    description:
      'Formación en fundamentos de Inteligencia Artificial, aprendizaje automático y aplicaciones prácticas en diferentes IA.',
    certificate: '/Portfolio-Personal/certificates/ia.pdf', // Ejemplo de link externo
  },
  {
    year: '2025',
    title: 'Programa de Entrenamiento Laboral (PEL)',
    institution: 'TECLAB',
    location: 'Presencial (Salta Capital, Argentina)',
    description:
      'Tuve la oportunidad de participar en este programa que me permitió ganar experiencia práctica en el mundo laboral. Allí pude fortalecer mis habilidades, aprender nuevas formas de trabajo y prepararme mejor para futuros desafíos profesionales.',
    certificate: '/Portfolio-Personal/certificates/pel.pdf', // Ejemplo de link externo
  },
  {
    year: '2025',
    title: 'Semana de Excel en la Práctica',
    institution: 'Daxus Latam',
    location: 'Online',
    description:
      'Certificado de participación en taller práctico de Excel (8 horas académicas) con enfoque en fórmulas, tablas dinámicas y herramientas de análisis para optimización de procesos.',
    certificate: '/Portfolio-Personal/certificates/semana_de_excel.pdf', // Ejemplo de link externo
  },
  {
    year: '2024',
    title: 'Fundamentos de Ethical Hacking',
    institution: 'Seguridad CERO',
    location: 'Online',
    description:
      'Formación introductoria en Ethical Hacking (4 horas académicas) con enfoque en principios de ciberseguridad, análisis de vulnerabilidades y buenas prácticas de seguridad informática.',
    certificate: '/Portfolio-Personal/certificates/seguridadcero.pdf', // Ejemplo de certificado
  },
  {
    year: '2020-2021',
    title: 'Asistente en Higiene y Seguridad',
    institution: 'Instituto NOVAEDU',
    location: 'Online',
    description: 'Asistente en Higiene y Seguridad Laboral',
    certificate: '/Portfolio-Personal/certificates/higieneyseguridad-certificado.pdf', // Ejemplo de certificado
  },
  {
    year: '2020-2021',
    title: 'Gestor de Transporte',
    institution: 'C-TRANS',
    location: 'Presencial (Salta Capital, Argentina)',
    description: 'Gestor de transporte: Transporte de carga general, internacional y peligrosa',
    certificate: '/Portfolio-Personal/certificates/ctrans_certificado.pdf', // Ejemplo de link externo
  },
]
</script>

<template>
  <section id="about" ref="sectionRef" class="section about">
    <div class="container">
      <div class="about-content" :class="{ visible: isVisible }">
        <div class="about-header">
          <h2 class="section-title">Sobre Mí</h2>
          <p class="section-subtitle">
            Conoce más sobre mi trayectoria y pasión por la programación
          </p>
        </div>

        <div class="about-grid">
          <div class="about-text">
            <div class="text-content">
              <h3>¡Hola! Soy Mariano López</h3>
              <p>
                Soy Técnico Superior en Programación egresado de TECLAB, ubicado en la hermosa
                ciudad de Salta Capital. Mi viaje en el mundo de la programación comenzó con
                curiosidad y se ha convertido en una verdadera pasión.
              </p>
              <p>
                Me especializo en el desarrollo full stack, combinando creatividad con funcionalidad
                para crear experiencias web excepcionales. Disfruto enfrentando nuevos desafíos y
                aprendiendo tecnologías emergentes que me permitan crear soluciones innovadoras.
              </p>
              <p>
                En mi tiempo libre me gusta jugar al pádel con amigos, ir al gimnasio y practicar
                con proyectos personales para seguir aprendiendo y mejorando mis habilidades. Creo
                firmemente en el aprendizaje continuo y en compartir conocimiento con la comunidad.
              </p>

              <div class="qualities">
                <div class="quality-item">
                  <div class="quality-icon">🎯</div>
                  <div>
                    <h4>Orientado a Objetivos</h4>
                    <p>Enfocado en entregar resultados de calidad</p>
                  </div>
                </div>
                <div class="quality-item">
                  <div class="quality-icon">🚀</div>
                  <div>
                    <h4>Innovador</h4>
                    <p>Siempre buscando nuevas formas de resolver problemas</p>
                  </div>
                </div>
                <div class="quality-item">
                  <div class="quality-icon">🤝</div>
                  <div>
                    <h4>Colaborativo</h4>
                    <p>Trabajo efectivamente en equipos multidisciplinarios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="about-visual">
            <div class="stats-grid">
              <div
                v-for="(stat, index) in stats"
                :key="index"
                class="stat-item"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <div class="stat-number">{{ stat.number }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>

            <div class="location-card">
              <div class="location-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div class="location-info">
                <h4>Ubicación</h4>
                <p>Salta Capital, Argentina</p>
              </div>
            </div>

            <!-- Botón de descarga del CV debajo de la ubicación -->
            <div class="cv-download-location">
              <a
                href="/Portfolio-Personal/cv/CV - EMPRESARIAL.pdf"
                target="_blank"
                class="btn btn-cv-location"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Descargar CV
              </a>
            </div>
          </div>
        </div>

        <div class="timeline-section">
          <h3 class="timeline-title">Mi Trayectoria Educativa</h3>
          <div class="timeline">
            <div
              v-for="(item, index) in timeline"
              :key="index"
              class="timeline-item"
              :style="{ animationDelay: `${index * 0.2}s` }"
            >
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <div class="timeline-year">{{ item.year }}</div>
                <h4 class="timeline-title-item">{{ item.title }}</h4>
                <div class="timeline-institution">
                  <span class="institution">{{ item.institution }}</span>
                  <span class="location">{{ item.location }}</span>
                </div>
                <p class="timeline-description">{{ item.description }}</p>
                <a
                  v-if="item.certificate"
                  :href="item.certificate"
                  :target="item.certificate.startsWith('http') ? '_blank' : '_self'"
                  :rel="item.certificate.startsWith('http') ? 'noopener noreferrer' : ''"
                  class="certificate-btn"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                  </svg>
                  {{ item.certificate.endsWith('.pdf') ? 'Ver Certificado' : 'Ver Certificado' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background-color: var(--bg-secondary);
  position: relative;
}

/* Animaciones de entrada mejoradas */
.about-content {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: opacity, transform;
}

.about-content.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Animaciones escalonadas para elementos */
.stagger-1 {
  transition-delay: 0.1s;
}
.stagger-2 {
  transition-delay: 0.2s;
}
.stagger-3 {
  transition-delay: 0.3s;
}
.stagger-4 {
  transition-delay: 0.4s;
}

/* Scroll suave global */
html {
  scroll-behavior: smooth;
}

/* Mejoras de rendimiento */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Animación para elementos que aparecen desde diferentes direcciones */
.fade-in-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-left.visible {
  opacity: 1;
  transform: translateX(0);
}

.fade-in-right {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-right.visible {
  opacity: 1;
  transform: translateX(0);
}

.about-header {
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

.about-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  align-items: start;
}

.text-content h3 {
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.text-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.qualities {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.quality-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--bg-primary);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.quality-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.quality-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.quality-item h4 {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.quality-item p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
}

.about-visual {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-item {
  background-color: var(--bg-primary);
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  opacity: 0;
}

.about-content.visible .stat-item {
  animation: fadeInUp 0.6s ease forwards;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.location-card {
  background-color: var(--bg-primary);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.location-icon {
  color: var(--primary-color);
  flex-shrink: 0;
}

.location-info h4 {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.location-info p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
}

.timeline-section {
  margin-top: 3rem;
}

.timeline-title {
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--primary-color), var(--accent-color));
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  opacity: 0;
}

.about-content.visible .timeline-item {
  animation: fadeInLeft 0.6s ease forwards;
}

.timeline-marker {
  position: absolute;
  left: -1.75rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  background-color: var(--primary-color);
  border-radius: 50%;
  border: 3px solid var(--bg-primary);
  box-shadow: 0 0 0 3px var(--primary-color);
}

.timeline-content {
  background-color: var(--bg-primary);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  margin-left: 1rem;
}

.timeline-year {
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.timeline-title-item {
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.timeline-institution {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.institution {
  font-weight: 600;
  color: var(--text-primary);
}

.location {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.timeline-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  margin-bottom: 1rem;
}

.certificate-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: none;
  cursor: pointer;
}

.certificate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
}

.certificate-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.certificate-btn svg {
  flex-shrink: 0;
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

/* Estilos para el botón de CV debajo de la ubicación */
.cv-download-location {
  margin-top: 1.5rem;
}

.btn-cv-location {
  background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
  color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  box-shadow: 0 3px 10px rgba(59, 130, 246, 0.2);
  width: 100%;
  justify-content: center;
}

.btn-cv-location:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .quality-item {
    padding: 1rem;
  }

  .timeline {
    padding-left: 1.5rem;
  }

  .timeline::before {
    left: 0.75rem;
  }

  .timeline-marker {
    left: -1.5rem;
  }

  .timeline-content {
    margin-left: 0.5rem;
  }

  .certificate-btn {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .btn-cv-location {
    padding: 1.25rem;
    font-size: 1rem;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .text-content h3 {
    font-size: 1.5rem;
  }

  .timeline-title {
    font-size: 1.5rem;
  }

  .quality-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}
</style>
