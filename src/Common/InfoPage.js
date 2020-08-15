/**
 * @fileoverview
 * Defining the InfoPage class
 * @exports InfoPage
 */
import React, { Component } from 'react'
import {
  Button,
  Popup,
  Image,
  Container,
  Divider,
  Header,
  Icon, Statistic, Grid, List,
} from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { application_id } from '../Common/utlity.js';
import {division, divisionWhole} from "../Common/utlity";

/**
 * InfoPage class that renders the information when no search is conducted
 * @extends {Component}
 */
class InfoPage extends Component {
  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currSeasonIdx: 14,
      currSprintIdx: 14,
      ships: null
    }
  }

  componentDidMount() {
    document.title = 'USS Illini mkII';
    axios.get('https://api.worldofwarships.ru/wows/seasons/info/?application_id=' + application_id + '&language=en')
      .then((response) => {
        this.setState({ data: response.data.data});
        let index = Object.keys(response.data.data);
        let sprintIdx = index.findIndex((x) => x === "101");
        this.setState({ currSeasonIdx: sprintIdx});
        this.setState({ currSprintIdx: index.length-1});
      });

    axios.get('https://api.worldofwarships.ru/wows/encyclopedia/ships/?application_id=' + application_id + '&language=en&limit=15&page_no='+ Math.ceil(Math.random()*10))
      .then((response) => {
        this.setState({ships: Object.values(response.data.data)})
        console.log(this.state.ships)
      })
  }

  render() {
    let images = this.state.data && Object.values(this.state.data[this.state.currSeasonIdx].images).map((img, idx) => <div style={{flex: '1 0 32%'}}>
      <Image src={img.insignia} avatar/>
      <span>Rank {idx+1}</span>
    </div>);
    let start = this.state.data && new Date(this.state.data[this.state.currSeasonIdx].start_at*1000);
    let startTime = start && <span>{start.getFullYear()}-{start.getMonth()+1}-{start.getDate()}</span>;
    let close = this.state.data && new Date(this.state.data[this.state.currSeasonIdx].close_at*1000);
    let closeTime = close && <span>{close.getFullYear()}-{close.getMonth()+1}-{close.getDate()}</span>;
    let maxTier = this.state.data && this.state.data[this.state.currSeasonIdx].max_ship_tier;
    let minTier = this.state.data && this.state.data[this.state.currSeasonIdx].min_ship_tier;

    let sprint = this.state.data && Object.values(this.state.data)[this.state.currSprintIdx];
    let imagesSprint = sprint && Object.values(sprint.images).map((img, idx) => <div style={{flex: '1 0 32%'}}>
      <Image src={img.insignia} avatar/>
      <span>Rank {idx+1}</span>
    </div>);
    let startSprint = sprint && new Date(sprint.start_at*1000);
    let startTimeSprint = startSprint && <span>{startSprint.getFullYear()}-{startSprint.getMonth()+1}-{startSprint.getDate()}</span>;
    let closeSprint = sprint && new Date(sprint.close_at*1000);
    let closeTimeSprint = closeSprint && <span>{closeSprint.getFullYear()}-{closeSprint.getMonth()+1}-{closeSprint.getDate()}</span>;
    let maxTierSprint = sprint && sprint.max_ship_tier;
    let minTierSprint = sprint && sprint.min_ship_tier;

    let shipGrid = this.state.ships && this.state.ships.map((ship, i) =>
      <Grid.Column>
        <Popup key={i} as='span' trigger={<Image as='span' src={ship.images.small}  />}>
          <Popup.Header>{ship.name}</Popup.Header>
          <Popup.Header>{ship.type}</Popup.Header>
          <Popup.Content>
            <p>{ship.description}</p>
            <List bulleted>

            </List>
          </Popup.Content>
        </Popup>
        <Header as="h4">
          {ship.name}
        </Header>
      </Grid.Column>);

    return (
      <div>
        <Divider horizontal
                 style={{
                   marginTop: '0em',
                 }}
        >
          <Header as='h4'>
            <Icon name='ship' />
            Featured Warships
          </Header>
        </Divider>

        <Grid divided='vertically' columns={3}>
          <Grid.Row>
            {shipGrid}
          </Grid.Row>
        </Grid>
        <Container style={{padding: '3em'}}/>
      </div>
  );
  }
}

export default InfoPage;
