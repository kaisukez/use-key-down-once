import { useState, useCallback, KeyboardEventHandler } from 'react'

interface useKeyDownOnceResult {
    onKeyDown: KeyboardEventHandler<HTMLInputElement>
    onKeyUp: KeyboardEventHandler<HTMLInputElement>
}

function useKeyDownOnce(func: KeyboardEventHandler, key: KeyboardEvent['key']): useKeyDownOnceResult {
    const [isKeyDown, setIsKeyDown] = useState<Boolean>(false)

    const onKeyDown = useCallback(event => {
        if (event.key === key && !isKeyDown) {
            func(event)
            setIsKeyDown(true)
        }
    }, [func, key, isKeyDown])

    const onKeyUp = useCallback(event => {
        if (event.key === key) {
            setIsKeyDown(false)
        }
    }, [key])

    return {
        onKeyDown,
        onKeyUp,
    }
}

export {
    useKeyDownOnceResult
}
export default useKeyDownOnce