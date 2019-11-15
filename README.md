# Install
```
npm install @kaisukez/use-key-down-once
```

# How to use

```js
import React, { useState } from 'react'
import useKeyDownOnce from '@kaisukez/use-key-down-once'

function MyComponent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const submit = () => {
    // api.login(username, password)
  }
  
  const [onKeyDown, onKeyUp] = useKeyDownOnce(submit, 'Enter')
  
  return (
    <div>
      <input
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <input
        type='password'
        value={password}
        onChange={event => setPassword(event.target.value)}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      />
      <button onClick={submit}>
        Submit
      </button>
    </div>
}
```

With this way you don't have to use mouse to click submit button, instead you just press Enter to trigger submit function.

But normally if you press it too long, it will trigger submit function multiple times. So this is when __useKeyDownOnce__ comes into play.

# Why this library
I just start web developer career and I find myself wrote this function multiple times. So I decide to make it as a library. Maybe there's a library that already solve this problem but I still prefer my minimal version of my code. On top of that I just want to try to publish a library to npm registry to get some new feelings about coding.

In the future, I may use other library (if i find it interesting enough) instead of maintaining my own version of library.
