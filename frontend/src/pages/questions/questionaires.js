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
import {Form,Modal,Table} from 'react-bootstrap';

class viewQuestions extends Component{
  constructor(props){
      super(props);
      this.state={
          questions: [],
          answers: [],
          shorts: [],
          qname : null,
          givenAnswrs : [],
          correct : null,
          wrong: null,
          modelShow: false,
          marks: null
      };

      this.submitAnswers = this.submitAnswers.bind(this);
  }

  componentDidMount(){
    var qname = this.props.location.state.name[0];
    this.setState({qname:qname});

    let currentComponent = this;

    axios.get('http://127.0.0.1:5000/getQuestions', {
        params: {
            name: qname
        }
    }).then(function(response){
            console.log(typeof(response.data['questions']));
            currentComponent.setState({questions:response.data['questions']})
            currentComponent.setState({answers:response.data['answers']})
            currentComponent.setState({shorts:response.data['short']})

    }).catch(function(error){
        console.log(error);
    });
}

  handleChangeAnswer = id => (event) => {
      var ans = this.state.givenAnswrs;
      ans[id] = event.target.value;
	  this.setState({givenAnswrs:ans});
 } 

submitAnswers(){
    var ans = this.state.givenAnswrs;
    var correct_ans = this.state.shorts;
    var correct = 0;
    var wrong = 0;

	for (let i = 0; i < ans.length; i++) {
        var trim_an = (correct_ans[i].trim()).toUpperCase();
        var trim_given = ans[i].trim();
        var given = (trim_given.toUpperCase()).split(" ")
        var exist = 0
      
        for (let j = 0; j< given.length; j++){
            if(trim_an.includes(given[j])){
                exist ++
            }
        }

        if(exist > (given.length/2)){
            correct ++;
        } else{
            wrong ++;
        }
    }

    this.setState({correct:correct});
    this.setState({wrong:wrong});
    this.setState({modelShow:true})

    let currentComponent = this;

    axios.get('http://127.0.0.1:5000/insertResult', {
        params: {
            uname: sessionStorage.getItem('userName'),
            correct_an: correct,
            wrong_an: wrong,
            qname: currentComponent.state.qname
        }
    }).then(function(response){
            console.log(response.data);

    }).catch(function(error){
        console.log(error);
    });
}

CloseModal(){
    this.setState({modelShow:!this.state.modelShow})
  }
  

  render (){   
    return (
        <div>
        <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
            <MDBContainer className='mt-4'>
                <MDBRow>
                    <MDBCol>
                        <SectionContainer header={this.state.qname}>
                            <br/><br/>
                            <strong><label>Write short answers.</label></strong>
                            
                            {
                                this.state.questions.map((q,i) =>(
                                    <MDBCardGroup deck className='mt-4'>
                                    <Form.Group size="lg" controlId="username">
                                      
                                    <Form.Label><strong> {i+1}. {q}</strong></Form.Label>
                                    <Form.Control
                                      autoFocus
                                      type="text"
                                      onChange={this.handleChangeAnswer(i)}
                                    />
                                  </Form.Group>
                                  </MDBCardGroup>
                                
                             ))
                            }
                         
                        </SectionContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="center">
				<button
					id="validate-btn"
					className="post-btn"
					type="button"
                    onClick={this.submitAnswers}
				    >
					Submit Answers
				</button>
			</div>


            <Modal show={this.state.modelShow}>
                            <Modal.Header className="model_hdr">Final results</Modal.Header>
                            <Modal.Body>
                                <Table responsive hover>
                                    <tbody>
                                        <tr className="unread">
                                        <td>
                                        <h6 className="mb-1"></h6>
                                       
                                        <p className="m-0"><strong>Number of correct answers:{this.state.correct}</strong></p><br/>
                                        <p className="m-0"><strong>Number of wrong answers:  {this.state.wrong}</strong></p>
                                
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

export default viewQuestions;
