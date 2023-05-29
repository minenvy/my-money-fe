import { Avatar, Button, Input, Modal, Typography } from 'antd'
import styled from 'styled-components'
import moneyTypeImage from '@/assets/custom_money_type.jpg'
import { useState } from 'react'
import ButtonGroup from 'antd/es/button/button-group'
import { postFetch } from '@/api/fetch'
import useMoneyType from '@/hooks/use-money-type'

interface IMoneyType {
	name: string
	type: 'in' | 'out'
}
interface IProps {
	open: boolean
	close: Function
	addNewMoneyType: Function
}

function AddMoneyTypeModal(props: IProps) {
	const { open, close, addNewMoneyType } = props
	const [moneyType, setMoneyType] = useState<IMoneyType>({
		name: '',
		type: 'in',
	})
	const [isPosting, setIsPosting] = useState(false)

	const addMoneyType = async () => {
		const res = await postFetch('/custom-money-type/add', { ...moneyType })
		if (res === null) return
		addNewMoneyType({ ...moneyType })
		close()
	}
	const handleClickOk = async () => {
		if (isPosting) return
		setIsPosting(true)
		await addMoneyType()
		setIsPosting(false)
	}
	const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMoneyType({ ...moneyType, name: e.target.value })
	}
	const changeType = (newType: 'in' | 'out') => {
		setMoneyType({ ...moneyType, type: newType })
	}

	return (
		<Modal
			open={open}
			title="Thêm loại thu chi"
			onCancel={() => close()}
			confirmLoading={isPosting}
			footer={[
				<Button onClick={() => close()} key="cancel">
					Hủy
				</Button>,
				<Button type="primary" onClick={handleClickOk} key="ok">
					Thêm
				</Button>,
			]}
		>
			<FlexBox>
				<Avatar src={moneyTypeImage} />
				<Input
					placeholder="Tên loại thu chi"
					size="large"
					value={moneyType.name}
					onChange={changeName}
				/>
			</FlexBox>
			<SpaceBetweenBox>
				<Typography.Text>Khoản thu & Khoản chi</Typography.Text>
				<StyledButtonGroup>
					<Button
						type={moneyType.type === 'in' ? 'primary' : 'text'}
						onClick={() => changeType('in')}
					>
						Khoản thu
					</Button>
					<Button
						type={moneyType.type === 'out' ? 'primary' : 'text'}
						onClick={() => changeType('out')}
					>
						Khoản chi
					</Button>
				</StyledButtonGroup>
			</SpaceBetweenBox>
		</Modal>
	)
}

const FlexBox = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin: 1rem 0;
`
const SpaceBetweenBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const StyledButtonGroup = styled(ButtonGroup)`
	background-color: #ddd;
	border-radius: 6px;
`

export default AddMoneyTypeModal
