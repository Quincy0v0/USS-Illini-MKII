/**
 * @fileoverview
 * Defining the PlayerShipTierGraph class
 * @exports PlayerShipTierGraph
 */
import React, { Component } from 'react';
import { Segment, Statistic, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { RadialChart, Hint } from 'react-vis';

/**
 * PlayerShipTierGraph class that renders the statics table 
 *    wrt. each tier of ships for a single player
 * @extends Component
 */
export default class PlayerShipTierGraph extends Component {
  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      value: false
    };
    this.build = this.build.bind(this);
  }

  componentWillReceiveProps() {
    this.build(this.props.data);
  }

  /**
   * @todo need more info from chenp2
   */
  build(input) {
    if (input) {
      let acc = new Array(10).fill(0);
      const reducer = (curr) => {
        let tier = parseInt(curr.tier);
        acc[tier - 1] += curr.battles
      };
      input.forEach(reducer);
      this.setState({ data: acc });
    }
  }

  render() {
    if (this.state.data) {
      const values = [
        { Battles: this.state.data[0], label: 'I' },
        { Battles: this.state.data[1], label: 'II' },
        { Battles: this.state.data[2], label: 'III' },
        { Battles: this.state.data[3], label: 'IV' },
        { Battles: this.state.data[4], label: 'V' },
        { Battles: this.state.data[5], label: 'VI' },
        { Battles: this.state.data[6], label: 'VII' },
        { Battles: this.state.data[7], label: 'VIII' },
        { Battles: this.state.data[8], label: 'IX' },
        { Battles: this.state.data[9], label: 'X' },
      ];
      return (
        <div>
          <Header size='small' style={{ margin: '0' }}>Ship Stats By Tier</Header>
          <link rel='stylesheet' href='https://unpkg.com/react-vis/dist/style.css' />
          <RadialChart
            innerRadius={60}
            radius={100}
            getAngle={d => d.Battles}
            data={values}
            width={300}
            height={300}
            padAngle={0.04}
            onValueMouseOver={v => this.setState({ value: v })}
            onSeriesMouseOut={v => this.setState({ value: false })}
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
      )
    } else {
      return null;
    }
  }
}
