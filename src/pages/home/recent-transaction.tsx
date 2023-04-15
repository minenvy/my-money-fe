import InOutDetail from '@/components/in-out-detail'
import TitleOfPartContent from './title-of-part-content'

function RecentTransaction() {
	return (
		<>
			<TitleOfPartContent title="Giao dịch gần đây" />
			<InOutDetail type="luong" money={2_000} />
			<InOutDetail type="hoadon" money={2_000} />
			<InOutDetail type="anuong" money={4_000} />
		</>
	)
}

export default RecentTransaction
