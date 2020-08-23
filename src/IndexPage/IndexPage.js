
/**
 * @fileoverview
 * Defining the IndexPage class
 * @exports IndexPage
 */
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Image,
} from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import goodlogo from '../assets/logo.png'
import './index.scss'
import { application_id } from '../Common/utlity.js';

/**
 * IndexPage class that renders the homepage with background video
 * @extends {Component}
 */
class IndexPage extends Component {
  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      version: '',
    }
  }

  componentDidMount() {
    document.title = 'USS Illini mkII';
    axios.get('https://api.worldofwarships.ru/wows/encyclopedia/info/?application_id=' + application_id + '&language=en&fields=game_version')
      .then((response) => {
        this.setState({ version: response.data.data.game_version })
      })
  }

  render() {
    return (
      <div>
        <div className='video-background'>
          <div className='video-foreground'>
            <iframe src='https://youtube.com/embed/FInMVT4vL5M?playlist=FInMVT4vL5M&autoplay=1&controls=0&showinfo=0&autohide=1&mute=1&loop=1' frameBorder='0' allowFullScreen
              style={{ display: (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1) ? 'none' : 'block' }}
            />
          </div>
        </div>
        <div className='verticalCenter'>
          <div className={(typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1) ? 'bg' : 'box-background'}>
            <Header className='title' as='h1' style={{ marginTop: '75px' }}>
              <span>USS Illini MkII</span>
            </Header>
            <div>
              <Image src={goodlogo} size='medium' verticalAlign='middle' />
            </div>
            <Container style={{ marginTop: '75px' }} text>
              <Link to={'/player'}>
                <Button primary size='massive' icon labelPosition='right'>
                  Get Started <Icon inverted name='right arrow' />
                </Button>
              </Link>
            </Container>
            <Container style={{ marginTop: '75px' }} text>
              <Header as='h2' inverted>
                A Wiki Site for World of Warships
                        </Header>
              <Divider />
              <Header as='h2' inverted>
                Game Version: {this.state.version}
              </Header>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexPage;
