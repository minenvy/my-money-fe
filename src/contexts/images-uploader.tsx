import { createContext, useContext, useState } from 'react'
import Compressor from 'compressorjs'
import { uploadImage } from '@/api/fetch'
import { message } from 'antd'

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

	function compressImage(file: File): Promise<File> {
		return new Promise<File>((resolve, reject) => {
			new Compressor(file, {
				quality: 0.8,
				success: (result) => {
					resolve(new File([result], file.name, { type: result.type }))
				},
				error(err) {
					reject(err)
				},
			})
		})
	}

	const uploadImages = async (files: Array<File>) => {
		if (isLoading) return
		setIsLoading(true)

		const processImagePromises: Promise<Response>[] = []
		const compressPromises: Promise<File>[] = []

		for (const file of files) {
			compressPromises.push(compressImage(file))
		}

		Promise.allSettled(compressPromises)
			.then((settledFiles) => {
				settledFiles.forEach((settledObject) => {
					if (settledObject.status !== 'fulfilled') return
					const file = settledObject.value
					const formData = new FormData()
					formData.append('file', file, file.name)
					processImagePromises.push(uploadImage('/image/extract', formData))
				})
			})
			.then(() => {
				Promise.allSettled(processImagePromises)
					.then(() => {
						message.info('Bạn có 1 bản nháp giao dịch')
					})
					.catch((err) => console.log(err))
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
