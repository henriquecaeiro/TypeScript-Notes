import { useEffect, useState } from "react"

//Hook para armazenar valores no local storage
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {//função receberá uma key (string) e um valor inicial (generic)
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue == null) {// se o item  ñ existir, cria-se o item no local storage
      if (typeof initialValue === "function") {// se for uma função  retorna o generic como função
        return (initialValue as () => T)()
      } else {// se ñ retorna o valor normalmente
        return initialValue
      }
    } else {// se existir retorna o  valor "parsed"
      return JSON.parse(jsonValue)
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as [T, typeof setValue]
}
