import Header from '@/layout/header'
import { Outlet } from 'react-router-dom'
import Footer from '@/layout/footer'

function Main() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Main
