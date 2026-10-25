import { createError, defineEventHandler, getRouterParam, readBody } from 'h3'
import { getEducation, saveEducation, type Education } from '../../utils/education'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody<Partial<Education>>(event)
  const institution = typeof body.institution === 'string' ? body.institution.trim() : ''
  const degree = typeof body.degree === 'string' ? body.degree.trim() : ''

  if (!Number.isFinite(id) || !institution || !degree) {
    throw createError({ statusCode: 400, statusMessage: 'A valid record, institution, and degree are required.' })
  }

  const education = await getEducation()
  const index = education.findIndex(item => item.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Education record not found.' })
  }

  const updatedItem: Education = {
    id: education[index]!.id,
    institution,
    degree,
    field: typeof body.field === 'string' ? body.field.trim() : '',
    period: typeof body.period === 'string' && body.period.trim() ? body.period.trim() : 'Present',
    isCurrent: Boolean(body.isCurrent)
  }
  education[index] = updatedItem
  await saveEducation(education)

  return updatedItem
})