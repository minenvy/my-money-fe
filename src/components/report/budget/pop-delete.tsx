import { deleteBudget } from '@/api/budget'
import { postFetch } from '@/api/fetch'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

type Props = {
	id: string
}

function PopDeleteConfirm(props: Props) {
	const { id } = props
	const [open, setOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const onDelete = async () => {
		deleteBudget(id)
		setTimeout(() => window.location.reload(), 1000)
	}
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
			description="Bạn có chắc chắn muốn xóa mục này?"
			icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
			open={open}
			onConfirm={handleOk}
			okType="danger"
			okButtonProps={{ loading: isLoading }}
			onCancel={handleCancel}
		>
			<DeleteButton
				icon={<DeleteOutlined />}
				type="text"
				onClick={showPopConfirm}
			/>
		</Popconfirm>
	)
}

const DeleteButton = styled(Button)`
	position: absolute;
	top: 0;
	right: 0;
`

export default PopDeleteConfirm
