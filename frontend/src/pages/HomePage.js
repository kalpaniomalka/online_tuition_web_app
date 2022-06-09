import React from 'react';
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBAnimation,
  MDBNavLink
} from 'mdbreact';
import './HomePage.css';

class HomePage extends React.Component {
  constructor(){
    super();
    this.state={
        uname: null,
    };
}

  scrollToTop = () => window.scrollTo(0, 0);

  componentDidMount(){
    this.setState({uname:sessionStorage.getItem('userName')})
  }

  render() {
    return (
      <>
        <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
        <div className='mt-3 mb-5'>
          <MDBFreeBird>
            <MDBRow>
              <MDBCol
                md='10'
                className='mx-auto float-none white z-depth-1 py-2 px-2'
              >
                <MDBCardBody className='text-center'>
                  {/* <h2 className='h2-responsive mb-4'>
                    <strong className='font-weight-bold'>
                      <img
                        src='https://mdbootstrap.com/img/Marketing/other/logo/logo-mdb-react-small.png'
                        alt='mdbreact-logo'
                        className='pr-2'
                      />
                      Demo App
                    </strong>
                  </h2> */}
                  <MDBRow />
                  
                  <MDBRow className='d-flex flex-row justify-content-center row'>
                    <a
                      className='border nav-link border-light rounded mr-1 mx-2 mb-2'
                      
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <MDBIcon icon='graduation-cap' className='mr-2' />
                      <span className='font-weight-bold'>
                        Welcome to EduHelp
                      </span>
                    </a>
                    <a
                      className='border nav-link border-light rounded mx-2 mb-2'
                      
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <MDBIcon far icon='gem' className='mr-2' />
                      <span className='font-weight-bold'>PRO</span>
                    </a>
                    <a
                      className='border nav-link border-light rounded mx-2 mb-2'
                     
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <MDBIcon icon='download' className='mr-2' />
                      <span className='font-weight-bold'>FREE</span>
                    </a>
                  </MDBRow>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
          <MDBContainer>
            <MDBRow>
              <MDBCol md='12' className='mt-4'>
                <h2 className='text-center my-5 font-weight-bold'>
                  Why is it so great?
                </h2>
                <p className='text-center text-muted mb-1'>
                  Google has designed a Material Design to make the web more
                  beautiful and more user-friendly.
                </p>
                <p className='text-center text-muted mb-1'>
                  Twitter has created a Bootstrap to support you in faster and
                  easier development of responsive and effective websites.
                </p>
                <p className='text-center text-muted'>
                  We present you a framework containing the best features of
                  both of them - Material Design for Bootstrap.
                </p>
                <hr className='my-5' />

                
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </>
    );
  }
}

export default HomePage;
