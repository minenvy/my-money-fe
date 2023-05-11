import { Button, Result } from 'antd'
import { createContext, useContext, useState } from 'react'

interface IErrorBoundaryContext {
	showBoundary: Function
}

const ErrorBoundaryContext = createContext<IErrorBoundaryContext | null>(null)
function useErrorBoundary() {
	return useContext(ErrorBoundaryContext) as IErrorBoundaryContext
}

interface IErrorBoundaryProp {
	children: React.ReactNode
}

const ErrorElement = (
	<Result
		status="500"
		title="500"
		subTitle="Sorry, something went wrong."
		extra={
			<Button type="primary" onClick={() => window.location.reload()}>
				Tải lại trang
			</Button>
		}
	/>
)

function ErrorBoundary({ children }: IErrorBoundaryProp) {
	const [error, setError] = useState<Error>()

	const showBoundary = (err: Error) => {
		setError(err)
	}

	if (error) return ErrorElement

	return (
		<ErrorBoundaryContext.Provider value={{ showBoundary }}>
			{children}
		</ErrorBoundaryContext.Provider>
	)
}

export { useErrorBoundary }
export default ErrorBoundary
