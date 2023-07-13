import { Image, Typography } from 'antd'
import styled from 'styled-components'
import welcome from '@/assets/images/welcome.png'

function Welcome() {
	return (
		<Step>
			<StyledImage width={200} src={welcome} preview={false} />
			<Typography.Text>Chào mừng bạn đến với My Money</Typography.Text>
		</Step>
	)
}

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

export default Welcome
