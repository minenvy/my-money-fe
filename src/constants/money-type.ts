import anuong from '@/assets/anuong.jpg'
import baohiem from '@/assets/baohiem.jpg'
import chiphikhac from '@/assets/chiphikhac.png'
import dichuyen from '@/assets/dichuyen.jpg'
import dien from '@/assets/dien.jpg'
import gas from '@/assets/gas.png'
import giadung from '@/assets/giadung.png'
import giaoduc from '@/assets/giaoduc.jpg'
import lamdep from '@/assets/lamdep.jpg'
import luong from '@/assets/luong.png'
import nuoc from '@/assets/nuoc.jpg'
import suckhoe from '@/assets/suckhoe.jpg'
import thuenha from '@/assets/thuenha.png'
import thunhapkhac from '@/assets/thunhapkhac.png'
import vatnuoi from '@/assets/vatnuoi.png'
import vuichoi from '@/assets/vuichoi.jpg'
import creditcard from '@/assets/creditcard.png'

const moneyTypes: any = []
moneyTypes['Chi tiêu'] = [
  {
    icon: anuong,
    label: 'Ăn uống',
    value: 'anuong'
  },
  {
    icon: dichuyen,
    label: 'Di chuyển',
    value: 'dichuyen'
  },
  {
    icon: thuenha,
    label: 'Thuê nhà',
    value: 'thuenha'
  },
  {
    icon: nuoc,
    label: 'Hóa đơn nước',
    value: 'nuoc'
  },
  {
    icon: dien,
    label: 'Hóa đơn điện',
    value: 'dien'
  },
  {
    icon: gas,
    label: 'Hóa đơn gas',
    value: 'gas'
  },
  {
    icon: suckhoe,
    label: 'Khám sức khỏe',
    value: 'suckhoe'
  },
  {
    icon: baohiem,
    label: 'Bảo hiểm',
    value: 'baohiem'
  },
  {
    icon: giaoduc,
    label: 'Giáo dục',
    value: 'giaoduc'
  },
  {
    icon: giadung,
    label: 'Đồ gia dụng',
    value: 'giadung'
  },
  {
    icon: vatnuoi,
    label: 'Vật nuôi',
    value: 'vatnuoi'
  },
  {
    icon: vuichoi,
    label: 'Vui chơi',
    value: 'vuichoi'
  },
  {
    icon: lamdep,
    label: 'Làm đẹp',
    value: 'lamdep'
  },
  {
    icon: creditcard,
    label: 'Banking',
    value: 'banking'
  },
  {
    icon: chiphikhac,
    label: "Chi phí khác",
    value: 'chiphikhac'
  }
]
moneyTypes['Khoản thu'] = [
  {
    icon: luong,
    label: 'Lương',
    value: 'luong'
  },
  {
    icon: thunhapkhac,
    label: 'Thu nhập khác',
    value: 'thunhapkhac'
  }
]

const icons = [...moneyTypes['Chi tiêu'], ...moneyTypes['Khoản thu']].map(type => {
  return {
    icon: type.icon,
    value: type.value
  }
})

const typeSelectOptions: any = []
for (const type in moneyTypes) {
  const option: {
    label: string
    options: Array<{
      label: string
      value: string
    }>
  } = {
    label: type,
    options: [],
  }
  moneyTypes[type].forEach((childOption: any) => {
    option.options.push({
      label: childOption.label,
      value: childOption.value,
    })
  })

  typeSelectOptions.push(option)
}

const typeCheckboxOptions = [{
  label: 'Tất cả chi tiêu',
  value: 'chitieu',
  children: typeSelectOptions[0].options
}]

const moneyOutTypes = moneyTypes['Chi tiêu'].map((item: any) => item.value)
const moneyInTypes = moneyTypes['Khoản thu'].map((item: any) => item.value)
const valueToLabel = function (value: string) {
  return (
    moneyTypes['Khoản thu'].find((item: any) => item.value === value) || moneyTypes['Chi tiêu'].find((item: any) => item.value === value)
  ).label
}

export { icons, typeSelectOptions, typeCheckboxOptions, moneyOutTypes, moneyInTypes, valueToLabel }
export default moneyTypes