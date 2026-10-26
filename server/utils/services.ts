import { defaultServices, type Service } from '~~/shared/utils/services'

const servicesStorageKey = 'services.json'

export async function getServices(): Promise<Service[]> {
  const storage = useStorage('assets:server')
  const services = await storage.getItem<Service[]>(servicesStorageKey)
  return services ?? defaultServices.map(service => ({ ...service }))
}

export async function saveServices(services: Service[]) {
  const storage = useStorage('assets:server')
  await storage.setItem(servicesStorageKey, services)
}
