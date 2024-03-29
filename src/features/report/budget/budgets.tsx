import NoData from '@/components/empty'
import ShadowBox from '@/components/shadow-box'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { FloatButton, Input, Spin } from 'antd'
import styled from 'styled-components'
import NewBudgetModal from './new-budget-modal'
import { Fragment, useEffect, useRef, useState } from 'react'
import useFetch from '@/hooks/use-fetch'
import Loading from '@/components/loading'
import VirtualList from 'rc-virtual-list'
import { Budget } from '@/interfaces/budget'
import { getInfiniteBudgets } from '@/api/budget'
import BudgetDetail from './budget-detail'
import ForceUpdateProvider, { useForceUpdate } from '@/contexts/force-update'

const Offset = 15
const ContainerHeight = 576
const ItemHeight = 115

function BudgetList() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<Wrapper>
      <ForceUpdateProvider>
			<Budgets />
			<FloatButton
				type="primary"
				icon={<PlusOutlined />}
				style={{ bottom: 80 }}
				onClick={() => setIsModalOpen(true)}
			/>
			<NewBudgetModal
				open={isModalOpen}
				close={() => setIsModalOpen(false)}
			/>
      </ForceUpdateProvider>
		</Wrapper>
	)
}

function Budgets() {
  const { infiniteNumber } = useForceUpdate()
	const { data, isLoading, refetch } = useFetch<Array<Budget>>('budgets', () =>
		getInfiniteBudgets(0)
	)
	const [budgets, setBudgets] = useState<Array<Budget> | null>()
	const [isFetching, setIsFetching] = useState(false)
	const [searchKey, setSearchKey] = useState('')
	const offset = useRef(0)
	const filteredBudgets = budgets?.filter((budget) =>
		budget.name.toLowerCase().includes(searchKey.toLowerCase())
	)

	useEffect(() => {
		setBudgets(data)
	}, [data])

	useEffect(() => {
		refetch()
	}, [infiniteNumber])

	const hasNoData = data === null || data.length === 0
	if (hasNoData)
		return (
			<Wrapper>
				<ShadowBox>
					{isLoading && <Loading />}
					<NoData />
				</ShadowBox>
			</Wrapper>
		)

	const changeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchKey(e.target.value)
	}
	const onScroll = async (e: React.UIEvent<HTMLElement, UIEvent>) => {
		if (
			e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
			ContainerHeight
		) {
			setIsFetching(true)
			const res = await getInfiniteBudgets(offset.current + Offset)
			offset.current += Offset
			setBudgets([...(budgets as Array<Budget>), ...res])
			setIsFetching(false)
		}
	}

	return (
		<Wrapper>
			<Search>
				<StyledSearch
					prefix={<SearchOutlined />}
					placeholder="Tìm kiếm theo tên ..."
					value={searchKey}
					onChange={changeSearchKey}
				/>
			</Search>
			<VirtualList
				data={filteredBudgets || []}
				height={ContainerHeight}
				itemHeight={ItemHeight}
				itemKey="id"
				onScroll={onScroll}
			>
				{(item: Budget) => {
					const { id, name, money, usedMoney, startDate, endDate, options } =
						item

					return (
						<Fragment key={id}>
							<BudgetDetail
								id={id}
								name={name}
								startDate={new Date(startDate)}
								endDate={new Date(endDate)}
								totalMoney={money}
								usedMoney={usedMoney}
								options={options}
							/>
						</Fragment>
					)
				}}
			</VirtualList>
			{isFetching && <Spin />}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	max-width: 30rem;
	max-height: 36rem;
	width: 100%;
	margin: 0 auto;
`
const Search = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
`
const StyledSearch = styled(Input)`
	margin: 0.5rem 0;
	width: 100%;
	max-width: 30rem;
`

export default BudgetList
