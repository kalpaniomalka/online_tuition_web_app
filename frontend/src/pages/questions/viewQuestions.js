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
import '../../style.css';
import axios from "axios";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SectionContainer from '../../components/sectionContainer';
import Card from "react-bootstrap/Card";

class viewQuestions extends Component{
  constructor(props){
      super(props);
      this.state={
          questions: [],
      };

      //this.handleSubmit = this.handleSubmit.bind(this);
      this.view = this.view.bind(this);
  }

  componentDidMount(){
    let currentComponent = this;

    axios.get('http://127.0.0.1:5000/loadQuestions', {
    }).then(function(response){
            console.log(response.data);
            currentComponent.setState({questions:response.data['name']})

    }).catch(function(error){
        console.log(error);
    });
}

view(i){
    console.log(i);
    this.props.history.push({
        pathname: '/questionnaire',
        search: '?query=',
        state: { name: i }
    })
}

  render (){   
    return (
        <div>
        <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
            <MDBContainer className='mt-4'>
                <MDBRow>
                    <MDBCol>
                        <SectionContainer header='Uploaded Questionaires'>
                            <MDBCardGroup deck className='mt-4'>
                            {
                                this.state.questions.map((q,i) =>(
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle tag='h5'>{q}</MDBCardTitle>
                                        <MDBBtn color='primary' onClick={() => this.view(q)}>Attempt</MDBBtn>
                                        </MDBCardBody>
                                        <MDBCardFooter small muted>
                                         You have only two Attempts
                                        </MDBCardFooter>
                                </MDBCard>
                             ))
                            }
                            </MDBCardGroup>
                        </SectionContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
  }
};

export default viewQuestions;
