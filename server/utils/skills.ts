export interface Skill {
  id: string
  name: string
  level: number
  category: string
}

export const defaultSkills: Skill[] = [
  { id: '1', name: 'HTML', level: 95, category: 'Frontend' },
  { id: '2', name: 'CSS / Tailwind CSS', level: 90, category: 'Frontend' },
  { id: '3', name: 'JavaScript', level: 85, category: 'Frontend' },
  { id: '4', name: 'TypeScript', level: 80, category: 'Frontend' },
  { id: '5', name: 'Vue.js', level: 88, category: 'Frontend' },
  { id: '6', name: 'Nuxt.js', level: 85, category: 'Frontend' },
  { id: '7', name: 'Laravel', level: 78, category: 'Backend' },
  { id: '8', name: 'Flutter', level: 75, category: 'Mobile' }
]

export async function getSkills(): Promise<Skill[]> {
  const storage = useStorage('assets:server')
  return await storage.getItem<Skill[]>('skills.json') ?? defaultSkills
}

export async function saveSkills(skills: Skill[]) {
  const storage = useStorage('assets:server')
  await storage.setItem('skills.json', skills)
}