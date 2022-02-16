/**
 * @jest-environment jsdom
*/

import { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import useKeyDownOnce from './index'

interface Input {
    submit: () => void
}

function MyComponentWithoutUseKeyDownOnce({ submit }: Input) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    return (
        <div>
            <input
                placeholder='username'
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <input
                type='password'
                placeholder='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
                onKeyDown={submit}
            />
            <button onClick={submit}>
                Submit
            </button>
        </div>
    )
}

function MyComponentWithUseKeyDownOnce({ submit }: Input) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const { onKeyDown, onKeyUp } = useKeyDownOnce(submit, 'Enter')
    
    return (
        <div>
            <input
                placeholder='username'
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <input
                type='password'
                placeholder='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
            />
            <button onClick={submit}>
                Submit
            </button>
        </div>
    )
}

test('test component without useKeyDownOnce', ()  => {
    const submit = jest.fn()
    render(<MyComponentWithoutUseKeyDownOnce submit={submit} />)

    const usernameInput = screen.getByPlaceholderText('username')
    const passwordInput = screen.getByPlaceholderText('password')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    fireEvent.change(usernameInput, { target: { value: 'myusername' }})
    fireEvent.change(passwordInput, { target: { value: 'mypassword' }})
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' })
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' })
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' })
    fireEvent.keyUp(passwordInput, { key: 'Enter', code: 'Enter' })
    fireEvent.click(submitButton)

    expect(submit).toHaveBeenCalledTimes(4) // 3 keyDowns from passwordInput and 1 click from submitButton
})

test('test component with useKeyDownOnce', ()  => {
    const submit = jest.fn()
    render(<MyComponentWithUseKeyDownOnce submit={submit} />)

    const usernameInput = screen.getByPlaceholderText('username')
    const passwordInput = screen.getByPlaceholderText('password')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    fireEvent.change(usernameInput, { target: { value: 'myusername' }})
    fireEvent.change(passwordInput, { target: { value: 'mypassword' }})
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' })
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' })
    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' })
    fireEvent.keyUp(passwordInput, { key: 'Enter', code: 'Enter' })
    fireEvent.click(submitButton)

    expect(submit).toHaveBeenCalledTimes(2) // 1 keyDown from passwordInput and 1 click from submitButton
})