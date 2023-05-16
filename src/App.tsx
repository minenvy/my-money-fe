import { Outlet } from 'react-router-dom'
import AuthProvider from '@/contexts/auth'
import ErrorBoundary from '@/contexts/error-fetch-boundary'
import NetWorkNotification from '@/components/network-notification'
import preventInspects from './utilities/prevent-inspect'

function App() {
	preventInspects()

	return (
		<ErrorBoundary>
			<AuthProvider>
				<NetWorkNotification />
				<Outlet />
			</AuthProvider>
		</ErrorBoundary>
	)
}

export default App
