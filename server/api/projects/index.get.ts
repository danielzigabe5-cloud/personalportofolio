export default defineEventHandler(async (event) => {
  // በ Nitro storage ውስጥ የተቀመጡትን ፕሮጀክቶች ማንበብ
  const storage = useStorage('assets:server')
  const projects = await storage.getItem('projects.json') || []
  return projects
})