import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class LandingPage extends Component {

    state = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
        weekStart: '',
        fromInput: null,
        toInput: null,
        day: 'monday',
        hoursPerDay: 24,
        flash: null
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        if (this.state.flash && this.state.flash.success) {
            setTimeout(() => {
                this.setState({
                    flash: null
                })
            })
        }
    }

    handleDaySelect = (event) => {
        const { name } = event.target
        this.setState({
            day: name
        })
        console.log(this.state.day)
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleAdd = () => {
        console.log(this.state[this.state.day])
        
        if (this.state.fromInput && this.state.toInput) {
            const shift = {
                from: this.state.fromInput,
                to: this.state.toInput
            }
            let day = this.state[this.state.day]
            day.push(shift)
            this.setState({
                [this.state.day]: day
            })
        } else {
            this.setState({
                flash: {
                    success: false,
                    message: "Please enter a start AND end time to add a shift"
                }
            })
        }
    }

    renderShifts = (day) => {
        let output = []
        this.state[day].map(shift => {
            const boxHeight = this.shiftBoxHeight(Number(shift.from.split(':')[0]), Number(shift.to.split(':')[0]))
            output.push(
                <div className="shift-card" style={{height:`${boxHeight}vh`}}>
                    <span> {shift.from} </span>
                    <span> {shift.to} </span>
                </div>
            )
        })
        return output
    }

    shiftBoxHeight = (from, to) => {
        const timeLength = to - from
        const height = (timeLength / this.state.hoursPerDay * 40)
        return height
    }

    render(){

        return (
            <div id="landing-page-container">
                <p> Create Week </p>
                <div id="week-input-container">
                    <div className="form">
                        <span>Starting: </span> <input type="date" id="date-input" name="weekStart" onChange={this.handleChange} /><br/>
                        <span>Hours / Day: </span> <input type="number" id="hours-input" value={this.state.hoursPerDay} name="hoursPerDay" onChange={this.handleChange} /><br/>
                        <span>From: </span> <input id="from-input" type="time" name="fromInput" onChange={this.handleChange} /> 
                        <span>To: </span><input id="to-input" type="time" name="toInput" onChange={this.handleChange}/> <br/>
                        {
                            this.state.flash ?
                                <div>
                                    <span style={this.state.flash.success ? {color: "#1DB954"} : {color: "red"}} > {this.state.flash.message} </span><br/>
                                </div>
                                :
                                null
                        }
                        <button onClick={this.handleAdd} > add </button>
                    </div>
                </div>
                <div id="week-display">
                    <div className="day-col">
                        <button 
                            onClick={this.handleDaySelect} 
                            name="monday" 
                            style={this.state.day === "monday" ? {backgroundColor: "#f0f0f0"} : null}
                        > Monday </button>
                        <div className="shift-list">
                            {this.renderShifts('monday')}
                        </div>
                    </div>
                    <div className="day-col">
                        <button 
                            onClick={this.handleDaySelect} 
                            name="tuesday" 
                            style={this.state.day === "tuesday" ? {backgroundColor: "#f0f0f0"} : null}
                        > Tuesday </button>
                        <div className="shift-list">
                            {this.renderShifts('tuesday')}
                        </div>
                    </div>
                    <div className="day-col">
                        <button 
                            onClick={this.handleDaySelect} 
                            name="wednesday" 
                            style={this.state.day === "wednesday" ? {backgroundColor: "#f0f0f0"} : null}
                        > Wendesday </button>
                        <div className="shift-list">
                            {this.renderShifts('wednesday')}
                        </div>
                    </div>
                    <div className="day-col">
                        <button 
                            onClick={this.handleDaySelect} 
                            name="thursday" 
                            style={this.state.day === "thursday" ? {backgroundColor: "#f0f0f0"} : null}
                        > Thursday </button>
                        <div className="shift-list">
                            {this.renderShifts('thursday')}
                        </div>
                    </div>
                    <div className="day-col">
                        <button 
                            onClick={this.handleDaySelect} 
                            name="friday" 
                            style={this.state.day === "friday" ? {backgroundColor: "#f0f0f0"} : null}
                        > Friday </button>
                        <div className="shift-list">
                            {this.renderShifts('friday')}
                        </div>
                    </div>
                    <div className="day-col">
                        <button 
                            onClick={this.handleDaySelect} 
                            name="saturday" 
                            style={this.state.day === "saturday" ? {backgroundColor: "#f0f0f0"} : null}
                        > Saturday </button>
                        <div className="shift-list">
                            {this.renderShifts('saturday')}
                        </div>
                    </div>
                    <div className="day-col">
                        <button 
                            onClick={this.handleDaySelect} 
                            name="sunday" 
                            style={this.state.day === "sunday" ? {backgroundColor: "#f0f0f0"} : null}
                        > Sunday </button>
                        <div className="shift-list">
                            {this.renderShifts('sunday')}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
} 