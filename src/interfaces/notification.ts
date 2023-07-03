export interface Notification {
	id: string
	userId: string
	image: string
	message: string
	status: 'read' | 'unread'
	createdAt: string
}
export interface FetchData {
	isLoading: boolean
	data: Array<Notification>
}
