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
import MenuLink from '../../components/menuLink';
import SectionContainer from '../../components/sectionContainer';
import axios from "axios";

class Monitoring extends Component{
    constructor(props){
        super(props);
        this.state={
            questions: [],
        };
  
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMeeting = this.handleMeeting.bind(this);
    }
  
//  viewLessons(e){
//       this.props.history.push({
//           pathname: '/dashboardA',
//           state: { id: e }
//       })
//   }

handleMeeting(i){
    let currentComponent = this;   
    axios.get('http://127.0.0.1:5000/detectFaces', {
      params: {
        id: i
      }
    }).then(function(response){
        console.log(response.data);
               
    }).catch(function(error){
        console.log(error);
    });
  }
  
    render (){   
    return (
        <>
          <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
        <MDBContainer className='mt-4'>
                <MDBRow>
                    <MDBCol>
  <SectionContainer header='Upcoming Meetings'>
        <MDBCardGroup deck className='mt-4'>
          <MDBCard>

            <MDBCardBody>
              <MDBCardTitle tag='h5'>Grade 10 Science</MDBCardTitle>
              <MDBCardText>
               
              </MDBCardText>
              {/* <MDBBtn color='primary' onClick={e => this.viewLessons(10)}>Visit</MDBBtn> */}
              <a href={'http://127.0.0.1:80/'} target="_blank" className="btn btn-primary" onClick={(e) => {this.handleMeeting(10)}}>Join</a>
              </MDBCardBody>
              {/* <MDBCardFooter small muted>
              Last updated 45 mins ago
            </MDBCardFooter> */}
            
          </MDBCard>

          <MDBCard>

        <MDBCardBody>
           <MDBCardTitle tag='h5'>Grade 10 Science</MDBCardTitle>
          <MDBCardText>
   
          </MDBCardText>
       
            <a href={' http://127.0.0.1:80/'} className="btn btn-primary" onClick={(e) => {this.handleMeeting(11)}}>Join</a>
          </MDBCardBody>

      </MDBCard>


     </MDBCardGroup>
  
      </SectionContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
 );
}
};

export default Monitoring;
