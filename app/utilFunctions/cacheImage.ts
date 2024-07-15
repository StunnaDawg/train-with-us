import supabase from "../../lib/supabase"

export const Cache = (() => {
  const cache = new Map()

  return {
    get: (key: any, fetchFunction: any) => {
      if (cache.has(key)) {
        return cache.get(key)
      } else {
        const value = fetchFunction()
        cache.set(key, value)
        return value
      }
    },
    set: (key: any, value: any) => {
      cache.set(key, value)
    },
  }
})()

export const fetchImageFromCache = (item: any, setImageFile: any) => {
  const cachedImage = Cache.get(item, async () => {
    const { data, error } = await supabase.storage.from("photos").download(item)
    if (data) {
      const fr = new FileReader()
      fr.readAsDataURL(data)
      return new Promise((resolve) => {
        fr.onload = () => {
          resolve(fr.result as string)
        }
      })
    } else {
      console.error("Error fetching image:", error)
      return null
    }
  })

  cachedImage.then((imageUrl: any) => {
    setImageFile(imageUrl)
  })
}
