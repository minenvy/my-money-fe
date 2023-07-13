import routes from "@/api/route"
import { domain } from "@/constants/env"

function getOptions(file: File) {
  const formData = new FormData()
  formData.append('file', file, file.name)
  const options: RequestInit = {
    method: 'post',
    credentials: 'include',
    body: formData,
  }
  return options
}

export async function uploadImage(file: File): Promise<string> {
  const options = getOptions(file)
  const res = await fetch(domain + routes.uploadImage, options)
  const data = await res.json()
  return data.image
}

export async function extractImage(file: File): Promise<string> {
  const options = getOptions(file)
  const res = await fetch(domain + routes.extractImage, options)
  const data = await res.json()
  return data.image
}
