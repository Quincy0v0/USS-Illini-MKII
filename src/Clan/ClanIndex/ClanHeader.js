/**
 * @fileoverview 
 * Defining the Clan class 
 * @exports withRouter(Clan)
 */

import React, { Component } from 'react';
import {
  Label,
  Container,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ClanIndex from './ClanIndex.js';
import { withRouter } from 'react-router-dom';
import HeaderMenu from '../../Common/HeaderMenu.js'
import { getCookie, setCookie } from '../../Common/cookie.js';
import CWInfo from "../../Common/CWInfo";

/**
 * Clan class that renders the outer layer of the all Clan pages
 * @extends {Component}
 */
class Clan extends Component {
  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      clan_id: '',
    };
    this.set_clan_id = this.set_clan_id.bind(this);
  }

  componentDidMount() {
    if (getCookie('back_mode') === 'clan' && getCookie('back_id') !== '') {
      this.setState({ clan_id: getCookie('back_id') });
    }
  }

  componentWillUnmount() {
    setCookie('back_mode', 'clan', 0.1);
    setCookie('back_id', this.state.clan_id, 0.1);
  }

  /**
   * Setting the clan_id before making api calls in other components
   * @param {*} id 6-digit distinct numeric id for clans 
   */
  set_clan_id(id) {
    this.setState({ clan_id: id });
  }

  render() {
    if (this.state.clan_id && this.state.clan_id !== '') {
      return (
        <Container fluid>
          <HeaderMenu set_clan_id={this.set_clan_id} mode='clan' />
          <ClanIndex clan_id={this.state.clan_id} />
        </Container>
      )
    } else if (this.props.location && this.props.location.state && this.props.location.state.clan_id) {
      return (
        <Container fluid>
          <HeaderMenu set_clan_id={this.set_clan_id} mode='clan' />
          <ClanIndex clan_id={this.props.location.state.clan_id} />
        </Container>
      )
    } else if (getCookie('back_mode') === 'clan' && getCookie('back_id') !== '') {
      return (
        <Container fluid>
          <HeaderMenu set_account_id={this.set_clan_id} mode='clan' />
          <ClanIndex clan_id={getCookie('back_id')} />
        </Container>
      )
    } else {
      return (
        <Container fluid>
          <HeaderMenu set_clan_id={this.set_clan_id} mode='clan' />
          <div
            style={{
              display: window.innerWidth < 768 ? 'none' : 'flex',
              flexWrap: 'no-wrap',
              justifyContent: 'space-between',
              alignItems: 'space-evenly',
            }}
          >
            <div
              style={{ marginLeft: '7em' }}
            >
              <Label pointing>Switch Between Different Database</Label>
            </div>
            <div
              style={{ marginRight: '15em' }}
            >
              <Label pointing>Search Clan Name/Tag</Label>
            </div>
          </div>
          <CWInfo/>
        </Container>
      )
    }
  }
}

export default withRouter(Clan);
