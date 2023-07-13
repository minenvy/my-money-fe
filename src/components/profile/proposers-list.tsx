import styled from 'styled-components'
import VirtualList from 'rc-virtual-list'
import useFetch from '@/hooks/use-fetch'
import { useRef, useState } from 'react'
import Loading from '@/components/loading'
import { Input, Spin, Typography } from 'antd'
import NoData from '@/components/empty'
import { useParams } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import useDebounce from '@/hooks/use-debounce'
import { PersonInterface } from '@/interfaces/profile'
import { getProposers } from '@/api/user'
import Person from './person'

const ContainerHeight = 350
const ItemHeight = 72
const Offset = 15

function ProposersList() {
	const debounceSearch = useDebounce('')

	const changeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
		debounceSearch.changeValue(e.target.value)
	}

	return (
		<Boundary>
			<Typography.Text strong>Những người có thể bạn biết</Typography.Text>
			<Search>
				<StyledSearch
					prefix={<SearchOutlined />}
					placeholder="Tìm kiếm theo tên ..."
					value={debounceSearch.previousValue}
					onChange={changeSearchKey}
				/>
			</Search>
			<MainContent search={debounceSearch.value as string} />
		</Boundary>
	)
}

type Props = {
	search: string
}
function MainContent(props: Props) {
	const { search } = props
	const { id = '' } = useParams()
	const { data, isLoading } = useFetch<Array<PersonInterface>>(
		`proposers ${id} ${search}`,
		() => getProposers(id, 0, search)
	)
	const [proposers, setProposers] = useState<Array<PersonInterface>>()
	const [isFetching, setIsFetching] = useState(false)
	const offset = useRef(0)
	const [previousSearch, setPreviousSearch] = useState(search)

	const hasNoData = data === null || data.length === 0
	if (hasNoData)
		return (
			<>
				{isLoading && <Loading />}
				<NoData />
			</>
		)
	if (proposers === undefined) setProposers(data)
	if (previousSearch !== search) {
		offset.current = 0
		setPreviousSearch(search)
		setProposers(data)
	}

	const onScroll = async (e: React.UIEvent<HTMLElement, UIEvent>) => {
		if (
			e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
			ContainerHeight
		) {
			setIsFetching(true)
			const res = await getProposers(id, offset.current + Offset, search)
			offset.current += Offset
			setProposers([...(proposers as Array<PersonInterface>), ...res])
			setIsFetching(false)
		}
	}

	return (
		<>
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
		</>
	)
}

const Boundary = styled.div`
	width: 100%;
	margin: 1rem auto 0;
`
const Search = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
`
const StyledSearch = styled(Input)`
	margin: 0.5rem 0;
	width: 100%;
	max-width: 20rem;
`

export default ProposersList
