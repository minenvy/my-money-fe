import Compressor from "compressorjs"

export default function compressImage(file: File): Promise<File> {
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