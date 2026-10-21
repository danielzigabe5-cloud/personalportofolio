export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const storage = useStorage('assets:server')
  
  // ነባር ፕሮጀክቶችን ማምጣት
  const existingProjects: any = await storage.getItem('projects.json') || []
  
  // አዲሱን ፕሮጀክት ማዘጋጀት
  const newProject = {
    id: Date.now(),
    title: body.title,
    description: body.description,
    imageUrl: body.imageUrl,
    demoUrl: body.demoUrl,
    githubUrl: body.githubUrl,
    createdAt: new Date().toISOString()
  }
  
  // አዲሱን ፕሮጀክት ከላይ እንዲሆን ማድረግ
  existingProjects.unshift(newProject)
  
  // መልሶ በ storage (ፋይል) ውስጥ ማስቀመጥ
  await storage.setItem('projects.json', existingProjects)

  return { success: true, data: newProject }
})