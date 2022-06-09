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

class lessons extends Component{
    constructor(props){
        super(props);
        this.state={
            questions: [],
        };
  
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.viewLessons = this.viewLessons.bind(this);
    }
  
 viewLessons(e){
      this.props.history.push({
          pathname: '/dashboardA',
          state: { id: e }
      })
  }
  
    render (){   
    return (
        <>
          <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
        <MDBContainer className='mt-4'>
                <MDBRow>
                    <MDBCol>
  <SectionContainer header='Uploaded Documents'>
        <MDBCardGroup deck className='mt-4'>
          <MDBCard>

            <MDBCardBody>
              <MDBCardTitle tag='h5'>Grade 10 Science</MDBCardTitle>
              <MDBCardText>
               
              </MDBCardText>
              <MDBBtn color='primary' onClick={e => this.viewLessons(10)}>Visit</MDBBtn>
              </MDBCardBody>
              {/* <MDBCardFooter small muted>
              Last updated 45 mins ago
            </MDBCardFooter> */}
            
          </MDBCard>

          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle tag='h5'>Grade 11 Science</MDBCardTitle>
              <MDBCardText>
              
              </MDBCardText>
              <MDBBtn color='primary' onClick={e => this.viewLessons(11)}>Visit</MDBBtn>
              </MDBCardBody>
          </MDBCard>

          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle tag='h5'>Notices</MDBCardTitle>
              <MDBCardText>
              
              </MDBCardText>
              <MDBBtn color='primary' onClick={e => this.viewLessons(1)}>Visit</MDBBtn>
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

export default lessons;
