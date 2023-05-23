import styled from 'styled-components'
import VirtualList from 'rc-virtual-list'
import useFetch from '@/hooks/use-fetch'
import { useRef, useState } from 'react'
import Loading from '@/components/loading'
import { getFetch } from '@/api/fetch'
import { Input, Spin, Typography } from 'antd'
import Person from './person'
import NoData from '@/components/empty'
import { useParams } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import useDebounce from '@/hooks/use-debounce'

const ContainerHeight = 350
const ItemHeight = 72
const Offset = 15

interface IPerson {
	id: string
	nickname: string
	image: string
	bio: string
	isFollowed: boolean
}
interface IData {
	isLoading: boolean
	data: Array<IPerson>
}

function ProposersList() {
	const debounceSearch = useDebounce('')

	const changeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
		debounceSearch.setValue(e.target.value)
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

interface IProps {
	search: string
}
function MainContent(props: IProps) {
	const { search } = props
	const { id = '' } = useParams()
	const { data, isLoading } = useFetch(
		`proposers ${id} ${search}`,
		`/user/get-proposers/${id}/0${search ? `/${search}` : ''}`,
		[search]
	) as IData
	const [proposers, setProposers] = useState<Array<IPerson>>()
	const [isFetching, setIsFetching] = useState(false)
	const offset = useRef(0)
	const [previousSearch, setPreviousSearch] = useState(search)

	if (previousSearch !== search) {
		offset.current = 0
		setPreviousSearch(search)
		setProposers(data)
	}

	if (isLoading) return <Loading />
	if (data === undefined || data === null) return null
	if (data.length === 0) return <NoData />
	if (proposers === undefined) setProposers(data)

	const onScroll = async (e: React.UIEvent<HTMLElement, UIEvent>) => {
		if (
			e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
			ContainerHeight
		) {
			setIsFetching(true)
			const res = await getFetch(
				`/user/get-proposers/${id}/${offset.current + Offset}${
					search ? `/${search}` : ''
				}`
			)
			if (res === null) return
			offset.current += Offset
			setProposers([...(proposers as Array<IPerson>), ...res])
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
