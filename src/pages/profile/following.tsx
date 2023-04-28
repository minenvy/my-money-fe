import InOutDetail from '@/components/in-out-detail'
import ShadowBox from '@/components/shadow-box'
import { Button } from 'antd'
import styled from 'styled-components'

function Following() {
	return (
		<Wrapper>
			<ShadowBox style={{ margin: '0.25rem 0' }}>
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Viet Dang"
						subTitle={new Date()}
						rightPart={<Button>Follow</Button>}
						mode="mini"
					/>
				</Boundary>
			
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Viet Dang"
						subTitle={new Date()}
						rightPart={<Button>Follow</Button>}
						mode="mini"
					/>
				</Boundary>
			
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Viet Dang"
						subTitle={new Date()}
						rightPart={<Button>Follow</Button>}
						mode="mini"
					/>
				</Boundary>
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Viet Dang"
						subTitle={new Date()}
						rightPart={<Button>Follow</Button>}
						mode="mini"
					/>
				</Boundary>
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Viet Dang"
						subTitle={new Date()}
						rightPart={<Button>Follow</Button>}
						mode="mini"
					/>
				</Boundary>
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Viet Dang"
						subTitle={new Date()}
						rightPart={<Button>Follow</Button>}
						mode="mini"
					/>
				</Boundary>
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Viet Dang"
						subTitle={new Date()}
						rightPart={<Button>Follow</Button>}
						mode="mini"
					/>
				</Boundary>
			
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Viet Dang"
						subTitle={new Date()}
						rightPart={<Button>Follow</Button>}
						mode="mini"
					/>
				</Boundary>
			
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Viet Dang"
						subTitle={new Date()}
						rightPart={<Button>Follow</Button>}
						mode="mini"
					/>
				</Boundary>
			</ShadowBox>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	max-height: 32rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
	@media screen and (max-width: 768px) {
	}
`
const Boundary = styled.div`
	width: 30rem;
	@media screen and (max-width: 768px) {
		width: 19rem;
	}
`

export default Following
