import { useState } from "react"

const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(localStorage.getItem(key) || defaultValue || '')
    const modifieValue = (nextValue) => {
        setValue(nextValue)
        localStorage.setItem(key, nextValue)
    }

    return [value, modifieValue]
}

export default useLocalStorage