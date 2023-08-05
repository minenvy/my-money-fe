import { Wallet } from '@/interfaces/wallet'
import { useState } from 'react'
import ListItem from '@/components/list-item'
import walletImage from '@/assets/images/wallet.jpg'
import formatMoney from '@/utilities/money-format'
import { Button, Modal, message } from 'antd'
import { InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { postFetch } from '@/api/fetch'
import WalletsChanger from '@/features/home/wallet/wallet-changer'
import PopDeleteConfirm from '@/features/home/wallet/pop-delete'

type WalletModalProps = {
	money: Array<Wallet>
	changeMoney: Function
	deleteMoney: Function
}
function WalletModal(props: WalletModalProps) {
	const { money, changeMoney, deleteMoney } = props
	const [isAddingWallet, setIsAddingWallet] = useState(false)
	const [isEditingWallet, setIsEditingWallet] = useState(false)
	const [newWallet, setNewWallet] = useState({
		name: '',
		total: 0,
	})
	const [editingWallet, setEditingWallet] = useState({
		name: '',
		total: 0,
	})
	const [isPosting, setIsPosting] = useState(false)

	const wallets = [...money]

	const showAddWalletForm = () => {
		setIsAddingWallet(true)
	}
	const addNewWallet = async () => {
		if (!newWallet.name) {
			message.warning('Cần có tên ví')
			return
		}
		const res = await postFetch('/wallet/add', { ...newWallet })
		if (res === null) return
		changeMoney({ ...newWallet })
	}
	const handleClickAddNewWallet = async () => {
		if (isPosting) return
		setIsPosting(true)
		await addNewWallet()
		setIsPosting(false)
		setIsAddingWallet(false)
	}
	const openWalletEditor = (wallet: Wallet) => {
		setIsEditingWallet(true)
		setEditingWallet(wallet)
	}
	const deleteWallet = async () => {
		if (editingWallet.name === 'Tiền mặt') {
			message.warning('Không thể xóa ví mặc định Tiền mặt')
			return
		}
		const res = await postFetch('/wallet/delete', { ...editingWallet })
		if (res === null) return
		deleteMoney(editingWallet.name)
	}
	const handleClickDeleteWallet = async () => {
		if (isPosting) return
		setIsPosting(true)
		await deleteWallet()
		setIsPosting(false)
		setIsEditingWallet(false)
	}

	return (
		<>
			{wallets.map((moneyItem) => {
				return (
					<div onClick={() => openWalletEditor(moneyItem)} key={moneyItem.name}>
						<ListItem
							title={moneyItem.name}
							icon={walletImage}
							moreDetail={
								<>
									{formatMoney(moneyItem.total)}
									&nbsp;
									<InfoCircleOutlined />
								</>
							}
						/>
					</div>
				)
			})}
			<Button
				block
				icon={<PlusCircleOutlined />}
				onClick={() => showAddWalletForm()}
			>
				Thêm ví
			</Button>
			<Modal
				title="Thêm ví"
				open={isAddingWallet}
				onOk={handleClickAddNewWallet}
				confirmLoading={isPosting}
				onCancel={() => setIsAddingWallet(false)}
			>
				<WalletsChanger wallet={newWallet} changeWalletInfo={setNewWallet} />
			</Modal>
			<Modal
				title="Thông tin ví"
				open={isEditingWallet}
				onCancel={() => setIsEditingWallet(false)}
				footer={[
					editingWallet.name !== 'Tiền mặt' && (
						<PopDeleteConfirm onDelete={handleClickDeleteWallet} />
					),
					<Button type="primary" onClick={() => setIsEditingWallet(false)}>
						Ok
					</Button>,
				]}
			>
				<WalletsChanger
					wallet={editingWallet}
					changeWalletInfo={setEditingWallet}
					isEditing={true}
				/>
			</Modal>
		</>
	)
}

export default WalletModal
