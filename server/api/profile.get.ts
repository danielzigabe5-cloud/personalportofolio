import { defineEventHandler } from 'h3'
import { getProfile } from '../utils/profile'

export default defineEventHandler(() => getProfile())
