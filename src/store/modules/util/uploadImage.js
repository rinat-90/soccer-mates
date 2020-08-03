import { storage } from '../../../firebase/firebaseInit'

export const uploadImage = async (image, ref, id) => {
  const filename = image.name
  const ext = filename.slice(filename.lastIndexOf('.'))
  const file = await storage.ref(`/${ref}/${id}${ext}`).put(image)
  return await file.ref.getDownloadURL()
}
