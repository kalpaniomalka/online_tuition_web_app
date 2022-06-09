import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavigationNavPage from './pages/NavigationNavPage';
import FormsNavPage from './pages/FormsNavPage';
import TablesNavPage from './pages/TablesNavPage';
import AddonsNavPage from './pages/AddonsNavPage';
import ModalsNavPage from './pages/ModalsNavPage';
import AdvancedNavPage from './pages/AdvancedNavPage';
import ComponentsNavPage from './pages/ComponentsNavPage';

import AnimationPage from './pages/AnimationPage';
import AlertPage from './pages/AlertPage';
import HomePage from './pages/HomePage';
import ButtonPage from './pages/ButtonPage';
import CSSNavPage from './pages/CSSNavPage';
import TablePage from './pages/TablePage';
import TableResponsivePage from './pages/TableResponsivePage';
import TableScrollPage from './pages/TableScrollPage';
import TableStylesPage from './pages/TableStylesPage';
import BadgePage from './pages/BadgePage';
import BreadcrumbPage from './pages/BreadcrumbPage';
import FaPage from './pages/FaPage';
import DatatablePage from './pages/DatatablePage';
import DatatableApiPage from './pages/DatatableApiPage';
import ModalPage from './pages/ModalPage';
import ModalFormPage from './pages/ModalFormPage';
import ModalExamplesPage from './pages/ModalExamplesPage';
import ProgressPage from './pages/ProgressPage';
import InputPage from './pages/InputPage';
import MediaPage from './pages/MediaPage';
import JumbotronPage from './pages/JumbotronPage';
import PaginationPage from './pages/PaginationPage';
import PopoverPage from './pages/PopoverPage';
import ListGroupPage from './pages/ListGroupPage';
import CarouselPage from './pages/CarouselPage';
import PanelPage from './pages/PanelPage';
import CollapsePage from './pages/CollapsePage';
import TooltipsPage from './pages/TooltipsPage';
import FooterPage from './pages/FooterPage';
import MasksPage from './pages/MasksPage';
import DropdownPage from './pages/DropdownPage';
import VideoCarouselPage from './pages/VideoCarouselPage';
import HoverPage from './pages/HoverPage';
import FormsPage from './pages/FormsPage';
import ChartsPage from './pages/ChartsPage';
import SearchPage from './pages/SearchPage';
import ValidationPage from './pages/ValidationPage';
import NavbarPage from './pages/NavbarPage';
import IframePage from './pages/IframePage';
import EdgeHeaderPage from './pages/EdgeHeaderPage';
import SpinnerPage from './pages/SpinnerPage';
import MasonryPage from './pages/MasonryPage';
import ScrollBarPage from './pages/ScrollBarPage';
import NavsPage from './pages/NavsPage';
import TabsPage from './pages/TabsPage';
import PillsPage from './pages/PillsPage';
import NotificationPage from './pages/NotificationPage';
import InputGroupPage from './pages/InputGroupPage';
import TreeviewPage from './pages/TreeviewPage';
import RatingPage from './pages/RatingPage';
import pay from './pages/payments';

//imports - lessons
import lessonsHome from './pages/lessons/index';
import Uploadinformation from './pages/lessons/view/uploadinformation.view';
import Dashboard from './pages/lessons/view/dashboard.view';

//imports - monitoring
import Monitoring from './pages/monitoring/Monitoring';

//imports - payments
import Payments from './pages/payments/Payments';

//imports - quections
import Questions from './pages/questions/Questions';
import Login from './pages/login';
import admin from './pages/admin_home'
import viewQuestions from './pages/questions/viewQuestions'
import questionnaire from './pages/questions/questionaires';
import studentRanking from './pages/student_ranking';
import summary from './pages/summary';
import categorizer from './pages/categorizer';
import AllLessons from './pages/lessons/all_lessons';
import dashboardA from './pages/lessons/view/dashboard_all';
import attendence from './pages/attendnce';
import pre from './pages/lessons/preSummerize'

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/addons' component={AddonsNavPage} />
        <Route exact path='/advanced' component={AdvancedNavPage} />
        <Route exact path='/components' component={ComponentsNavPage} />
        <Route exact path='/css' component={CSSNavPage} />
        <Route exact path='/forms' component={FormsNavPage} />
        <Route exact path='/modals' component={ModalsNavPage} />
        <Route exact path='/navigation' component={NavigationNavPage} />
        <Route exact path='/tables' component={TablesNavPage} />
        <Route exact path='/admin_home' component={admin}/>
        <Route exact path='/view_questions' component={viewQuestions}/>
        <Route exact path='/questionnaire' component={questionnaire}/>
        <Route exact path='/studentRanking' component={studentRanking}/>
        <Route exact path='/summary' component={summary}/>
        <Route exact path='/categorizer' component={categorizer}/>
        <Route exact path='/alllessons' component={AllLessons}/>
        <Route exact path='/dashboardA' component={dashboardA}/>
        <Route exact path='/attendence' component={attendence}/>
        <Route exact path='/pre' component={pre}/>
        <Route exact path='/pay' component={pay}/>
        {/* THEME ROUTS - DO NOT DELETE */}
        <Route path='/addons/iframe' component={IframePage} />
        <Route path='/addons/edge-header' component={EdgeHeaderPage} />
        <Route path='/addons/notifications' component={NotificationPage} />
        <Route path='/addons/treeview' component={TreeviewPage} />
        <Route path='/addons/Rating' component={RatingPage} />
        <Route path='/advanced/carousel' component={CarouselPage} />
        <Route path='/advanced/collapse' component={CollapsePage} />
        <Route path='/advanced/videocarousel' component={VideoCarouselPage} />
        <Route path='/advanced/videocarousel' component={VideoCarouselPage} />
        <Route path='/advanced/alerts' component={AlertPage} />
        <Route path='/advanced/popover' component={PopoverPage} />
        <Route path='/advanced/tooltips' component={TooltipsPage} />
        <Route path='/advanced/charts' component={ChartsPage} />
        <Route path='/advanced/scrollbar' component={ScrollBarPage} />
        <Route path='/css/animations' component={AnimationPage} />
        <Route path='/css/icons' component={FaPage} />
        <Route path='/css/jumbotron' component={JumbotronPage} />
        <Route path='/css/masks' component={MasksPage} />
        <Route path='/css/hover' component={HoverPage} />
        <Route path='/css/masonry' component={MasonryPage} />
        <Route path='/components/media' component={MediaPage} />
        <Route path='/components/badge' component={BadgePage} />
        <Route path='/components/buttons' component={ButtonPage} />
        <Route path='/components/dropdown' component={DropdownPage} />
        <Route path='/components/progress' component={ProgressPage} />
        <Route path='/components/pagination' component={PaginationPage} />
        <Route path='/components/list-group' component={ListGroupPage} />
        <Route path='/components/panels' component={PanelPage} />
        <Route path='/components/search' component={SearchPage} />
        <Route path='/components/spinner' component={SpinnerPage} />
        <Route path='/components/tabs' component={TabsPage} />
        <Route path='/components/pills' component={PillsPage} />
        <Route path='/forms/forms' component={FormsPage} />
        <Route path='/forms/validation' component={ValidationPage} />
        <Route path='/forms/input' component={InputPage} />
        <Route path='/forms/inputgroup' component={InputGroupPage} />
        <Route path='/modals/modal' component={ModalPage} />
        <Route path='/modals/modal-form' component={ModalFormPage} />
        <Route path='/modals/modal-examples' component={ModalExamplesPage} />
        <Route path='/navigation/navbar' component={NavbarPage} />
        <Route path='/navigation/breadcrumb' component={BreadcrumbPage} />
        <Route path='/navigation/navs' component={NavsPage} />
        <Route path='/navigation/footer' component={FooterPage} />
        <Route path='/tables/table' component={TablePage} />
        <Route path='/tables/table-responsive' component={TableResponsivePage} />
        <Route path='/tables/table-scroll' component={TableScrollPage} />
        <Route path='/tables/table-styles' component={TableStylesPage} />
        <Route path='/tables/datatable-api' component={DatatableApiPage} />
        <Route path='/tables/datatable' component={DatatablePage} />

        {/*Please add all of your page routes here.*/}

        {/*  Lessons*/}
          <Route exact path='/lessons' component={lessonsHome} />
          <Route exact path='/lessons/uploadinformation' component={Uploadinformation} />
          <Route exact path='/lessons/dashboard' component={Dashboard} />

          {/* monitoring*/}
          <Route path='/monitoring' component={Monitoring} />

          {/* Chamod*/}
          <Route path='/questions/' component={Questions} />

          {/* Banuka*/}
          <Route path='/payments/' component={Payments} />

        <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
