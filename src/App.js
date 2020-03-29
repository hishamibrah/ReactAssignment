import React, { Component } from 'react';
import { CardContent, Typography, Card, Button, TextField } from '@material-ui/core';
import './App.css';

var today = new Date().toISOString().split('T')[0];
var obj=[];
const emailval = /\S+@\S+.\S+/;

class App extends Component{
  constructor() {
    super();
    this.state={
      emailMessage:'',
      emailunique:false,
      email:'',
      age:'',
      first:'',
      second:'',
      dob:'',
      obj:'',
      error:false,
    }
  }
  async formSubmit(){
   if(this.state.first===''){
      this.setState({ errorFirst:true })
    }if(this.state.second===''){
      this.setState({ errorSecond:true })
    }if(this.state.dob===''){
      this.setState({errorDate:true})
    }
    if(emailval.test(this.state.email)===false){
      this.setState({errorEmail:true})
    }
    if(this.state.first!==''&&this.state.second!==''&&this.state.dob!==''&&this.state.age!==''&&this.state.email!==''){
      if(obj[0]===undefined){
        obj.push({firstname:this.state.first,secondname:this.state.second,dob:this.state.dob,age:this.state.age,email:this.state.email})
        this.setState({
          obj:obj.sort(compare)
        })
      }else{
      obj.map((user,index) => {
        console.log("hello");
          try{
            if(user.email===this.state.email){             
              this.setState({
                emailunique:false,
                errorEmail:true,
                emailMessage:'Email exists'
              })
            }else{
              this.setState({
                emailunique:true,
                errorEmail:false,
                emailMessage:''
              })
            }
          }catch(e){
              console.log(e);
              
          }          
        })
        }
      if(this.state.emailunique===true){
        obj.push({firstname:this.state.first,secondname:this.state.second,dob:this.state.dob,age:this.state.age,email:this.state.email})
        this.setState({
          obj:obj.sort(compare)
        })
      }
    }
  }
  countAge = async()=>{
    if (this.state.dob !== '') {
      let dob = new Date(this.state.dob);
      let difference = Date.now() - dob.getTime();
      let date = new Date(difference);
      let age = Math.abs(date.getUTCFullYear() - 1970)
      this.setState({
        age: age,
      })
    }
  }
  handleEmailChange=event =>{
    this.setState({
      email:event.target.value,
      errorEmail:false
    })
  }
  handleFirstChange=event =>{
    this.setState({
      first:event.target.value,
      errorFirst:false
    })
  }
  handleSecondChange=event =>{
    this.setState({
      second:event.target.value,
      errorSecond:false
    })
  }
  handleDobChange=event =>{
    this.setState({
      dob:event.target.value,
      errorDate:false,
    })
  }
  render(){
    return (
      <div>
        <div className="App-header">
            <h1 className="head" >Form</h1>        
        </div>
        <div className="app-form">
            <form className="form">
              <TextField id="first" error={this.state.errorFirst} required={true} type="text" label="First Name" value={this.state.first} onChange={this.handleFirstChange} variant="outlined" className="inputbox" /><br/><br/>
              <TextField id="second" error={this.state.errorSecond} required={true} label="Last Name" value={this.state.second} variant="outlined" className="inputbox" onChange={this.handleSecondChange} /><br/><br/>
              <TextField id="email" error={this.state.errorEmail} required={true} type="email" label="Email" value={this.state.email} onChange={this.handleEmailChange} variant="outlined" className="inputbox" /><br/><br/>
              <input id="dob" required={true} type="date" value={this.state.dob} label="DOB" variant="outlined" className="inputbox" onChange={this.handleDobChange} max={today} onBlur={()=>this.countAge()}/><br/><br/>
              <TextField id="age" label="Age" value={this.state.age}  InputLabelProps={{ shrink:true }} variant="outlined" className="inputbox" disabled={true}/><br/><br/>
              <label className="error">{this.state.emailMessage}</label><br/>
              <Button variant="contained" color="primary" onClick={this.formSubmit.bind(this)} type="button">Submit</Button>
            </form>
        </div>
        <div className="container">
          {obj.map((user,index)=>(
            <Card key={index} className="root">
              <CardContent>
                <Typography className="title" color="textSecondary" gutterBottom>
                  User Data
                </Typography>
                <Typography>
                 First Name : {user.firstname}
                </Typography>
                <Typography>
                  Second Name : {user.secondname}
                </Typography>
                <Typography>
                  Email : {user.email}
                </Typography>
                <Typography>
                 DOB :{user.dob}
                </Typography>
                <Typography>
                  Age :{user.age}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

function compare(a,b) {
  return Date.parse(a.dob)-Date.parse(b.dob);    
}

export default App;
