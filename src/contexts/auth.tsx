import { createContext, useContext, useEffect, useState } from 'react'
import { removeLoginState, setLoginState } from '@/utilities/check-login'
import useFetch from '@/hooks/use-fetch'
import { useLocation, useNavigate } from 'react-router-dom'

interface IUserInfo {
	username: string
	money: number
	image?: string
	bio?: string
	friend?: Array<string>
	block?: Array<string>
	chattedWith?: Array<string>
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
		username: '',
		money: 0,
	})
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		;(() => {
			if (!data) return
			if (Object.keys(data).length === 0) {
				removeLoginState()
				navigate('/login')
				return
			}
			const isInNotLoggedInPage =
				location.pathname.includes('login') ||
				location.pathname.includes('register')
			if (isInNotLoggedInPage) navigate('/')
			setLoginState()
			changeUserInfo(data)
		})()
	}, [data])

	function changeUserInfo(newUser: any) {
		setUser({ ...user, ...newUser })
	}
	function login(newUser: any) {
		setLoginState()
		changeUserInfo(newUser)
	}
	function register(newUser: any) {
		setLoginState()
		changeUserInfo(newUser)
	}
	function logout() {
		removeLoginState()
		changeUserInfo(null)
	}

	return (
		<AuthContext.Provider
			value={{ user, login, register, logout, changeInfo: changeUserInfo }}
		>
			{children}
		</AuthContext.Provider>
	)
}
