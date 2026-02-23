import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        setError(null)

        axios.post('http://localhost:5000/login', values)
        .then(result => {
            setLoading(false)
            if(result.data.login) {
                localStorage.setItem("token", result.data.token)
                navigate('/dashboard')
            } else {
                setError(result.data.message)
            }
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
            if (err.response) {
                setError(err.response.data.message || "Invalid credentials.")
            } else {
                setError("Cannot connect to the server. Please check if the backend is running.")
            }
        })
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f8fafc',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                padding: '2.5rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1.875rem', fontWeight: '700' }}>Admin Login</h2>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>Please enter your credentials to access the dashboard</p>
                </div>

                {error && (
                    <div style={{
                        padding: '0.75rem 1rem',
                        backgroundColor: '#fef2f2',
                        color: '#b91c1c',
                        borderRadius: '6px',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                        border: '1px solid #fee2e2',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <span style={{ marginRight: '0.5rem' }}>⚠️</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>Username</label>
                        <input
                            type="text"
                            name='username'
                            autoComplete='off'
                            placeholder='Enter Username'
                            required
                            onChange={(e) => setValues({...values, username : e.target.value})}
                            style={{
                                width: '100%',
                                padding: '0.625rem 0.875rem',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                fontSize: '1rem',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>Password</label>
                        <input
                            type="password"
                            name='password'
                            placeholder='Enter Password'
                            required
                            onChange={(e) => setValues({...values, password : e.target.value})}
                            style={{
                                width: '100%',
                                padding: '0.625rem 0.875rem',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                fontSize: '1rem',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: loading ? '#93c5fd' : '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
