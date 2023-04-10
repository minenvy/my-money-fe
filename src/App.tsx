import { message } from 'antd'
import { Outlet } from 'react-router-dom'
import useNetworkState from '@/hooks/use-network-state'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '@/components/error'

function App() {
	const isOnline = useNetworkState()
	const [messageApi, contextHolder] = message.useMessage()
	const [previousNetworkState, setPreviousNetworkState] = useState(isOnline)

	useEffect(() => {
		if (!isOnline || isOnline !== previousNetworkState) {
			isOnline
				? messageApi.info('Your network is back.')
				: messageApi.warning('You are offline!')
			setPreviousNetworkState(isOnline)
		}
	}, [isOnline])

	return (
		<ErrorBoundary fallback={<Error />}>
			{contextHolder}
			<Outlet />
		</ErrorBoundary>
	)
}

export default App
