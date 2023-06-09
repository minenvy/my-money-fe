import useWindowSize from '@/hooks/use-window-size'
import { Avatar, Typography } from 'antd'
import styled from 'styled-components'

type ExpenseDetailProps = {
	title: string
	subTitle?: Date | string
	icon?: React.ReactNode
	description?: string
	moreDetail?: React.ReactNode
	type?: 'in' | 'out'
}

function ListItem(props: ExpenseDetailProps) {
	const { icon, title, subTitle, description, moreDetail, type } = props
	const windowSize = useWindowSize()

	const isInMobile = windowSize < 768

	return (
		<Wrapper>
			<Avatar src={icon} style={{ backgroundColor: '#1677ff' }}>
				{title && title[0].toUpperCase()}
			</Avatar>
			<Meta>
				<MetaContent>
					<Typography.Text>{title}</Typography.Text>
					{subTitle && (
						<Typography.Text type="secondary">
							{subTitle.toLocaleString()}
						</Typography.Text>
					)}
					{description && !isInMobile && (
						<Typography.Text>{description}</Typography.Text>
					)}
				</MetaContent>
				<MoreDetail data-type-info={type}>{moreDetail}</MoreDetail>
			</Meta>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin: 0.5rem 0;
`
const Meta = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const MetaContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	margin-left: 1rem;
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
