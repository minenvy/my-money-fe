import ShadowBox from '@/components/shadow-box'
import {
	Avatar,
	Button,
	DatePicker,
	DatePickerProps,
	Input,
	Select,
	Typography,
	message,
} from 'antd'
import styled from 'styled-components'
import coinImage from '@/assets/coin.png'
import publicImage from '@/assets/earth.png'
import privateImage from '@/assets/lock.png'
import { icons, typeSelectOptions, valueToLabel } from '@/constants/money-type'
import {
	CalendarOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
	FileImageOutlined,
	FileTextOutlined,
	GlobalOutlined,
	UserOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import PopDeleteConfirm from './pop-confirm'
import allowedImageType from '@/constants/image-type'
import { useRef, useState } from 'react'
import { imagesDir } from '@/constants/env'
import { permissionOptions } from '@/constants/transaction'

interface ITransaction {
	id: string
	money: number
	type: string
	createdAt: Date
	note?: string
	image?: string | File
	accessPermission: 'public' | 'private'
	updateDraft: Function
	deleteDraft?: Function
	allowEditImage?: boolean
}

function Transaction(props: ITransaction) {
	const {
		id,
		money,
		type,
		createdAt,
		note,
		image,
		accessPermission,
		updateDraft,
		deleteDraft,
		allowEditImage = true,
	} = props
	const [isPreviewImage, setIsPreviewImage] = useState(false)
	const imageRef = useRef<HTMLInputElement>(null)

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
							<Button onClick={handleChooseImage}>Chọn ảnh</Button>
						</>
					)}
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
					<Avatar src={typeImage} style={iconStyle} />
					<Select
						placeholder="Chọn nhóm"
						value={valueToLabel(type)}
						onChange={changeType}
						options={typeSelectOptions}
						style={{ width: '100%' }}
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
			</ShadowBox>

			<HiddenInput type="file" onChange={chooseImage} ref={imageRef} />
			{isPreviewImage && (
				<ImagePreview src={imageSrc} close={() => setIsPreviewImage(false)} />
			)}
		</MarginWrapper>
	)
}

interface IImagePreview {
	src: string
	close: Function
}
function ImagePreview(props: IImagePreview) {
	const { src, close } = props

	return (
		<Wrapper>
			<StyledCloseOutlined onClick={() => close()} />
			<CenterContent>
				<StyledImg src={src} />
			</CenterContent>
		</Wrapper>
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
const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	z-index: 3;
`
const CenterContent = styled.div`
	width: 90%;
	max-width: 30rem;
	display: flex;
	justify-content: center;
`
const StyledImg = styled.img`
	width: 90%;
	height: 90%;
	max-width: 19rem;
	max-height: 38rem;
`
const StyledCloseOutlined = styled(CloseOutlined)`
	color: grey;
	background-color: white;
	font-size: 1.5rem;
	padding: 0.25rem;
	border-radius: 50%;
	position: absolute;
	top: 3%;
	right: 5%;
	cursor: pointer;
`
const EditImgButtons = styled.div`
	flex: 1;
	display: none;
	justify-content: flex-end;
	gap: 1rem;
`

export default Transaction
