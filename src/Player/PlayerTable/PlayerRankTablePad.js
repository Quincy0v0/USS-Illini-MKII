/**
 * @fileoverview
 * Defining PlayerRankTable class
 * @exports PlayerRankTable
 * @todo need further clarification from chenp2
 */
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Icon, Menu, Table, Dropdown, Modal } from 'semantic-ui-react';
import _ from 'lodash';
import 'semantic-ui-css/semantic.min.css';
import PlayerWeaponTable from './PlayerWeaponTable.js';
import { tierDict, nationDict, typeDict, tierOptions } from './PlayerTableUtility.js';

const perpage = 10;

const nationOptions = [
  { key: 'all', value: 'all', text: '' },
  { key: 'usa', value: 'usa', text: 'USA' },
  { key: 'ussr', value: 'ussr', text: 'USSR' },
  { key: 'uk', value: 'uk', text: 'UK' },
  { key: 'japan', value: 'japan', text: 'Japan' },
  { key: 'france', value: 'france', text: 'France' },
  { key: 'germany', value: 'germany', text: 'Germany' },
  { key: 'poland', value: 'poland', text: 'Poland' },
  { key: 'pan_asia', value: 'pan_asia', text: 'Pan Asia' },
  { key: 'italy', value: 'italy', text: 'Italy' },
  { key: 'commonwealth', value: 'commonwealth', text: 'Com. Wealth' },
  { key: 'pan_america', value: 'pan_america', text: 'Pan America' }
];

const typeOptions = [
  { key: 'all', value: 'all', text: '' },
  { key: 'Destroyer', value: 'Destroyer', text: 'Destroyer' },
  { key: 'Cruiser', value: 'Cruiser', text: 'Cruiser' },
  { key: 'Battleship', value: 'Battleship', text: 'Battleship' },
  { key: 'AirCarrier', value: 'AirCarrier', text: 'Carrier' }
];

/**
 * Local class PlayerShipTableBody for rendering mobile view of ship table (pad)
 */
class PlayerShipTableBody extends Component {
  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
    }
    this.build = this.build.bind(this);
  }

  build(data, page, selectedName, selectedNation, selectedType, selectedTier) {
    var rows = [];
    if (data) {
      for (var i = page * perpage; i < data.length; i++) {
        var row = data[i];
        if (i < page * perpage + perpage) {
          var seasonName = "";
          if (parseInt(row.season) < 100) {
            seasonName = row.season;
          } else {
            seasonName = "Sprint " + (parseInt(row.season) - 100).toString()
          }
          rows.push(
            (
              <Table.Row key={row.ship_id.toString() + '/' + row.season} id={"PlayerRankTablePad" + row.ship_id.toString() + '/' + row.season} onClick={(e) => { this.props.handleselectedShipID(e.currentTarget.id) }}>
                <Table.Cell selectable><NavLink style={{ color: "cornflowerblue" }} to={{ pathname: '/ship', state: { ship_id: row.ship_id } }}>{row.name}</NavLink></Table.Cell>
                <Table.Cell >{nationDict[row.nation].text}</Table.Cell>
                <Table.Cell >{typeDict[row.type].text}</Table.Cell>
                <Table.Cell >{tierDict[row.tier]}</Table.Cell>
                <Table.Cell >{row.win_rate}</Table.Cell>

                <Table.Cell >{row.ave_xp}</Table.Cell>
                <Table.Cell >{row.ave_frags}</Table.Cell>
                <Table.Cell >{row.ave_damage_dealt}</Table.Cell>
                <Table.Cell >{row.ave_planes_killed}</Table.Cell>
              </Table.Row>
            )
          )
        }
      }
    }
    return rows;
  }

  render() {
    return (
      <Table.Body className="PlayerShipTableBody">
        {this.build(this.props.data, this.props.page, this.props.selectedName, this.props.selectedNation, this.props.selectedType, this.props.selectedTier)}
      </Table.Body>
    )
  }
}

/**
 * Component PlayerRankTablePad renders the player's perfomance wrt. ship in rank matches
 * filters by rank seasons (pad)
 */
export default class PlayerRankTablePad extends Component {
  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      account_id: "",
      column: null,
      data: null,
      shipData: null,
      selectedData: null,
      direction: null,
      page: 0,
      selectedName: "all",
      selectedNation: "all",
      selectedType: "all",
      selectedTier: "all",
      selectedShipData: null,
      ship_ids: [],
      shipnames: [{ key: 'all', value: 'all', text: '' }],
      showModal: false,
      seasonOptions: [{ key: '0', value: 'all', text: '' }],
      selectedSeason: null,
    }
    this.handleSort = this.handleSort.bind(this);
    this.build = this.build.bind(this);
    this.setPage = this.setPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleFilterRaw = this.handleFilterRaw.bind(this);
    this.selected = this.selected.bind(this);
    this.handleselectedShipID = this.handleselectedShipID.bind(this);
  }
  componentDidMount() {
    if (this.props.seasonOptions) {
      this.setState({ account_id: this.props.account_id, data: this.props.data, shipnames: this.props.rankshipnames, seasonOptions: this.props.seasonOptions.sort((a, b) => a.key - b.key) });
    } else {
      this.setState({ account_id: this.props.account_id, data: this.props.data, shipnames: this.props.rankshipnames });
    }

    this.handleFilterRaw(this.props.data, null, null, "all", "all", "all")
  }
  componentWillReceiveProps() {
    if (this.props.seasonOptions) {
      this.setState({ account_id: this.props.account_id, data: this.props.data, shipnames: this.props.rankshipnames, seasonOptions: this.props.seasonOptions.sort((a, b) => a.key - b.key) });
    } else {
      this.setState({ account_id: this.props.account_id, data: this.props.data, shipnames: this.props.rankshipnames });
    }

    this.handleFilterRaw(this.props.data, null, null, "all", "all", "all")
  }

  handleSort(clickedColumn) {
    var selectedData = [];
    this.state.data.forEach((row) => {
      if (this.selected(row, this.state.selectedName, this.state.selectedNation, this.state.selectedType, this.state.selectedTier)) {
        selectedData.push(row);
      }
    })
    if (this.state.column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        selectedData: _.sortBy(selectedData, [clickedColumn]),
        direction: 'ascending',
        page: 0,
      })
    } else {
      if (this.state.direction === 'ascending') {
        this.setState({
          selectedData: _.sortBy(selectedData, [clickedColumn]).reverse(),
          direction: 'descending',
          page: 0,
        })
      } else {
        this.setState({
          selectedData: _.sortBy(selectedData, [clickedColumn]),
          direction: 'ascending',
          page: 0,
        })
      }
    }
  }

  /**
   * Mount preset data
   * @param {*} data 
   * @param {*} selectedSeason 
   * @param {*} selectedName 
   * @param {*} selectedNation 
   * @param {*} selectedType 
   * @param {*} selectedTier 
   */
  handleFilterRaw(data, selectedSeason, selectedName, selectedNation, selectedType, selectedTier) {
    var selectedData = [];
    if (data) {
      data.forEach((row) => {
        if (this.selected(row, selectedSeason, selectedName, selectedNation, selectedType, selectedTier)) {
          selectedData.push(row);
        }
      })
    }
    this.setState({ selectedData: selectedData, page: 0 });
  }

  /**
   * Generate filtered data and push to state
   * @param {*} selectedSeason 
   * @param {*} selectedName 
   * @param {*} selectedNation 
   * @param {*} selectedType 
   * @param {*} selectedTier 
   */
  handleFilter(selectedSeason, selectedName, selectedNation, selectedType, selectedTier) {
    var selectedData = [];
    if (this.props.data) {
      this.props.data.forEach((row) => {
        if (this.selected(row, selectedSeason, selectedName, selectedNation, selectedType, selectedTier)) {
          selectedData.push(row);
        }
      })
    }
    this.setState({ selectedData: selectedData, page: 0 });
  }

  /**
   * @todo get help from chenp2
   * @param {*} input 
   */
  handleselectedShipID(input) {
    var str = input.substring(15, input.length)
    var loc = 0;
    for (var i = 0; i < str.length; i++) {
      if (str.charAt(i) === '/') {
        loc = i;
      }
    }
    var selectedShipID = parseInt(str.substring(0, loc));
    var season = str.substring(loc + 1, str.length);
    var selectedShipData = {};
    if (this.state.selectedData) {
      this.state.selectedData.forEach((row) => {
        if (row.ship_id === selectedShipID && row.season === season) {
          selectedShipData.ship_id = row.ship_id;
          selectedShipData.main_battery_max_frags_battle = row.main_battery_max_frags_battle;
          selectedShipData.main_battery_frags = row.main_battery_frags;
          selectedShipData.main_battery_hit_rate = row.main_battery_hit_rate;

          selectedShipData.torpedoes_max_frags_battle = row.torpedoes_max_frags_battle;
          selectedShipData.torpedoes_frags = row.torpedoes_frags;
          selectedShipData.torpedoes_hit_rate = row.torpedoes_hit_rate;

          selectedShipData.second_battery_max_frags_battle = row.second_battery_max_frags_battle;
          selectedShipData.second_battery_frags = row.second_battery_frags;
          selectedShipData.second_battery_hit_rate = row.second_battery_hit_rate;

          selectedShipData.aircraft_max_frags_battle = row.aircraft_max_frags_battle;
          selectedShipData.aircraft_frags = row.aircraft_frags;

          selectedShipData.ramming_max_frags_battle = row.ramming_max_frags_battle;
          selectedShipData.ramming_frags = row.ramming_frags;

          this.setState({ showModal: true, selectedShipData: selectedShipData });
          return;
        }
      })
    }
  }

  /**
   * Filter return true if satisfiy all options below
   * @param {*} row 
   * @param {*} selectedSeason 
   * @param {*} selectedName 
   * @param {*} selectedNation 
   * @param {*} selectedType 
   * @param {*} selectedTier 
   */
  selected(row, selectedSeason, selectedName, selectedNation, selectedType, selectedTier) {
    if (selectedName && selectedName !== "all" && selectedName !== "") {
      if (row.name !== selectedName) {
        return false;
      }
    } else {
      if (selectedName && selectedNation !== "all" && selectedName !== "") {
        if (row.nation !== selectedNation) {
          return false;
        }
      }
      if (selectedName && selectedType !== "all" && selectedName !== "") {
        if (row.type !== selectedType) {
          return false;
        }
      }
      if (selectedName && selectedTier !== "all" && selectedName !== "") {
        if (row.tier !== parseInt(selectedTier)) {
          return false;
        }
      }
    }
    if (selectedSeason && selectedSeason !== "all" && selectedSeason !== "") {
      if (row.season !== selectedSeason) {
        return false;
      }
    }
    return true
  }

  setPage(e, { name }) {
    this.setState({ page: parseInt(name) })
  }

  nextPage() {
    var page = this.state.page;
    if (page < this.state.selectedData.length / perpage - 1) {
      this.setState({
        page: page + 1,
      })
    }
  }

  prevPage() {
    var page = this.state.page;
    if (page > 0) {
      this.setState({
        page: page - 1,
      })
    }
  }

  build(data) {
    var totalpage = 5;
    var pages = [];
    if (data) {
      if (data.length / perpage > totalpage) {
        if (this.state.page < Math.round(totalpage / 2)) {
          for (var i = 0; i < totalpage; i++) {
            pages.push((
              <Menu.Item as='a' key={i.toString()} name={i.toString()} active={this.state.page === i} onClick={this.setPage}>{i + 1}</Menu.Item>
            ))

          }
        } else if (this.state.page > data.length / perpage - Math.round(totalpage / 2)) {
          for (var i = Math.round(data.length / perpage) - totalpage; i < data.length / perpage; i++) {
            pages.push((
              <Menu.Item as='a' key={i.toString()} name={i.toString()} active={this.state.page === i} onClick={this.setPage}>{i + 1}</Menu.Item>
            ))
          }
        } else {
          for (var i = 0; i < data.length / perpage; i++) {
            if (Math.abs(i - this.state.page) < Math.round(totalpage / 2)) {
              pages.push((
                <Menu.Item as='a' key={i.toString()} name={i.toString()} active={this.state.page === i} onClick={this.setPage}>{i + 1}</Menu.Item>
              ))
            }
          }
        }
      } else {
        for (var i = 0; i < data.length / perpage; i++) {
          pages.push((
            <Menu.Item as='a' key={i.toString()} name={i.toString()} active={this.state.page === i} onClick={this.setPage}>{i + 1}</Menu.Item>
          ))
        }
      }
    }
    return pages;
  }

  render() {
    if (!this.props.data) {
      return (<div />)
    }
    return (
      <div>
        <Dropdown fluid clearable placeholder='Select Season' selection options={this.state.seasonOptions.sort((a, b) => a.key - b.key)} value={this.state.selectedSeason} onChange={(e, { value }) => { this.setState({ selectedSeason: value, selectedName: null, selectedNation: "all", selectedType: "all", selectedTier: "all" }); this.handleFilter(value, null, "all", "all", "all") }} />
        <Table sortable selectable celled structured striped unstackable className="PlayerShipTable">
          <Table.Header className="PlayerShipTableHeader">
            <Table.Row key="header1">
              <Table.HeaderCell>Ship</Table.HeaderCell>
              <Table.HeaderCell sorted={this.state.column === 'nation' ? this.state.direction : null} onClick={() => this.handleSort('nation')}>Nation</Table.HeaderCell>
              <Table.HeaderCell sorted={this.state.column === 'type' ? this.state.direction : null} onClick={() => this.handleSort('type')}>Type</Table.HeaderCell>
              <Table.HeaderCell sorted={this.state.column === 'tier' ? this.state.direction : null} onClick={() => this.handleSort('tier')}>Tier</Table.HeaderCell>
              <Table.HeaderCell sorted={this.state.column === 'win_rate' ? this.state.direction : null} onClick={() => this.handleSort('win_rate')} rowSpan='2'>Win Rate</Table.HeaderCell>
              <Table.HeaderCell colSpan='4'>Average</Table.HeaderCell>
            </Table.Row>
            <Table.Row key="header2">
              <Table.Cell width="5"><Dropdown fluid clearable placeholder='Select Ship' search selection options={this.state.shipnames} value={this.state.selectedName} onChange={(e, { value }) => { this.setState({ selectedName: value, selectedNation: "all", selectedType: "all", selectedTier: "all" }); this.handleFilter(this.state.selectedSeason, value, "all", "all", "all") }} /></Table.Cell>
              <Table.Cell width="5"><Dropdown fluid placeholder='Select Nation' selection options={nationOptions} value={this.state.selectedNation} onChange={(e, { value }) => { this.setState({ selectedNation: value, selectedName: "all" }); this.handleFilter(this.state.selectedSeason, "all", value, this.state.selectedType, this.state.selectedTier) }} /></Table.Cell>
              <Table.Cell width="5"><Dropdown fluid placeholder='Select Type' selection options={typeOptions} value={this.state.selectedType} onChange={(e, { value }) => { this.setState({ selectedType: value, selectedName: "all" }); this.handleFilter(this.state.selectedSeason, "all", this.state.selectedNation, value, this.state.selectedTier) }} /></Table.Cell>
              <Table.Cell width="5"><Dropdown fluid placeholder='Select Tier ' selection options={tierOptions} value={this.state.selectedTier} onChange={(e, { value }) => { this.setState({ selectedTier: value, selectedName: "all" }); this.handleFilter(this.state.selectedSeason, "all", this.state.selectedNation, this.state.selectedType, value) }} /></Table.Cell>

              <Table.HeaderCell sorted={this.state.column === 'ave_xp' ? this.state.direction : null} onClick={() => this.handleSort('ave_xp')}>XP</Table.HeaderCell>
              <Table.HeaderCell sorted={this.state.column === 'ave_frags' ? this.state.direction : null} onClick={() => this.handleSort('ave_frags')}>Kills</Table.HeaderCell>
              <Table.HeaderCell sorted={this.state.column === 'ave_damage_dealt' ? this.state.direction : null} onClick={() => this.handleSort('ave_damage_dealt')}>Damage</Table.HeaderCell>
              <Table.HeaderCell sorted={this.state.column === 'ave_planes_killed' ? this.state.direction : null} onClick={() => this.handleSort('ave_planes_killed')}>Plane Kills</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <PlayerShipTableBody data={this.state.selectedData} page={this.state.page} handleselectedShipID={this.handleselectedShipID} />

          <Table.Footer className="PlayerShipTableFooter">
            <Table.Row key="header3">
              <Table.HeaderCell colSpan='21'>
                <Menu floated='right' pagination>
                  <Menu.Item key="menu1" as='a' icon onClick={() => this.setState({ page: 0 })}>
                    <Icon name='angle double left' />
                  </Menu.Item>
                  <Menu.Item key="menu2" as='a' icon onClick={this.prevPage}>
                    <Icon name='angle left' />
                  </Menu.Item>
                  {this.build(this.state.selectedData)}
                  <Menu.Item key="menu3" as='a' icon onClick={this.nextPage}>
                    <Icon name='angle right' />
                  </Menu.Item>
                  <Menu.Item key="menu4" as='a' icon onClick={() => this.setState({ page: Math.ceil(this.state.selectedData.length / perpage - 1) })}>
                    <Icon name='angle double right' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

        <Modal open={this.state.showModal} size="large" onClose={() => this.setState({ showModal: false })} closeIcon>
          <Modal.Content>
            <PlayerWeaponTable selectedShipData={this.state.selectedShipData} />
          </Modal.Content>
        </Modal>

      </div>
    );
  }
}
