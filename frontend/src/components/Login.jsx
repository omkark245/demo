import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:5000/login', values)
        .then(result => {
            if(result.data.login) {
                localStorage.setItem("token", result.data.token)
                navigate('/dashboard')
            } else {
                setError(result.data.message)
            }
        })
        .catch(err => {
            console.log(err)
            setError("An error occurred during login.")
        })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '300px' }}>
                <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name='username' autoComplete='off' placeholder='Enter Username'
                         onChange={(e) => setValues({...values, username : e.target.value})} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}/>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name='password' placeholder='Enter Password'
                         onChange={(e) => setValues({...values, password : e.target.value})} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}/>
                    </div>
                    <button type='submit' style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Login
