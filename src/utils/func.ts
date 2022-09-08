import crypto from 'crypto'
import { promisify } from 'util'
import dayjs from 'dayjs'

const asyncRandomBytes = promisify(crypto.randomBytes)

export const generateRandomToken = async () => {
  const token = await asyncRandomBytes(32)
  return token.toString('hex')
}

export const buildFilters = (json: any) => {
  const query: any = {}
  if (json) {
    Object.entries(json).forEach(([k, v]: [string, any]) => {
      switch (k) {
        case 'title':
          query[k] = { $regex: v, $options: 'i' }
          break
        case 'description':
          query[k] = { $regex: v, $options: 'i' }
          break
        case 'createdBy':
          query[k] = v
          break
        case 'active':
        case 'published':
          if (v !== 'all') {
            query[k] = v
          }
          break
        case 'categories':
          query[k] = { $all: v }
          break
        case 'ticketLink':
          if (v !== 'all') {
            query[k] = { $exists: v }
          }
          break
        case 'start':
        case 'end':
          query[k] = { ...query[k], $gte: dayjs(v.lower).startOf('D').toDate() }
          if (Object.keys(v).includes('upper')) {
            query[k] = { ...query[k], $lte: dayjs(v.upper).endOf('D').toDate() }
          } else {
            query[k] = { ...query[k], $lte: dayjs(v.lower).endOf('D').toDate() }
          }
          break
      }
    })
  }
  return query
}

export const generateFilename = (name: string, extension: string) => {
  const suffix = crypto.randomBytes(8).toString('hex')
  return `${name}-${suffix}.${extension}`
}
