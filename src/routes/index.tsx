import { createBrowserRouter } from 'react-router-dom'
import Main from '@/layout'
import Home from '@/pages/home'
import Login from '@/pages/login'
import Register from '@/pages/register'

import { action as loginAction } from '@/pages/login'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'login',
				element: <Login />,
				action: loginAction,
			},
			{
				path: 'register',
				element: <Register />
			},
		],
	},
])

export default router
