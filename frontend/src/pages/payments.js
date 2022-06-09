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
import SectionContainer from '../components/sectionContainer';
import Card from "react-bootstrap/Card";
import {Form,Modal,Table} from 'react-bootstrap';

class viewQuestions extends Component{
  constructor(props){
      super(props);
      this.state={
          questions: [],
          answers: []
      };

      //this.submitAnswers = this.submitAnswers.bind(this);
      this.questions = this.questions.bind(this);
      this.adHome = this.adHome.bind(this);
      this.summarization = this.summarization.bind(this);
      this.categorization = this.categorization.bind(this);
      this.payment = this.payment.bind(this);
      this.attendence = this.attendence.bind(this);
      this.ranking = this.ranking.bind(this);
      this.payment = this.payment.bind(this);
  }

  componentDidMount(){
    let currentComponent = this;

    axios.get('http://localhost:3001/upload/getDetails', {
    }).then(function(response){
            console.log(response.data);
            currentComponent.setState({questions:response.data})

    }).catch(function(error){
        console.log(error);
    });
}

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
    const rows = this.state.questions;
    return (
        <div>
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
            <MDBContainer className='mt-4'>
            <MDBRow>
            <MDBCol>
                            <br/><br/>
                            <div className="row align-items-center">
                  <table id="question">
                        <thead>
                        <tr>
                            <th>Name </th>
                            <th>Registration Number</th>
                            <th>Amount</th>
                            <th>Course</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          rows.map((q,i) =>(
                
                          <tr>
                            <td>{q[0]}</td>
                            <td>{q[1]}</td>
                            <td>{q[2]}</td>
                            <td>{q[3]}</td>
                          </tr>

                        ))
                        }
    
                        </tbody>
                  </table>
                      </div>   
                      </MDBCol> 
                    </MDBRow>
                    </MDBContainer>
        </div>
    );
  }
};

export default viewQuestions;
