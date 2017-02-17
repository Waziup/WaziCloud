import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FullWidthSection from './FullWidthSection'
import Page from '../App'

class MVPWeather extends Component {
  render() {
    return (
      <div>
        <h1 className="page-title">MVP Weather</h1>
        <FullWidthSection useContent={true}>
          <div className="card-container">
              <div className="embeded">
              <Card>
                <CardTitle title="Field Chart 1" />
                <CardText>
                  <iframe width="450" height="260" src="https://thingspeak.com/channels/184796/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=500&type=spline"></iframe>

                </CardText>
                <CardActions>
                </CardActions>
              </Card>
            </div>
            <div className="embeded">
            <Card>
              <CardTitle title="Field chart 2" />
              <CardText>
                  <iframe width="450" height="260"  src="https://thingspeak.com/channels/184796/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=500&type=spline"></iframe>

              </CardText>
              <CardActions>
              </CardActions>
            </Card>
            </div>
          </div>
          <div className="card-container">
              <div className="embeded">
              <Card>
                <CardTitle title="Field Chart 3" />
                <CardText>
                  <iframe width="450" height="260" src="https://thingspeak.com/channels/184796/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=500&type=spline"></iframe>

                </CardText>
                <CardActions>
                </CardActions>
              </Card>
            </div>
            <div className="embeded">
            <Card>
              <CardTitle title="Field chart 4" />
              <CardText>
                <iframe width="450" height="260" src="https://thingspeak.com/channels/184796/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=500&type=spline"></iframe>

              </CardText>
              <CardActions>
              </CardActions>
            </Card>
            </div>
          </div>
          <div className="card-container">
              <div className="embeded">
              <Card>
                <CardTitle title="Field Chart 5" />
                <CardText>
                  <iframe width="450" height="260" src="https://thingspeak.com/channels/184796/charts/5?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=500&type=spline"></iframe>

                </CardText>
                <CardActions>
                </CardActions>
              </Card>
            </div>
            <div className="embeded">
            <Card>
              <CardTitle title="Field chart 6" />
              <CardText>
                <iframe width="450" height="260" src="https://thingspeak.com/channels/184796/charts/6?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=500&type=spline"></iframe>

              </CardText>
              <CardActions>
              </CardActions>
            </Card>
            </div>
          </div>
          <div className="card-container">
              <div className="embeded">
              <Card>
                <CardTitle title="Field Chart 7" />
                <CardText>
                    <iframe width="450" height="260" src="https://thingspeak.com/channels/184796/charts/7?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=500&type=spline"></iframe>

                </CardText>
                <CardActions>
                </CardActions>
              </Card>
            </div>
            <div className="embeded">
            <Card>
              <CardTitle title="Field chart 8" />
              <CardText>
                <iframe width="450" height="260" src="https://thingspeak.com/channels/184796/charts/8?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=500&type=spline"></iframe>

              </CardText>
              <CardActions>
              </CardActions>
            </Card>
            </div>
          </div>
        </FullWidthSection>
      </div>
      );
  }
}

export default MVPWeather;

