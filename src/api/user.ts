import { getFetch, postFetch } from '@/api/fetch'
import routes from '@/api/route'
import { NewUserInfo, UserInfo } from '@/interfaces/auth'
import { Friend } from '@/interfaces/friend'
import { CheckBlock, CheckFollow, ProfileHeader } from '@/interfaces/profile'

export async function getByToken(): Promise<UserInfo> {
  return await getFetch(`${routes.getUserByToken}`)
}

export async function logoutInServer() {
  await getFetch(routes.logout)
}

export async function loginToServer(
  username: string,
  password: string
): Promise<UserInfo> {
  return await postFetch(routes.login, { username, password })
}

export async function registerToServer(user: {
  username: string
  password: string
  repassword: string
}): Promise<UserInfo> {
  return await postFetch(routes.register, { ...user })
}

export async function getFollow(
  type: string,
  userId: string
): Promise<Array<Friend>> {
  return await getFetch(`/user/get-${type}/${userId}`)
}

export async function checkBlock(blockedId: string, blockingId: string): Promise<CheckBlock> {
  return await getFetch(`${routes.checkBlock}/${blockedId}/${blockingId}`)
}

export async function checkFollow(followedId: string): Promise<CheckFollow> {
  return await getFetch(`${routes.checkFollow}/${followedId}`)
}

export async function getById(userId: string): Promise<ProfileHeader> {
  return await getFetch(`${routes.getUserById}/${userId}`)
}

export async function changePasswordInServer(password: {
  now: string
  new: string
  confirm: string
}) {
  await postFetch('/user/change-password', {
    ...password,
  })
}

export async function followFriend(userId: string, isFollowed: boolean) {
  await postFetch(routes.followUser, { id: userId, isFollowed })
}

export async function changeProfileInServer(user: NewUserInfo) {
  await postFetch(routes.changeProfileUser, { ...user })
}

export async function getProposers(
  userId: string,
  offset: number,
  search?: string
) {
  return await getFetch(
    `${routes.getProposers}/${userId}/${offset}` + (search ? `/${search}` : '')
  )
}
