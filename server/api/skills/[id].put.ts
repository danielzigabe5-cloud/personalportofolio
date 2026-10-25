import { getSkills, saveSkills, type Skill } from '../../utils/skills'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody<Partial<Skill>>(event)
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const category = typeof body.category === 'string' ? body.category.trim() : ''
  const level = Number(body.level)

  if (!name || !category || !Number.isInteger(level) || level < 1 || level > 100) {
    throw createError({ statusCode: 400, statusMessage: 'Name, category, and a level from 1 to 100 are required.' })
  }

  const skills = await getSkills()
  const index = skills.findIndex(skill => skill.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Skill not found.' })
  }

  const updatedSkill: Skill = { id: skills[index]!.id, name, category, level }
  skills[index] = updatedSkill
  await saveSkills(skills)

  return updatedSkill
})