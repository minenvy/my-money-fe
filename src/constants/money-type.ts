import anuong from '@/assets/images/anuong.jpg'
import baohiem from '@/assets/images/baohiem.jpg'
import chiphikhac from '@/assets/images/chiphikhac.jpg'
import dichuyen from '@/assets/images/dichuyen.jpg'
import dien from '@/assets/images/dien.jpg'
import gas from '@/assets/images/gas.png'
import giadung from '@/assets/images/giadung.png'
import giaoduc from '@/assets/images/giaoduc.jpg'
import lamdep from '@/assets/images/lamdep.jpg'
import luong from '@/assets/images/luong.jpg'
import nuoc from '@/assets/images/nuoc.jpg'
import suckhoe from '@/assets/images/suckhoe.jpg'
import thuenha from '@/assets/images/thuenha.png'
import thunhapkhac from '@/assets/images/thunhapkhac.jpg'
import vatnuoi from '@/assets/images/vatnuoi.jpg'
import vuichoi from '@/assets/images/vuichoi.jpg'
import creditcard from '@/assets/images/creditcard.png'
import customMoneyTypeImage from '@/assets/images/custom_money_type.jpg'

const moneyTypes = [
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

export default moneyTypes
