import useWindowSize from '@/hooks/use-window-size'
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

function ListItem(props: IInOutDetailProps) {
	const { icon, title, subTitle, description, moreDetail, type, mode } = props
	const windowSize = useWindowSize()

	const isInMobile = windowSize < 768

	return (
		<Wrapper data-mini-mode-info={mode === 'mini' || isInMobile}>
			<Meta>
				<Avatar src={icon} style={{ backgroundColor: '#1677ff' }}>
					{title[0].toUpperCase()}
				</Avatar>
				<MetaContent>
					<Title>
						<Typography.Text
							style={{
								width: mode !== 'mini' && !isInMobile ? '20%' : 'unset',
							}}
						>
							{title}
						</Typography.Text>
					</Title>

					<Typography.Text type="secondary">
						{subTitle.toLocaleString()}
					</Typography.Text>
					{description && mode !== 'mini' && !isInMobile && (
						<Description>
							<StyledText ellipsis>{description}</StyledText>
						</Description>
					)}
				</MetaContent>
			</Meta>
			<MoreDetail data-type-info={type}>{moreDetail}</MoreDetail>
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
const MetaContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	margin-left: 1rem;
`
const Title = styled.div`
	flex: 1;
`
const Meta = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const Description = styled.div`
	text-overflow: ellipsis;
`
const StyledText = styled(Typography.Text)`
	max-width: 58vw !important;
`
const MoreDetail = styled.span`
	&[data-type-info='out'] {
		color: red;
	}
	&[data-type-info='in'] {
		color: #27dc27;
	}
`

export default ListItem
