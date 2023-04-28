import { notification } from 'antd'
import useNetworkState from '@/hooks/use-network-state'
import { useEffect, useState } from 'react'
import { WifiOutlined } from '@ant-design/icons'

function NetWorkNotification() {
	const isOnline = useNetworkState()
	const [previousNetworkState, setPreviousNetworkState] = useState(isOnline)

	useEffect(() => {
		if (!isOnline || isOnline !== previousNetworkState) {
			notification.destroy()
			isOnline
				? notification.info({
						message: 'Network notification',
						description: 'Your Internet connection was restored.',
						icon: <WifiOutlined style={{ color: 'green' }} />,
						duration: 0,
						placement: 'bottomLeft',
				  })
				: notification.warning({
						message: 'Network notification',
						description: 'You are offline!',
						icon: <WifiOutlined />,
						duration: 0,
						placement: 'bottomLeft',
				  })
			setPreviousNetworkState(isOnline)
		}
	}, [isOnline])

	return <></>
}

export default NetWorkNotification
