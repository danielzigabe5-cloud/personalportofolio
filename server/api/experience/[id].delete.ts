import { createError, defineEventHandler, getRouterParam } from 'h3'
import { getExperiences, saveExperiences } from '../../utils/experience'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const experiences = await getExperiences()
  const remainingExperiences = experiences.filter(experience => experience.id !== id)

  if (remainingExperiences.length === experiences.length) {
    throw createError({ statusCode: 404, statusMessage: 'Experience not found.' })
  }

  await saveExperiences(remainingExperiences)
  return { success: true }
})