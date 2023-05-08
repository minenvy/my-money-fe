import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	redirect,
} from 'react-router-dom'
import { getLoginState } from '@/utilities/check-login'
import MainLayout from '@/layout/main-layout'
import NotExistPageError from '@/components/not-exist-page-error'
import Login from '@/pages/login-register/login'
import Register from '@/pages/login-register/register'
import { App, Home, Wallet, Transaction, Report, Profile } from './lazy-page'
import ProfileEditor from '@/pages/profile/profile-editor'
import PasswordEditor from '@/pages/profile/password-editor'

const privateRouteLoader = () => {
	const loggedInState = getLoginState()
	if (!loggedInState) throw redirect('/login')
	return loggedInState
}

const loggedInCantAccessLoader = () => {
	const loggedInState = getLoginState()
	if (loggedInState) throw redirect('/')
	return loggedInState
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} errorElement={<NotExistPageError />}>
			<Route
				path="/login"
				element={<Login />}
				loader={loggedInCantAccessLoader}
			/>
			<Route
				path="/register"
				element={<Register />}
				loader={loggedInCantAccessLoader}
			/>
			<Route path="/" element={<MainLayout />} loader={privateRouteLoader}>
				<Route path="/" element={<Home />} />
				<Route path="/wallet" element={<Wallet />} />
				<Route path="/transaction/:id" element={<Transaction />} />
				<Route path="/transaction" element={<Transaction />} />
				<Route path="/report/all" element={<Report />} />
				<Route path="/report/in" element={<Report />} />
				<Route path="/report/out" element={<Report />} />
				<Route path="/report/budget" element={<Report />} />
				<Route path="/report" element={<Report />} />
				<Route path="/profile/edit-profile" element={<ProfileEditor />} />
				<Route path="/profile/change-password" element={<PasswordEditor />} />
				<Route path="/profile/:id" element={<Profile />} />
			</Route>
		</Route>
	)
)

export default router
