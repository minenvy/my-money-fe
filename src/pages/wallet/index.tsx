import formatMoney from '@/utilities/money-format'
import { DatePicker, Select, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import styled from 'styled-components'
import { useMoneyContext } from '@/contexts/money'
import WalletModal from '@/components/wallet/wallet-modal'

const monthFormat = 'MM/YYYY'
const today = new Date()

function Wallet() {
	const { money } = useMoneyContext()
	const [wallet, setWallet] = useState(money[0])
	const [time, setTime] = useState({
		month: today.getMonth() + 1,
		year: today.getFullYear(),
	})
  
	if (!wallet.id && money[0].id) setWallet(money[0])

	const walletOptions = money.map((money) => {
		const name = money.name
		return { value: name, label: name }
	})

	const changeWallet = (value: string) => {
		const selectedWallet =
			money.find((money) => money.name === value) || money[0]
		setWallet(selectedWallet)
	}
	const changeMonth = (dateString: string) => {
		const dateInfo = dateString.split('/')
		setTime({
			month: Number(dateInfo[0]),
			year: Number(dateInfo[1]),
		})
	}

	return (
		<>
			<TotalMoney>
				<StyledText type="secondary">Số dư</StyledText>
				<StyledText strong>{formatMoney(wallet.total)}</StyledText>
				<Select
					value={wallet.name}
					onChange={changeWallet}
					options={walletOptions}
					style={{ width: 120 }}
				/>
			</TotalMoney>
			<StyledDatePicker
				defaultValue={dayjs(dayjs(today), monthFormat)}
				format={monthFormat}
				picker="month"
				onChange={(_, dateString) => changeMonth(dateString)}
			/>
			<WalletModal
				month={time.month}
				year={time.year}
				walletName={wallet.name}
			/>
		</>
	)
}

const StyledText = styled(Typography.Text)`
	text-align: center;
	font-size: 1.25rem;
`
const TotalMoney = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const StyledDatePicker = styled(DatePicker)`
	margin: 1rem auto 0;
`

export default Wallet
