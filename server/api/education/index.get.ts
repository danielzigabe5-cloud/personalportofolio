import { defineEventHandler } from 'h3'
import { getEducation } from '../../utils/education'

export default defineEventHandler(() => getEducation())