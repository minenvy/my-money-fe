import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	redirect,
} from 'react-router-dom'
import App from '@/App'
import Home from '@/pages/home'
import Login from '@/pages/login-register/login'
import Register from '@/pages/login-register/register'
import { getLoginState } from '@/utilities/check-login'
import DefaultLayout from '@/layout/default-layout'
import NotExistPageError from '@/components/not-exist-page-error'
import Wallet from '@/pages/wallet'
import NewTransaction from '@/pages/new-transaction'

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
			<Route path="/" element={<DefaultLayout />} loader={privateRouteLoader}>
				<Route path="/" element={<Home />} />
				<Route path="/wallet" element={<Wallet />} />
				<Route path="/new-transaction" element={<NewTransaction />} />
				//report, profile
			</Route>
		</Route>
	)
)

export default router
