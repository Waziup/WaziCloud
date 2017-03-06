import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Container, Row, Col, Visible, Hidden, ScreenClassRender } from 'react-grid-system'
import {ToastContainer,ToastMessage} from "react-toastr"
import FullWidthSection from './FullWidthSection'
import Page from '../App'

const ToastMessageFactory = React.createFactory(ToastMessage.animation);
const position = [51.505, -0.09];
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      sensors : props.sensors,
      markers: [{
          position: {
            lat: 9.089893,
            lng: -1.274414,
          },
          key: `Taiwan`,
          defaultAnimation: 2,
        }],
    };
  }
  defaultProps = {
    sensors: []
  };
  addAlert() {
    var now = new Date().toUTCString();
    this.refs.toastContainer.success(
        <div>
          <h3>Welcome USER !</h3> 
          <p>{now}</p>
        </div>, 
        `WAZIUP`, {
          closeButton: true,
        });
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.data) {
      this.setState({sensors:nextProps.sensors})
    }
  }
  componentDidMount(prevProps, prevState) {
      this.addAlert()    
  }
      
  render() {
  
    return (
      <div>
        <h1 className="page-title">Dashboard</h1>
        <Container>
           <Map center={position} zoom={5}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
              </Popup>
            </Marker>
          </Map>
        </Container>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="toastContainer"
          className="toast-top-right"
        />
      </div>
      );
  }
}
function mapStateToProps(state) {
  return { sensors : state.example.data };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default Home;

