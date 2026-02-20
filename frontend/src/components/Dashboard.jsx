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
            }
        })
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Employee Management Dashboard</h1>
                <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Logout</button>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
                <div style={{ flex: 1, backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
                    <h3>Add Employee</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Name:</label>
                            <input type="text" value={employee.name} onChange={(e) => setEmployee({...employee, name: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} required/>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Email:</label>
                            <input type="email" value={employee.email} onChange={(e) => setEmployee({...employee, email: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} required/>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Position:</label>
                            <input type="text" value={employee.position} onChange={(e) => setEmployee({...employee, position: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} required/>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>Salary:</label>
                            <input type="number" value={employee.salary} onChange={(e) => setEmployee({...employee, salary: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} required/>
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Employee</button>
                    </form>
                </div>

                <div style={{ flex: 2 }}>
                    <h3>Employee List</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#e9ecef' }}>
                                <th style={{ border: '1px solid #dee2e6', padding: '0.5rem' }}>Name</th>
                                <th style={{ border: '1px solid #dee2e6', padding: '0.5rem' }}>Email</th>
                                <th style={{ border: '1px solid #dee2e6', padding: '0.5rem' }}>Position</th>
                                <th style={{ border: '1px solid #dee2e6', padding: '0.5rem' }}>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(e => (
                                <tr key={e.id}>
                                    <td style={{ border: '1px solid #dee2e6', padding: '0.5rem' }}>{e.name}</td>
                                    <td style={{ border: '1px solid #dee2e6', padding: '0.5rem' }}>{e.email}</td>
                                    <td style={{ border: '1px solid #dee2e6', padding: '0.5rem' }}>{e.position}</td>
                                    <td style={{ border: '1px solid #dee2e6', padding: '0.5rem' }}>{e.salary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
