<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const observer = ref<IntersectionObserver | null>(null)
const sectionRef = ref<HTMLElement | null>(null)
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.3 },
  )

  if (sectionRef.value) {
    observer.value.observe(sectionRef.value)
  }
})

const contactInfo = [
  {
    icon: 'email',
    title: 'Email',
    value: 'marianolopgarcia@gmail.com',
    link: 'mailto:marianolopgarcia@gmail.com',
    description: 'Envíame un email y te responderé pronto',
  },
  {
    icon: 'phone',
    title: 'Teléfono',
    value: '+54 9 387 4140978',
    link: 'tel:+5493874140978',
    description: 'Disponible de Lun-Vie 9:00-18:00',
  },
  {
    icon: 'location',
    title: 'Ubicación',
    value: 'Salta Capital, Argentina',
    link: 'https://maps.google.com/?q=Salta+Capital+Argentina',
    description: 'Disponible para trabajo remoto y presencial',
  },
  {
    icon: 'linkedin',
    title: 'LinkedIn',
    value: 'https://www.linkedin.com/in/mariano-lopez-877818319/',
    link: 'https://www.linkedin.com/in/mariano-lopez-877818319/',
    description: 'Conectemos profesionalmente',
  },
]

const submitForm = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    return
  }

  isSubmitting.value = true

  try {
    // Simular envío de formulario
    await new Promise((resolve) => setTimeout(resolve, 2000))

    submitStatus.value = 'success'
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false

    // Reset status after 3 seconds
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 3000)
  }
}

const getIcon = (iconName: string) => {
  const icons = {
    email: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>`,
    phone: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>`,
    location: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>`,
    linkedin: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>`,
  }
  return icons[iconName as keyof typeof icons] || ''
}
</script>

<template>
  <section id="contact" ref="sectionRef" class="section contact">
    <div class="container">
      <div class="contact-content" :class="{ visible: isVisible }">
        <div class="contact-header">
          <h2 class="section-title">Contacto</h2>
          <p class="section-subtitle">
            ¿Tienes un proyecto en mente? ¡Hablemos y hagámoslo realidad!
          </p>
        </div>

        <div class="contact-grid">
          <div class="contact-info">
            <div class="info-header">
              <h3>Información de Contacto</h3>
              <p>
                Siempre estoy disponible para nuevas oportunidades y colaboraciones interesantes.
              </p>
            </div>

            <div class="contact-methods">
              <div
                v-for="(info, index) in contactInfo"
                :key="index"
                class="contact-method"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <div class="method-icon" v-html="getIcon(info.icon)"></div>
                <div class="method-content">
                  <h4 class="method-title">{{ info.title }}</h4>
                  <a
                    :href="info.link"
                    class="method-value"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ info.value }}
                  </a>
                  <p class="method-description">{{ info.description }}</p>
                </div>
              </div>
            </div>

            <div class="social-section">
              <h4>Sígueme en redes</h4>
              <div class="social-links">
                <a
                  href="https://github.com/Marlo-Byte"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link github"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/mariano-lopez-877818319/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link linkedin"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div class="contact-form-container">
            <form @submit.prevent="submitForm" class="contact-form">
              <h3>Envíame un mensaje</h3>

              <div class="form-group">
                <label for="name">Nombre completo</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="subject">Asunto</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  placeholder="Asunto del mensaje"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="message">Mensaje</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows="5"
                  class="form-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                class="submit-btn"
                :disabled="isSubmitting || !form.name || !form.email || !form.message"
                :class="{
                  submitting: isSubmitting,
                  success: submitStatus === 'success',
                  error: submitStatus === 'error',
                }"
              >
                <span v-if="isSubmitting" class="btn-content">
                  <svg
                    class="spinner"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Enviando...
                </span>
                <span v-else-if="submitStatus === 'success'" class="btn-content">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  ¡Enviado!
                </span>
                <span v-else-if="submitStatus === 'error'" class="btn-content">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  Error
                </span>
                <span v-else class="btn-content">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22,2 15,22 11,13 2,9 22,2" />
                  </svg>
                  Enviar Mensaje
                </span>
              </button>

              <div v-if="submitStatus === 'success'" class="success-message">
                ¡Gracias por tu mensaje! Te responderé pronto.
              </div>
              <div v-if="submitStatus === 'error'" class="error-message">
                Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background-color: var(--bg-primary);
  position: relative;
}

.contact-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.contact-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.contact-header {
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

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-header h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.info-header p {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1.1rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--bg-secondary);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  animation: fadeInLeft 0.6s ease forwards;
  opacity: 0;
}

.contact-method:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.method-icon {
  color: var(--primary-color);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.method-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.method-value {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
  transition: color 0.3s ease;
}

.method-value:hover {
  color: var(--secondary-color);
}

.method-description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

.social-section h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.social-link.github {
  color: var(--text-primary);
  background-color: var(--bg-secondary);
}

.social-link.github:hover {
  background-color: var(--text-primary);
  color: white;
}

.social-link.linkedin {
  color: #0077b5;
  background-color: var(--bg-secondary);
}

.social-link.linkedin:hover {
  background-color: #0077b5;
  color: white;
}

.social-link.twitter {
  color: #1da1f2;
  background-color: var(--bg-secondary);
}

.social-link.twitter:hover {
  background-color: #1da1f2;
  color: white;
}

.contact-form-container {
  background-color: var(--bg-secondary);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}

.contact-form h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  resize: vertical;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  min-height: 120px;
  font-family: inherit;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.submit-btn.submitting {
  background-color: var(--text-secondary);
}

.submit-btn.success {
  background-color: #10b981;
}

.submit-btn.error {
  background-color: #ef4444;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.success-message,
.error-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 500;
}

.success-message {
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.error-message {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
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
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-form-container {
    padding: 1.5rem;
  }

  .social-links {
    flex-direction: column;
  }

  .social-link {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .contact-method {
    padding: 1rem;
  }

  .contact-form-container {
    padding: 1rem;
  }

  .info-header h3 {
    font-size: 1.5rem;
  }
}
</style>
