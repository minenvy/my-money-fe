import { useMoneyContext } from '@/contexts/money'
import TitleOfPartContent from '@/components/home/title-of-each-part-content'
import ListItem from '@/components/list-item'
import walletImage from '@/assets/images/wallet.jpg'
import formatMoney from '@/utilities/money-format'
import ShadowBox from '@/components/shadow-box'
import { Button, Modal } from 'antd'
import { useState } from 'react'
import WalletModal from './wallet-modal'

function Wallet() {
	const { money, changeMoney, deleteMoney } = useMoneyContext()
	const [isShowedWallet, setIsShowedWallet] = useState(false)

	return (
		<ShadowBox>
			<TitleOfPartContent
				title="Ví của tôi"
				onClick={() => setIsShowedWallet(true)}
			/>
			{money.map((moneyItem) => {
				return (
					<ListItem
						key={moneyItem.name}
						title={moneyItem.name}
						icon={walletImage}
						moreDetail={formatMoney(moneyItem.total)}
					/>
				)
			})}
			<Modal
				open={isShowedWallet}
				title="Ví của tôi"
				onCancel={() => setIsShowedWallet(false)}
				footer={[<Button onClick={() => setIsShowedWallet(false)}>OK</Button>]}
			>
				<WalletModal
					key={Math.random()}
					money={money}
					changeMoney={changeMoney}
					deleteMoney={deleteMoney}
				/>
			</Modal>
		</ShadowBox>
	)
}

export default Wallet
