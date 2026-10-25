import { createError, defineEventHandler, getRouterParam, readBody } from 'h3'
import { getProjects, saveProjects, type Project } from '../../utils/projects'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody<Partial<Project>>(event)
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const description = typeof body.description === 'string' ? body.description.trim() : ''

  if (!title || !description) {
    throw createError({ statusCode: 400, statusMessage: 'Project title and description are required.' })
  }

  const projects = await getProjects()
  const index = projects.findIndex(project => project.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found.' })
  }

  const updatedProject: Project = {
    id: projects[index]!.id,
    title,
    description,
    category: typeof body.category === 'string' && body.category.trim() ? body.category.trim() : 'General',
    tech: typeof body.tech === 'string' && body.tech.trim() ? body.tech.trim() : 'Vue / Nuxt',
    url: typeof body.url === 'string' ? body.url.trim() : '',
    githubUrl: typeof body.githubUrl === 'string' ? body.githubUrl.trim() : '',
    status: body.status === 'Completed' || body.status === 'Planning' ? body.status : 'In Progress'
  }
  projects[index] = updatedProject
  await saveProjects(projects)

  return updatedProject
})