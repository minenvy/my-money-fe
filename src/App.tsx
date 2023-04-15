import { notification } from 'antd'
import { Outlet } from 'react-router-dom'
import useNetworkState from '@/hooks/use-network-state'
import { useEffect, useState } from 'react'
import AuthProvider from '@/contexts/use-auth'
import ErrorBoundary from '@/contexts/error-fetch-boundary'
import { WifiOutlined } from '@ant-design/icons'

function App() {
	const isOnline = useNetworkState()
	const [notificationApi, contextHolder] = notification.useNotification()
	const [previousNetworkState, setPreviousNetworkState] = useState(isOnline)

	useEffect(() => {
		if (!isOnline || isOnline !== previousNetworkState) {
			isOnline
				? notificationApi.info({
						message: 'Network notification',
						description: 'Your Internet connection was restored.',
						icon: <WifiOutlined style={{ color: 'green' }} />,
						duration: 0,
						placement: 'bottomLeft',
				  })
				: notificationApi.warning({
						message: 'Network notification',
						description: 'You are offline!',
						icon: <WifiOutlined />,
						duration: 0,
						placement: 'bottomLeft',
				  })
			setPreviousNetworkState(isOnline)
		}
	}, [isOnline])

	return (
		<ErrorBoundary>
			<AuthProvider>
				{contextHolder}
				<Outlet />
			</AuthProvider>
		</ErrorBoundary>
	)
}

export default App
