import { customGetFetch, customPostFetch } from '@/api/fetch'

export async function getArticle(_id: string) {
  try {
    const res = await customGetFetch('/article/get-by-id', { _id }) as Response
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
export async function deleteArticle(_id: string) {
  try {
    await customPostFetch(`/article/delete`, { _id })
  } catch (err) {
    console.log(err)
  }
}
export async function likeArticle(_id: string, email: string) {
  try {
    await customGetFetch(`/article/like`, {
      _id,
      email,
    })
  } catch (err) {
    console.log(err)
  }
}
