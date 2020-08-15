/**
 * @fileoverview
 * Defining the PlayerShipNationGraph class
 * @exports PlayerShipNationGraph
 */
import React, { Component } from 'react';
import { Segment, Statistic, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { RadialChart, Hint } from 'react-vis';

/**
 * PlayerShipNationGraph class that renders the statics table 
 *    wrt. each nation for a single player
 * @extends {Component}
 */
export default class PlayerShipNationGraph extends Component {
  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      data: null
    };
    this.countShipNation = this.countShipNation.bind(this);
  }

  componentWillReceiveProps() {
    this.countShipNation(this.props.data);
  }

  /**
   * @todo need more info from chenp2
   */
  countShipNation(input) {
    if (input) {
      let acc = {};
      const reducer = (curr) => {
        if (acc[curr.nation]) {
          acc[curr.nation] += curr.battles
        } else {
          acc[curr.nation] = curr.battles
        }
      };
      input.forEach(reducer);
      this.setState({ data: acc });
    }
  }

  render() {
    if (this.state.data) {
      const values = [
        { Battles: this.state.data.usa, label: 'USA' },
        { Battles: this.state.data.ussr, label: 'USSR' },
        { Battles: this.state.data.uk, label: 'UK' },
        { Battles: this.state.data.japan, label: 'Japan' },
        { Battles: this.state.data.france, label: 'France' },
        { Battles: this.state.data.germany, label: 'Germany' },
        { Battles: this.state.data.europe, label: 'Europe' },
        { Battles: this.state.data.pan_asia, label: 'Pan Asia' },
        { Battles: this.state.data.italy, label: 'Italy' },
        { Battles: this.state.data.commonwealth, label: 'Common Wealth' },
        { Battles: this.state.data.pan_america, label: 'Pan America' },
      ];
      return (
        <div>
          <Header size='small' style={{ margin: '0' }}>Ship Stats By Nation</Header>
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
