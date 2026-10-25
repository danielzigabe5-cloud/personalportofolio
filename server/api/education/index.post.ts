import { createError, defineEventHandler, readBody } from 'h3'
import { getEducation, saveEducation, type Education } from '../../utils/education'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<Education>>(event)
  const institution = typeof body.institution === 'string' ? body.institution.trim() : ''
  const degree = typeof body.degree === 'string' ? body.degree.trim() : ''

  if (!institution || !degree) {
    throw createError({ statusCode: 400, statusMessage: 'Institution and degree are required.' })
  }

  const item: Education = {
    id: Date.now(),
    institution,
    degree,
    field: typeof body.field === 'string' ? body.field.trim() : '',
    period: typeof body.period === 'string' && body.period.trim() ? body.period.trim() : 'Present',
    isCurrent: Boolean(body.isCurrent)
  }
  const education = await getEducation()
  education.unshift(item)
  await saveEducation(education)

  return item
})