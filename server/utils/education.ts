export interface Education {
  id: number
  institution: string
  degree: string
  field: string
  period: string
  isCurrent: boolean
}

export const defaultEducation: Education[] = [
  {
    id: 1,
    institution: 'Mekdela Amba University',
    degree: 'Bachelor Degree',
    field: 'Computer Science',
    period: '2023 - Present',
    isCurrent: true
  }
]

export async function getEducation(): Promise<Education[]> {
  const storage = useStorage('assets:server')
  const education = await storage.getItem<Education[]>('education.json')
  return education ?? defaultEducation.map(item => ({ ...item }))
}

export async function saveEducation(education: Education[]) {
  const storage = useStorage('assets:server')
  await storage.setItem('education.json', education)
}