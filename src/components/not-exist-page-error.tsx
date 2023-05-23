import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

function NotExistPageError() {
	const navigate = useNavigate()

	const handleClick = () => {
		// navigate('/')
		window.location.replace('/')
	}

	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button type="primary" onClick={handleClick}>
					Trở về trang chủ
				</Button>
			}
		/>
	)
}

export default NotExistPageError
