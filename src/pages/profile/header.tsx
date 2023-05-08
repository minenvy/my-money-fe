import { useAuth } from '@/contexts/auth'
import { useParams } from 'react-router-dom'
import OwnerHeaderProfile from './owner-header-profile'
import FriendHeaderProfile from './friend-header-profile'

function Header() {
	const { user } = useAuth()
	const { id } = useParams()

	const isOwnerProfile = user.id === id

	return (
		<>{isOwnerProfile ? <OwnerHeaderProfile /> : <FriendHeaderProfile />}</>
	)
}

export default Header
