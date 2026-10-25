import { createError, defineEventHandler, getRouterParam, readBody } from 'h3'
import { getExperiences, saveExperiences, type Experience } from '../../utils/experience'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody<Partial<Experience>>(event)
  const company = typeof body.company === 'string' ? body.company.trim() : ''
  const position = typeof body.position === 'string' ? body.position.trim() : ''

  if (!company || !position) {
    throw createError({ statusCode: 400, statusMessage: 'Company and position are required.' })
  }

  const experiences = await getExperiences()
  const index = experiences.findIndex(experience => experience.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Experience not found.' })
  }

  const updatedExperience: Experience = {
    id: experiences[index]!.id,
    company,
    position,
    period: typeof body.period === 'string' && body.period.trim() ? body.period.trim() : 'Present',
    description: typeof body.description === 'string' ? body.description.trim() : ''
  }
  experiences[index] = updatedExperience
  await saveExperiences(experiences)

  return updatedExperience
})