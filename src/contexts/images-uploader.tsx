import { createContext, useContext, useState } from 'react'

interface IContext {
	images: Array<File>
	uploadImages: Function
}

const ImagesContext = createContext<IContext | null>(null)

function useImagesUpload() {
	return useContext(ImagesContext) as IContext
}

interface IImagesProps {
	children: React.ReactNode
}

function ImagesUploadProvider({ children }: IImagesProps) {
	const [images, setImages] = useState<Array<File>>([])
	const [isLoading, setIsLoading] = useState(false)

	const uploadImages = () => {}

	return (
		<ImagesContext.Provider
			value={{
				images,
				uploadImages,
			}}
		>
			{children}
		</ImagesContext.Provider>
	)
}

export { useImagesUpload }
export default ImagesUploadProvider
