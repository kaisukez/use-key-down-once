import { useRef, useCallback, KeyboardEventHandler } from 'react'

interface useKeyDownOnceResult {
    onKeyDown: KeyboardEventHandler<HTMLInputElement>
    onKeyUp: KeyboardEventHandler<HTMLInputElement>
}

function useKeyDownOnce(func: KeyboardEventHandler, key: KeyboardEvent['key']): useKeyDownOnceResult {
    const isKeyDown = useRef(false)

    const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(event => {
        if (event.key === key && !isKeyDown.current) {
            func(event)
            isKeyDown.current = true
        }
    }, [func, key])

    const onKeyUp = useCallback<KeyboardEventHandler<HTMLInputElement>>(event => {
        if (event.key === key) {
            isKeyDown.current = false
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