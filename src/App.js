import React, { Component } from 'react';

import {CountDown} from "./CountDown"
import {Slogan} from './Slogan'
import "./timer.css"
import './App.css';

 class App extends Component {

  state = {
    remaining : {
        days : 0,
        hours : 0,
        minutes : 0,
        seconds : 0
    }, 
    isExpired : false
  }

 timer

componentDidMount() {
  this.setDate();
  this.counter();
 
}

setDate = ()=>{
    //const {targetDate, targetTime} = this.props
   
    let now = new Date().getTime()
    let targetDate = "Apr 4, 2020"
    let targetTime = "11:00:00"
    let countDownDate = new Date(targetDate+" "+targetTime).getTime()

    const distance = countDownDate - now 
    if(distance < 0){
      clearInterval(this.timer)
      this.setState({isExpired : true})
    }else{
      this.setState({
         remaining : {
          days : Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours : Math.floor(
            (distance % (1000 * 60 * 60 *24)) / (1000 * 3600)
            ),
          minutes : Math.floor((distance % (1000 * 3600)) / (1000 * 60)),
          seconds : Math.floor((distance % (1000 * 60)) / 1000) 
        },
        isExpired : false 
       
      })
    }
}

counter = ()=>{
  this.timer = setInterval(()=>{
    this.setDate()
  },1000)
}
  render(){
    return (
      <div className="App">
      
        


        <CountDown></CountDown>
          {
            !this.state.isExpired  ? (
              <div className='counter'>
                  {Object.entries(this.state.remaining).map((element,index)=>(
                    <div key={index} className='entry'>
                        <div key={element[1]} className='entry-value'>
                          <span className="count top curr flipTop">{element[1] + 1}</span>
                          <span className="count top next">{element[1]}</span>
                          <span className="count bottom next flipBottom">{element[1]}</span>
                          <span className="count bottom curr">{element[1] + 1}</span>
                        </div>
                        <div className='entry-title'>{element[0].toUpperCase()}</div>
                    </div> 
                  ))}
              </div>
            ) : (
              <p className='alert-danger'>Expired</p>
            )
          
          }
           <Slogan></Slogan>
      </div>
    );
  }
 
 }
export default App;
 