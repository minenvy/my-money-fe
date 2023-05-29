import { createContext, useContext, useEffect, useState } from 'react'
import { removeLoginState, setLoginState } from '@/utilities/check-login'
import useFetch from '@/hooks/use-fetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFetch } from '@/api/fetch'
import Loading from '@/components/loading'

interface IUserInfo {
	id: string
	nickname: string
	image: string
	bio: string
}

interface INewUserInfo {
	nickname?: string
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
	const [user, setUser] = useState<IUserInfo>()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (data === undefined) return
		if (data === null) {
			removeLoginState()
			navigate('/login')
			changeInfo(null)
			return
		}
		const isInNotLoggedInPage =
			location.pathname.includes('login') ||
			location.pathname.includes('register')
		if (isInNotLoggedInPage) {
			navigate('/')
		}
		setLoginState()
		changeInfo(data)
	}, [data])

	if (isLoading) return <Loading />
	if (user === undefined) return null

	function changeInfo(newUser: INewUserInfo | null) {
		setUser({ ...user, ...newUser } as IUserInfo)
	}
	function login(newUser: INewUserInfo) {
		setLoginState()
		changeInfo(newUser)
	}
	function register(newUser: INewUserInfo) {
		setLoginState()
		changeInfo(newUser)
	}
	async function logout() {
		const res = await getFetch('/user/logout')
		if (res === null) return
		removeLoginState()
		changeInfo(null)
		navigate('/login')
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				register,
				logout,
				changeInfo,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
