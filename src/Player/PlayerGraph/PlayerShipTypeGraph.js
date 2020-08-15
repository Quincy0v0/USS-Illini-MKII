/**
 * @fileoverview
 * Defining the PlayerShipTypeGraph class
 * @exports PlayerShipTypeGraph
 */
import React, { Component } from 'react';
import { Segment, Statistic, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {RadialChart, Hint} from 'react-vis';

/**
 * PlayerShipTypeGraph class that renders the statics table 
 *    wrt. each type of ship for a single player
 * @extends {Component}
 */
export default class PlayerShipTypeGraph extends Component {
  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props){
    super(props);
    this.state = {
      value: false,
      data: null
    };
    this.build = this.build.bind(this);
  }

  componentWillReceiveProps() {
    this.build(this.props.data);
  }

  /**
   * @todo need more info from chenp2
   */
  build(input){
    if(input){
      let acc = {};
      const reducer = (curr) => {
        if (acc[curr.type]) {
          acc[curr.type] += curr.battles
        } else {
          acc[curr.type] = curr.battles
        }
      };
      input.forEach(reducer);
      this.setState({data:acc});
      console.log(acc)
    }
  }

  render() {
    if (this.state.data) {
      const values = [
        {Battles: this.state.data.Destroyer, label: 'Destroyer'},
        {Battles: this.state.data.Cruiser, label: 'Cruiser'},
        {Battles: this.state.data.Battleship, label: 'Battleship'},
        {Battles: this.state.data.AirCarrier, label: 'Aircraft Carrier'},
      ];
      return (
        <div>
          <Header size='small' style={{margin: '0'}}>Ship Stats By Type</Header>
          <link rel='stylesheet' href='https://unpkg.com/react-vis/dist/style.css'/>
          <RadialChart
            innerRadius={60}
            radius={100}
            getAngle={d => d.Battles}
            data={values}
            width={300}
            height={300}
            padAngle={0.04}
            onValueMouseOver={v => this.setState({value: v})}
            onSeriesMouseOut={v => this.setState({value: false})}
          >
            {this.state.value !== false &&
            <Hint value={this.state.value}>
              <Segment>
                <Statistic horizontal>
                  <Statistic.Value>{this.state.value.Battles.toLocaleString()}</Statistic.Value>
                  <Statistic.Label>{this.state.value.label}</Statistic.Label>
                </Statistic>
              </Segment>
            </Hint>}
          </RadialChart>
        </div>
      );
    } else {
      return null;
    }
  }
}
