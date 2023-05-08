function getRemainingDays(startDate: Date, endDate: Date) {
	const remainingDays = Math.ceil(
		(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
	)
	return remainingDays > 0 ? remainingDays : 0
}

export default getRemainingDays
