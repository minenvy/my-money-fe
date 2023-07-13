import { useMoneyContext } from '@/contexts/money'
import TitleOfPartContent from './title-of-each-part-content'
import ListItem from '@/components/list-item'
import walletImage from '@/assets/images/wallet.jpg'
import coinImage from '@/assets/images/coin.jpg'
import formatMoney from '@/utilities/money-format'
import ShadowBox from '@/components/shadow-box'
import { Avatar, Button, Input, Modal, Popconfirm, message } from 'antd'
import {
	InfoCircleOutlined,
	PlusCircleOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'
import { useState } from 'react'
import { postFetch } from '@/api/fetch'

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

interface Wallet {
	name: string
	total: number
}
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

interface IWalletsChangerProps {
	wallet: {
		name: string
		total: number
	}
	changeWalletInfo: Function
	isEditing?: boolean
}
function WalletsChanger(props: IWalletsChangerProps) {
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

interface IProps {
	onDelete: Function
}

function PopDeleteConfirm(props: IProps) {
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

const FlexBox = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin: 1rem 0;
`
const StyledInput = styled(Input)`
	font-size: 1.5rem;
`

export default Wallet
