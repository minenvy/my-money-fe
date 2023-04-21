import { icons } from '@/constants/money-type'
import useWindowSize from '@/hooks/use-window-size'
import generateBackgroundColor from '@/utilities/generate-color'
import formatMoney from '@/utilities/money-format'
import { Avatar, Typography } from 'antd'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

interface IInOutDetailProps {
	id: string
	icon: string
	title: string
	subTitle: Date | string
	description?: string
	rightNumber?: string | number
	mode?: string
}

function InOutDetail(props: IInOutDetailProps) {
	const { id, icon, title, subTitle, description, rightNumber, mode } = props
	const location = useLocation()
	const windowSize = useWindowSize()

	const typeMoney = 'in'
	const isInMobile = windowSize < 768

	return (
		<>
			<Wrapper
				data-mini-mode-info={mode === 'mini' || isInMobile}
			>
				<Avatar
					src={icon}
					style={{ backgroundColor: generateBackgroundColor() }}
				>
					{typeof subTitle === 'string' ? subTitle : subTitle.getMonth() + 1}
				</Avatar>
				<NameAndMoney>
					<Name>
						<Typography.Text strong>{title}</Typography.Text>
						{description && mode !== 'mini' && !isInMobile && (
							<StyledText ellipsis>{description}</StyledText>
						)}
						<Percent data-type-info={typeMoney}>
							{typeof rightNumber === 'number'
								? formatMoney(rightNumber)
								: rightNumber}
						</Percent>
					</Name>
					<Typography.Text type="secondary">
						{subTitle.toLocaleString()}
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
