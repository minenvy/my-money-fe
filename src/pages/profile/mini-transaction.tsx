import ListItem from '@/components/list-item'
import ShadowBox from '@/components/shadow-box'
import formatMoney from '@/utilities/money-format'
import styled from 'styled-components'
import VirtualList from 'rc-virtual-list'
import useFetch from '@/hooks/use-fetch'
import { useRef, useState } from 'react'
import Loading from '@/components/loading'
import { icons, valueToLabel } from '@/constants/money-type'
import { getFetch } from '@/api/fetch'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import NoData from '@/components/empty'

const ContainerHeight = 350
const ItemHeight = 44
const Offset = 15
const shadowBoxStyles = {
	margin: '0.25rem 0',
	width: '100%',
	maxWidth: '33rem',
}
interface ITransaction {
	id: string
	money: number
	type: string
	createdAt: string | Date
}
interface IData {
	isLoading: boolean
	data: Array<ITransaction>
}

function MiniTransaction() {
	const { id = '' } = useParams()
	const { data, isLoading } = useFetch(
		`transactions ${id}`,
		`/transaction/get-infinite/${id}/0`
	) as IData
	const [transactions, setTransactions] = useState<Array<ITransaction>>()
	const [isFetching, setIsFetching] = useState(false)
	const offset = useRef(0)

	if (isLoading) return <Loading />
	if (data === undefined) return null
	if (data.length === 0)
		return (
			<Wrapper>
				<ShadowBox style={shadowBoxStyles}>
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
			const res = (await getFetch(
				'/transaction/get-infinite/' + id + '/' + (offset.current + Offset)
			)) as Response
			if (!res || !res.ok) return
			offset.current += Offset
			const resData = await res.json()
			setTransactions([...(transactions as Array<ITransaction>), ...resData])
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

export default MiniTransaction
