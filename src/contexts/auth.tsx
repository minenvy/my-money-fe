import { createContext, useContext, useEffect, useState } from 'react'
import { removeLoginState, setLoginState } from '@/utilities/check-login'
import useFetch from '@/hooks/use-fetch'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '@/components/loading'
import { AuthContext, NewUserInfo, UserInfo } from '@/interfaces/auth'
import { getByToken, logoutInServer } from '@/api/user'

const defaultUser = {
	id: '',
	nickname: '',
}

const AuthContext = createContext<AuthContext | null>(null)

export function useAuth() {
	return useContext(AuthContext) as AuthContext
}

type AuthProviderProps = {
	children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
	const { data, isLoading } = useFetch<UserInfo>('auth', getByToken)
	const [user, setUser] = useState<UserInfo>()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (data === null || !data.id) {
			removeLoginState()
			navigate('/login')
			changeInfo(defaultUser)
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

	if (isLoading || user === undefined) return <Loading />

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
		logoutInServer()
		removeLoginState()
		setUser(defaultUser)
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
