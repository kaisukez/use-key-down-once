import { useState, useCallback } from 'react'

/**
 * @typedef {Object} Result
 * @property {Function} onKeyDown onKeyDown listener to trigger function
 * @property {Function} onKeyUp onKeyUp listener to reset status
 * 
 * Trigger function once when key is down. And reset when key is up.
 * @param {Function} func function to trigger
 * @param {String} key event.key
 * @return {Result}
 * 
 * how to use
 * const someFunction = () => console.log('this will be trigged once when pressing enter')
 * const [onKeyDown, onKeyUp] = useKeyDownOnce(someFunction, 'Enter')
 * 
 * return (
 *      <SomeComponent
 *          onKeyDown={onKeyDown}
 *          onKeyUp={onKeyUp}
 *      />
 * )
 */
const useKeyDownOnce = (func, key) => {
    const [isKeyDown, setIsKeyDown] = useState(false)

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

    return [onKeyDown, onKeyUp]
}

export default useKeyDownOnce
