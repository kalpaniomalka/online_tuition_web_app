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
import {Form,Modal,Table} from 'react-bootstrap';

class admin extends Component{
  constructor(props){
      super(props);
      this.state={
        questions: [],
        results: [],
        modelShow: false
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

  componentDidMount(){
    let currentComponent = this;

    axios.get('http://127.0.0.1:5000/loadQuestions', {
    }).then(function(response){
            currentComponent.setState({questions:response.data['name']})

    }).catch(function(error){
        console.log(error);
    });
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

view(i){
    let currentComponent = this;
   
    axios.get('http://127.0.0.1:5000/loadResult', {
        params: {
            qname: i[0]
        }
    }).then(function(response){
            console.log(response.data);
            currentComponent.setState({results:response.data['result']});
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
           
            <MDBContainer className='mt-4'>
                <MDBRow>
                    <MDBCol>
                        <SectionContainer header='Result'>
                            <MDBCardGroup deck className='mt-4'>
                            {
                                this.state.questions.map((q,i) =>(
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle tag='h5'>{q}</MDBCardTitle>
                                        <MDBBtn color='primary' onClick={() => this.view(q)}>View Result</MDBBtn>
                                        </MDBCardBody>
                                </MDBCard>
                             ))
                            }
                            </MDBCardGroup>
                        </SectionContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <Modal show={this.state.modelShow}>
                            <Modal.Header className="model_hdr">Results</Modal.Header>
                            <Modal.Body>
                                <Table responsive hover>
                                    <tbody>
                                       
                                        {
                                            this.state.results.map((q,i) =>(
                                        <tr className="unread">
                                        <td>
                                        <h6 className="mb-1"></h6>
                                      
                                        <p className="m-0" style={{fontSize:'20px'}}><strong>{q} %</strong></p><br/>
                                        
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

export default admin;
