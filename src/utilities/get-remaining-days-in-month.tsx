function getRemainingDays(startDate: string | Date, endDate: string | Date) {
	const start = new Date(startDate)
	const end = new Date(endDate)
	const remainingDays = Math.ceil(
		(end.getTime() - start.getTime()) / (1000 * 3600 * 24)
	)
	return remainingDays > 0 ? remainingDays : 0
}

export default getRemainingDays
