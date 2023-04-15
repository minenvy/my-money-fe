import useWindowSize from '@/hooks/use-window-size'
import formatMoney from '@/utilities/money-format'
import { Avatar, Modal, Typography } from 'antd'
import styled from 'styled-components'

interface IInOutDetailProps {
	type: string
	money: number
	mode?: string
	detail?: string
	percent?: string
}

function InOutDetail(props: IInOutDetailProps) {
	const { type, money, mode = '', percent = '' } = props
	const windowSize = useWindowSize()
	const [modalApi, contextHolder] = Modal.useModal()

	const typeMoney = 'in'
	const isInMobile = windowSize < 768
	const name = 'Ăn uống'
	const detail = 'ga bo lon rau nuoc muc bat dua chao xoong noi'

	const showDetail = () => {
		const modal = modalApi.info({
			title: name,
			centered: true,
			content: (
				<>
					<Typography.Text>{formatMoney(money)}</Typography.Text>
					<br></br>
					<Typography.Text>{detail}</Typography.Text>
				</>
			),
			onOk: () => modal.destroy(),
		})
	}

	return (
		<>
			{contextHolder}
			<Wrapper
				onClick={mode === 'mini' || isInMobile ? showDetail : () => {}}
				data-mini-mode-info={mode === 'mini' || isInMobile}
			>
				<Avatar src={''} alt="icon" />
				<NameAndMoney>
					<Name>
						<Typography.Text strong>{name}</Typography.Text>
						{detail && mode !== 'mini' && !isInMobile && (
							<StyledText ellipsis>{detail}</StyledText>
						)}
						<Percent data-type-info={typeMoney}>
							{percent ? percent : formatMoney(money)}
						</Percent>
					</Name>
					<Typography.Text type="secondary">
						{percent ? formatMoney(money) : ''}
					</Typography.Text>
				</NameAndMoney>
			</Wrapper>
		</>
	)
}

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-top: 1rem;
	&[data-mini-mode-info='true'] {
		cursor: pointer;
	}
`
const NameAndMoney = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`
const Name = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const StyledText = styled(Typography.Text)`
	max-width: 40vw !important;
`
const Percent = styled.span`
	color: red;
	&[data-type-info='in'] {
		color: #27dc27;
	}
`

export default InOutDetail
