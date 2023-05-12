import { Button, message } from 'antd'
import styled from 'styled-components'
import { useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import Transaction from './transaction'
import { postFetch } from '@/api/fetch'
import { useNavigate } from 'react-router-dom'
import useFetch from '@/hooks/use-fetch'
import Loading from '@/components/loading'
import { useImagesUpload } from '@/contexts/images-uploader'
import { moneyInTypes } from '@/constants/money-type'
import { useAuth } from '@/contexts/auth'
import allowedImageType from '@/constants/image-type'
import { uploadImageToServer } from '@/utilities/image'

interface ITransaction {
	id: string
	money: number
	type: string
	createdAt: Date
	note?: string
	image?: string | File
}
interface IData {
	isLoading: boolean
	data: Array<ITransaction>
}

function NewTransactions() {
	const navigate = useNavigate()
	const { user, changeInfo } = useAuth()
	const { uploadImages, isUploading } = useImagesUpload()
	const { data, isLoading } = useFetch('draft', '/transaction/draft') as IData
	const [transactions, setTransactions] = useState<Array<ITransaction>>([])
	const [isPosting, setIsPosting] = useState(false)
	const imagesRef = useRef<HTMLInputElement>(null)

	if (isLoading) return <Loading />
	if (data === undefined) return null
	if (data.length > 0 && transactions.length === 0) setTransactions(data)
	if (data.length === 0 && transactions.length === 0)
		setTransactions([
			{
				id: uuid(),
				money: 0,
				type: 'anuong',
				createdAt: new Date(),
				note: '',
				image: '',
			},
		])

	const addDraft = (draft?: ITransaction) => {
		const nullDraft: ITransaction = {
			id: uuid(),
			money: 0,
			type: 'anuong',
			createdAt: new Date(),
			note: '',
			image: '',
		}
		const newTransaction: ITransaction = draft || nullDraft
		setTransactions([...transactions, newTransaction])
	}
	const updateDraft = (id: string, draft: ITransaction) => {
		setTransactions(
			transactions.map((transaction) => {
				if (transaction.id === id) return { ...transaction, ...draft }
				return transaction
			})
		)
	}
	const deleteDraft = (id: string) => {
		setTransactions(transactions.filter((item) => item.id !== id))
	}
	const addNewTransaction = async () => {
		if (transactions.length === 0) {
			message.warning('Yêu cầu có ít nhất 1 giao dịch nhỏ!')
			return
		}
		const isNotValid = transactions.find((item) => item.money === 0)
		if (isNotValid) {
			message.warning('Số tiền trong 1 giao dịch phải khác 0!')
			return
		}
		const images = await Promise.all(
			transactions.map((item) =>
				item?.image ? uploadImageToServer(item.image as File) : ''
			)
		).then((image) => image || '')
		const urls = transactions.map((item, index) =>
			postFetch('/transaction/add', {
				...item,
				image: images[index],
			})
		)
		const res = (await Promise.all(urls)) as Response[]
		if (res.filter((r) => r).length === 0) return
		const errors = res.filter((response: Response) => !response.ok)
		message.success(
			`Thêm ${transactions.length - errors.length} giao dịch thành công!`
		)

		const totalMoney = transactions.reduce(
			(total, transaction) =>
				moneyInTypes.includes(transaction.type)
					? total + transaction.money
					: total - transaction.money,
			0
		)
		changeInfo({ money: user.money + totalMoney })
		setTimeout(() => navigate('/wallet'), 1000)
	}
	const handleSubmit = async () => {
		if (isPosting) return
		setIsPosting(true)
		await addNewTransaction()
		setIsPosting(false)
	}
	const openImagesLibrary = () => {
		imagesRef.current?.click()
	}
	const chooseImages = (e: React.ChangeEvent<HTMLInputElement>) => {
		const imageFiles = e.target.files

		if (!imageFiles || imageFiles.length === 0) return

		let isInvalid = false
		for (const imageFile of imageFiles) {
			const partName = imageFile.name.split('.')
			const type = partName[partName.length - 1]
			if (!allowedImageType.includes(type)) {
				message.warning('Chỉ có thể chọn ảnh png, jpg, jpeg, gif!')
				isInvalid = true
				break
			}
		}

		if (isInvalid) return
		uploadImages(imageFiles)
	}

	return (
		<Wrapper>
			<HeaderWrapper>
				<HeaderTitle>Thêm giao dịch</HeaderTitle>
			</HeaderWrapper>

			{!isUploading && (
				<StyledButton onClick={openImagesLibrary}>
					Trích xuất dữ liệu từ ảnh giao dịch ngân hàng
				</StyledButton>
			)}

			{transactions.map((transaction) => {
				return (
					<Transaction
						key={transaction.id}
						{...transaction}
						updateDraft={updateDraft}
						deleteDraft={deleteDraft}
					/>
				)
			})}
			<Button onClick={() => addDraft()}>Thêm giao dịch nhỏ</Button>
			<StyledButton
				type="primary"
				block
				loading={isPosting}
				onClick={handleSubmit}
			>
				Thêm
			</StyledButton>

			<HiddenInput
				type="file"
				multiple
				onChange={chooseImages}
				ref={imagesRef}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	max-width: 30rem;
	width: 100%;
	margin: 0 auto;
`
const HeaderWrapper = styled.div`
	display: flex;
	height: 2rem;
	margin-bottom: 1rem;
`
const HeaderTitle = styled.p`
	flex: 1;
	text-align: center;
	padding: 0.25rem 0;
	font-size: 1.1rem;
`
const StyledButton = styled(Button)`
	display: block;
	margin: 1rem auto;
`
const HiddenInput = styled.input`
	display: none;
`

export default NewTransactions
