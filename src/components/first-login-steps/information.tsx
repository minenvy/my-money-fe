import { Form, Input } from 'antd'
import styled from 'styled-components'
import useWindowSize from '@/hooks/use-window-size'

type InfoProps = {
	nickname: string
	money: number
	changeNickname: React.ChangeEventHandler<HTMLInputElement>
	changeMoney: React.ChangeEventHandler<HTMLInputElement>
}

function Information(props: InfoProps) {
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
				<Form.Item label="Số tiền mặt">
					<Input value={money.toLocaleString()} onChange={changeMoney} />
				</Form.Item>
			</Form>
		</>
	)
}

const StyledP = styled.p`
	text-align: center;
	margin-bottom: 1rem;
`

export default Information
