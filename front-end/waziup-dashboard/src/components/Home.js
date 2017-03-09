import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Container, Row, Col, Visible, Hidden, ScreenClassRender } from 'react-grid-system'
import {ToastContainer,ToastMessage} from "react-toastr"
import { connect } from 'react-redux';
import FullWidthSection from './FullWidthSection'
import Page from '../App'

const ToastMessageFactory = React.createFactory(ToastMessage.animation);
const position = [12.238, -1.561];
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      sensors : props.sensors,
      user:{},
      markers: [],
    };
  }
  defaultProps = {
    sensors: []
  };
  addAlert() {
    
    var now = new Date().toUTCString();
    this.refs.toastContainer.success(
        <div>
          <h3>Welcome {this.state.user.name} !</h3> 
          <p>{now}</p>
        </div>, 
        `WAZIUP`, {
          closeButton: true,
        });
  }
  componentWillReceiveProps(nextProps){
    var defaultLocation = [
      {position:[6.666600,-1.616271]},
      {position:[16.062637,-16.425864]},
      {position:[6.163909,-1.208513]},
      {position:[14.670868,-17.430936]},
      {position:[14.743417,-17.485433]},
      {position:[5.569658,-0.168994]},
      {position:[11.164922,-4.305154]},
    ];
     var markers = [];
     for(var i = 0; i<defaultLocation.length;i++){
      markers.push({
              position:defaultLocation[i].position,
              defaultAnimation: 2,
      });
     }
      this.setState({markers:markers})
        
    if (nextProps.sensors) {
      
      // this.setState({sensors:nextProps.data})
       
        for (var i = 0; i < nextProps.sensors.length; i++) {
          
          if(nextProps.sensors[i].location){
            markers.push({
              position:[
                parseFloat(nextProps.sensors[i].location.value.split(",")[0]),
                parseFloat(nextProps.sensors[i].location.value.split(",")[1]),
              ],
              defaultAnimation: 2,
            });
          }else{
           
          }
        } 
        this.setState({markers:markers})
    }
    
    

  }
  componentWillMount(){
    if (this.props.user) {
        this.setState({user:this.props.user});
    }
  }
  componentDidMount(prevProps, prevState) {
      this.addAlert()    
  }

      
  render() {
    const listMarkers = this.state.markers.map((marker,index) =>
            <Marker key={index} position={marker.position}>
              <Popup>
                <span>Sensor infos<br/>{marker.position}</span>
              </Popup>
            </Marker>
    );    
    return (
      <div>
        <h1 className="page-title">Dashboard</h1>
        <Container>
           <Map center={position} zoom={5}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {listMarkers}
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
  return { 
    sensors : state.example.data ,
    user: state.keycloak.idTokenParsed,
    keycloak: state.keycloak
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

