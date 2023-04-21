import NoData from '@/components/empty'
import InOutDetail from '@/components/in-out-detail'
import ShadowBox from '@/components/shadow-box'
import getRemainingDays from '@/utilities/get-remaining-days-in-month'
import formatMoney from '@/utilities/money-format'
import { PlusOutlined } from '@ant-design/icons'
import { Avatar, FloatButton, Modal, Tooltip, Typography } from 'antd'
import styled from 'styled-components'
import BudgetModalContent from './budget-modal-content'
import useWindowSize from '@/hooks/use-window-size'

function Budget() {
	const hasData = false

	return (
		<Wrapper>
			{hasData ? (
				<ShadowBox>
					<NoData />
				</ShadowBox>
			) : (
				<>
					<BudgetDetail
						id="abc"
						icon=""
						title="ohoho"
						subTitle={new Date()}
						totalMoney={1_000_000}
						usedMoney={700_000}
					/>
					<FloatButton
						type="primary"
						icon={<PlusOutlined />}
						style={{ bottom: 80 }}
					/>
				</>
			)}
		</Wrapper>
	)
}

interface IDetailProps {
	id: string
	icon: string
	title: string
	subTitle: Date
	totalMoney: number
	usedMoney: number
}

function BudgetDetail(props: IDetailProps) {
	const { id, icon, title, subTitle, totalMoney, usedMoney } = props
	const [modalApi, contextHolder] = Modal.useModal()
	const windowSize = useWindowSize()

	const isInMobile = windowSize <= 768
	const percent = (usedMoney / totalMoney) * 100
	const remainingMoney = totalMoney - usedMoney
	const remainingDays = getRemainingDays(subTitle)

	const handleClick = () => {
		const modal = modalApi.info({
			title,
			icon: <Avatar src={icon} />,
			content: <BudgetModalContent id={id} />,
			centered: true,
			width: isInMobile ? '100%' : '50rem',
			okButtonProps: { type: 'default' },
			onOk: () => modal.destroy(),
		})
	}

	return (
		<>
			<DetailWrapper onClick={handleClick}>
				<ShadowBox>
					<InOutDetail
						id={id}
						title={title}
						icon={icon}
						subTitle={subTitle}
						rightNumber={totalMoney}
						mode="mini"
					/>
					<TotalLine>
						<UsedLine
							style={{
								width: `${percent}%`,
								backgroundColor:
									percent < 30
										? '#58ff79'
										: percent < 70
										? '#e4ff58'
										: '#ff5858',
							}}
						/>
					</TotalLine>
					<DueDate>
						<Typography.Text type="secondary">
							Còn {remainingDays} ngày
						</Typography.Text>
						<Typography.Text type="secondary">
							{formatMoney(remainingMoney)}
						</Typography.Text>
					</DueDate>
				</ShadowBox>
			</DetailWrapper>
			{contextHolder}
		</>
	)
}

const Wrapper = styled.div`
	max-width: 30rem;
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
