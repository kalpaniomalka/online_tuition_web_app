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
    MDBCol
} from 'mdbreact';
import SectionContainer from '../../../components/sectionContainer';
import axios from "axios";
import { Document, Page, pdfjs } from 'react-pdf';
import {Form,Modal,Table,Button} from 'react-bootstrap';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import '../../../style.css';

class DashboardA extends Component{
  constructor(props){
      super(props);
      this.state={
          lessons: [],
          modelShow: false,
          content: null,
          id: null
      };

      
      //this.handleSubmit = this.handleSubmit.bind(this);
      this.view = this.view.bind(this);
  }

  componentDidMount(){
    var data = {id: this.props.location.state.id, type: this.props.location.state.type}
    let currentComponent = this;
    console.log(data);
    axios.post('http://localhost:3001/upload/getDoc',data).then(function(response){
            console.log(response.data);
            currentComponent.setState({lessons:response.data})
    }).catch(function(error){
        console.log(error);
    });
}

view(i){
 // var name = i.split(".")
  this.setState({id:i})
  var data = {id: i, folder: this.props.location.state.id}
  let currentComponent = this;
  axios.post('http://localhost:3001/upload/getDocData',data).then(function(response){
          console.log(response.data);
          currentComponent.setState({content:response.data})
          currentComponent.setState({modelShow:true})
  }).catch(function(error){
      console.log(error);
  });
}

CloseModal(){
  this.setState({modelShow:!this.state.modelShow})
}

download () {
  var doc = new jsPDF('landscape', 'px', 'a4', 'false');
  doc.setFont('courier')
  doc.setFontSize(9)
  doc.text(50,20," "+this.state.id)
  doc.text(20,50," "+(this.state.content).toString())
  doc.save(this.state.id+".pdf")
}

  render (){   
    return (
        <div>
        <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
            <MDBContainer className='mt-4'>
                <MDBRow>
                    <MDBCol>
                        <SectionContainer header='Uploaded Documents'>
                            <MDBCardGroup deck className='mt-4'>
                            {
                                this.state.lessons.map((q,i) =>(
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle tag='h5'>{q}</MDBCardTitle>
                                        <MDBBtn color='primary' onClick={() => this.view(q)}>View</MDBBtn>
                                        </MDBCardBody>
                                </MDBCard>
                                
                             ))
                            }
                            </MDBCardGroup>
                        </SectionContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <Modal size="lg"   show={this.state.modelShow}>
                            <Modal.Header className="model_hdr">
                              {this.state.id}
                              <Button className="btn_modal" onClick={()=>{this.download()}}>Download</Button>
                              <Button onClick={()=>{this.CloseModal()}}>Close</Button>
                            </Modal.Header>
                            <Modal.Body>
                                <Table responsive hover>
                                    <tbody>
                                      
                                        <tr className="unread">
                                        <td>
                                        <h6 className="mb-1"></h6>
                                      
                                        <p className="m-0" style={{fontSize:'15px'}}><strong>{this.state.content}</strong></p><br/>
                                        
                                        </td>
                                        </tr>
                                      
                                    </tbody>
                                </Table>
                            </Modal.Body>
                            <Modal.Footer>
                                {/* <Button onClick={()=>{this.CloseModal()}}>Download</Button>
                                <Button onClick={()=>{this.CloseModal()}}>Close</Button> */}
                            </Modal.Footer>
            </Modal>
        </div>
    );
  }
};

export default DashboardA;
