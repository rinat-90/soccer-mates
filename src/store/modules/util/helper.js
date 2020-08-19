import { storage } from '@/firebase/firebaseInit'

export const uploadImage = async (image, ref, id) => {
  const filename = image.name
  const ext = filename.slice(filename.lastIndexOf('.'))
  const file = await storage.ref(`/${ref}/${id}${ext}`).put(image)
  return await file.ref.getDownloadURL()
}

export const mapPopulate = async (arr, targets) => {
  const returnArray = []
  arr.map(async (item, i) => {
    returnArray[i] = item.data()
    returnArray[i].id = item.id
    for (const target of targets) {
      if (Object.keys(returnArray[i]).includes(target)) {
        const currentTarget = returnArray[i][target]
        if (!currentTarget.length) {
          returnArray[i][target] = ((await currentTarget.get()).data())
        } else {
          currentTarget.map(async (doc, index) => {
            returnArray[i][target][index] = ((await doc.get()).data())
          })
        }
      }
    }
  })
  return returnArray
}
