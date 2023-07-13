export interface CheckBlock {
  isBlocked: boolean
}

export interface CheckFollow {
  isFollowed: boolean
}

export interface ProfileHeader {
  username: string
  nickname: string
  bio: string
  image: string
  transactions: number
  followers: number
  followings: number
}

export interface PersonInterface {
	id: string
	nickname: string
	image: string
	bio: string
	isFollowed: boolean
}
