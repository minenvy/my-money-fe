import useMoneyType from '@/hooks/use-money-type'
import { AppstoreAddOutlined } from '@ant-design/icons'
import {
	Button,
	Cascader,
	DatePicker,
	DatePickerProps,
	Divider,
	Input,
	Modal,
	Typography,
	message,
} from 'antd'
import { v4 as uuid } from 'uuid'
import { useState } from 'react'
import styled from 'styled-components'
import { addBudget } from '@/api/budget'
import { useForceUpdate } from '@/contexts/force-update'

type Props = {
	open: boolean
	close: Function
}

function NewBudgetModal(props: Props) {
	const { open, close } = props
  const { forceUpdate } = useForceUpdate()
	const { moneyOutTypes, moneyTypeCheckboxOptions } = useMoneyType()
	const [money, setMoney] = useState(0)
	const [name, setName] = useState('')
	const [options, setOptions] = useState<Array<Array<string>>>([['chitieu']])
	const [startDate, setStartDate] = useState<Date>()
	const [endDate, setEndDate] = useState<Date>()
	const [isLoading, setIsLoading] = useState(false)

	const title = (
		<>
			<AppstoreAddOutlined style={{ color: '#faad14' }} /> Tạo ngân sách mới
		</>
	)
	const changeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
		const money = Number(e.target.value.replaceAll(',', ''))
		if (!isNaN(money)) setMoney(money)
	}
	const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	}
	const changeMoneyTypeOption = (value: Array<any>) => {
		setOptions(value)
	}
	const changeStartDate: DatePickerProps['onChange'] = (_, dateString) => {
		setStartDate(new Date(dateString))
	}
	const changeEndDate: DatePickerProps['onChange'] = (_, dateString) => {
		setEndDate(new Date(dateString))
	}
	const checkValid = () => {
		if (money <= 0) {
			message.warning('Yêu cầu số tiền lớn hơn 0 đồng!')
			return false
		}
		if (name === '') {
			message.warning('Yêu cầu có tên ngân sách!')
			return false
		}
		if (!startDate || !endDate) {
			message.warning('Yêu cầu có ngày bắt đầu và ngày kết thúc!')
			return false
		}
		if (endDate?.getTime() - startDate?.getTime() < 0) {
			message.warning('Ngày bắt đầu cần trước ngày kết thúc!')
			return false
		}
		if ((endDate?.getTime() - startDate?.getTime()) / (1000 * 3600 * 24) > 90) {
			message.warning('Thời lượng không quá 90 ngày!')
			return false
		}
		if (options.length === 0) {
			message.warning('Yêu cầu chọn ít nhất 1 loại chi tiêu!')
			return false
		}
		return true
	}
	const addNewBudget = async () => {
		if (!checkValid()) return
		const moneyOptions = options.map((item) => item.slice(1, 2)).toString()
		await addBudget({
			id: uuid(),
			name,
			money,
			startDate: startDate!.toDateString(),
			endDate: endDate!.toDateString(),
			options: moneyOptions === '' ? moneyOutTypes.toString() : moneyOptions,
		})
		setTimeout(() => {
			forceUpdate()
			close()
		}, 1000)
	}
	const handleAdd = async () => {
		if (isLoading) return
		setIsLoading(true)
		await addNewBudget()
		setIsLoading(false)
	}

	return (
		<Modal
			title={title}
			open={open}
			centered
			footer={[
				<Button key="ok" type="primary" onClick={handleAdd}>
					Tạo
				</Button>,
			]}
			onCancel={() => close()}
		>
			<Typography.Text>Số tiền</Typography.Text>
			<StyledInput
				placeholder="Số tiền"
				bordered={false}
				size="large"
				value={money.toLocaleString()}
				onChange={changeMoney}
			/>
			<StyledDivider />
			<NameInput
				placeholder="Tên ngân sách"
				value={name}
				onChange={changeName}
			/>
			<Picker>
				<StyledDatePicker
					placeholder="Ngày bắt đầu"
					onChange={changeStartDate}
					allowClear={false}
				/>
				<StyledDatePicker
					placeholder="Ngày kết thúc"
					onChange={changeEndDate}
					allowClear={false}
				/>
			</Picker>
			<StyledCascader
				multiple
				options={moneyTypeCheckboxOptions}
				defaultValue={options}
				onChange={changeMoneyTypeOption}
				maxTagCount="responsive"
			/>
		</Modal>
	)
}

const StyledInput = styled(Input)`
	font-size: 1.5rem;
`
const StyledDivider = styled(Divider)`
	margin: 0;
	background-color: #f8f8f8;
`
const Picker = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 1rem;
`
const StyledDatePicker = styled(DatePicker)`
	width: 45%;
`
const NameInput = styled(Input)`
	flex: 1;
	margin-top: 1rem;
`
const StyledCascader = styled(Cascader)`
	width: 100%;
	margin-top: 1rem;
`

export default NewBudgetModal
