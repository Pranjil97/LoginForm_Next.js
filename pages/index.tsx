import { useState } from 'react'
import jwt from 'jsonwebtoken'
import '../pages/main.module.css'

export default function Home() {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('You are not Logged in')

  async function submitForm() {
    const res = await fetch('/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then((t) => t.json())

    const token = res.token

    if (token) {
      const json = jwt.decode(token) as { [KEY: string]: string }
      setMessage(`Welcome ${json.username} and you are ${json.admin ? 'an admin!' : 'not an admin'}`)
    } else {
      setMessage('Something went wrong')
    }
  }

  return (
    <div className='background'>
      <h1 className='message'>{message}</h1>
      <form className='form' method='POST' action='/api/login'>
        <input className='input1' placeholder='Enter username' type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <input className='input2' placeholder='Enter password' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <input className='button' type='button' value='Login' onClick={submitForm} /><br />
      </form>
    </div>
  )
}
