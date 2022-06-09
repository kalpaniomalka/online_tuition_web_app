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
import {Form,Modal,Table} from 'react-bootstrap';
import SectionContainer from '../components/sectionContainer';

class attendence extends Component{
  constructor(props){
      super(props);
      this.state={
          results: [],
          short: [],
          uname: null,
          modelShow: false,
          msg: null,
          name: null,
          size: null
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

  payment(){
    this.props.history.push("/pay");
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

view(i){
    let currentComponent = this;
    console.log(i)
    axios.get('http://127.0.0.1:5000/attendence', {
        params: {
            id: i
        }
    }).then(function(response){
            console.log(response.data);
            currentComponent.setState({results:response.data['user']});
            if(i == 10){
                currentComponent.setState({name:"Grade 10 Science"})
            }else{
                currentComponent.setState({name:"Grade 11 Science"})
            }
            currentComponent.setState({size:response.data['size']})
            currentComponent.setState({modelShow:true})

    }).catch(function(error){
        console.log(error);
    });
}

CloseModal(){
    this.setState({modelShow:!this.state.modelShow})
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

{/* 
            <MDBEdgeHeader color='indigo darken-3' className='sectionPage' /> */}
        <MDBContainer className='mt-4'>
                <MDBRow>
                    <MDBCol>
  <SectionContainer header='Student Attendence'>
        <MDBCardGroup deck className='mt-4'>
          <MDBCard>

            <MDBCardBody>
              <MDBCardTitle tag='h5'>Grade 10 Science</MDBCardTitle>
              <MDBCardText>
               
              </MDBCardText>
              <MDBBtn color="primary" onClick={() => this.view(10)}>View</MDBBtn>
              </MDBCardBody>
            
          </MDBCard>

          <MDBCard>

        <MDBCardBody>
           <MDBCardTitle tag='h5'>Grade 11 Science</MDBCardTitle>
          <MDBCardText>
   
          </MDBCardText>
       
            <MDBBtn color="primary" onClick={() => this.view(11)}>View</MDBBtn>
          </MDBCardBody>

      </MDBCard>


     </MDBCardGroup>
  
      </SectionContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <Modal show={this.state.modelShow}>
                            <Modal.Header className="model_hdr">{this.state.name} - Attendence</Modal.Header>
                            <Modal.Body>
                                <Table responsive hover>
                                    <tbody>
                                    <p className="m-0" style={{fontSize:'20px'}}><strong>Total - {this.state.size}</strong></p><br/>
                                        {
                                            this.state.results.map((q,i) =>(
                                        <tr className="unread">
                                        <td>
                                        <h6 className="mb-1"></h6>
                                      
                                        <p className="m-0" style={{fontSize:'20px'}}><strong>{q}</strong></p><br/>
                                        
                                        </td>
                                        </tr>
                                        ))}
                                      
                                    </tbody>
                                </Table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={()=>{this.CloseModal()}}>Close</Button>
                            </Modal.Footer>
            </Modal>
        </div>
    );
  }
};

export default attendence;
