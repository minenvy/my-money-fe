import { getFetch } from "@/api/fetch";
import routes from "@/api/route";
import {
  NewMoneyType,
} from '@/interfaces/money-type'

export async function getAllMoneyTypes(): Promise<Array<NewMoneyType>> {
  return await getFetch(routes.getAllMoneyTypes)
}