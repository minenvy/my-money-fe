import { createContext, useContext, useState } from 'react'
import { message } from 'antd'
import { compressImage } from '@/utilities/image'
import { Context } from '@/interfaces/images-uploader'
import { extractImage } from '@/api/image'

const ImagesContext = createContext<Context | null>(null)

function useImagesUpload() {
	return useContext(ImagesContext) as Context
}

type ImagesProps = {
	children: React.ReactNode
}

function ImagesUploadProvider({ children }: ImagesProps) {
	const [isLoading, setIsLoading] = useState(false)

	const uploadImages = async (files: Array<File>) => {
		if (isLoading) return
		setIsLoading(true)

		const processImagePromises: Promise<string | null | undefined>[] = []
		const compressPromises: Promise<File>[] = []

		for (const file of files) {
			compressPromises.push(compressImage(file))
		}

    // Compress Images then upload
		let haveSuccessImage = false
		Promise.allSettled(compressPromises)
			.then((settledFiles) => {
				settledFiles.forEach((settledObject) => {
					if (settledObject.status !== 'fulfilled') return
					const file = settledObject.value
					processImagePromises.push(extractImage(file))
				})
			})
			.then(() => {
				Promise.allSettled(processImagePromises).then((settledImages) => {
					haveSuccessImage = settledImages.some(
						(item) => item.status === 'fulfilled' && item.value !== null
					)
				})
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setTimeout(() => {
					if (haveSuccessImage) {
						message.info('Bạn có 1 bản nháp giao dịch!')
						haveSuccessImage = false
					}
					setIsLoading(false)
				}, 3000)
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
