import { useState } from 'react'
import { Button, message, Steps, Image, Typography, Form, Input } from 'antd'
import styled from 'styled-components'
import { DollarOutlined, UserOutlined } from '@ant-design/icons'
import welcome from '@/assets/welcome.png'
import useWindowSize from '@/hooks/use-window-size'
import { useAuth } from '@/contexts/auth'
import { postFetch } from '@/api/fetch'

function FirstLoginSteps() {
	const { changeInfo } = useAuth()
	const [current, setCurrent] = useState(0)
	const [nickname, setNickname] = useState('')
	const [money, setMoney] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(e.target.value)
	}
	const changeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
		const money = Number(e.target.value.replaceAll(',', '').replaceAll('.', ''))
		if (!isNaN(money)) setMoney(money)
	}

	const steps = [
		{
			title: 'Chào mừng',
			content: <Welcome />,
			icon: <DollarOutlined />,
		},
		{
			title: 'Thông tin',
			content: (
				<Information
					nickname={nickname}
					money={money}
					changeNickname={changeNickname}
					changeMoney={changeMoney}
				/>
			),
			icon: <UserOutlined />,
		},
	]
	const items = steps.map((item) => ({ key: item.title, ...item }))

	const next = () => {
		setCurrent(current + 1)
	}
	const changeInformation = async () => {
		if (!nickname) {
			message.warning('Tên người dùng không thể trống!')
			return
		}
		const urls = []
		urls.push(
			postFetch('/user/change-profile', { nickname }),
			postFetch('/user/change-money', { money })
		)
		const res = (await Promise.all(urls)) as Response[]
		if (res.filter((r) => r).length === 0) return
		const errors = res.filter((response: Response) => !response.ok)
		if (errors.length > 0) {
			message.warning('Tên này đã được sử dụng!')
			return
		}
		changeInfo({ nickname, money })
	}
	const handleToDone = async () => {
		if (isLoading) return
		setIsLoading(true)
		await changeInformation()
		setIsLoading(false)
	}

	return (
		<Wrapper>
			<CenterContent>
				<Steps current={current} items={items} />
				<Content>{steps[current].content}</Content>
				<Footer>
					{current < steps.length - 1 && (
						<Button type="primary" onClick={next}>
							Tiếp
						</Button>
					)}
					{current === steps.length - 1 && (
						<Button type="primary" loading={isLoading} onClick={handleToDone}>
							Hoàn tất
						</Button>
					)}
				</Footer>
			</CenterContent>
		</Wrapper>
	)
}

function Welcome() {
	return (
		<Step>
			<StyledImage width={200} src={welcome} preview={false} />
			<Typography.Text>Chào mừng bạn đến với My Money</Typography.Text>
		</Step>
	)
}

interface IInfoProps {
	nickname: string
	money: number
	changeNickname: React.ChangeEventHandler<HTMLInputElement>
	changeMoney: React.ChangeEventHandler<HTMLInputElement>
}
function Information(props: IInfoProps) {
	const { nickname, money, changeNickname, changeMoney } = props
	const windowSize = useWindowSize()

	const isInMobile = windowSize <= 768
	const formLayout = isInMobile ? 'vertical' : 'horizontal'
	const formItemLayout =
		formLayout === 'horizontal'
			? { labelCol: { span: 6 }, wrapperCol: { span: 16 } }
			: null

	return (
		<>
			<StyledP>Thiết lập thông tin ban đầu</StyledP>
			<Form {...formItemLayout}>
				<Form.Item label="Tên của bạn">
					<Input value={nickname} onChange={changeNickname} />
				</Form.Item>
				<Form.Item label="Số tiền">
					<Input value={money.toLocaleString()} onChange={changeMoney} />
				</Form.Item>
			</Form>
		</>
	)
}

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.9);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 3;
`
const CenterContent = styled.div`
	width: 90%;
	max-width: 30rem;
	padding: 0.5rem;
	border-radius: 0.5rem;
	background-color: #e6e6e6;
`
const Step = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
`
const StyledImage = styled(Image)`
	line-height: 0;
`
const Content = styled.div`
	margin-top: 1rem;
`
const Footer = styled.div`
	margin-top: 1.5rem;
	display: flex;
	justify-content: center;
`
const StyledP = styled.p`
	text-align: center;
	margin-bottom: 1rem;
`

export default FirstLoginSteps
