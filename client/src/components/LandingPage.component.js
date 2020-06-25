import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment';

const LandingPage = () => {
    
    const [ weeks, setWeeks ] = useState(null)
    const [ updated, setUpdated ] = useState(false)
    const [viewing, setViewing] = useState([false, ''])



    useEffect(() => {
        axios.get('/api/weeks')
            .then(response => {
                setWeeks(response.data)
            })
    }, [updated])

    const renderList = () => {
        let output = []
        weeks.map(week => {
            output.push(
                <Link to={`/week/${week.monday.date.split('/').join('-')}`}> <button > Week starting {week.monday.date} </button> </Link> 
            )
        })
        return output
    }


    if (viewing[0]) {
        return (
            <div id="landing-page-container">
                <span> {viewing[1]} </span>
            </div>
        )
    }

    return (
        <div id="landing-page-container">
            <h3><span>ShiftBoss</span></h3>
            <Link to="/create-week"> <button> Create Week </button> </Link> <br/><br/>
            <Link to="/employees"> <button> Employees </button> </Link> 
            <div id="week-list">
                <h3> Dashboard </h3>
                <div id="week-list-wrapper">
                    {
                        weeks ?
                            renderList()
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )

} 

export default LandingPage