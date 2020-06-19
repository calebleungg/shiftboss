import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment';
import avatarDefault from '../images/default-pic.png'

const EmployeesPage = () =>  {

    // information
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ employees, setEmployees ] = useState([])

    // handling
    const [flash, setFlash] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [query, setQuery] = useState('')
    
    // handle flash messages
    useEffect(() => {
        if(flash && flash.success) {
            setTimeout(() => {
                setFlash(null)
            }, 2000)
        }
    }, [flash])

    // 
    useEffect(() => {
        axios.get('/api/employees')
            .then(response => {
                console.log('get on /employees')
                setEmployees(response.data)
                setUpdated(false)
            })
            .catch(err => console.log(err))
    },[updated])

    const resetInputs = () => {
        setFirstName('')
        setLastName('')
        setPhone('')
        setEmail('')
    }

    const handleCreate = () => {
        // console.log({firstName, lastName, phone, email})
        const req = {firstName, lastName, phone, email}
        console.log(req)
        axios.post('/api/employees/create', req)
            .then(response => {
                if (response.status === 200) {
                    setFlash({
                        success: true,
                        message: `Employee created: ${firstName} ${lastName}`
                    })
                    setUpdated(true)
                    resetInputs()
                } else {
                    setFlash({
                        success: false,
                        message: 'Error creating employee'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const renderEmployeeList = () => {
        let output = []
        employees.map(employee => {
            output.push(
                <div className="employee-card">
                    <img src={avatarDefault} />
                    <div>
                        <span> {employee.firstName} {employee.lastName} </span><br/>
                        <span> {employee.phone} </span><br/>
                        <span> {employee.email} </span><br/>
                    </div>
                </div>
            )
        })
        return output
    }

    const handleSearch = (e) => {
        console.log(e.target.value)
        if (e.target.value === '') {
            setUpdated(true)
        } else {
            axios.get(`/api/employees/search/${e.target.value}`)
                .then(response => {
                    setEmployees(response.data)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div id="employees-page-container">
            <div id="ep-left">
                <Link to="/"> <button id="home-btn"> Home </button> </Link>
                <h3> Employees </h3><br/>
                <span> <strong>Add Employee</strong></span><br/><br/>
                <div className="form">
                    <span>First name </span> <br/>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /><br/>
                    <span>Last name </span> <br/>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /><br/>
                    <span>Phone </span> <br/>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} /><br/>
                    <span>Email </span> <br/>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
                    
                    <button onClick={handleCreate} > add </button> 
                    {
                        flash ?
                            <span id="flash-msg" style={flash.success ? {color: "#1DB954"} : {color: "red"}} > {flash.message} </span>
                            :
                            null
                    }
                </div>
            </div>
            <div id="employee-list">
                <h3> Workforce </h3>
                <input id="search-input" type="text" onChange={(e) => handleSearch(e)} placeholder="Search for employee..." />
                <div id="list-container">
                    {renderEmployeeList()}
                </div>
            </div>
        </div>
    
    )

} 

export default EmployeesPage