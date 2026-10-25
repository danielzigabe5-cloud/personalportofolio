import { createError, defineEventHandler, getRouterParam } from 'h3'
import { getProjects, saveProjects } from '../../utils/projects'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const projects = await getProjects()
  const remainingProjects = projects.filter(project => project.id !== id)

  if (remainingProjects.length === projects.length) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found.' })
  }

  await saveProjects(remainingProjects)
  return { success: true }
})