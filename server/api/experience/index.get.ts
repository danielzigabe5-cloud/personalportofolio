import { defineEventHandler } from 'h3'
import { getExperiences } from '../../utils/experience'

export default defineEventHandler(() => getExperiences())