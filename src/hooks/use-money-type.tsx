import anuong from '@/assets/anuong.jpg'
import baohiem from '@/assets/baohiem.jpg'
import chiphikhac from '@/assets/chiphikhac.jpg'
import dichuyen from '@/assets/dichuyen.jpg'
import dien from '@/assets/dien.jpg'
import gas from '@/assets/gas.png'
import giadung from '@/assets/giadung.png'
import giaoduc from '@/assets/giaoduc.jpg'
import lamdep from '@/assets/lamdep.jpg'
import luong from '@/assets/luong.jpg'
import nuoc from '@/assets/nuoc.jpg'
import suckhoe from '@/assets/suckhoe.jpg'
import thuenha from '@/assets/thuenha.png'
import thunhapkhac from '@/assets/thunhapkhac.jpg'
import vatnuoi from '@/assets/vatnuoi.jpg'
import vuichoi from '@/assets/vuichoi.jpg'
import creditcard from '@/assets/creditcard.png'
import customMoneyTypeImage from '@/assets/custom_money_type.jpg'
import useFetch from '@/hooks/use-fetch'
import { useEffect, useState } from 'react'

interface IData {
	data: Array<INewMoneyType>
}
interface IMoneyType {
	icon: string
	value: string
	label: string
	type: 'in' | 'out'
}
interface INewMoneyType {
	name: string
	type: 'in' | 'out'
}
function useMoneyType() {
	const { data } = useFetch(
		'money types',
		'/custom-money-type/get-all'
	) as IData

	const [moneyTypes, setMoneyTypes] = useState<Array<IMoneyType>>([])

	if (moneyTypes.length === 0)
		setMoneyTypes(() => {
			return [
				{
					icon: anuong,
					label: 'Ăn uống',
					value: 'anuong',
					type: 'out',
				},
				{
					icon: dichuyen,
					label: 'Di chuyển',
					value: 'dichuyen',
					type: 'out',
				},
				{
					icon: thuenha,
					label: 'Thuê nhà',
					value: 'thuenha',
					type: 'out',
				},
				{
					icon: nuoc,
					label: 'Hóa đơn nước',
					value: 'nuoc',
					type: 'out',
				},
				{
					icon: dien,
					label: 'Hóa đơn điện',
					value: 'dien',
					type: 'out',
				},
				{
					icon: gas,
					label: 'Hóa đơn gas',
					value: 'gas',
					type: 'out',
				},
				{
					icon: suckhoe,
					label: 'Khám sức khỏe',
					value: 'suckhoe',
					type: 'out',
				},
				{
					icon: baohiem,
					label: 'Bảo hiểm',
					value: 'baohiem',
					type: 'out',
				},
				{
					icon: giaoduc,
					label: 'Giáo dục',
					value: 'giaoduc',
					type: 'out',
				},
				{
					icon: giadung,
					label: 'Đồ gia dụng',
					value: 'giadung',
					type: 'out',
				},
				{
					icon: vatnuoi,
					label: 'Vật nuôi',
					value: 'vatnuoi',
					type: 'out',
				},
				{
					icon: vuichoi,
					label: 'Vui chơi',
					value: 'vuichoi',
					type: 'out',
				},
				{
					icon: lamdep,
					label: 'Làm đẹp',
					value: 'lamdep',
					type: 'out',
				},
				{
					icon: creditcard,
					label: 'Banking',
					value: 'banking',
					type: 'out',
				},
				{
					icon: chiphikhac,
					label: 'Chi phí khác',
					value: 'chiphikhac',
					type: 'out',
				},
				{
					icon: luong,
					label: 'Lương',
					value: 'luong',
					type: 'in',
				},
				{
					icon: thunhapkhac,
					label: 'Thu nhập khác',
					value: 'thunhapkhac',
					type: 'in',
				},
			]
		})

	useEffect(() => {
		if (data === undefined || data === null) return
		const newMoneyTypes: Array<IMoneyType> = []
		data.forEach((customMoneyType) => {
			const newMoneyType = {
				icon: customMoneyTypeImage,
				label: customMoneyType.name,
				value: customMoneyType.name,
				type: customMoneyType.type,
			}
			newMoneyTypes.push(newMoneyType)
		})
		setMoneyTypes((preState) => [...preState, ...newMoneyTypes])
	}, [data])

	const icons = moneyTypes.map((type) => {
		return {
			icon: type.icon,
			value: type.value,
		}
	})

	const moneyTypeSelectOptions: [
		{
			label: 'Khoản chi'
			options: Array<{
				label: string
				value: string
			}>
		},
		{
			label: 'Khoản thu'
			options: Array<{
				label: string
				value: string
			}>
		}
	] = [
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
	const addNewMoneyType = (newType: INewMoneyType) => {
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
