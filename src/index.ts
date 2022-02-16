import { useState, useCallback } from 'react'

function useKeyDownOnce(func: Function, key: KeyboardEvent['key']) {
    const [isKeyDown, setIsKeyDown] = useState<Boolean>(false)

    const onKeyDown: (event: KeyboardEvent) => void = useCallback(event => {
        if (event.key === key && !isKeyDown) {
            func(event)
            setIsKeyDown(true)
        }
    }, [func, key, isKeyDown])

    const onKeyUp: (event: KeyboardEvent) => void = useCallback(event => {
        if (event.key === key) {
            setIsKeyDown(false)
        }
    }, [key])

    return {
        onKeyDown,
        onKeyUp,
    }
}

export default useKeyDownOnce