import { useState } from 'react'
import { Button, message, Steps } from 'antd'
import styled from 'styled-components'
import { DollarOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth } from '@/contexts/auth'
import { useMoneyContext } from '@/contexts/money'
import { changeNicknameAndMoneySuccess } from '@/api/first-login-steps'
import Welcome from './welcome'
import Information from './information'

function FirstLoginSteps() {
	const { changeInfo } = useAuth()
	const { changeMoney } = useMoneyContext()
	const [current, setCurrent] = useState(0)
	const [nickname, setNickname] = useState('')
	const [money, setMoney] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(e.target.value)
	}
	const stringToNumber = (str: string) => {
		return Number(str.replaceAll(',', '').replaceAll('.', ''))
	}
	const changeCash = (e: React.ChangeEvent<HTMLInputElement>) => {
		const money = stringToNumber(e.target.value)
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
					changeMoney={changeCash}
				/>
			),
			icon: <UserOutlined />,
		},
	]
	const items = steps.map((item) => ({ key: item.title, ...item }))
	const isLastStep = current === steps.length - 1

	const next = () => {
		setCurrent(current + 1)
	}
	const checkValidInformation = () => {
		if (!nickname) {
			message.warning('Tên người dùng không thể trống!')
			return false
		}
		return true
	}
	const changeInformation = async () => {
		if (!checkValidInformation()) return

		await changeNicknameAndMoneySuccess(nickname, money)
		changeInfo({ nickname })
		changeMoney({
			name: 'Tiền mặt',
			total: money,
		})
	}
	const handleToDone = async () => {
		if (isLoading) return
		setIsLoading(true)
		await changeInformation()
		setIsLoading(false)
    window.location.reload()    //reload user and wallet info
	}

	return (
		<Wrapper>
			<CenterContent>
				<Steps current={current} items={items} />
				<Content>{steps[current].content}</Content>
				<Footer>
					{!isLastStep && (
						<Button type="primary" onClick={next}>
							Tiếp
						</Button>
					)}
					{isLastStep && (
						<Button type="primary" loading={isLoading} onClick={handleToDone}>
							Hoàn tất
						</Button>
					)}
				</Footer>
			</CenterContent>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 1);
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
const Content = styled.div`
	margin-top: 1rem;
`
const Footer = styled.div`
	margin-top: 1.5rem;
	display: flex;
	justify-content: center;
`

export default FirstLoginSteps
