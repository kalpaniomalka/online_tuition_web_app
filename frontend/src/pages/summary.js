import React, {Component} from 'react';
import {
    MDBEdgeHeader,
    MDBJumbotron,
    MDBContainer,
    MDBRow,
    MDBInputGroup,
    MDBBtn,
    MDBCol
} from 'mdbreact';
import '../style.css';
import axios from "axios";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SectionContainer from '../components/sectionContainer';
import {Form,Modal,Table} from 'react-bootstrap';
import FormData from 'form-data';

class summary extends Component{
  constructor(props){
      super(props);
      this.state={
        results: [],
        video: [],
        modelShow: false,
        msg: null,
        success: false
      };

      this.questions = this.questions.bind(this);
      this.adHome = this.adHome.bind(this);
      this.summarization = this.summarization.bind(this);
      this.categorization = this.categorization.bind(this);
      this.payment = this.payment.bind(this);
      this.attendence = this.attendence.bind(this);
      this.ranking = this.ranking.bind(this);
      this.summarization = this.summarization.bind(this);
      this.payment = this.payment.bind(this);
  }

submit = (files) => {
  let currentComponent = this;
  console.log(files.name)
  const formData = new FormData()
  formData.append('video', files[0])
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
 
  axios.post('http://localhost:3001/upload/video', formData, config).then((response)=> {
    console.log("Video Uploaded Correctly")
    if(response.data == "success")
      currentComponent.setState({msg:"Successfully video uploaded!"})
      currentComponent.setState({modelShow:true})
      currentComponent.setState({success:true})
  }).catch((err)=> {
    console.log(err)
  })
}

adHome(){
    this.props.history.push("/admin_home");
}

payment(){
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
            
            <MDBContainer className='mt-5'>
                <MDBRow>
                    <MDBCol>
                        <SectionContainer noBorder header=''>
                            <MDBJumbotron className='text-center'>
                                <h2 className='h1 display-3'>Upload your video file</h2>
                                <p className='lead'>
                                    Upload .mp4 .mkv file
                                </p>
                                <hr className='my-2' />
                             
                            </MDBJumbotron>
                        </SectionContainer>
                        <SectionContainer header=''>
                        <Form.Label></Form.Label>
                        <Form.Group controlId="Payment">
                        <Form.Control type="file" onChange={(e) => {this.submit(e.target.files)}}></Form.Control>
                        </Form.Group>
                       </SectionContainer>
                       
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <Modal show={this.state.modelShow}>
                            <Modal.Header className="model_hdr">Video Upload</Modal.Header>
                            <Modal.Body>
                                <Table responsive hover>
                                    <tbody>
                                        <tr className="unread">
                                        <td>
                                        <h6 className="mb-1"></h6>
                                       
                                        <p className="m-0"><strong>{this.state.msg}</strong></p><br/>                           
                                        </td>
                                        </tr>
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

export default summary;
