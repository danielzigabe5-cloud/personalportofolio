import { defineEventHandler } from 'h3'
import { getSiteSettings } from '../utils/site-settings'

export default defineEventHandler(() => getSiteSettings())