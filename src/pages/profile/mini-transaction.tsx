import InOutDetail from '@/components/in-out-detail'
import ShadowBox from '@/components/shadow-box'
import formatMoney from '@/utilities/money-format'
import { Button } from 'antd'
import styled from 'styled-components'

function MiniTransaction() {
	return (
		<Wrapper>
			<ShadowBox style={{ margin: '0.25rem 0' }}>
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Ăn uống"
						subTitle={new Date()}
						rightPart={formatMoney(2_000)}
						mode="mini"
					/>
				</Boundary>
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Ăn uống"
						subTitle={new Date()}
						rightPart={formatMoney(2_000)}
						mode="mini"
					/>
				</Boundary>
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Ăn uống"
						subTitle={new Date()}
						rightPart={formatMoney(2_000)}
						mode="mini"
					/>
				</Boundary>
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Ăn uống"
						subTitle={new Date()}
						rightPart={formatMoney(2_000)}
						mode="mini"
					/>
				</Boundary>
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Ăn uống"
						subTitle={new Date()}
						rightPart={formatMoney(2_000)}
						mode="mini"
					/>
				</Boundary>
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Ăn uống"
						subTitle={new Date()}
						rightPart={formatMoney(2_000)}
						mode="mini"
					/>
				</Boundary>
				<Boundary>
					<InOutDetail
						id="abc"
						icon=""
						title="Ăn uống"
						subTitle={new Date()}
						rightPart={formatMoney(2_000)}
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

export default MiniTransaction
