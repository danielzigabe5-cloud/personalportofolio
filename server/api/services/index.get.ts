import { defineEventHandler } from 'h3'
import { getServices } from '../../utils/services'

export default defineEventHandler(() => getServices())
