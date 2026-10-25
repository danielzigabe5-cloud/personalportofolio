export interface Experience {
  id: string
  company: string
  position: string
  period: string
  description: string
}

export const defaultExperiences: Experience[] = [
  {
    id: '1',
    company: 'Ewenet Communication PLC (Internship)',
    position: 'Full-Stack Developer',
    period: '2023 - Present',
    description: 'Developed web and mobile applications.\nWorked with Nuxt.js, Laravel and Flutter.\nCollaborated with international clients.'
  },
  {
    id: '2',
    company: 'Tech Solution Ethiopia',
    position: 'Junior Web Developer',
    period: '2022 - 2023',
    description: 'Developed web applications.\nMaintained existing systems.\nWorked with Laravel and Vue.js.'
  },
  {
    id: '3',
    company: 'Addis Ababa University',
    position: 'Intern Developer',
    period: '2021 - 2022',
    description: 'Assisted in software development.\nLearned team collaboration.\nWorked on small projects.'
  }
]

export async function getExperiences(): Promise<Experience[]> {
  const storage = useStorage('assets:server')
  const experiences = await storage.getItem<Experience[]>('experiences.json')
  return experiences ?? defaultExperiences.map(experience => ({ ...experience }))
}

export async function saveExperiences(experiences: Experience[]) {
  const storage = useStorage('assets:server')
  await storage.setItem('experiences.json', experiences)
}