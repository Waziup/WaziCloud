import React, { Component } from 'react';
import { Container, Row, Col, Visible, Hidden, ScreenClassRender } from 'react-grid-system'
import FullWidthSection from '../../FullWidthSection'

class UserList extends Component {
    render() {
        return (
            <div>
                <h1 className="page-title">UserList</h1>
                <Container>
                    <FullWidthSection useContent={true}></FullWidthSection>
                </Container>
            </div>
        );
    }
}

export default UserList;