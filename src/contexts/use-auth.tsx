import { createContext, useContext, useEffect, useState } from 'react'
import { getUserByToken } from '@/api/user'
import { setLoginState } from '@/utilities/check-login'

interface IUserInfo {
	username: string
	image?: string
	friend?: Array<string>
	chattedWith?: Array<string>
}

interface IAuthContext {
	user: IUserInfo
	login: Function
	register: Function
}

const AuthContext = createContext<IAuthContext | null>(null)

export function useAuth() {
	return useContext(AuthContext) as IAuthContext
}

interface IAuthProviderProps {
	children: React.ReactNode
}

export default function AuthProvider({ children }: IAuthProviderProps) {
	const [user, setUser] = useState<IUserInfo>({
		username: 'Minh',
	})

	function changeUserInfo(newUser: any) {
		setLoginState()
		setUser({ ...user, ...newUser })
	}

	useEffect(() => {
		;(async () => {
			const user = await getUserByToken()
			if (!user) return
			setLoginState()
			changeUserInfo(user)
		})()
	}, [])

	return (
		<AuthContext.Provider
			value={{ user, login: changeUserInfo, register: changeUserInfo }}
		>
			{children}
		</AuthContext.Provider>
	)
}
