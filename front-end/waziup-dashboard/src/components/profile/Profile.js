import React, {Component} from 'react';
import { Container } from 'react-grid-system'
import FullWidthSection from '../FullWidthSection'

class Profile extends Component {
  render() {
    return (
      <div>
        <h1 className="page-title">Profile</h1>
        <Container>
          <FullWidthSection useContent={true}></FullWidthSection>
        </Container>
      </div>
      );
  }
}

export default Profile;

