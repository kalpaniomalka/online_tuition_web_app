import React, {Component} from 'react';
import {
    MDBEdgeHeader,
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBRow,
    MDBCardGroup,
    MDBCol,
    MDBAnimation 
} from 'mdbreact';
import '../style.css';
import axios from "axios";
import {Row,Form,Button, Col,Card,Table, Overlay,Modal, ProgressBar} from 'react-bootstrap';

class Login extends Component{
  constructor(props){
      super(props);
      this.state={
          pwd: null,
          question: [],
          answers: [],
          short: [],
          show: false,
          click: false,
          selectedQuestion: [],
          uname: null,
          modelShow: false,
          msg: null
      };
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
		this.setState({pwd:event.target.value})
	} 

  handleChangeName = (event) => {
		this.setState({uname:event.target.value})
	} 

//   handleSubmit(){
// 	var myData = [this.state.uname,this.state.pwd]
 
// 	let currentComponent = this;   
		
//     axios.get('http://127.0.0.1:5000/login', {
//         params: {
//             uname: myData[0],
//             pwd: myData[1]
//         }
//     }).then(function(response){
//         console.log(response.data);
//         sessionStorage.setItem('userName', myData[0]);
//         if(response.data["type"] == "lec")
//           currentComponent.props.history.push("/admin_home");
//         else
//           currentComponent.props.history.push({
//               pathname: '/home',
//               search: '?query='+myData[0],
//               state: { name: myData[0] }
//           })
                   
//     }).catch(function(error){
//         console.log(error);
//     });
		
// }

handleSubmit(){
	var myData = [this.state.uname,this.state.pwd]
   var data = {
    uname: myData[0],
    pwd: myData[1]
  }
	let currentComponent = this;   
		
    axios.post('http://localhost:3001/upload/login',data)
    .then(function(response){
        console.log(response.data[0]['utype']);
        sessionStorage.setItem('userName', myData[0]);
        if(response.data[0]['utype'] == "lec")
          currentComponent.props.history.push("/admin_home");
        else
          currentComponent.props.history.push({
              pathname: '/home',
              search: '?query='+myData[0],
              state: { name: myData[0] }
          })
                   
    }).catch(function(error){
        console.log(error);
    });
		
}

  render (){
   
   
    return (
        <div className="pge">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
     
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md='8' className='mx-auto'>
                        
         <div className="Login">
      <Form>
        <Form.Group size="lg" controlId="username">
          <Form.Label><strong>Username</strong></Form.Label>
          <Form.Control
            autoFocus
            type="text"
            onChange={this.handleChangeName}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label><strong>Password</strong></Form.Label>
          <Form.Control
            type="password"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button block size="lg"  onClick={this.handleSubmit}>
          Login
        </Button>
      </Form>
     
    </div> 
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            
            <br/>
      <br/>
      <br/>
      <br/>
        </div>
    );
  }
};

export default Login;
