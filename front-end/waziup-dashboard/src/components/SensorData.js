
import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';

class SensorData extends Component {
  getRow = ()=>{
    var returnValue = [];
    for(var i in this.props.rowData){
      if (i!=='id'&&i!='type'&&i!='owner'&&i!='last_value') {
        let val = (this.props.rowData[i] && typeof this.props.rowData[i].value != 'undefined' )? this.props.rowData[i].value : 0;
        returnValue.push(
           <FlatButton label={i + " : " + val} />
          )
        }
      }
    return returnValue;
  }
  render() {
    return (
      <div>
        {
          this.getRow()
        }
        </div>
    );
  }
}

export default SensorData;

