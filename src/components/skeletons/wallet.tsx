import { Skeleton } from 'antd'

const { Input } = Skeleton
function WalletSkeleton() {
  return (
    <>
      <Input size="small" active />
      <br></br>
      <Input size="small" active />
      <br></br>
      <br></br>
      <Input size="small" active />
      <br></br>
      <br></br>
      <Skeleton active paragraph={{ rows: 4 }} />
    </>
  )
}

export default WalletSkeleton
