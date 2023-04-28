import reportTypes from '@/constants/report-type'
import { Avatar, Button, Tabs } from 'antd'
import { useState } from 'react'
import MoneyReportLayout from './money-report-layout'
import useWindowSize from '@/hooks/use-window-size'
import bieudocot from '@/assets/bieudocot.jpg'
import duongdo from '@/assets/duongdo.webp'
import duongxanh from '@/assets/duongxanh.jpg'
import ngansach from '@/assets/ngansach.jpg'
import ShadowBox from '@/components/shadow-box'
import styled from 'styled-components'
import { LeftOutlined } from '@ant-design/icons'
import Budget from './budget'

const childrenTabs: Array<React.ReactNode> = [
	<MoneyReportLayout chartType="bar" />,
	<MoneyReportLayout chartType="line-out" />,
	<MoneyReportLayout chartType="line-in" />,
	<Budget />,
]

function Report() {
	const windowSize = useWindowSize()

	const isInMobile = windowSize <= 768

	return <>{isInMobile ? <ReportInMobile /> : <ReportInDesktop />}</>
}

function ReportInDesktop() {
	const [activeTabKey, setActiveTabKey] = useState(reportTypes[0].key)

	const tabItems = reportTypes.map((type, index) => {
		return {
			...type,
			children: childrenTabs[index],
		}
	})

	const handleChangeTab = (key: string) => {
		setActiveTabKey(key)
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
	const [pageId, setPageId] = useState(-1)

	return (
		<>
			{pageId < 0 ? (
				<FlexBox>
					<Box>
						<ShadowBox>
							<StyledButton
								onClick={() => {
									setPageId(0)
								}}
							>
								<Avatar src={bieudocot} shape="square" />
								<Label>{labels[0]}</Label>
							</StyledButton>
						</ShadowBox>
					</Box>
					<Box>
						<ShadowBox>
							<StyledButton
								onClick={() => {
									setPageId(1)
								}}
							>
								<Avatar src={duongdo} shape="square" />
								<Label>{labels[1]}</Label>
							</StyledButton>
						</ShadowBox>
					</Box>
					<Box>
						<ShadowBox>
							<StyledButton
								onClick={() => {
									setPageId(2)
								}}
							>
								<Avatar src={duongxanh} shape="square" />
								<Label>{labels[2]}</Label>
							</StyledButton>
						</ShadowBox>
					</Box>
					<Box>
						<ShadowBox>
							<StyledButton
								onClick={() => {
									setPageId(3)
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
					<Title backToHome={() => setPageId(-1)} title={labels[pageId]} />
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
