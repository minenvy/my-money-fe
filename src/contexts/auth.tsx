import { createContext, useContext, useEffect, useState } from 'react'
import {
	getLoginState,
	removeLoginState,
	setLoginState,
} from '@/utilities/check-login'
import useFetch from '@/hooks/use-fetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFetch } from '@/api/fetch'
import { NOT_LOGGED_IN } from '@/constants/env'

interface IUserInfo {
	id: string
	nickname: string
	money: number
	image: string
	bio: string
	followings: Array<string>
	blockers: Array<string>
}

interface INewUserInfo {
	nickname?: string
	money?: number
	image?: string
	bio?: string
	followings?: Array<string>
	blockers?: Array<string>
}

interface IAuthContext {
	user: IUserInfo
	login: Function
	register: Function
	logout: Function
	changeInfo: Function
}

const AuthContext = createContext<IAuthContext | null>(null)

export function useAuth() {
	return useContext(AuthContext) as IAuthContext
}

interface IAuthProviderProps {
	children: React.ReactNode
}

const NotLoggedInUser = {
	id: NOT_LOGGED_IN,
	nickname: '',
	money: 0,
	image: '',
	bio: '',
	followings: [],
	blockers: [],
}

export default function AuthProvider({ children }: IAuthProviderProps) {
	const { data } = useFetch('auth', '/user/get-by-token')
	const [user, setUser] = useState<IUserInfo>(NotLoggedInUser)
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (data === undefined) return
		if (Object.keys(data).length === 0) {
			removeLoginState()
			navigate('/login')
			return
		}
		const isInNotLoggedInPage =
			location.pathname.includes('login') ||
			location.pathname.includes('register')
		if (isInNotLoggedInPage) {
			navigate('/')
		}
		setLoginState()
		changeUserInfo(data)
	}, [data])

	function changeUserInfo(newUser: INewUserInfo) {
		setUser({ ...(user as IUserInfo), ...newUser })
	}
	function login(newUser: INewUserInfo) {
		setLoginState()
		changeUserInfo(newUser)
	}
	function register(newUser: INewUserInfo) {
		setLoginState()
		changeUserInfo(newUser)
	}
	async function logout() {
		const res = (await getFetch('/user/logout')) as Response
		if (!res || !res.ok) return
		removeLoginState()
		changeUserInfo(NotLoggedInUser)
		navigate('/login')
	}

	return (
		<AuthContext.Provider
			value={{ user, login, register, logout, changeInfo: changeUserInfo }}
		>
			{children}
		</AuthContext.Provider>
	)
}
