import { createContext, useContext, useEffect, useState } from 'react'
import { removeLoginState, setLoginState } from '@/utilities/check-login'
import useFetch from '@/hooks/use-fetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFetch } from '@/api/fetch'
import Loading from '@/components/loading'
import {
	AuthContext,
	FetchData,
	NewUserInfo,
	UserInfo,
} from '@/interfaces/auth'

const AuthContext = createContext<AuthContext | null>(null)

export function useAuth() {
	return useContext(AuthContext) as AuthContext
}

type AuthProviderProps = {
	children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
	const { data, isLoading } = useFetch(
		'auth',
		'/user/get-by-token'
	) as FetchData
	const [user, setUser] = useState<UserInfo>({
		id: '',
		nickname: '',
	})
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (data === undefined) return
		if (data === null) {
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
		changeInfo(data)
	}, [data])

	function changeInfo(newUser: NewUserInfo | null) {
		setUser({ ...user, ...newUser } as UserInfo)
	}
	function login(newUser: NewUserInfo) {
		setLoginState()
		changeInfo(newUser)
	}
	function register(newUser: NewUserInfo) {
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
			{isLoading && <Loading />}
			{children}
		</AuthContext.Provider>
	)
}
