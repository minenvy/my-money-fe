export default function formatMoney(money: number) {
  return money.toLocaleString() + ' đ'
}

export function formatMoneyWithSign(money: number) {
  const vndMoney = formatMoney(Math.abs(money))
  return money > 0 ? `+ ${vndMoney}` : `- ${vndMoney}`
}