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
    MDBInput 
} from 'mdbreact';
import SectionContainer from '../../components/sectionContainer';
import '../../style.css';
import axios from "axios";
import Loader from 'react-loader-spinner'
import {Row,Form, Col,Card,Table, Overlay,Modal, ProgressBar} from 'react-bootstrap';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
class Questions extends Component{
  constructor(){
      super();
      this.state={
          text: null,
          question: [],
          answers: [],
          short: [],
          show: false,
          click: false,
          selectedQuestion: [],
          qname: null,
          modelShow: false,
          msg: null
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handlePost = this.handlePost.bind(this);
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
    var qname = sessionStorage.getItem('userName');
  }

  handleChange = (event) => {
		this.setState({text:event.target.value})
	} 

  handleChangeName = (event) => {
		this.setState({qname:event.target.value})
	} 

  handleSubmit(){
		var myData = [this.state.text]
    this.setState({click:true})
    this.setState({question:[]});
    this.setState({answers:[]});
    this.setState({short:[]});
    this.setState({show:false})

		let currentComponent = this;   
		
		if(this.state.text != null){
            axios.get('http://127.0.0.1:5000/generateQuestions', {
                params: {
                    text: myData[0]
                }
            }).then(function(response){
                    console.log(response.data);
                    currentComponent.setState({question:response.data['questions']});
                    currentComponent.setState({answers:response.data['answers']});
                    currentComponent.setState({short:response.data['short']});
                    currentComponent.setState({show:true})
                    currentComponent.setState({click:false})

            }).catch(function(error){
                console.log(error);
            });
		}else{
			window.alert("Invalid input")
		}
	}

getID = (event) =>{
    var qs = this.state.selectedQuestion;
    
    if(qs.includes(event.target.value)){
      var index = qs.indexOf(event.target.value)
      qs.splice(index, 1);
    }else{
      qs.push(event.target.value);
    }
    this.setState({selectedQuestion:qs});
    console.log(this.state.selectedQuestion)
}

handlePost(){
  let currentComponent = this;   
          axios.get('http://127.0.0.1:5000/insertQuestions', {
              params: {
                  question: JSON.stringify(currentComponent.state.question),
                  answers: JSON.stringify(currentComponent.state.answers),
                  short: JSON.stringify(currentComponent.state.short),
                  selected: JSON.stringify(currentComponent.state.selectedQuestion),
                  name: currentComponent.state.qname
              }
          }).then(function(response){
                  console.log(response.data);
                  currentComponent.setState({modelShow:true});
                  if(response.data == "1"){
                    console.log(response.data);
                    currentComponent.setState({msg:"Successfully Uploaded!"})
                  }
                  else{
                    currentComponent.setState({msg:"Failed! Try again."})
                  }
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

CloseModal(){
  this.setState({modelShow:!this.state.modelShow})
}

  render (){
    const rows = this.state.question;
   
    return (
        <>
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
            </div>
          <br/>
          <br/>
            <MDBInput
              type="textarea"
              label="Type or paste your text here"
              rows="12"
              icon="pencil-alt"
              onChange={this.handleChange}
            />
			      <div className="center">
				      <button
					      id="validate-btn"
					      className="calculate-btn"
					      type="button"
                onClick={this.handleSubmit}
				      >
					    Analyse Text and Generate Questions
				      </button>
			      </div>
            
            {
            this.state.click == true && this.state.show == false?
			      <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
				    <Loader
					    type="Circles"
					    color="#00BFFF"
					    height={100}
					    width={100}
				      // timeout={3000} //3 secs
				    />
			      </div>
            :null
            }
            	{
            this.state.show == true?
            <div className="container">
            
              <br/>
              <div className="row align-items-center">
                  <table id="question">
                        <thead>
                        <tr>
                            <th> </th>
                            <th>No.</th>
                            <th>Questions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          rows.map((q,i) =>(
                
                          <tr>
                            <td><input type="checkbox" onChange={this.getID} value={i}/></td>
                            <td>{i+1}</td>
                            <td>{q}</td>
                          </tr>

                        ))
                        }
    
                        </tbody>
                  </table>
                  <div className="center">
                    <input className="namef" type="text" placeholder="TYpe a name for question list" onChange={this.handleChangeName}></input>
				            <button
					            id="validate-btn"
					            className="post-btn"
					            type="button"
                      onClick={this.handlePost}
				            >
					          Upload Questions
				            </button>
			            </div>
                  <br/>
                  <br/>
                  <br/>
              </div>

        </div>
         :null
        }

                      <Modal show={this.state.modelShow}>
                            <Modal.Header>Question Upload</Modal.Header>
                            <Modal.Body>
                                <Table responsive hover>
                                    <tbody>
                                        <tr className="unread">
                                        <td>
                                        <h6 className="mb-1"></h6>
                                       
                                        <p className="m-0">{this.state.msg}</p>
                                
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
  }
};

export default Questions;
