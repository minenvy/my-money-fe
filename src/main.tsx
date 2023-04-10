import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from '@/contexts/use-auth'
import router from '@/routes'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
)
