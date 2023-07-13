import { postFetch } from "@/api/fetch"
import routes from "@/api/route"

const defaultMoneyName = 'Tiền mặt'

export async function changeNicknameAndMoneySuccess(nickname: string, money: number) {
  const newMoney = {
    name: defaultMoneyName,
    total: money,
  }
  await Promise.all([
    postFetch(routes.changeProfileUser, { nickname }),
    postFetch(routes.addWallet, newMoney)
  ])
}
