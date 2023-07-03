import reportTypes from '@/constants/report'
import { Avatar, Button, Tabs } from 'antd'
import MoneyReportLayout from './money-report-layout'
import useWindowSize from '@/hooks/use-window-size'
import ngansach from '@/assets/images/ngansach.jpg'
import ShadowBox from '@/components/shadow-box'
import styled from 'styled-components'
import {
	BarChartOutlined,
	LeftOutlined,
	LineChartOutlined,
} from '@ant-design/icons'
import Budget from './budget'
import { useLocation, useNavigate } from 'react-router-dom'

const childrenTabs: Array<React.ReactNode> = [
	<MoneyReportLayout chartType="bar" />,
	<MoneyReportLayout chartType="line-out" />,
	<MoneyReportLayout chartType="line-in" />,
	<Budget />,
]
const page = ['all', 'out', 'in', 'budget']

function Report() {
	const windowSize = useWindowSize()

	const isInMobile = windowSize <= 768
	if (isInMobile) return <ReportInMobile />

	return <ReportInDesktop />
}

function ReportInDesktop() {
	const navigate = useNavigate()
	const location = useLocation()
	const pathname = location.pathname
	const partPathname = pathname.split('/')
	const path = partPathname[partPathname.length - 1]
	const activeTabKey = path !== 'report' ? path : 'all'

	const tabItems = reportTypes.map((type, index) => {
		return {
			...type,
			children: childrenTabs[index],
		}
	})

	const handleChangeTab = (key: string) => {
		navigate('/report/' + key)
	}

	return (
		<Tabs
			activeKey={activeTabKey}
			items={tabItems}
			onChange={handleChangeTab}
		/>
	)
}

const labels = [
	'Tình hình thu chi',
	'Phân tích chi tiêu',
	'Phân tích thu',
	'Ngân sách',
]
function Title(props: { backToHome: Function; title: string }) {
	const { backToHome, title } = props
	return (
		<HeaderWrapper>
			<Button
				type="dashed"
				icon={<LeftOutlined />}
				onClick={() => backToHome()}
			/>
			<HeaderTitle>{title}</HeaderTitle>
		</HeaderWrapper>
	)
}
function ReportInMobile() {
	const navigate = useNavigate()
	const location = useLocation()
	const pathname = location.pathname
	const partPathname = pathname.split('/')
	const path = partPathname[partPathname.length - 1]
	const pageId = path === 'report' ? -1 : page.indexOf(path)

	return (
		<>
			{pageId < 0 ? (
				<FlexBox>
					<Box>
						<ShadowBox>
							<StyledButton
								onClick={() => {
									navigate('/report/all')
								}}
							>
								<BarChartOutlined
									style={{ color: '#1890ff', fontSize: '2rem' }}
								/>
								<Label>{labels[0]}</Label>
							</StyledButton>
						</ShadowBox>
					</Box>
					<Box>
						<ShadowBox>
							<StyledButton
								onClick={() => {
									navigate('/report/out')
								}}
							>
								<LineChartOutlined style={{ color: 'red', fontSize: '2rem' }} />
								<Label>{labels[1]}</Label>
							</StyledButton>
						</ShadowBox>
					</Box>
					<Box>
						<ShadowBox>
							<StyledButton
								onClick={() => {
									navigate('/report/in')
								}}
							>
								<LineChartOutlined
									style={{ color: 'green', fontSize: '2rem' }}
								/>
								<Label>{labels[2]}</Label>
							</StyledButton>
						</ShadowBox>
					</Box>
					<Box>
						<ShadowBox>
							<StyledButton
								onClick={() => {
									navigate('/report/budget')
								}}
							>
								<Avatar src={ngansach} shape="square" />
								<Label>{labels[3]}</Label>
							</StyledButton>
						</ShadowBox>
					</Box>
				</FlexBox>
			) : (
				<>
					<Title
						backToHome={() => navigate('/report')}
						title={labels[pageId]}
					/>
					{childrenTabs[pageId]}
				</>
			)}
		</>
	)
}

const FlexBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-wrap: wrap;
`
const Box = styled.div`
	width: 45%;
`
const StyledButton = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`
const Label = styled.p`
	font-size: 0.75rem;
	margin-top: 0.5rem;
`
const HeaderWrapper = styled.div`
	display: flex;
	height: 2rem;
	margin-bottom: 1rem;
`
const HeaderTitle = styled.p`
	flex: 1;
	text-align: center;
	padding: 0.25rem 0;
	font-size: 1.1rem;
`

export default Report
