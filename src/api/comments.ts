import customFetch from '@/api/fetch'

export async function getComments(_id: string) {
  try {
    const res = await customFetch('/comment/get-by-id', {
      _id,
    }) as Response
    const data = await res.json()
    return data?.comments
  } catch (err) {
    console.log(err)
  }
}

export async function postComment(_id: string, comment: string) {
  await customFetch(`/comment/add`, {
    _id,
    token: localStorage.getItem('token'),
    description: comment,
  }).catch((err: Error) => console.log(err))
}
