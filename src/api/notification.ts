import { getFetch, postFetch } from "@/api/fetch";
import routes from "@/api/route";
import { Notification } from '@/interfaces/notification'

export async function getNotifications(
  userId: string,
  offset: number
): Promise<Array<Notification>> {
  return await getFetch(
    `${routes.getNotification}/${userId}/${offset}`
  )
}

export async function readNotification(notificationId: string) {
  await postFetch(routes.readNotification, { id: notificationId })
}
