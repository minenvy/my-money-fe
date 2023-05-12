import { uploadImage } from "@/api/fetch"
import { message } from "antd"
import Compressor from "compressorjs"

export function compressImage(file: File): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      success: (result: File) => {
        resolve(new File([result], file.name, { type: result.type }))
      },
      error(err) {
        reject(err)
      },
    })
  })
}

export async function uploadImageToServer(image: File) {
  const compressedImage = (await compressImage(image).catch(() => {
    message.warning('Có lỗi xảy ra, vui lòng thử lại sau!')
    return
  })) as File
  if (!compressedImage) return ''
  const uploadResponse = (await uploadImage(
    '/image/upload',
    compressedImage
  )) as Response
  if (!uploadResponse || !uploadResponse.ok) return ''
  const data = await uploadResponse.json() as { image: string }
  return data.image
}