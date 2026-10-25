import { defineEventHandler } from 'h3'
import { getProjects } from '../../utils/projects'

export default defineEventHandler(() => getProjects())