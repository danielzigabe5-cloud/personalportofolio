// server/api/skills/index.ts
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const storage = useStorage('assets:server')
  const STORAGE_KEY = 'skills.json'

  if (method === 'GET') {
    return await storage.getItem(STORAGE_KEY) || []
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const items: any = await storage.getItem(STORAGE_KEY) || []
    
    const newItem = {
      id: Date.now(),
      name: body.name,
      category: body.category,
      proficiency: body.proficiency
    }

    items.unshift(newItem)
    await storage.setItem(STORAGE_KEY, items)
    return { success: true, data: newItem }
  }
})