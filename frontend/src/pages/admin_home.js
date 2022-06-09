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
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SimpleImageSlider from "react-simple-image-slider";
import img1 from '../assets/img/1.jpg'
import img2 from '../assets/img/2.jpg'

const images = [
    { url: img2},
    { url: img2},
    { url: img1},
    { url: img1},
    { url: img1 },
    { url: img1 },
    { url: img1},
  ];

class admin extends Component{
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

      this.questions = this.questions.bind(this);
      this.adHome = this.adHome.bind(this);
      this.summarization = this.summarization.bind(this);
      this.categorization = this.categorization.bind(this);
      this.payment = this.payment.bind(this);
      this.attendence = this.attendence.bind(this);
      this.ranking = this.ranking.bind(this);
      this.payment = this.payment.bind(this);
  }

//   handleChange = (event) => {
// 		this.setState({pwd:event.target.value})
// 	} 

//   handleChangeName = (event) => {
// 		this.setState({uname:event.target.value})
// 	} 

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
//         currentComponent.props.history.push("/home");
                   
//     }).catch(function(error){
//         console.log(error);
//     });
		
// }

adHome(){
    this.props.history.push("/admin_home");
}

summarization(){
    this.props.history.push("/summary");
}

categorization(){
    this.props.history.push("/categorizer");
}

questions(){
    this.props.history.push("/questions");
}

attendence(){
    this.props.history.push("/attendence");
}

ranking(){
    this.props.history.push("/studentRanking");
}

payment(){
    this.props.history.push("/pay");
}


  render (){  
    return (
        <div className="btn_style">
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group"> 
                <Button></Button>   
                <Button onClick={this.adHome}>Teacher's Home</Button>
                <Button onClick={this.summarization}>Generate Summaries</Button>
                <Button onClick={this.categorization}>Document Categorization</Button>
                <Button onClick={this.questions}>Question Generator</Button>
                <Button onClick={this.attendence}>Student Attendence</Button>
                <Button onClick={this.ranking}>Student Ranking</Button>
                <Button onClick={this.payment}>Student Payment</Button>  
                <Button></Button>      
            </ButtonGroup>

        <br/>
        <br/>
            <div className="slider">
      <SimpleImageSlider
        width={1000}
        height={504}
        images={images}
        useGPURender={true}
        showNavs={true}
        showBullets={true}
      />
    </div>
        </div>
    );
  }
};

export default admin;
