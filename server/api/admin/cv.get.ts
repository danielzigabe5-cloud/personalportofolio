import { defineEventHandler } from 'h3'
import { getCVMetadata } from '../../utils/cv'

export default defineEventHandler(() => getCVMetadata())
