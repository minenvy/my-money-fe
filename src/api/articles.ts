import customFetch from '@/api/fetch'

export async function getArticles() {
	try {
		const res = await customFetch('/article/get') as Response
		const data = await res.json()
		return data
	} catch (err) {
		console.log(err)
	}
}

export async function follow(followingEmail: string, followedEmail: string) {
	try {
		const res = await customFetch('/user/follow', {
			followingEmail,
			followedEmail,
		}) as Response
		const data = await res.json()
		return data?.message
	} catch (err) {
		console.log(err)
	}
}
