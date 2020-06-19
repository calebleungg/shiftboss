import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday','sunday']


const Manager = (props) => {
    
    const [week, setWeek] = useState({})
    const [workforce, setWorkForce] = useState([])
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(true)
    const [activeCard, setCard] = useState(null)
    // activeCard needs [day, indexOfShift]

    // inital info call
    useEffect(() => {
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
            })
            .catch(err => console.log(err))
    },[])

    // update list on empty search
    useEffect(() => {
        getApiEmployees()
    }, [update])

    // get employees on api endpoint
    const getApiEmployees = () => {
        axios.get('/api/employees')
            .then(response => {
                setWorkForce(response.data)
                setUpdate(false)
            })
            .catch(err => console.log(err))
    }

    // query on search input
    const handleSearch = (e) => {
        if (e.target.value === '') {
            setUpdate(true)
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
                <button> {`${employee.firstName[0].toUpperCase()}. ${employee.lastName}`} </button>
            )
        })
        return output
    }

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
            output.push(
                <div className="shift-wrapper" key={`${day}-shift-${counter}`}>
                    <div 
                        className="shift-card" 
                        // style={{height:`${boxHeight}vh`}} 
                        style={
                            shift.selected ?
                                {
                                    border: "3px solid #1DB954",
                                    height:`${boxHeight}vh`
                                }
                                :
                                {
                                    height:`${boxHeight}vh`
                                }
                        }
                        onClick={(e) => selectCard(e)} 
                        id={`${day}-card-${counter}`} 
                    >
                        <span> {shift.from} </span>
                        <span> {shift.to} </span>
                    </div>
                    <i className="fas fa-times-circle" onClick={(e) => deleteShift(e)} id={`${day}-shift-${counter}`} ></i>
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
        const height = (timeLength() / 24 * 80)
        return height
    }

    // deleting shift card
    const deleteShift = (e) => {
        const day = e.target.id.split('-')[0]
        const index = e.target.id.split('-')[2]
        let update = week
        update[day].shifts.splice(index, 1)
        setUpdate(true)
        setWeek(update)
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
                    }}>Monday</p>
                    <div>
                        {!loading ? renderShifts('monday') : null}
                    </div>
                </div>

                <div className='day-col'>
                    <p>Tuesday</p>
                    {!loading ? renderShifts('tuesday') : null}
                </div>

                <div className='day-col'>
                    <p>Wednesday</p>
                    {!loading ? renderShifts('wednesday') : null}
                </div>

                <div className='day-col'>
                    <p>Thursday</p>
                    {!loading ? renderShifts('thursday') : null}
                </div>

                <div className='day-col'>
                    <p>Friday</p>
                    {!loading ? renderShifts('friday') : null}
                </div>

                <div className='day-col'>
                    <p>Saturday</p>
                    {!loading ? renderShifts('saturday') : null}
                </div>

                <div className='day-col'>
                    <p>Sunday</p>
                    {!loading ? renderShifts('sunday') : null}
                </div>
            </div>

        </div>
    )

} 

export default Manager