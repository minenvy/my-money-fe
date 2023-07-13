import { Button, Result } from 'antd'
import { createContext, useContext, useState } from 'react'
import { ErrorBoundaryContext } from '@/interfaces/error-boundary'

const ErrorBoundaryContext = createContext<ErrorBoundaryContext | null>(null)
function useErrorBoundary() {
	return useContext(ErrorBoundaryContext) as ErrorBoundaryContext
}

type ErrorBoundaryProp = {
	children: React.ReactNode
}

function ErrorBoundary({ children }: ErrorBoundaryProp) {
	const [error, setError] = useState<Error>()

	const showBoundary = (err: Error) => {
		setError(err)
	}

	if (error)
		return (
			<Result
				status="500"
				title="500"
				subTitle={`${error.message}`}
				extra={
					<Button type="primary" onClick={() => window.location.reload()}>
						Tải lại trang
					</Button>
				}
			/>
		)

	return (
		<ErrorBoundaryContext.Provider value={{ showBoundary }}>
			{children}
		</ErrorBoundaryContext.Provider>
	)
}

export { useErrorBoundary }
export default ErrorBoundary
