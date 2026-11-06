import { createError, defineEventHandler, send, sendRedirect, setResponseHeader } from 'h3'
import { getCVContent } from '../utils/cv'

export default defineEventHandler(async (event) => {
  const cv = await getCVContent()
  if (!cv) throw createError({ statusCode: 404, statusMessage: 'No CV has been uploaded yet.' })

  if ('redirectUrl' in cv) {
    return sendRedirect(event, cv.redirectUrl, 302)
  }

  setResponseHeader(event, 'Content-Type', 'application/pdf')
  setResponseHeader(event, 'Content-Disposition', 'inline; filename="Daniel_Zigabe_CV.pdf"')
  setResponseHeader(event, 'Cache-Control', 'public, max-age=300')
  return send(event, cv.data)
})
