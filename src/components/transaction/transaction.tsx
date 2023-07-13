import ShadowBox from '@/components/shadow-box'
import {
	Avatar,
	Button,
	DatePicker,
	DatePickerProps,
	Divider,
	Input,
	Select,
	Space,
	Typography,
	message,
} from 'antd'
import styled from 'styled-components'
import coinImage from '@/assets/images/coin.jpg'
import walletImage from '@/assets/images/wallet.jpg'
import useMoneyType from '@/hooks/use-money-type'
import {
	CalendarOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
	FileImageOutlined,
	FileTextOutlined,
	GlobalOutlined,
	PlusOutlined,
	UserOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import PopDeleteConfirm from './pop-confirm'
import allowedImageType from '@/constants/image-type'
import { useRef, useState } from 'react'
import { imagesDir } from '@/constants/env'
import { permissionOptions } from '@/constants/transaction'
import { useMoneyContext } from '@/contexts/money'
import AddMoneyTypeModal from './add-money-type-modal'
import ImagePreview from './image-preview'

type TransactionProps = {
	id: string
	money: number
	walletName: string
	type: string
	createdAt: Date
	note?: string
	image?: string | File
	accessPermission: 'public' | 'private'
	updateDraft: Function
	deleteDraft?: Function
	allowEditImage?: boolean
	allowEditWalletName?: boolean
}

function Transaction(props: TransactionProps) {
	const {
		id,
		money,
		walletName,
		type,
		createdAt,
		note,
		image,
		accessPermission,
		updateDraft,
		deleteDraft,
		allowEditImage = true,
		allowEditWalletName = true,
	} = props
	const wallets = useMoneyContext()
	const { icons, moneyTypeSelectOptions, valueToLabel, addNewMoneyType } =
		useMoneyType()
	const [isPreviewImage, setIsPreviewImage] = useState(false)
	const imageRef = useRef<HTMLInputElement>(null)
	const [isAddingMoneyType, setIsAddingMoneyType] = useState(false)

	const imageSrc =
		typeof image === 'string'
			? image
				? imagesDir + image
				: image
			: URL.createObjectURL(image as File)
	const typeImage = icons.find((icon) => icon.value === type)?.icon
	const iconStyle = {
		color: '#212121',
		fontSize: '1.25rem',
	}

	const walletOptions = wallets.money.map((money) => {
		const name = money.name
		return { value: name, label: name }
	})

	const changeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
		const money = Number(e.target.value.replaceAll(',', '').replaceAll('.', ''))
		if (!isNaN(money))
			updateDraft(id, {
				money,
			})
	}
	const changeType = (value: string) => {
		updateDraft(id, {
			type: value,
		})
	}
	const changeWallet = (value: string) => {
		updateDraft(id, {
			walletName: value,
		})
	}
	const changeDate: DatePickerProps['onChange'] = (_, dateString) => {
		updateDraft(id, {
			createdAt: new Date(dateString),
		})
	}
	const changeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		updateDraft(id, {
			note: e.target.value,
		})
	}
	const changePermission = (value: string) => {
		updateDraft(id, {
			accessPermission: value,
		})
	}
	const handleChooseImage = () => {
		imageRef.current?.click()
	}
	const chooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const imageFiles = e.target.files
		if (!imageFiles || imageFiles.length === 0) return

		const imageFile = imageFiles[0]
		const partName = imageFile.name.split('.')
		const type = partName[partName.length - 1]
		if (!allowedImageType.includes(type)) {
			message.warning('Chỉ có thể chọn ảnh png, jpg, jpeg, gif!')
			return
		}
		updateDraft(id, {
			image: imageFile,
		})
	}
	const previewImage = () => setIsPreviewImage(true)
	const deleteImage = () => {
		updateDraft(id, {
			image: '',
		})
	}

	return (
		<MarginWrapper>
			{deleteDraft && <PopDeleteConfirm onDelete={() => deleteDraft(id)} />}
			<ShadowBox>
				<FlexBox>
					<Avatar src={coinImage} />
					<Money>
						<Typography.Text type="secondary">Số tiền</Typography.Text>
						<StyledInput
							placeholder="Số tiền"
							bordered={false}
							size="large"
							value={money ? money.toLocaleString() : 0}
							onChange={changeMoney}
						/>
					</Money>
				</FlexBox>
				<FlexBox>
					<Avatar src={<CalendarOutlined style={iconStyle} />} />
					<DatePicker
						value={dayjs(dayjs(createdAt).format('YYYY-MM-DD'))}
						onChange={changeDate}
						allowClear={false}
					/>
				</FlexBox>
				<FlexBox>
					<Avatar src={walletImage} style={iconStyle} />
					<Select
						value={walletName}
						onChange={changeWallet}
						options={walletOptions}
						disabled={!allowEditWalletName}
						style={{ width: '100%' }}
					/>
				</FlexBox>
				<FlexBox>
					<Avatar src={typeImage} style={iconStyle} />
					<Select
						placeholder="Chọn nhóm"
						value={valueToLabel(type)}
						onChange={changeType}
						options={moneyTypeSelectOptions}
						style={{ width: '100%' }}
						dropdownRender={(menu) => (
							<>
								{menu}
								<Divider style={{ margin: '8px 0' }} />
								<Button
									type="text"
									icon={<PlusOutlined />}
									block
									onClick={() => setIsAddingMoneyType(true)}
								>
									Thêm loại thu chi mới
								</Button>
							</>
						)}
					/>
				</FlexBox>
				<FlexBox>
					<Avatar src={<FileTextOutlined style={iconStyle} />} />
					<Input.TextArea
						allowClear
						placeholder="Ghi chú"
						value={note}
						onChange={changeNote}
					/>
				</FlexBox>
				<FlexBox>
					<Avatar
						src={
							accessPermission === 'public' ? (
								<GlobalOutlined style={iconStyle} />
							) : (
								<UserOutlined style={iconStyle} />
							)
						}
					/>
					<Select
						placeholder="Chọn quyền truy cập"
						value={accessPermission === 'public' ? 'Công khai' : 'Chỉ mình tôi'}
						onChange={changePermission}
						options={permissionOptions}
						style={{ width: '100%' }}
					/>
				</FlexBox>
				<FlexBox>
					<Avatar src={<FileImageOutlined style={iconStyle} />} />
					{image ? (
						<ImageBox>
							<Image onClick={previewImage}>
								<img src={imageSrc} width={100} height={100} loading="lazy" />
							</Image>
							{allowEditImage && (
								<EditImgButtons>
									<Button icon={<EditOutlined />} onClick={handleChooseImage} />
									<Button icon={<DeleteOutlined />} onClick={deleteImage} />
								</EditImgButtons>
							)}
							<PreviewIcon onClick={previewImage} />
						</ImageBox>
					) : (
						<>
							<Button onClick={handleChooseImage}>Chọn ảnh mô tả</Button>
						</>
					)}
				</FlexBox>
			</ShadowBox>

			<HiddenInput type="file" onChange={chooseImage} ref={imageRef} />
			{isPreviewImage && (
				<ImagePreview src={imageSrc} close={() => setIsPreviewImage(false)} />
			)}
			<AddMoneyTypeModal
				open={isAddingMoneyType}
				close={() => setIsAddingMoneyType(false)}
				addNewMoneyType={addNewMoneyType}
			/>
		</MarginWrapper>
	)
}

const FlexBox = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin: 0.75rem 0;
`
const MarginWrapper = styled.div`
	margin: 1rem 0;
	position: relative;
	& .deleteBtn {
		display: none;
	}
	&:hover {
		& .deleteBtn {
			display: block;
		}
	}
`
const Money = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`
const StyledInput = styled(Input)`
	font-size: 1.5rem;
`
const HiddenInput = styled.input`
	display: none;
`
const ImageBox = styled.div`
	flex: 1;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	&:hover {
		span {
			display: block;
		}
		div {
			display: flex;
		}
	}
`
const Image = styled.div`
	height: 100px;
	cursor: pointer;
`
const PreviewIcon = styled(EyeOutlined)`
	display: none;
	font-size: 1rem;
	position: absolute;
	top: 42px;
	left: 42px;
	cursor: pointer;
`
const EditImgButtons = styled.div`
	flex: 1;
	display: none;
	justify-content: flex-end;
	gap: 1rem;
`

export default Transaction
