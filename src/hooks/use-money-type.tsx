import { useEffect, useState } from 'react'
import customMoneyTypeImage from '@/assets/images/custom_money_type.jpg'
import useFetch from '@/hooks/use-fetch'
import { default as moneyTypesDefault } from '@/constants/money-type'
import {
	MoneyType,
	NewMoneyType,
	MoneyTypeSelectOptions,
} from '@/interfaces/money-type'
import { getAllMoneyTypes } from '@/api/money-type'

function useMoneyType() {
	const { data } = useFetch<Array<NewMoneyType>>(
		'money types',
		getAllMoneyTypes
	)
	const [moneyTypes, setMoneyTypes] = useState<Array<MoneyType>>([])

	if (moneyTypes.length === 0)
		setMoneyTypes(moneyTypesDefault as Array<MoneyType>)

	useEffect(() => {
		if (data === undefined || data === null) return
		const newMoneyTypes: Array<MoneyType> = data.map((customMoneyType) => {
			return {
				icon: customMoneyTypeImage,
				label: customMoneyType.name,
				value: customMoneyType.name,
				type: customMoneyType.type,
			}
		})
		setMoneyTypes((preState) => [...preState, ...newMoneyTypes])
	}, [data])

	const icons = moneyTypes.map((type) => {
		return {
			icon: type.icon,
			value: type.value,
		}
	})

	const moneyTypeSelectOptions: MoneyTypeSelectOptions = [
		{
			label: 'Khoản chi',
			options: [],
		},
		{
			label: 'Khoản thu',
			options: [],
		},
	]

	moneyTypes.forEach((moneyType) => {
		const newMoneyTypeSelectOption = {
			label: moneyType.label,
			value: moneyType.value,
		}
		if (moneyType.type === 'in')
			moneyTypeSelectOptions[1].options.push(newMoneyTypeSelectOption)
		else moneyTypeSelectOptions[0].options.push(newMoneyTypeSelectOption)
	})

	const moneyTypeCheckboxOptions = [
		{
			label: 'Tất cả chi tiêu',
			value: 'chitieu',
			children: moneyTypeSelectOptions[0].options,
		},
	]

	const moneyOutTypes = moneyTypes
		.map((moneyType) => (moneyType.type === 'out' ? moneyType.value : ''))
		.filter((type) => !!type)
	const moneyInTypes = moneyTypes
		.map((moneyType) => (moneyType.type === 'in' ? moneyType.value : ''))
		.filter((type) => !!type)
	const valueToLabel = function (value: string) {
		return (
			moneyTypes.find((moneyType) => moneyType.value === value)?.label || ''
		)
	}
	const addNewMoneyType = (newType: NewMoneyType) => {
		const newMoneyType = {
			icon: customMoneyTypeImage,
			label: newType.name,
			value: newType.name,
			type: newType.type,
		}
		setMoneyTypes((preState) => {
			// save to local storage to cache
			const nowMoneyTypesInLocalStorage = localStorage.getItem('money types')
			const moneyTypesInLocalStorage = nowMoneyTypesInLocalStorage
				? JSON.parse(nowMoneyTypesInLocalStorage)
				: []
			const moneyTypesToLocalStorage = [...moneyTypesInLocalStorage, newType]
			localStorage.setItem(
				'money types',
				JSON.stringify(moneyTypesToLocalStorage)
			)

			const nowMoneyTypesSet = new Set([
				...preState,
				...moneyTypesInLocalStorage,
			])
			const nowMoneyTypes = Array.from(nowMoneyTypesSet)
			return [...nowMoneyTypes, newMoneyType]
		})
	}

	return {
		moneyTypes,
		icons,
		moneyTypeSelectOptions,
		moneyTypeCheckboxOptions,
		moneyOutTypes,
		moneyInTypes,
		valueToLabel,
		addNewMoneyType,
	}
}

export default useMoneyType
