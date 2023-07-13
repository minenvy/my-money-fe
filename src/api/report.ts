import { getFetch } from "@/api/fetch";
import routes from "@/api/route";
import { ReportMoney } from "@/interfaces/report";

export async function getMonthReports(year: number): Promise<Array<ReportMoney>> {
  return await getFetch(`${routes.getMonthReports}/${year}`)
}

export async function getYearReports(year: number): Promise<ReportMoney> {
  return await getFetch(`${routes.getYearReports}/${year}`)
}
