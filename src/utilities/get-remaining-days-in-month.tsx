function getRemainingDays(startDate: Date) {
	const totalDays = new Date(
		startDate.getFullYear(),
		startDate.getMonth() + 1,
		0
	).getDate()
	const today = new Date().getDate()
	const remainingDays = totalDays - today
	return remainingDays
}

export default getRemainingDays
