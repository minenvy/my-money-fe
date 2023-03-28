import { customGetFetch } from '@/api/fetch'

export async function getUser(email?: string) {
  const res = await customGetFetch('/user/get', {
    authorEmail: email,
  }).catch(err => {
    throw new Error(err)
  }) as Response
  const data = await res.json()
  return data
}
