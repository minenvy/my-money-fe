import { domain } from '@/constants/env'
import { io } from 'socket.io-client'

const socket = io(domain)

export default socket