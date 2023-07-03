import { Button, message } from 'antd'
import styled from 'styled-components'
import { useEffect, useMemo, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import Transaction from './transaction'
import { postFetch } from '@/api/fetch'
import { useNavigate } from 'react-router-dom'
import useFetch from '@/hooks/use-fetch'
import Loading from '@/components/loading'
import { useImagesUpload } from '@/contexts/images-uploader'
import useMoneyType from '@/hooks/use-money-type'
import { useAuth } from '@/contexts/auth'
import allowedImageType from '@/constants/image-type'
import { uploadImageToServer } from '@/utilities/image'
import socket from '@/utilities/socket'
import { useMoneyContext } from '@/contexts/money'

interface Transaction {
	id: string
	money: number
	walletName: string
	type: string
	createdAt: Date
	note?: string
	image?: string | File
	accessPermission: 'public' | 'private'
}
interface FetchData {
	isLoading: boolean
	refetch: Function
	data: Array<Transaction>
}

function NewTransactions() {
	const navigate = useNavigate()
	const { user } = useAuth()
	const { money, changeMoney } = useMoneyContext()
	const { uploadImages, isUploading } = useImagesUpload()
	const { data, isLoading, refetch } = useFetch(
		`draft`,
		'/transaction/draft'
	) as FetchData
	const { moneyInTypes } = useMoneyType()
	const defaultTransaction: Transaction = useMemo(() => {
		return {
			id: uuid(),
			money: 0,
			walletName: money[0].name,
			type: 'anuong',
			createdAt: new Date(),
			note: '',
			image: '',
			accessPermission: 'private',
		}
	}, [])
	const [transactions, setTransactions] = useState<Array<Transaction>>([
		defaultTransaction,
	])
	const [isPosting, setIsPosting] = useState(false)
	const imagesRef = useRef<HTMLInputElement>(null)
	const [isExtractedImages, setIsExtractedImages] = useState(isUploading)

	if (transactions.length === 0) setTransactions([defaultTransaction])
	if (isExtractedImages !== isUploading) {
		setIsExtractedImages(isUploading)
		refetch()
	}

	useEffect(() => {
		if (data && data.length > 0) setTransactions(data)
	}, [data])

	const addDraft = (draft?: Transaction) => {
		const defaultAddedTransaction: Transaction = {
			id: uuid(),
			money: 0,
			walletName: money[0].name,
			type: 'anuong',
			createdAt: new Date(),
			note: '',
			image: '',
			accessPermission: 'private',
		}
		const newTransaction: Transaction = draft || defaultAddedTransaction
		setTransactions([...transactions, newTransaction])
	}
	const updateDraft = (id: string, draft: Transaction) => {
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
				typeof item?.image === 'string'
					? item.image
					: uploadImageToServer(item.image as File)
			)
		).then((image) => image || '')
		const urls = transactions.map((item, index) =>
			postFetch('/transaction/add', {
				...item,
				walletId: money.find((money) => money.name === item.walletName)?.id,
				image: images[index],
			})
		)
		const res = await Promise.all(urls)
		if (res.filter((r) => r !== null).length === 0) return

		const havePublicTransaction = transactions.find(
			(transaction) => transaction.accessPermission === 'public'
		)
		if (havePublicTransaction) socket.emit('new transaction', { id: user.id })
		transactions.forEach((transaction) => {
			const moneyChange = moneyInTypes.includes(transaction.type)
				? transaction.money
				: -transaction.money
			const walletName = transaction.walletName
			changeMoney({
				name: walletName,
				total: moneyChange,
			})
		})
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
			{isLoading && !isUploading && <Loading />}
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
			<Button onClick={() => addDraft()}>Thêm giao dịch</Button>
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
