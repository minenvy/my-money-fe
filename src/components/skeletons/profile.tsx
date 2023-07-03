import useWindowSize from '@/hooks/use-window-size'
import { Skeleton } from 'antd'
import styled from 'styled-components'

const { Input, Avatar, Button } = Skeleton

function ProfileSkeleton() {
  const windowSize = useWindowSize()
  const isInMobile = windowSize <= 768

  return (
    <Wrapper>
      <Flex>
        <Avatar active shape="circle" size={isInMobile ? 75 : 150} />
        <Info>
          <Input active /> <Button active /> <Avatar active />
          <br></br>
          <Button active /> <Button active /> <Button active />
          <br></br>
          <Button active block />
        </Info>
      </Flex>
      <Tabs>
        <Button active /> <Button active /> <Button active />
      </Tabs>
      <Avatar active shape="square" size={480} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Flex = styled.div`
  display: flex;
`
const Info = styled.div`
  margin-left: 2rem;
`
const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`

export default ProfileSkeleton
