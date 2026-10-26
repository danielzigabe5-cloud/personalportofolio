export interface Project {
  id: string
  title: string
  category: string
  description: string
  tech: string
  url: string
  githubUrl: string
  status: 'Completed' | 'In Progress' | 'Planning'
}

export const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'CombolojoSPORT',
    category: 'Web & Mobile Platform',
    description: 'A sports venue booking and event platform that helps users discover sports facilities and connect with venue services across Ethiopia.',
    tech: 'Nuxt.js + Laravel + Flutter + MySQL',
    url: 'https://combolojo.etsgood.com',
    githubUrl: 'https://github.com/danielzigabe',
    status: 'Completed'
  },
  {
    id: '2',
    title: 'Internship Attendance System',
    category: 'Management System',
    description: 'A digital internship management system connecting students, academic advisors, and company supervisors with attendance tracking and reporting.',
    tech: 'Nuxt.js + Laravel + Tailwind CSS + MySQL',
    url: '',
    githubUrl: 'https://github.com/danielzigabe',
    status: 'In Progress'
  },
  {
    id: '3',
    title: 'Smart Electronics E-Commerce',
    category: 'Web & Mobile Platform',
    description: 'A specialized online electronics platform featuring digital warranty verification, device compatibility checking, and verified merchant stores.',
    tech: 'Nuxt.js + Laravel + Tailwind CSS + MySQL',
    url: '',
    githubUrl: 'https://github.com/danielzigabe',
    status: 'In Progress'
  },
  {
    id: '4',
    title: 'AgriGrain Market Linkage',
    category: 'Mobile App',
    description: 'A mobile marketplace connecting smallholder grain farmers with local traders and cooperatives with regional market price updates.',
    tech: 'Flutter + Dart + Laravel API + MySQL',
    url: '',
    githubUrl: 'https://github.com/danielzigabe',
    status: 'In Progress'
  }
]

export async function getProjects(): Promise<Project[]> {
  const storage = useStorage('assets:server')
  const projects = await storage.getItem<Project[]>('projects.json')
  return projects ?? defaultProjects.map(project => ({ ...project }))
}

export async function saveProjects(projects: Project[]) {
  const storage = useStorage('assets:server')
  await storage.setItem('projects.json', projects)
}