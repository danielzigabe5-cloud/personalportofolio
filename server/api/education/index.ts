// server/api/education/index.ts
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const storage = useStorage('assets:server')
  const STORAGE_KEY = 'education.json'

  // GET: ሁሉንም ትምህርቶች ማምጣት
  if (method === 'GET') {
    return await storage.getItem(STORAGE_KEY) || []
  }

  // POST: አዲስ ትምህርት መጨመር
  if (method === 'POST') {
    const body = await readBody(event)
    const items: any = await storage.getItem(STORAGE_KEY) || []
    
    const newItem = {
      id: Date.now(),
      degree: body.degree,
      institution: body.institution,
      year: body.year,
      description: body.description
    }

    items.unshift(newItem)
    await storage.setItem(STORAGE_KEY, items)
    return { success: true, data: newItem }
  }
})