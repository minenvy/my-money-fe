import InOutDetail from '@/components/in-out-detail'
import ShadowBox from '@/components/shadow-box'
import TitleInOutDetail from '@/pages/wallet/title-in-out-detail'
import formatMoney from '@/utilities/money-format'
import { DatePicker, DatePickerProps, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import styled from 'styled-components'
import QuickReport from './quick-report'
import useWindowSize from '@/hooks/use-window-size'
import NoData from '@/components/empty'

const monthFormat = 'MM/YYYY'
const today = new Date()

function Wallet() {
	const windowSize = useWindowSize()
	const [month, setMonth] = useState(today.getMonth() + 1)

	const hasData = true
	const isInMobile = windowSize <= 768
	const money = 5_000_000

	const changeMonth: DatePickerProps['onChange'] = (_, dateString) => {
		setMonth(Number(dateString.split('-')[1]))
	}

	return (
		<>
			<TotalMoney>
				<StyledText type="secondary">Số dư</StyledText>
				<StyledText strong>{formatMoney(money)}</StyledText>
			</TotalMoney>

			<StyledDatePicker
				defaultValue={dayjs(dayjs(today), monthFormat)}
				format={monthFormat}
				picker="month"
				onChange={changeMonth}
			/>

			{hasData ? (
				<Layout data-mode-info={isInMobile ? 'mobile' : 'desktop'}>
					<QuickReport
						quickMoneyReport={[-200_000, 500_000, -100_000, 200_000]}
					/>
					<SeparatePart data-mode-info={isInMobile ? 'mobile' : 'desktop'}>
						<ShadowBox mode="mini">
							<FlexBox>
								<TitleInOutDetail time={new Date()} money={3_000_000} />
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={2_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={2_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={4_000}
									mode="mini"
								/>
							</FlexBox>
						</ShadowBox>
						<ShadowBox mode="mini">
							<FlexBox>
								<TitleInOutDetail time={new Date()} money={3_000_000} />
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={2_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={4_000}
									mode="mini"
								/>
							</FlexBox>
						</ShadowBox>
						<ShadowBox mode="mini">
							<FlexBox>
								<TitleInOutDetail time={new Date()} money={3_000_000} />
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={2_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={2_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={4_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={4_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={4_000}
									mode="mini"
								/>
							</FlexBox>
						</ShadowBox>
						<ShadowBox mode="mini">
							<FlexBox>
								<TitleInOutDetail time={new Date()} money={3_000_000} />
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={2_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={2_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={4_000}
									mode="mini"
								/>
							</FlexBox>
						</ShadowBox>
						<ShadowBox mode="mini">
							<FlexBox>
								<TitleInOutDetail time={new Date()} money={3_000_000} />
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={2_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={2_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={4_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={4_000}
									mode="mini"
								/>
								<InOutDetail
									id="abc"
									icon=""
									title="Ăn uống"
									subTitle={new Date()}
									rightNumber={4_000}
									mode="mini"
								/>
							</FlexBox>
						</ShadowBox>
					</SeparatePart>
				</Layout>
			) : (
				<ShadowBox>
					<NoData hasButton />
				</ShadowBox>
			)}
		</>
	)
}

const StyledText = styled(Typography.Text)`
	text-align: center;
`
const TotalMoney = styled.div`
	display: flex;
	flex-direction: column;
	align-content: space-between;
`
const StyledDatePicker = styled(DatePicker)`
	margin: 1rem auto 0;
`
const Layout = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	gap: 2rem;
	&[data-mode-info='mobile'] {
		flex-direction: column;
		gap: 0;
	}
`
const SeparatePart = styled.div`
	flex: 1;
	max-width: 40rem;
	max-height: 32rem;
	margin: 0 auto;
	display: flex;
	gap: 0.5rem;
	justify-content: space-between;
	flex-wrap: wrap;
	overflow: auto;
	&[data-mode-info='mobile'] {
		max-width: 18rem;
	}
`
const FlexBox = styled.div`
	display: flex;
	flex-direction: column;
`

export default Wallet
