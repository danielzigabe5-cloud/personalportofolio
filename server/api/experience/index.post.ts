import { createError, defineEventHandler, readBody } from 'h3'
import { getExperiences, saveExperiences, type Experience } from '../../utils/experience'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<Experience>>(event)
  const company = typeof body.company === 'string' ? body.company.trim() : ''
  const position = typeof body.position === 'string' ? body.position.trim() : ''

  if (!company || !position) {
    throw createError({ statusCode: 400, statusMessage: 'Company and position are required.' })
  }

  const experience: Experience = {
    id: Date.now().toString(),
    company,
    position,
    period: typeof body.period === 'string' && body.period.trim() ? body.period.trim() : 'Present',
    description: typeof body.description === 'string' ? body.description.trim() : ''
  }
  const experiences = await getExperiences()
  experiences.unshift(experience)
  await saveExperiences(experiences)

  return experience
})