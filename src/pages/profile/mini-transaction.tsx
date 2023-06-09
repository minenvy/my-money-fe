import ListItem from '@/components/list-item'
import ShadowBox from '@/components/shadow-box'
import formatMoney from '@/utilities/money-format'
import styled from 'styled-components'
import VirtualList from 'rc-virtual-list'
import useFetch from '@/hooks/use-fetch'
import { useRef, useState } from 'react'
import Loading from '@/components/loading'
import useMoneyType from '@/hooks/use-money-type'
import { getFetch } from '@/api/fetch'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import NoData from '@/components/empty'
import { useAuth } from '@/contexts/auth'

const ContainerHeight = 350
const ItemHeight = 44
const Offset = 15
const shadowBoxStyles = {
	margin: '0.25rem 0',
	width: '100%',
	maxWidth: '33rem',
}
interface Transaction {
	id: string
	money: number
	type: string
	createdAt: string | Date
}
interface FetchData {
	isLoading: boolean
	data: Array<Transaction>
}
interface FollowStatus {
	isLoading: boolean
	data: {
		isFollowed: boolean
	}
}

function MiniTransaction() {
	const { id = '' } = useParams()
	const { user } = useAuth()

	if (user.id === id) return <MainContent />

	const {
		data = {
			isFollowed: false,
		},
		isLoading,
	} = useFetch(`check follow ${id}`, '/user/check-follow/' + id) as FollowStatus

	return (
		<>
			{isLoading && <Loading />}
			{data.isFollowed ? (
				<MainContent />
			) : (
				<StyledP>Bạn chưa follow người dùng này</StyledP>
			)}
		</>
	)
}

function MainContent() {
	const { id = '' } = useParams()
	const { data, isLoading } = useFetch(
		`transactions ${id}`,
		`/transaction/get-infinite/${id}/0`
	) as FetchData
	const { icons, valueToLabel } = useMoneyType()
	const [transactions, setTransactions] = useState<Array<Transaction>>()
	const [isFetching, setIsFetching] = useState(false)
	const offset = useRef(0)

	const hasNoData = data === undefined || data === null || data.length === 0
	if (hasNoData)
		return (
			<Wrapper>
				<ShadowBox style={shadowBoxStyles}>
					{isLoading && <Loading />}
					<NoData />
				</ShadowBox>
			</Wrapper>
		)
	if (transactions === undefined) setTransactions(data)

	const onScroll = async (e: React.UIEvent<HTMLElement, UIEvent>) => {
		if (
			e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
			ContainerHeight
		) {
			setIsFetching(true)
			const res = await getFetch(
				'/transaction/get-infinite/' + id + '/' + (offset.current + Offset)
			)
			if (res === null) return
			offset.current += Offset
			setTransactions([...(transactions as Array<Transaction>), ...res])
			setIsFetching(false)
		}
	}

	return (
		<Wrapper>
			<ShadowBox style={shadowBoxStyles}>
				<VirtualList
					data={transactions || []}
					height={ContainerHeight}
					itemHeight={ItemHeight}
					itemKey="id"
					onScroll={onScroll}
				>
					{(item) => (
						<Boundary key={item.id}>
							<ListItem
								icon={icons.find((ic) => ic.value === item.type)?.icon}
								title={valueToLabel(item.type)}
								subTitle={new Date(item.createdAt).toLocaleDateString()}
								moreDetail={formatMoney(item.money)}
							/>
						</Boundary>
					)}
				</VirtualList>
				{isFetching && <Spin />}
			</ShadowBox>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
`
const Boundary = styled.div`
	width: 100%;
	margin: 0 auto;
`
const StyledP = styled.p`
	text-align: center;
`

export default MiniTransaction
