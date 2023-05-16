import { useEffect, useState } from 'react'

function useDebounce(data: string | number) {
	const [previousValue, setPreviousValue] = useState(data)
	const [value, setValue] = useState(previousValue)

	useEffect(() => {
		const timer = setTimeout(() => {
			setValue(previousValue)
		}, 300)

		return () => {
			clearTimeout(timer)
		}
	}, [previousValue])

	return {
		value,
		previousValue,
		setValue: (str: string | number) => setPreviousValue(str)
	}
}

export default useDebounce
