import { uploadImage } from '@/api/image'
import Compressor from 'compressorjs'

export function compressImage(file: File): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      success: (result: File) => {
        resolve(new File([result], file.name, { type: result.type }))
      },
      error(err) {
        console.log(err)
        reject(err)
      },
    })
  })
}

export async function uploadImageToServer(image: File) {
  const compressedImage = (await compressImage(image).catch(() => {
    console.log('Lỗi nén ảnh')
    return
  })) as File
  if (!compressedImage) return ''
  const uploadResponse = await uploadImage(compressedImage)
  if (uploadResponse === null) return ''
  return uploadResponse
}
