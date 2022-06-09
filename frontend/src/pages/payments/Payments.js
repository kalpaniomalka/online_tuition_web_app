import React, {Component} from 'react';
import {
  MDBJumbotron,
  MDBContainer,
  MDBRow,
  MDBInputGroup,
  MDBBtn,
  MDBCol
} from 'mdbreact';
import SectionContainer from '../../components/sectionContainer';
import {Form,Modal,Table,Button} from 'react-bootstrap';
import FormData from 'form-data';
import axios from "axios"

class Payments extends Component{
  constructor(props){
      super(props);
      this.state={
        results: [],
        video: [],
        modelShow: false,
        msg: null,
        success: false
      };

     // this.s = this.questions.bind(this);
     
  }

submit = (files) => {
  let currentComponent = this;
  console.log(files.name)
  const formData = new FormData()
  formData.append('image', files[0])
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
 
  axios.post('http://localhost:3001/upload/image', formData, config).then((response)=> {
    console.log("Video Uploaded Correctly")
    if(response.data == "success")
      currentComponent.setState({msg:"Bank slip uploaded successfully! You will receive an email. Check inbox!"})
      currentComponent.setState({modelShow:true})
      currentComponent.setState({success:true})
  }).catch((err)=> {
    console.log(err)
  })
}


CloseModal(){
  this.setState({modelShow:!this.state.modelShow})
}
  render (){ 
    return (
        <>
             <MDBContainer className='mt-5'>
                <MDBRow>
                    <MDBCol>
                        <SectionContainer noBorder header=''>
                            <MDBJumbotron className='text-center'>
                                <h2 className='h1 display-3'>Upload your bank slip</h2>
                                <p className='lead'>
                                    Upload .JPEG .PNG file
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
                            <Modal.Header className="model_hdr">Slip Upload</Modal.Header>
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
        </>
    );
  };
};

export default Payments;
