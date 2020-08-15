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
class CWInfo extends Component {
  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currSeasonIdx: 4,
      currSprintIdx: 104,
      ships: null
    }
  }

  componentDidMount() {
    document.title = 'USS Illini mkII';
    axios.get('https://api.worldofwarships.ru/wows/clans/season/?application_id=' + application_id + '&language=en')
      .then((response) => {
        this.setState({ data: response.data.data});
        let index = Object.keys(response.data.data);
        let sprintIdx = index.findIndex((x) => x === "101");
        this.setState({ currSeasonIdx: sprintIdx});
        this.setState({ currSprintIdx: index.length-1});
        console.log(response.data.data, sprintIdx, index.length-1);
      });
  }

  render() {
    let leagues = this.state.data && Object.values(this.state.data[this.state.currSeasonIdx].leagues).map((league, idx) => <div>
      <Image size='small' src={league.icon} avatar/>
      <Header as='h2' style={{color: league.color}}>{league.name}</Header>
    </div>);
    let start = this.state.data && new Date(this.state.data[this.state.currSeasonIdx].start_time*1000);
    let startTime = start && <span>{start.getFullYear()}-{start.getMonth()+1}-{start.getDate()}</span>;
    let close = this.state.data && new Date(this.state.data[this.state.currSeasonIdx].finish_time*1000);
    let closeTime = close && <span>{close.getFullYear()}-{close.getMonth()+1}-{close.getDate()}</span>;
    let maxTier = this.state.data && this.state.data[this.state.currSeasonIdx].ship_tier_max;
    let minTier = this.state.data && this.state.data[this.state.currSeasonIdx].ship_tier_min;

    return (
      <div>
        <Divider horizontal
                 style={{
                   marginTop: '0em',
                 }}>
          <Header as='h4'>
            <Icon name='bar chart' />
            Clan Battle Summary
          </Header>
        </Divider>

        <Header as='h2'>The Latest Season of Clan Battle</Header>
        <Divider horizontal
                 style={{
                   marginTop: '2em',
                 }}
        >
          <Header as='h4'>
            {this.state.data&&this.state.data[this.state.currSeasonIdx].name}
          </Header>
        </Divider>
        <div
          style={{
            marginTop: '2em',
            marginLeft: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <div style={{ margin: '1.5em' }}>
            <Statistic >
              <Statistic.Value>{startTime}</Statistic.Value>
              <Statistic.Label>Start</Statistic.Label>
            </Statistic>
          </div>
          <div style={{ margin: '1.5em' }}>
            <Statistic >
              <Statistic.Value>{closeTime}</Statistic.Value>
              <Statistic.Label>End</Statistic.Label>
            </Statistic>
          </div>
          <div style={{ margin: '1.5em' }}>
            <Statistic >
              <Statistic.Value>{maxTier}</Statistic.Value>
              <Statistic.Label>Max Tier</Statistic.Label>
            </Statistic>
          </div>
          <div style={{ margin: '1.5em' }}>
            <Statistic >
              <Statistic.Value>{minTier}</Statistic.Value>
              <Statistic.Label>Min Tier</Statistic.Label>
            </Statistic>
          </div>
        </div>
        <div
          style={{
            marginTop: '2em',
            marginLeft: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
        {leagues}
        </div>
        <div
          style={{
            marginTop: '2em',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
        </div>

        <Container style={{padding: '3em'}}/>
      </div>
  );
  }
}

export default CWInfo;
