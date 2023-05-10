import NoData from '@/components/empty'
import ListItem from '@/components/list-item'
import ShadowBox from '@/components/shadow-box'
import getRemainingDays from '@/utilities/get-remaining-days-in-month'
import formatMoney from '@/utilities/money-format'
import { PlusOutlined } from '@ant-design/icons'
import { Avatar, FloatButton, Modal, Spin, Typography } from 'antd'
import styled from 'styled-components'
import BudgetInfoModal from './budget-info-modal'
import useWindowSize from '@/hooks/use-window-size'
import NewBudgetModal from './new-budget-modal'
import { Fragment, useRef, useState } from 'react'
import useFetch from '@/hooks/use-fetch'
import Loading from '@/components/loading'
import VirtualList from 'rc-virtual-list'
import { getFetch } from '@/api/fetch'

const Offset = 15
const ContainerHeight = 576
const ItemHeight = 115

function Budget() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<Wrapper>
			<Budgets />
			<FloatButton
				type="primary"
				icon={<PlusOutlined />}
				style={{ bottom: 80 }}
				onClick={() => setIsModalOpen(true)}
			/>
			<NewBudgetModal open={isModalOpen} close={() => setIsModalOpen(false)} />
		</Wrapper>
	)
}

interface IBudget {
	id: string
	name: string
	money: number
	usedMoney: number
	startDate: Date
	endDate: Date
	options: string
}
interface IData {
	isLoading: boolean
	data: Array<IBudget>
}

function Budgets() {
	const { data, isLoading } = useFetch(
		'budgets',
		'/budget/get-infinite/0'
	) as IData
	const [budgets, setBudgets] = useState<Array<IBudget>>()
	const [isFetching, setIsFetching] = useState(false)
	const offset = useRef(0)

	if (isLoading) return <Loading />
	if (data === undefined) return null
	if (budgets === undefined) setBudgets(data)

	const hasData = data.length > 0
	if (!hasData)
		return (
			<Wrapper>
				<ShadowBox>
					<NoData />
				</ShadowBox>
			</Wrapper>
		)

	const onScroll = async (e: React.UIEvent<HTMLElement, UIEvent>) => {
		if (
			e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
			ContainerHeight
		) {
			setIsFetching(true)
			const res = (await getFetch(
				'/budget/get-infinite/' + (offset.current + Offset)
			).catch(() => [])) as Response
			if (!res.ok) return
			offset.current += Offset
			const resData = await res.json()
			setBudgets([...(budgets as Array<IBudget>), ...resData])
			setIsFetching(false)
		}
	}

	return (
		<Wrapper>
			<VirtualList
				data={budgets || []}
				height={ContainerHeight}
				itemHeight={ItemHeight}
				itemKey="id"
				onScroll={onScroll}
			>
				{(item: IBudget) => {
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

interface IDetailProps {
	id: string
	icon?: React.ReactNode
	name: string
	startDate: Date
	endDate: Date
	totalMoney: number
	usedMoney: number
	options: string
}

function BudgetDetail(props: IDetailProps) {
	const { id, icon, name, startDate, endDate, totalMoney, usedMoney, options } =
		props
	const windowSize = useWindowSize()

	const isInMobile = windowSize <= 768
	const subTitle =
		startDate.toLocaleDateString() + ' - ' + endDate.toLocaleDateString()
	const percent = (usedMoney / totalMoney) * 100
	const remainingMoney = totalMoney - usedMoney
	const today = new Date()
	const remainingDays = getRemainingDays(today, endDate)

	const handleClick = () => {
		const modal = Modal.info({
			title: name,
			icon: (
				<Avatar style={{ backgroundColor: '#1677ff' }}>
					{name[0].toUpperCase()}
				</Avatar>
			),
			content: (
				<BudgetInfoModal
					id={id}
					totalMoney={totalMoney}
					usedMoney={usedMoney}
					startDate={startDate}
					endDate={endDate}
					options={options}
				/>
			),
			centered: true,
			width: isInMobile ? '100%' : '40rem',
			okButtonProps: { type: 'default' },
			onOk: () => modal.destroy(),
		})
	}

	return (
		<DetailWrapper onClick={handleClick}>
			<ShadowBox>
				<ListItem
					title={name}
					icon={icon}
					subTitle={subTitle}
					moreDetail={formatMoney(totalMoney)}
				/>
				<TotalLine>
					<UsedLine
						style={{
							width: `${percent}%`,
							backgroundColor:
								percent < 30 ? '#58ff79' : percent < 70 ? '#e4ff58' : '#ff5858',
						}}
					/>
				</TotalLine>
				<DueDate>
					<Typography.Text type="secondary">
						{remainingDays > 0 ? `Còn ${remainingDays} ngày` : 'Hết hạn'}
					</Typography.Text>
					<Typography.Text type="secondary">
						{formatMoney(remainingMoney)}
					</Typography.Text>
				</DueDate>
			</ShadowBox>
		</DetailWrapper>
	)
}

const Wrapper = styled.div`
	max-width: 30rem;
	max-height: 36rem;
	width: 100%;
	margin: 0 auto;
`
const TotalLine = styled.div`
	width: 100%;
	height: 0.5rem;
	background-color: #ddd;
	border-radius: 4px;
	margin-top: 0.75rem;
`
const UsedLine = styled.div`
	height: 0.5rem;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
`
const DueDate = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 0.25rem;
`
const DetailWrapper = styled.div``

export default Budget
