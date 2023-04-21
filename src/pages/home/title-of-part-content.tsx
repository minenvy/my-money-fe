import { Typography } from 'antd'
import styled from 'styled-components'

interface IProps {
	title: string
}

function TitleOfPartContent(props: IProps) {
	const { title } = props

	return (
		<TitleFlexBox>
			<Typography.Title level={5}>{title}</Typography.Title>
			<StyledViewMoreTitle level={5}>
				Xem tất cả
			</StyledViewMoreTitle>
		</TitleFlexBox>
	)
}

const TitleFlexBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const StyledViewMoreTitle = styled(Typography.Title)`
	margin-top: 0 !important;
	cursor: pointer;
`

export default TitleOfPartContent
