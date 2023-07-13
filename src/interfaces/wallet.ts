export interface Wallet {
	name: string
	total: number
}

export interface Modal {
	id: string
	icon: string
	title: string
	subTitle: React.ReactNode
	moreDetail: string
	description?: string
	image?: string
}
