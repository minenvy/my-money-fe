import styled from 'styled-components'
import VirtualList from 'rc-virtual-list'
import useFetch from '@/hooks/use-fetch'
import { useRef, useState } from 'react'
import Loading from '@/components/loading'
import { getFetch } from '@/api/fetch'
import { Spin, Typography } from 'antd'
import Person from './person'
import NoData from '@/components/empty'
import { useParams } from 'react-router-dom'

const ContainerHeight = 350
const ItemHeight = 72
const Offset = 15

interface IPerson {
	id: string
	nickname: string
	image: string
	bio: string
}
interface IData {
	isLoading: boolean
	data: Array<IPerson>
}

function ProposersList() {
	const { id = '' } = useParams()
	const { data, isLoading } = useFetch(
		`proposers ${id}`,
		`/user/get-proposers/${id}/0`
	) as IData
	const [proposers, setProposers] = useState<Array<IPerson>>()
	const [isFetching, setIsFetching] = useState(false)
	const offset = useRef(0)

	if (isLoading) return <Loading />
	if (data === undefined) return null
	if (data.length === 0)
		return (
			<Boundary>
				<Typography.Text strong>Những người có thể bạn biết</Typography.Text>
				<NoData />
			</Boundary>
		)
	if (proposers === undefined) setProposers(data)

	const onScroll = async (e: React.UIEvent<HTMLElement, UIEvent>) => {
		if (
			e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
			ContainerHeight
		) {
			setIsFetching(true)
			const res = await getFetch(
				'/user/get-proposers/' + id + '/' + (offset.current + Offset)
			) as Response
			if (!res || !res.ok) return
			offset.current += Offset
			const resData = await res.json()
			setProposers([...(proposers as Array<IPerson>), ...resData])
			setIsFetching(false)
		}
	}

	return (
		<Boundary>
			<Typography.Text strong>Những người có thể bạn biết</Typography.Text>
			<VirtualList
				data={proposers || []}
				height={ContainerHeight}
				itemHeight={ItemHeight}
				itemKey="id"
				onScroll={onScroll}
			>
				{(item) => <Person {...item} key={item.id} />}
			</VirtualList>
			{isFetching && <Spin />}
		</Boundary>
	)
}

const Boundary = styled.div`
	width: 100%;
	margin: 1rem auto 0;
`

export default ProposersList
