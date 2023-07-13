import { useState } from 'react'
import { Button, Popconfirm } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

type Props = {
	onDelete: Function
}

function PopDeleteConfirm(props: Props) {
	const { onDelete } = props
	const [open, setOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const showPopConfirm = () => setOpen(true)
	const handleOk = async () => {
		setIsLoading(true)
		await onDelete()
		setIsLoading(false)
		setOpen(false)
	}
	const handleCancel = () => {
		setOpen(false)
	}

	return (
		<Popconfirm
			title="Xóa"
			description={
				<>
					Xóa ví sẽ xóa toàn bộ giao dịch của ví
					<br></br>
					Bạn có chắc chắn muốn xóa ví này?
				</>
			}
			icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
			open={open}
			onConfirm={handleOk}
			okType="danger"
			okButtonProps={{ loading: isLoading }}
			onCancel={handleCancel}
		>
			<Button danger onClick={showPopConfirm}>
				Xóa
			</Button>
		</Popconfirm>
	)
}

export default PopDeleteConfirm
