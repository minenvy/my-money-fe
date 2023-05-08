import { useAuth } from '@/contexts/auth'
import useWindowSize from '@/hooks/use-window-size'
import { Avatar, Button, Form, Input, Typography, message } from 'antd'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Compressor from 'compressorjs'
import { postFetch, uploadImage } from '@/api/fetch'
import { imagesDir } from '@/constants/env'

const allowedImageType = ['png', 'jpg', 'jpeg', 'gif']

function ProfileEditor() {
	const { user } = useAuth()
	const navigate = useNavigate()
	const imageInput = useRef<HTMLInputElement>(null)
	const [image, setImage] = useState<File>()
	const [nickname, setNickname] = useState<string>()
	const [bio, setBio] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const windowSize = useWindowSize()

	const isInMobile = windowSize <= 768
	const formLayout = isInMobile ? 'vertical' : 'horizontal'
	const formItemLayout =
		formLayout === 'horizontal'
			? { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
			: null

	if (user.nickname && !nickname) {
		setNickname(user.nickname)
		setBio(user?.bio)
	}

	const openImageLibrary = () => {
		imageInput.current?.click()
	}
	const chooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const imageFile = e.target.files && e.target.files[0]
		if (!imageFile) return
		const partName = imageFile.name.split('.')
		const type = partName[partName.length - 1]
		if (!allowedImageType.includes(type)) {
			message.warning('Chỉ có thể chọn ảnh png, jpg, jpeg, gif!')
			return
		}
		setImage(imageFile)
	}
	const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(e.target.value)
	}
	const changeBio = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBio(e.target.value)
	}
	const cancel = () => {
		navigate('/profile/' + user.id)
	}
	const upload = async () => {
		if (!image) {
			if (!bio && !image && !nickname) {
				navigate('/profile/' + user.id)
				return
			}

			const res = (await postFetch('/user/change-profile-without-avatar', { bio, nickname }).catch(
				() => {
					message.warning('Có lỗi xảy ra vui lòng thử lại sau!')
					return
				}
			)) as Response
			if (!res.ok) {
				message.warning('Có lỗi xảy ra vui lòng thử lại sau!')
				return
			}
			message.success('Cập nhật thành công')
			setTimeout(() => navigate('/profile/' + user.id), 1000)
			return
		}

		new Compressor(image, {
			quality: 0.8,
			success: (result: File) => {
				const formData = new FormData()
				formData.append('file', result, result.name)
				formData.append('bio', bio)
				formData.append('nickname', nickname as string)

				// Send the compressed image file to server with XMLHttpRequest.
				uploadImage('/user/change-profile-with-avatar', formData)
					.then((res) => {
						if (!res.ok) {
							message.warning('Có lỗi xảy ra vui lòng thử lại sau!')
							return
						}
						message.success('Cập nhật thành công')
						setTimeout(() => navigate('/profile/' + user.id), 1000)
					})
					.catch(() => {
						message.warning('Có lỗi xảy ra vui lòng thử lại sau!')
						return
					})
			},
			error(err) {
				console.log(err.message)
			},
		})
	}
	const handleSubmit = async () => {
		if (isLoading) return
		setIsLoading(true)
		await upload()
		setIsLoading(false)
	}

	return (
		<Wrapper>
			<FlexBox>
				<AvatarWrapper>
					<Avatar
						src={
							image
								? URL.createObjectURL(image)
								: user?.image
								? imagesDir + user.image
								: ''
						}
						size="large"
						style={{ backgroundColor: '#1677ff' }}
					>
						{(user.nickname[0] || '').toUpperCase()}
					</Avatar>
					<Name>
						<Typography.Text>{user.nickname}</Typography.Text>
						<br></br>
						<StyledButton type="link" onClick={openImageLibrary}>
							Thay đổi ảnh đại diện
						</StyledButton>
					</Name>
				</AvatarWrapper>
				<StyledForm {...formItemLayout}>
					<Form.Item label="Tên người dùng">
						<Input value={user.nickname} onChange={changeNickname} />
					</Form.Item>
					<Form.Item label="Bio">
						<Input value={bio} onChange={changeBio} />
					</Form.Item>
					<Buttons>
						<Button onClick={cancel}>Hủy</Button>
						<Button type="primary" loading={isLoading} onClick={handleSubmit}>
							Thay đổi
						</Button>
					</Buttons>
				</StyledForm>
			</FlexBox>
			<HiddenInput
				type="file"
				onChange={chooseImage}
				accept="image/png, image/jpeg, image/jpg, image/gif"
				ref={imageInput}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`
const FlexBox = styled.div`
	width: 90%;
	max-width: 37.5rem;
	padding: 2rem 4rem;
	border: 1px solid #ddd;
	@media screen and (max-width: 768px) {
		padding: 1rem;
	}
`
const AvatarWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`
const Name = styled.div`
	margin-left: 1rem;
`
const StyledButton = styled(Button)`
	padding: 0.25rem 0;
`
const Buttons = styled.div`
	display: flex;
	justify-content: space-around;
`
const StyledForm = styled(Form)`
	margin-top: 1rem;
	@media screen and (max-width: 768px) {
		& .ant-row {
			display: unset;
		}
	}
`
const HiddenInput = styled.input`
	display: none;
`

export default ProfileEditor
