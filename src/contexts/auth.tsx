import { createContext, useContext, useEffect, useState } from 'react'
import {
	getLoginState,
	removeLoginState,
	setLoginState,
} from '@/utilities/check-login'
import useFetch from '@/hooks/use-fetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFetch } from '@/api/fetch'

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

export default function AuthProvider({ children }: IAuthProviderProps) {
	const { data } = useFetch('/user/get-by-token')
	const [user, setUser] = useState<IUserInfo>({
		id: '',
		nickname: '',
		money: 0,
		image: '',
		bio: '',
		followings: [],
		blockers: [],
	})
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (!data) return
		if (Object.keys(data).length === 0) {
			removeLoginState()
			navigate('/login')
		} else {
			const isInNotLoggedInPage =
				location.pathname.includes('login') ||
				location.pathname.includes('register')
			if (isInNotLoggedInPage) navigate('/')
			setLoginState()
			changeUserInfo(data)
		}
	}, [data])

	function changeUserInfo(newUser: INewUserInfo | null) {
		setUser({ ...user, ...newUser })
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
		const res = (await getFetch('/user/logout').catch((err) => {
			console.log(err)
		})) as Response
		if (!res.ok) return
		removeLoginState()
		changeUserInfo(null)
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
