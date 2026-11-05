import { defaultServices, type Service } from '~~/shared/utils/services'
import { readJsonData, writeJsonData } from './json-storage'

export async function getServices(): Promise<Service[]> {
  return readJsonData('services.json', defaultServices.map(service => ({ ...service })))
}

export async function saveServices(services: Service[]) {
  await writeJsonData('services.json', services)
}
