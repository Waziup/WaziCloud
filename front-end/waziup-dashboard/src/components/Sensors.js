import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FullWidthSection from './FullWidthSection'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Page from '../App'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Sensors extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    let {data} = this.props;
    return (
      <div>
        <h1 className="page-title">Sensors</h1>
        <FullWidthSection useContent={true}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Type</TableHeaderColumn>
                <TableHeaderColumn>Last Value</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
                    {data.forEach((sensor,index )=> {
                      return (
                          <TableRow>
                            <TableRowColumn>{index}</TableRowColumn>
                            <TableRowColumn>{sensor.id}</TableRowColumn>
                            <TableRowColumn>{sensor.type}</TableRowColumn>
                            <TableRowColumn>{sensor.TC.value}</TableRowColumn>
                          </TableRow>
                      )
                    })}
            </TableBody>
          </Table>
        </FullWidthSection>
      </div>
      );
  }
}
function mapStateToProps(state) {
    return { data: state.example.data };
}

function mapDispatchToProps(dispatch) {
    return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Sensors);

