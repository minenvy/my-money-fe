import walletImage from '@/assets/images/wallet.jpg'
import coinImage from '@/assets/images/coin.jpg'
import { Avatar, Input } from 'antd'
import { Wallet } from '@/interfaces/wallet'
import styled from 'styled-components'

type WalletsChangerProps = {
	wallet: Wallet
	changeWalletInfo: Function
	isEditing?: boolean
}

function WalletsChanger(props: WalletsChangerProps) {
	const { wallet, changeWalletInfo, isEditing = false } = props
	const name = wallet.name
	const money = wallet.total

	const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newName = e.target.value
		changeWalletInfo({ ...wallet, name: newName })
	}
	const changeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newMoney = Number(
			e.target.value.replaceAll(',', '').replaceAll('.', '')
		)
		if (!isNaN(newMoney)) changeWalletInfo({ ...wallet, total: newMoney })
	}

	return (
		<>
			<FlexBox>
				<Avatar src={walletImage} />
				<StyledInput
					placeholder="Tên ví"
					bordered={false}
					size="large"
					value={name}
					onChange={changeName}
					disabled={isEditing}
				/>
			</FlexBox>
			<FlexBox>
				<Avatar src={coinImage} />
				<StyledInput
					placeholder="Số tiền"
					bordered={false}
					size="large"
					value={money ? money.toLocaleString() : 0}
					onChange={changeMoney}
					disabled={isEditing}
				/>
			</FlexBox>
		</>
	)
}

const FlexBox = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin: 1rem 0;
`
const StyledInput = styled(Input)`
	font-size: 1.5rem;
`

export default WalletsChanger
