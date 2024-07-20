import { split } from 'ramda'

export const formatName = (name: string) => {
  const [first, second] = split(' ', name ?? '')
  return `${first} ${second?.length >= 3 ? second[0] + '.' : second ?? ''}`
}
