import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	redirect,
} from 'react-router-dom'
import App from '@/App'
import Home from '@/pages/home'
import Login from '@/pages/login'
import Register from '@/pages/register'
import { getLoginState } from '@/utilities/check-login'
import DefaultLayout from '@/layout/default-layout'

const privateRouteLoader = () => {
	const loggedInState = getLoginState()
	console.log(loggedInState)
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
		<Route path="/" element={<App />}>
			<Route
				path="login"
				element={<Login />}
				loader={loggedInCantAccessLoader}
			/>
			<Route
				path="register"
				element={<Register />}
				loader={loggedInCantAccessLoader}
			/>
			<Route path="/" element={<DefaultLayout />} loader={privateRouteLoader}>
				<Route path="/" element={<Home />} />
			</Route>
		</Route>
	)
)

export default router
