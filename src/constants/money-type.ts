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

const typeOptions: any = []
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

  typeOptions.push(option)
}

export { icons, typeOptions }
export default moneyTypes