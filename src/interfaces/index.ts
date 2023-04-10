export interface IUserInfo {
	username: string
	image?: string
	friend?: Array<string>
	chattedWith?: Array<IUserInfo>
}

