import InOutDetail from '@/components/in-out-detail'
import TitleOfPartContent from './title-of-part-content'
import ShadowBox from '@/components/shadow-box'

function RecentTransaction() {
	const hasData = true

	return (
		<>
			{hasData && (
				<ShadowBox>
					<TitleOfPartContent title="Giao dịch gần đây" />
					<InOutDetail
						id="abc"
						title="Ăn uống"
						icon=""
						subTitle="30/4/2022"
						rightNumber={20000}
					/>
					<InOutDetail
						id="abc"
						title="Ăn uống"
						icon=""
						subTitle="30/4/2022"
						rightNumber={20000}
					/>
					<InOutDetail
						id="abc"
						title="Ăn uống"
						icon=""
						subTitle="30/4/2022"
						rightNumber={20000}
					/>
				</ShadowBox>
			)}
		</>
	)
}

export default RecentTransaction
