import { getSkills, saveSkills } from '../../utils/skills'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const skills = await getSkills()
  const remainingSkills = skills.filter(skill => skill.id !== id)

  if (remainingSkills.length === skills.length) {
    throw createError({ statusCode: 404, statusMessage: 'Skill not found.' })
  }

  await saveSkills(remainingSkills)
  return { success: true }
})