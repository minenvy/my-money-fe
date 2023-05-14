import { createContext, useContext, useState } from 'react'
import { uploadImage } from '@/api/fetch'
import { message } from 'antd'
import { compressImage } from '@/utilities/image'

interface IContext {
	isUploading: boolean
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
	const [isLoading, setIsLoading] = useState(false)

	const uploadImages = async (files: Array<File>) => {
		if (isLoading) return
		setIsLoading(true)

		const processImagePromises: Promise<Response | null | undefined>[] = []
		const compressPromises: Promise<File>[] = []

		for (const file of files) {
			compressPromises.push(compressImage(file))
		}

		Promise.allSettled(compressPromises)
			.then((settledFiles) => {
				settledFiles.forEach((settledObject) => {
					if (settledObject.status !== 'fulfilled') return
					const file = settledObject.value
					processImagePromises.push(uploadImage('/image/extract', file))
				})
			})
			.then(() => {
				Promise.allSettled(processImagePromises).then((settledImages) => {
					const haveSuccessImage = settledImages.find(
						(item) => item.status === 'fulfilled'
					)
					if (haveSuccessImage) message.info('Bạn có 1 bản nháp giao dịch!')
				})
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<ImagesContext.Provider
			value={{
				isUploading: isLoading,
				uploadImages,
			}}
		>
			{children}
		</ImagesContext.Provider>
	)
}

export { useImagesUpload }
export default ImagesUploadProvider
