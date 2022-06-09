import React from 'react';
import {
    MDBEdgeHeader,
    MDBJumbotron,
    MDBContainer,
    MDBRow,
    MDBInputGroup,
    MDBBtn,
    MDBCol
} from 'mdbreact';
import SectionContainer from '../../../components/sectionContainer';

const Uploadinformation = () => {
    return (
        <>
        <MDBEdgeHeader color='indigo darken-3' className='sectionPage' />
            <MDBContainer className='mt-5'>
                <MDBRow>
                    <MDBCol>
                        <SectionContainer noBorder header=''>
                            <MDBJumbotron className='text-center'>
                                <h2 className='h1 display-3'>Upload your video file</h2>
                                <p className='lead'>
                                    Upload .mp4 .mkv file max size 600MB
                                </p>
                                <hr className='my-2' />
                             
                            </MDBJumbotron>
                        </SectionContainer>
                        <SectionContainer header='Custom file input'>
        
          <MDBInputGroup
            append={
              <MDBBtn
                color='mdb-color'
                outline
                size='md'
                className='m-0 px-3 py-2 z-depth-0'
              >
                Upload
              </MDBBtn>
            }
            inputs={
              <div className='custom-file'>
                <input
                  type='file'
                  className='custom-file-input'
                  id='inputGroupFile01'
                />
                <label className='custom-file-label' htmlFor='inputGroupFile01'>
                  Choose file
                </label>
              </div>
            }
            containerClassName='mb-3'
          />
        </SectionContainer>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
};

export default Uploadinformation;
