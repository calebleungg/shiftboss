import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import avatarDefault from '../images/default-pic.png'

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday','sunday']


const Manager = (props) => {
    
    const [week, setWeek] = useState({})
    const [workforce, setWorkForce] = useState([])
    const [updateEmployees, setUpdateEmp ] = useState(false)
    const [updateWeek, setUpdateWeek ] = useState(false)
    const [loading, setLoading] = useState(true)
    const [activeCard, setCard] = useState(null)
    // activeCard needs [day, indexOfShift]

    // inital info call
    useEffect(() => {
        getApiWeek()
    },[updateWeek])

    // update list on empty search
    useEffect(() => {
        getApiEmployees()
    }, [updateEmployees])

    // get weekd data
    const getApiWeek = () => {
        const date = props.match.params.date.split('-').join('/')
        axios.get(`/api/weeks/bydate?date=${date}`)
            .then(response => {
                let week = response.data
                daysOfWeek.map(day => {
                    week[day].shifts.map(shift => {
                        shift.selected = false
                    })
                })
                setWeek(week)
                setLoading(false)
                setUpdateWeek(false)
            })
            .catch(err => console.log(err))
    }

    // get employees on api endpoint
    const getApiEmployees = () => {
        axios.get('/api/employees')
            .then(response => {
                setWorkForce(response.data)
                setUpdateEmp(false)
            })
            .catch(err => console.log(err))
    }

    // query on search input
    const handleSearch = (e) => {
        if (e.target.value === '') {
            setUpdateEmp(true)
        } else {
            axios.get(`/api/employees/search/${e.target.value}`)
                .then(response => {
                    setWorkForce(response.data)
                })
                .catch(err => console.log(err))
        }
    }

    // render employee list
    const renderWorkforce = () => {
        let output = []
        workforce.map(employee => {
            output.push(
                <button onClick={() => addToShift(employee)} > {`${employee.firstName[0].toUpperCase()}. ${employee.lastName}`} </button>
            )
        })
        return output
    }

    // select active shift card
    const selectCard = (e) => {
        const day = e.target.id.split('-')[0]
        const index = e.target.id.split('-')[2]
        setCard([day, index])
        let update = week
        daysOfWeek.map(day => {
            week[day].shifts.map(shift => {
                shift.selected = false
            })
        })
        update[day].shifts[index].selected = true
        setWeek(update)
    }

    // 3 part rending of shift cards
    const renderShifts = (day) => {
        let output = []
        let counter = 0
        week[day].shifts.map(shift => {
            const boxHeight = shiftBoxHeight(Number(shift.from.split(':')[0]), Number(shift.to.split(':')[0]))
            let onShift = []
            shift.employees.map(employee => {
                onShift.push(
                    <span className="worker-name" id={`${day}-worker-${counter}`} > <img id={`${day}-img-${counter}`} src={avatarDefault} /> {employee.name} </span>
                )
            })
            output.push(
                <div className="shift-wrapper" key={`${day}-shift-${counter}`}>
                    <div 
                        className="shift-card" 
                        // style={{height:`${boxHeight}vh`}} 
                        style={
                            shift.selected ?
                                {
                                    border: "3px solid #1DB954",
                                    minHeight:`${boxHeight}vh`
                                }
                                :
                                {
                                    minHeight:`${boxHeight}vh`
                                }
                        }
                        onClick={(e) => selectCard(e)} 
                        id={`${day}-card-${counter}`} 
                    >
                        <span id={`${day}-from-${counter}`} > {shift.from} </span>
                        <div 
                            className="shift-workers" 
                            id={`${day}-workerlist-${counter}`} 
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                fontSize: "0.9em",
                            }}
                        >
                            {onShift}
                        </div>
                        <span id={`${day}-to-${counter}`} > {shift.to} </span>
                    </div>
                    {/* <i className="fas fa-times-circle" onClick={(e) => deleteShift(e)} id={`${day}-shift-${counter}`} ></i> */}
                </div>
            )
            counter++
            
        })
        return output
    }

    // to determine hight of card
    const shiftBoxHeight = (from, to) => {
        const timeLength = () => {
            if ((to - from) < 0) {
                return (24 - from + to)
            }
            return (to - from)
        }
        const height = (timeLength() / week.hoursPerDay * 80)
        return height
    }

    // deleting shift card
    const deleteShift = (e) => {
        const day = e.target.id.split('-')[0]
        const index = e.target.id.split('-')[2]
        let update = week
        update[day].shifts.splice(index, 1)
        setWeek(update)
    }

    const renderDate = (day) => {
        if (week[day]) {
            let date = week[day].date.split('/')
            return `${date[0]}/${date[1]}`
        }
        return null
    }

    // add worker
    const addToShift = (employee) => {
        if (activeCard) {
            // add shift to employee's shift list
            const req = {
                weekId: week._id,
                day: activeCard[0],
                date: week[activeCard[0]].date,
                shiftIndex: activeCard[1],
                from: week[activeCard[0]].shifts[activeCard[1]].from,
                to: week[activeCard[0]].shifts[activeCard[1]].to
            }
            axios.put(`/api/employees/add-shift/${employee._id}`, req)
                .then(response => {
                    console.log(response)
                })
                .catch(err => console.log(err))
            
            // add employee to shifts employee list
            const worker = {
                employeeId: employee._id,
                name: `${employee.firstName} ${employee.lastName}`,
                day: activeCard[0],
                shiftIndex: activeCard[1]
            }
            axios.put(`/api/weeks/add-employee/${week._id}`, worker)
                .then(response => {
                    console.log(response)
                    setUpdateWeek(true)
                })
                .catch(err => {
                    console.log(err)
                })

        } else {
            return null
        }
    }

    return (
        <div id="mananger-page-container">
            <div id="workforce-panel">
                <Link to="/"> <button className="home-btn"> Home </button> </Link><br/><br/>
                <input type="text" placeholder="Search employee" onChange={(e)=> handleSearch(e)} />
                <div>
                    {renderWorkforce()}
                </div>
            </div>

            <div id="week-planner">

                <div className='day-col'>
                    <p onClick={()=> {
                        console.log(week)
                        console.log(activeCard)
                    }}>Monday ({renderDate('monday')}) </p>
                    <div>
                        {!loading ? renderShifts('monday') : null}
                    </div>
                </div>

                <div className='day-col'>
                    <p>Tuesday ({renderDate('tuesday')}) </p>
                    {!loading ? renderShifts('tuesday') : null}
                </div>

                <div className='day-col'>
                    <p>Wednesday  ({renderDate('wednesday')})</p>
                    {!loading ? renderShifts('wednesday') : null}
                </div>

                <div className='day-col'>
                    <p>Thursday ({renderDate('thursday')})</p>
                    {!loading ? renderShifts('thursday') : null}
                </div>

                <div className='day-col'>
                    <p>Friday ({renderDate('friday')})</p>
                    {!loading ? renderShifts('friday') : null}
                </div>

                <div className='day-col'>
                    <p>Saturday ({renderDate('saturday')})</p>
                    {!loading ? renderShifts('saturday') : null}
                </div>

                <div className='day-col'>
                    <p>Sunday ({renderDate('sunday')})</p>
                    {!loading ? renderShifts('sunday') : null}
                </div>
            </div>

        </div>
    )

} 

export default Manager