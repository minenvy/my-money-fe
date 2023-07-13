import useWindowSize from '@/hooks/use-window-size'
import MobileReport from '@/components/report/money-report/mobile-report'
import DesktopReport from '@/components/report/money-report/desktop-report'

function Report() {
	const windowSize = useWindowSize()
	const isInMobile = windowSize <= 768

	if (isInMobile) return <MobileReport />

	return <DesktopReport />
}

export default Report
