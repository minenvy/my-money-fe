import { Suspense, lazy } from 'react'
import AppSkeleton from '@/components/skeletons/app'
import HomeSkeleton from '@/components/skeletons/home'
import WalletSkeleton from '@/components/skeletons/wallet'
import TransactionSkeleton from '@/components/skeletons/transaction'
import ReportSkeleton from '@/components/skeletons/report'
import ProfileSkeleton from '@/components/skeletons/profile'

const AppLazy = lazy(() => import('@/App'))
const HomeLazy = lazy(() => import('@/pages/home'))
const WalletLazy = lazy(() => import('@/pages/wallet'))
const TransactionLazy = lazy(() => import('@/pages/transaction'))
const ReportLazy = lazy(() => import('@/pages/report'))
const ProfileLazy = lazy(() => import('@/pages/profile'))

export const App = () => (
	<Suspense fallback={<AppSkeleton />}>
		<AppLazy />
	</Suspense>
)
export const Home = () => (
	<Suspense fallback={<HomeSkeleton />}>
		<HomeLazy />
	</Suspense>
)
export const Wallet = () => (
	<Suspense fallback={<WalletSkeleton />}>
		<WalletLazy />
	</Suspense>
)
export const Transaction = () => (
	<Suspense fallback={<TransactionSkeleton />}>
		<TransactionLazy />
	</Suspense>
)
export const Report = () => (
	<Suspense fallback={<ReportSkeleton />}>
		<ReportLazy />
	</Suspense>
)
export const Profile = () => (
	<Suspense fallback={<ProfileSkeleton />}>
		<ProfileLazy />
	</Suspense>
)
