import { getFetch, postFetch } from "@/api/fetch";
import routes from "@/api/route";
import { Budget, NewBudget } from "@/interfaces/budget";

export async function getDayExpense(budgetId: string) {
  await getFetch(`${routes.getDayExpense}/${budgetId}`)
}

export async function getInfiniteBudgets(offset: number): Promise<Array<Budget>> {
  return await getFetch(`${routes.getInfiniteBudgets}/${offset}`)
}

export async function addBudget(budget: NewBudget) {
  await postFetch(routes.addBudget, { ...budget })
}

export async function deleteBudget(budgetId: string) {
  await postFetch(routes.deleteBudget, { id: budgetId })
}
