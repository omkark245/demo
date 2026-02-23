import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        salary: '',
        position: ''
    })
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/');
        } else {
            fetchEmployees();
        }
    }, [])

    const fetchEmployees = () => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/employees', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(result => {
            setEmployees(result.data)
        })
        .catch(err => {
            console.log(err);
            if(err.response?.status === 401 || err.response?.status === 403) {
                navigate('/');
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token');
        axios.post('http://localhost:5000/add_employee', employee, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(result => {
            if(result.data.Status === "Success") {
                alert("Employee Added Successfully")
                fetchEmployees()
                setEmployee({ name: '', email: '', salary: '', position: '' })
            } else {
                alert(result.data.Error || "Failed to add employee")
            }
        })
        .catch(err => {
            console.log(err);
            if(err.response?.status === 401 || err.response?.status === 403) {
                navigate('/');
            } else {
                alert("An error occurred while adding the employee.")
            }
        })
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: "'Inter', sans-serif" }}>
            {/* Header */}
            <header style={{
                backgroundColor: 'white',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: '700' }}>Employee Manager</h1>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        color: '#475569',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                    }}
                >
                    Logout
                </button>
            </header>

            <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>

                    {/* Form Section */}
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.125rem', color: '#1e293b' }}>Add New Employee</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    value={employee.name}
                                    onChange={(e) => setEmployee({...employee, name: e.target.value})}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={employee.email}
                                    onChange={(e) => setEmployee({...employee, email: e.target.value})}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Position</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Software Engineer"
                                    value={employee.position}
                                    onChange={(e) => setEmployee({...employee, position: e.target.value})}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Salary ($)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 50000"
                                    value={employee.salary}
                                    onChange={(e) => setEmployee({...employee, salary: e.target.value})}
                                    style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Add Employee
                            </button>
                        </form>
                    </div>

                    {/* Table Section */}
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.125rem', color: '#1e293b' }}>Employee Directory</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Name</th>
                                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Position</th>
                                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#64748b', fontWeight: '600' }}>Email</th>
                                        <th style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#64748b', fontWeight: '600', textAlign: 'right' }}>Salary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.length > 0 ? employees.map(e => (
                                        <tr key={e.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#0f172a' }}>{e.name}</td>
                                            <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#475569' }}>
                                                <span style={{ backgroundColor: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>{e.position}</span>
                                            </td>
                                            <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#475569' }}>{e.email}</td>
                                            <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#0f172a', fontWeight: '600', textAlign: 'right' }}>
                                                ${Number(e.salary).toLocaleString()}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>No employees found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Dashboard
