import { Button, Empty } from 'antd'
import { useNavigate } from 'react-router-dom'

interface IProps {
	hasButton?: boolean
}

function NoData(props: IProps) {
	const { hasButton = false } = props
	const navigate = useNavigate()

	const redirectToAddTransaction = () => navigate('/transaction')

	return (
		<Empty
			image={Empty.PRESENTED_IMAGE_SIMPLE}
			imageStyle={{ height: 60 }}
			description="Chưa có dữ liệu"
		>
			{hasButton && <Button onClick={redirectToAddTransaction}>Thêm </Button>}
		</Empty>
	)
}

export default NoData
