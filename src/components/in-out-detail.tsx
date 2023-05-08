import useWindowSize from '@/hooks/use-window-size'
import generateBackgroundColor from '@/utilities/generate-color'
import { Avatar, Typography } from 'antd'
import styled from 'styled-components'

interface IInOutDetailProps {
	icon?: React.ReactNode
	title: string
	subTitle: Date | string
	description?: string
	moreDetail?: React.ReactNode
	type?: 'in' | 'out'
	mode?: string
}

function InOutDetail(props: IInOutDetailProps) {
	const {
		icon,
		title,
		subTitle,
		description,
		moreDetail,
		type,
		mode,
	} = props
	const windowSize = useWindowSize()

	const isInMobile = windowSize < 768

	return (
		<Wrapper data-mini-mode-info={mode === 'mini' || isInMobile}>
			<Avatar src={icon} style={{ backgroundColor: '#1677ff' }}>
				{title[0].toUpperCase()}
			</Avatar>
			<NameAndMoney>
				<Name>
					<Typography.Text
						style={{ width: mode !== 'mini' && !isInMobile ? '20%' : 'unset' }}
					>
						{title}
					</Typography.Text>
					{description && mode !== 'mini' && !isInMobile && (
						<Description>
							<StyledText ellipsis>{description}</StyledText>
						</Description>
					)}
					<Percent data-type-info={type}>{moreDetail}</Percent>
				</Name>
				<Typography.Text type="secondary">
					{subTitle.toLocaleString()}
				</Typography.Text>
			</NameAndMoney>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin: 0.5rem 0;
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
const Description = styled.div`
	width: 60%;
	text-align: center;
	text-overflow: ellipsis;
`
const StyledText = styled(Typography.Text)`
	max-width: 40vw !important;
`
const Percent = styled.span`
	&[data-type-info='out'] {
		color: red;
	}
	&[data-type-info='in'] {
		color: #27dc27;
	}
`

export default InOutDetail
