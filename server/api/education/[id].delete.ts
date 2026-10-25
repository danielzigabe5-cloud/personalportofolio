import { createError, defineEventHandler, getRouterParam } from 'h3'
import { getEducation, saveEducation } from '../../utils/education'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const education = await getEducation()
  const remainingEducation = education.filter(item => item.id !== id)

  if (!Number.isFinite(id) || remainingEducation.length === education.length) {
    throw createError({ statusCode: 404, statusMessage: 'Education record not found.' })
  }

  await saveEducation(remainingEducation)
  return { success: true }
})