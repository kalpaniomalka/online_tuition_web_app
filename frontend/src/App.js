import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo.svg';
import Routes from './Routes';

class App extends Component {
  state = {
    collapseID: ''
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  closeCollapse = collID => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: '' });
  };

  render() {
    const overlay = (
      <div
        id='sidenav-overlay'
        style={{ backgroundColor: 'transparent' }}
        onClick={this.toggleCollapse('mainNavbarCollapse')}
      />
    );

    const { collapseID } = this.state;

    return (
      <Router>
        <div className='flyout'>
          <MDBNavbar color='indigo' dark expand='md' fixed='top' scrolling>
            <MDBNavbarBrand href='/' className='py-0 font-weight-bold'>
              <Logo style={{ height: '2.5rem', width: '2.5rem' }} />
              <strong className='align-middle'>EduHelp</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler
              onClick={this.toggleCollapse('mainNavbarCollapse')}
            />
            <MDBCollapse id='mainNavbarCollapse' isOpen={collapseID} navbar>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink
                    exact
                    to='/home'
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                  >
                    Home
                  </MDBNavLink>
                </MDBNavItem>
                {/* <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/css'
                  >
                    CSS
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/components'
                  >
                    Components
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/advanced'
                  >
                    Advanced
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/navigation'
                  >
                    Navigation
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/forms'
                  >
                    Forms
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/tables'
                  >
                    Tables
                  </MDBNavLink>
                </MDBNavItem>*/}
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/monitoring'
                  >
                    Join Meetings
                  </MDBNavLink>
                </MDBNavItem> 
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse('mainNavbarCollapse')}
                    to='/alllessons'
                  >
                    Lessons
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                      onClick={this.closeCollapse('mainNavbarCollapse')}
                      to='/lessons'
                  >
                    <strong>Summarize Lessons</strong>
                  </MDBNavLink>
                </MDBNavItem>
                {/* <MDBNavItem>
                  <MDBNavLink
                      onClick={this.closeCollapse('mainNavbarCollapse')}
                      to='/monitoring'
                  >
                    <strong>Monitoring</strong>
                  </MDBNavLink>
                </MDBNavItem> */}
                <MDBNavItem>
                  <MDBNavLink
                      onClick={this.closeCollapse('mainNavbarCollapse')}
                      to='/view_questions?query='
                  >
                    <strong>Questions</strong>
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                      onClick={this.closeCollapse('mainNavbarCollapse')}
                      to='/payments'
                  >
                    <strong>Payments</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                      onClick={this.closeCollapse('mainNavbarCollapse')}
                      to='/'
                  >
                    Login
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          {collapseID && overlay}
          <main style={{ marginTop: '4rem' }}>
            <Routes />
          </main>

          <br/>
          <br/>
          
          <MDBFooter color='indigo'>
            <p className='footer-copyright mb-0 py-3 text-center'>
              &copy; {new Date().getFullYear()} Copyright:
              <a href=''> Eduhelp </a>
            </p>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default App;
