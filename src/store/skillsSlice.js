import { createSlice } from '@reduxjs/toolkit'

export const SKILL_GROUPS = {
  frontend: {
    label: 'Frontend',
    icon: 'react',
    accent: '#7c86ff',
    palette: ['#7c86ff', '#2dd4bf', '#ec4899'],
    orbitTags: [
      { icon: 'react', label: 'React' },
      { icon: 'nextdotjs', label: 'Next.js' },
      { icon: 'typescript', label: 'TypeScript' },
      { icon: 'greensock', label: 'GSAP' },
      { icon: 'framer', label: 'Framer' },
      { icon: 'tailwindcss', label: 'Tailwind' },
      { icon: 'vite', label: 'Vite' },
      { icon: 'javascript', label: 'JavaScript' },
    ],
    skills: [
      { name: 'React', icon: 'react', level: 95, type: 'Framework' },
      { name: 'Next.js', icon: 'nextdotjs', level: 90, type: 'Meta Framework' },
      { name: 'TypeScript', icon: 'typescript', level: 88, type: 'Language' },
      { name: 'GSAP', icon: 'greensock', level: 92, type: 'Animation' },
      { name: 'Framer Motion', icon: 'framer', level: 94, type: 'Animation' },
      { name: 'Tailwind', icon: 'tailwindcss', level: 93, type: 'Styling' },
      { name: 'Redux Toolkit', icon: 'redux', level: 89, type: 'State Management' },
      { name: 'JavaScript', icon: 'javascript', level: 91, type: 'Language' },
      { name: 'Vite', icon: 'vite', level: 88, type: 'Build Tool' },
      { name: 'Webpack', icon: 'webpack', level: 83, type: 'Bundler' },
      { name: 'Figma', icon: 'figma', level: 86, type: 'UI Design' },
      { name: 'GraphQL Client', icon: 'graphql', level: 82, type: 'Data Layer' },
      { name: 'Vue.js', icon: 'vuedotjs', level: 82, type: 'Framework' },
      { name: 'Angular', icon: 'angular', level: 78, type: 'Framework' },
      { name: 'Svelte', icon: 'svelte', level: 80, type: 'Framework' },
      { name: 'HTML5', icon: 'html5', level: 94, type: 'Markup' },
      { name: 'Sass', icon: 'sass', level: 87, type: 'Preprocessor' },
      { name: 'Vercel Deploy', icon: 'vercel', level: 86, type: 'Deployment' },
    ],
  },
  backend: {
    label: 'Backend',
    icon: 'nodedotjs',
    accent: '#2dd4bf',
    palette: ['#2dd4bf', '#60a5fa', '#22c55e'],
    orbitTags: [
      { icon: 'nodedotjs', label: 'Node.js' },
      { icon: 'express', label: 'Express' },
      { icon: 'postgresql', label: 'PostgreSQL' },
      { icon: 'redis', label: 'Redis' },
      { icon: 'prisma', label: 'Prisma' },
      { icon: 'swagger', label: 'OpenAPI' },
      { icon: 'mongodb', label: 'MongoDB' },
      { icon: 'vercel', label: 'Deploy' },
    ],
    skills: [
      { name: 'Node.js', icon: 'nodedotjs', level: 89, type: 'Runtime' },
      { name: 'Express', icon: 'express', level: 87, type: 'Framework' },
      { name: 'NestJS', icon: 'nestjs', level: 84, type: 'Framework' },
      { name: 'PostgreSQL', icon: 'postgresql', level: 84, type: 'Database' },
      { name: 'MySQL', icon: 'mysql', level: 80, type: 'Database' },
      { name: 'MongoDB', icon: 'mongodb', level: 85, type: 'Database' },
      { name: 'Redis', icon: 'redis', level: 82, type: 'Caching' },
      { name: 'Prisma', icon: 'prisma', level: 83, type: 'ORM' },
      { name: 'REST APIs', icon: 'swagger', level: 90, type: 'Service Design' },
      { name: 'GraphQL APIs', icon: 'graphql', level: 81, type: 'Query Layer' },
      { name: 'FastAPI', icon: 'fastapi', level: 82, type: 'Service Framework' },
      { name: 'Firebase', icon: 'firebase', level: 80, type: 'BaaS' },
      { name: 'Supabase', icon: 'supabase', level: 81, type: 'BaaS' },
      { name: 'Postman', icon: 'postman', level: 88, type: 'API Testing' },
      { name: 'Docker', icon: 'docker', level: 84, type: 'Containers' },
      { name: 'Kubernetes', icon: 'kubernetes', level: 76, type: 'Orchestration' },
      { name: 'Nginx', icon: 'nginx', level: 79, type: 'Web Server' },
      { name: 'Serverless APIs', icon: 'vercel', level: 82, type: 'Cloud Runtime' },
    ],
  },
  ai: {
    label: 'AI',
    icon: 'openai',
    accent: '#a78bfa',
    palette: ['#a78bfa', '#22d3ee', '#f472b6'],
    orbitTags: [
      { icon: 'openai', label: 'OpenAI' },
      { icon: 'langchain', label: 'LangChain' },
      { icon: 'huggingface', label: 'Hugging Face' },
      { icon: 'python', label: 'Python' },
      { icon: 'pytorch', label: 'PyTorch' },
      { icon: 'tensorflow', label: 'TensorFlow' },
      { icon: 'scikitlearn', label: 'Scikit-learn' },
      { icon: 'mongodb', label: 'Vector Store' },
    ],
    skills: [
      { name: 'OpenAI APIs', icon: 'openai', level: 88, type: 'Model APIs' },
      { name: 'LangChain', icon: 'langchain', level: 84, type: 'Orchestration' },
      { name: 'Prompt Engineering', icon: 'python', level: 90, type: 'Reasoning' },
      { name: 'RAG Pipelines', icon: 'huggingface', level: 86, type: 'Retrieval' },
      { name: 'Vector Search', icon: 'mongodb', level: 82, type: 'Semantic Search' },
      { name: 'Model Evaluation', icon: 'scikitlearn', level: 87, type: 'Evaluation' },
      { name: 'NumPy', icon: 'numpy', level: 85, type: 'Numerics' },
      { name: 'Pandas', icon: 'pandas', level: 84, type: 'Data Analysis' },
      { name: 'Jupyter', icon: 'jupyter', level: 83, type: 'Experimentation' },
      { name: 'TensorFlow', icon: 'tensorflow', level: 80, type: 'Deep Learning' },
      { name: 'PyTorch', icon: 'pytorch', level: 82, type: 'Deep Learning' },
      { name: 'Keras', icon: 'keras', level: 79, type: 'Modeling' },
      { name: 'FastAPI Serving', icon: 'fastapi', level: 81, type: 'Inference APIs' },
      { name: 'Docker for AI', icon: 'docker', level: 83, type: 'Deployment' },
      { name: 'Kubernetes MLOps', icon: 'kubernetes', level: 77, type: 'MLOps' },
      { name: 'Supabase Vector DB', icon: 'supabase', level: 80, type: 'Vector Storage' },
      { name: 'Prompt QA', icon: 'postman', level: 84, type: 'Testing Workflow' },
      { name: 'HF Transformers', icon: 'huggingface', level: 83, type: 'Model Library' },
    ],
  },
}

const initialState = {
  activeGroup: 'frontend',
}

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setActiveSkillGroup: (state, action) => {
      if (SKILL_GROUPS[action.payload]) {
        state.activeGroup = action.payload
      }
    },
  },
})

export const { setActiveSkillGroup } = skillsSlice.actions
export default skillsSlice.reducer
