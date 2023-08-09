export default function formatMoney(money: number) {
  return money.toLocaleString() + ' đ'
}

export function formatMoneyWithSign(moneyArg: number | string) {
  const money = Number(moneyArg)
  const vndMoney = formatMoney(Math.abs(money))
  if (money === 0) return vndMoney
  return money > 0 ? `+ ${vndMoney}` : `- ${vndMoney}`
}