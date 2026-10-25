import { getSkills, saveSkills, type Skill } from '../../utils/skills'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<Skill>>(event)
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const category = typeof body.category === 'string' ? body.category.trim() : ''
  const level = Number(body.level)

  if (!name || !category || !Number.isInteger(level) || level < 1 || level > 100) {
    throw createError({ statusCode: 400, statusMessage: 'Name, category, and a level from 1 to 100 are required.' })
  }

  const skill: Skill = {
    id: Date.now().toString(),
    name,
    category,
    level
  }
  const skills = await getSkills()
  skills.unshift(skill)
  await saveSkills(skills)

  return skill
})