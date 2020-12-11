/**
 * @fileoverview
 * Defining the InfoPage class
 * @exports InfoPage
 */
import React, { Component } from 'react'
import {
    Message,
    Loader,
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
class RankInfo extends Component {
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
      ships: null,
        data_error: false
    }
  }

  componentDidMount() {
    document.title = 'USS Illini mkII';
    axios.get('https://api.worldofwarships.com/wows/seasons/info/?application_id=' + application_id + '&language=en')
      .then((response) => {
        this.setState({ data: response.data.data});
        let index = Object.keys(response.data.data);
        let sprintIdx = index.findIndex((x) => x === "101");
        this.setState({ currSeasonIdx: sprintIdx});
        this.setState({ currSprintIdx: index.length-1});
      })
        .catch(error => {
            this.setState({ data_error: true});
        });
  }

  render() {
    let images = this.state.data && Object.values(this.state.data[this.state.currSeasonIdx].images).map((img, idx) => <div key={idx} style={{flex: '1 0 32%'}}>
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
    let imagesSprint = sprint && Object.values(sprint.images).map((img, idx) => <div key={idx} style={{flex: '1 0 32%'}}>
      <Image src={img.insignia} avatar/>
      <span>Rank {idx+1}</span>
    </div>);
    let startSprint = sprint && new Date(sprint.start_at*1000);
    let startTimeSprint = startSprint && <span>{startSprint.getFullYear()}-{startSprint.getMonth()+1}-{startSprint.getDate()}</span>;
    let closeSprint = sprint && new Date(sprint.close_at*1000);
    let closeTimeSprint = closeSprint && <span>{closeSprint.getFullYear()}-{closeSprint.getMonth()+1}-{closeSprint.getDate()}</span>;
    let maxTierSprint = sprint && sprint.max_ship_tier;
    let minTierSprint = sprint && sprint.min_ship_tier;

    if (this.state.data == null && !this.state.data_error) {
        return (<div>
                <Divider horizontal
                         style={{
                             marginTop: '0em',
                         }}>
                    <Header as='h4'>
                        <Icon name='bar chart' />
                        Ranked Battle Summary
                    </Header>
                </Divider>
                <Loader />
            </div>
        )
    } else if (this.state.data_error) {
        return (<div>
            <Divider horizontal
                     style={{
                         marginTop: '0em',
                     }}>
                <Header as='h4'>
                    <Icon name='bar chart' />
                    Ranked Battle Summary
                </Header>
            </Divider>
                <Container>
                <Message warning>
                    <Message.Header>Ranked battle not available</Message.Header>
                    <p>
                        The ranked battle summary is currently unavailable because the ranked season has ended. Stay tuned for the next season!
                    </p>
                </Message>
                    <Message success>
                        <Message.Header>Search a player's statistics</Message.Header>
                        <p>
                            Enter your in-game username in the searchbox and see your stats! (e.g. Quincy_0v0)
                        </p>
                    </Message>
                    </Container>
            </div>
            )
    } else {
    return (
      <div>
        <Divider horizontal
                 style={{
                   marginTop: '0em',
                 }}>
          <Header as='h4'>
            <Icon name='bar chart' />
            Ranked Battle Summary
          </Header>
        </Divider>

        <Divider horizontal
                 style={{
                   marginTop: '2em',
                 }}
        >
          <Header as='h4'>
            {this.state.data && this.state.data[this.state.currSeasonIdx].season_name}
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
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
        {images}
        </div>
        <Divider horizontal
                 style={{
                   marginTop: '5em',
                 }}
        >
          <Header as='h4'>
            {this.state.data && Object.values(this.state.data)[this.state.currSprintIdx].season_name}
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
              <Statistic.Value>{startTimeSprint}</Statistic.Value>
              <Statistic.Label>Start</Statistic.Label>
            </Statistic>
          </div>
          <div style={{ margin: '1.5em' }}>
            <Statistic >
              <Statistic.Value>{closeTimeSprint}</Statistic.Value>
              <Statistic.Label>End</Statistic.Label>
            </Statistic>
          </div>
          <div style={{ margin: '1.5em' }}>
            <Statistic >
              <Statistic.Value>{maxTierSprint}</Statistic.Value>
              <Statistic.Label>Max Tier</Statistic.Label>
            </Statistic>
          </div>
          <div style={{ margin: '1.5em' }}>
            <Statistic >
              <Statistic.Value>{minTierSprint}</Statistic.Value>
              <Statistic.Label>Min Tier</Statistic.Label>
            </Statistic>
          </div>
        </div>
        <div
          style={{
            marginTop: '2em',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {imagesSprint}
        </div>
        <Container style={{padding: '3em'}}/>
      </div>
  );
    }
  }
}

export default RankInfo;
