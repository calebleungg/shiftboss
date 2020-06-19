import React, { useState, Component, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment';

const WeekCreate = () => {


    // default week template
    const [week, setWeek] = useState({
        monday: {
            date: null,
            shifts: []
        },
        tuesday: {
            date: null,
            shifts: []
        },
        wednesday: {
            date: null,
            shifts: []
        },
        thursday: {
            date: null,
            shifts: []
        },
        friday: {
            date: null,
            shifts: []
        },
        saturday: {
            date: null,
            shifts: []
        },
        sunday: {
            date: null,
            shifts: []
        }
    })


    const [selectedDay, setSelectedDay] = useState('monday')
    const [weekStart, setWeekStart] = useState(null)
    const [hoursPerDay, setHoursPerDay] = useState(24)
    const [fromInput, setFromInput] = useState(null)
    const [toInput, setToInput] = useState(null)
    const [update, setUpdate] = useState(false)

    const [flash, setFlash] = useState(null)

    // effect to manage flash messages
    useEffect(() => {
        if(flash && flash.success) {
            setTimeout(() => {
                setFlash(null)
            }, 2000)
        }
    }, [flash])

    useEffect(() => {
        console.log('updated')
        setUpdate(false)
    },[update])


    const handleAdd = () => {
        let update = week
        
        if (fromInput && toInput) {
            setFlash(null)
            let shift = {
                from: fromInput,
                to: toInput
            }
            update[selectedDay].shifts.push(shift)
            setWeek(update)
            setUpdate(true)
            console.log(week)
        } else {
            setFlash({
                success: false,
                message: "Please enter a start AND end time to add a shift"
            })
        }
        console.log(weekStart)
    }

    const handleDaySelect = (e) => {
        const { name } = e.target
        setSelectedDay(name)
    }

    const renderShifts = (day) => {
        let output = []
        let counter = 0
        week[day].shifts.map(shift => {
            const boxHeight = shiftBoxHeight(Number(shift.from.split(':')[0]), Number(shift.to.split(':')[0]))
            output.push(
                <div className="shift-wrapper" key={`${day}-shift-${counter}`}>
                    <div className="shift-card" style={{height:`${boxHeight}vh`}}>
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

    const shiftBoxHeight = (from, to) => {
        const timeLength = () => {
            if ((to - from) < 0) {
                return (24 - from + to)
            }
            return (to - from)
        }
        const height = (timeLength() / hoursPerDay * 40)
        return height
    }

    const deleteShift = (event) => {
        const day = event.target.id.split('-')[0]
        const index = event.target.id.split('-')[2]
        let update = week
        update[day].shifts.splice(index, 1)
        setUpdate(true)
        setWeek(update)
    }

    const assignDate = (day, id) => {
        const year = weekStart.split('-')[0]
        let update = week
        week[day].date = document.getElementById(id) ? document.getElementById(id).innerHTML + `/${year}`  : null
        setWeek(update)
        setUpdate(true)
    
    }

    const handleCreateWeek = () => {
        
        if (weekStart) {
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday','sunday'].map(day => {
                assignDate(day, `${day}-date`)
            })
    
            const req = {
                monday: week.monday,
                tuesday: week.tuesday,
                wednesday: week.wednesday,
                thursday: week.thursday,
                friday: week.friday,
                saturday: week.saturday,
                sunday: week.sunday,
            }
            console.log(req)
            axios.post('/api/weeks/create',req)
                .then(response => {
                    if (response.status === 200) {
                        setFlash({
                            success: true,
                            message: "Week has been created successfully"
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    setFlash({
                        flash:{
                            success: false,
                            message: "There was an error creating your Week. Check dev logs."
                        }
                    })
                })
        } else {
            setFlash({
                success: false,
                message: "Please set a start date on Monday"
            })
        }

    }


    return (
        <div id="week-page-container">
            <Link to="/"> <button id="home-btn"> Home </button> </Link>
            <h3> Create Week </h3>
            <div id="week-input-container">
                <div className="form">

                    <span>Starting: </span> 
                    <input 
                        type="date" 
                        id="date-input" 
                        onChange={(e) => setWeekStart(e.target.value)} 
                    /><br/>

                    <span>Hours / Day: </span> 
                    <input 
                        type="number" 
                        id="hours-input" 
                        value={hoursPerDay}
                        onChange={(e) => setHoursPerDay(e.target.value)}
                    /><br/>

                    <span>From: </span> 
                    <input 
                        id="from-input" 
                        type="time" 
                        onChange={(e) => setFromInput(e.target.value)}
                    /> 

                    <span>To: </span>
                    <input 
                        id="to-input" 
                        type="time" 
                        onChange={(e) => setToInput(e.target.value)}
                        /> <br/>

                    {
                        flash ?
                            <div>
                                <span style={flash.success ? {color: "#1DB954"} : {color: "red"}} > {flash.message} </span><br/>
                            </div>
                            :
                            null
                    }
                    <button onClick={handleAdd} > add </button> <button id="finish-btn" onClick={handleCreateWeek} > finish </button>
                </div>
            </div>
            <div id="week-display">
                <div className="day-col">
                    <button 
                        name="monday" 
                        onClick={(e) => handleDaySelect(e)}
                        style={selectedDay === "monday" ? {backgroundColor: "#f0f0f0"} : null}
                    > Monday
                    {
                        weekStart ? 
                            <div>
                                (<Moment date={weekStart} format="DD/MM" id="monday-date" />)
                            </div>
                            
                            :
                            null

                    }
                    </button>
                    <div className="shift-list">
                        {renderShifts('monday')}
                    </div>
                </div>
                <div className="day-col">
                    <button 
                        name="tuesday" 
                        onClick={(e) => handleDaySelect(e)}
                        style={selectedDay === "tuesday" ? {backgroundColor: "#f0f0f0"} : null}
                    > Tuesday 
                    {
                        weekStart ? 
                            <div>
                                (<Moment add={{day: 1}} date={weekStart} format="DD/MM" id="tuesday-date"/>)
                            </div>
                            
                            :
                            null

                    }
                    </button>
                    <div className="shift-list">
                        {renderShifts('tuesday')}
                    </div>
                </div>
                <div className="day-col">
                    <button 
                        name="wednesday" 
                        onClick={(e) => handleDaySelect(e)}
                        style={selectedDay === "wednesday" ? {backgroundColor: "#f0f0f0"} : null}
                    > Wendesday
                    {
                        weekStart ? 
                            <div>
                                (<Moment add={{day: 2}} date={weekStart} format="DD/MM" id="wednesday-date"/>)
                            </div>
                            
                            :
                            null

                    }
                    </button>
                    <div className="shift-list">
                        {renderShifts('wednesday')}
                    </div>
                </div>
                <div className="day-col">
                    <button 
                        name="thursday" 
                        onClick={(e) => handleDaySelect(e)}
                        style={selectedDay === "thursday" ? {backgroundColor: "#f0f0f0"} : null}
                    > Thursday
                    {
                        weekStart ? 
                            <div>
                                (<Moment add={{day: 3}} date={weekStart} format="DD/MM" id="thursday-date"/>)
                            </div>
                            
                            :
                            null

                    }
                    </button>
                    <div className="shift-list">
                        {renderShifts('thursday')}
                    </div>
                </div>
                <div className="day-col">
                    <button 
                        name="friday" 
                        onClick={(e) => handleDaySelect(e)}
                        style={selectedDay === "friday" ? {backgroundColor: "#f0f0f0"} : null}
                    > Friday 
                    {
                        weekStart ? 
                            <div>
                                (<Moment add={{day: 4}} date={weekStart} format="DD/MM" id="friday-date"/>)
                            </div>
                            
                            :
                            null

                    }
                    </button>
                    <div className="shift-list">
                        {renderShifts('friday')}
                    </div>
                </div>
                <div className="day-col">
                    <button 
                        name="saturday" 
                        onClick={(e) => handleDaySelect(e)}
                        style={selectedDay === "saturday" ? {backgroundColor: "#f0f0f0"} : null}
                    > Saturday 
                    {
                        weekStart ? 
                            <div>
                                (<Moment add={{day: 5}} date={weekStart} format="DD/MM" id="saturday-date"/>)
                            </div>
                            
                            :
                            null

                    }
                    </button>
                    <div className="shift-list">
                        {renderShifts('saturday')}
                    </div>
                </div>
                <div className="day-col">
                    <button 
                        name="sunday" 
                        onClick={(e) => handleDaySelect(e)}
                        style={selectedDay === "sunday" ? {backgroundColor: "#f0f0f0"} : null}
                    > Sunday 
                    {
                        weekStart ? 
                            <div>
                                (<Moment add={{day: 6}} date={weekStart} format="DD/MM" id="sunday-date"/>)
                            </div>
                            
                            :
                            null

                    }
                    </button>
                    <div className="shift-list">
                        {renderShifts('sunday')}
                    </div>
                </div>

            </div>
        </div>
    )
} 

export default WeekCreate