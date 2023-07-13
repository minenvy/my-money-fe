export interface UserInfo {
  id: string
  nickname: string
  image?: string
  bio?: string
}

export interface NewUserInfo {
  nickname?: string
  image?: string
  bio?: string
}

export interface AuthContext {
  user: UserInfo
  login: Function
  register: Function
  logout: Function
  changeInfo: Function
}
