import { getFetch } from "@/api/fetch";
import routes from "@/api/route";
import { Money } from "@/interfaces/money-context";

export async function getAllWallet(): Promise<Array<Money>> {
  return await getFetch(routes.getAllWallet)
}