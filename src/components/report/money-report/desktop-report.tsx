import reportTypes from '@/constants/report'
import { Tabs } from 'antd'
import MoneyReportLayout from './money-report-layout'
import Budget from '@/components/report/budget/budgets'
import { useLocation, useNavigate } from 'react-router-dom'

const childrenTabs: Array<React.ReactNode> = [
	<MoneyReportLayout chartType="bar" />,
	<MoneyReportLayout chartType="line-out" />,
	<MoneyReportLayout chartType="line-in" />,
	<Budget />,
]

function DesktopReport() {
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

export default DesktopReport
