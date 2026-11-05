import { readJsonData, writeJsonData } from './json-storage'

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
  return readJsonData('education.json', defaultEducation.map(item => ({ ...item })))
}

export async function saveEducation(education: Education[]) {
  await writeJsonData('education.json', education)
}