import { createContext, useContext, useState } from 'react'

type Context = {
	infiniteNumber: number
	forceUpdate: Function
}

const forceUpdateContext = createContext<Context | null>(null)

export function useForceUpdate() {
  return useContext(forceUpdateContext) as Context
}

type Props = {
	children: React.ReactNode
}

export default function ForceUpdateProvider({ children }: Props) {
	const [infiniteNumber, setNumber] = useState(0)

	const forceUpdate = () => setNumber((preState) => preState + 1)

	return (
		<forceUpdateContext.Provider value={{ infiniteNumber, forceUpdate }}>
			{children}
		</forceUpdateContext.Provider>
	)
}
