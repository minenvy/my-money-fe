import { useAuth } from '@/contexts/auth'
import useWindowSize from '@/hooks/use-window-size'
import Icon from '@ant-design/icons'
import { Avatar, Button, Typography } from 'antd'
import styled from 'styled-components'

const profileMenuIcon = () => (
	<svg height="24" role="img" viewBox="0 0 24 24" width="24">
		<title>Options</title>
		<circle
			cx="12"
			cy="12"
			fill="none"
			r="8.635"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
		></circle>
		<path
			d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
			fill="none"
			stroke="currentColor"
			strokeLinejoin="round"
			strokeWidth="2"
		></path>
	</svg>
)
function Header() {
	const windowSize = useWindowSize()
	const { user } = useAuth()

	const isInMobile = windowSize <= 768

	return (
		<header>
			<Wrapper>
				<AvatarBox>
					<AvatarBoundary>
						<StyledAvatar src={user?.image || ''} size={isInMobile ? 75 : 150}>
							{(user.username[0] || '').toUpperCase()}
						</StyledAvatar>
					</AvatarBoundary>
				</AvatarBox>
				<InfoBox>
					<div>
						<StyledSpan>{user.username}</StyledSpan>
						{isInMobile && <StyledIcon component={profileMenuIcon} />}
						<StyledButton>Thay đổi profile</StyledButton>
						{!isInMobile && <StyledIcon component={profileMenuIcon} />}
					</div>
					{!isInMobile && (
						<MoreInfo>
							<span>
								<strong>0 </strong>giao dịch
							</span>
							<ChildMoreInfo>
								<strong>5 </strong>followers
							</ChildMoreInfo>
							<ChildMoreInfo>
								<strong>6 </strong>following
							</ChildMoreInfo>
						</MoreInfo>
					)}
					{!isInMobile && (
						<Bio>
							<Typography.Text>
								I dont want to share anything about myself anymore. Hmmm!
							</Typography.Text>
						</Bio>
					)}
				</InfoBox>
			</Wrapper>
			{isInMobile && (
				<Bio>
					<Typography.Text>
						I dont want to share anything about myself anymore. Hmmm!
					</Typography.Text>
				</Bio>
			)}
		</header>
	)
}

const Wrapper = styled.div`
	display: flex;
`
const AvatarBox = styled.div`
	flex: 1;
`
const StyledAvatar = styled(Avatar)`
	background-color: #1890ff;
`
const AvatarBoundary = styled.div`
	width: fit-content;
	margin: 0 auto;
`
const InfoBox = styled.div`
	flex: 2;
	margin-left: 2rem;
`
const StyledSpan = styled.span`
	font-size: 1.25rem;
`
const StyledButton = styled(Button)`
	margin-left: 1.25rem;
	@media screen and (max-width: 768px) {
		margin: 0;
		margin-top: 1rem;
		display: block;
	}
`
const MoreInfo = styled.div`
	margin-top: 1.875rem;
`
const ChildMoreInfo = styled.span`
	margin-left: 2.75rem;
`
const Bio = styled.div`
	margin-top: 1rem;
	text-align: center;
`
const StyledIcon = styled(Icon)`
	margin-left: 1.25rem;
	cursor: pointer;
`

export default Header
