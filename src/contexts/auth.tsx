import { createContext, useContext, useEffect, useState } from 'react'
import { removeLoginState, setLoginState } from '@/utilities/check-login'
import useFetch from '@/hooks/use-fetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFetch } from '@/api/fetch'
import Loading from '@/components/loading'

interface IUserInfo {
	id: string
	nickname: string
	money: number
	image: string
	bio: string
}

interface INewUserInfo {
	nickname?: string
	money?: number
	image?: string
	bio?: string
}

interface IData {
	isLoading: boolean
	data: INewUserInfo
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
	const { data, isLoading } = useFetch('auth', '/user/get-by-token') as IData
	const [user, setUser] = useState<IUserInfo | null>()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (data === undefined) return
		if (data === null) {
			removeLoginState()
			navigate('/login')
			changeUserInfo(null)
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

	if (isLoading) return <Loading />
	if (user === undefined) return null

	function changeUserInfo(newUser: INewUserInfo | null) {
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
		const res = await getFetch('/user/logout')
		if (res === null) return
		removeLoginState()
		changeUserInfo(null)
		navigate('/login')
	}

	return (
		<AuthContext.Provider
			value={{
				user: user as IUserInfo,
				login,
				register,
				logout,
				changeInfo: changeUserInfo,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
