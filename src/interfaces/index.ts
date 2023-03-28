export interface IUserInfo {
	username: string | ''
	email: string | ''
	bio?: string
	image?: string
	background?: string
	following?: Array<string>
	chattedWith?: Array<IUserInfo> | []
}

