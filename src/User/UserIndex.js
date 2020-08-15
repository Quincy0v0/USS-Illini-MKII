import React, {Component} from 'react';
import {
  Image,
  Icon,
  Input,
  Header,
  Modal,
  Container,
  Divider,
  Button,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import {withRouter, NavLink} from 'react-router-dom';
import HeaderMenu from '../Common/HeaderMenu.js'
import {getCookie, setCookie} from '../Common/cookie.js';
import {server} from '../Common/utlity.js';
import Login from './Login.js';
import Register from './Register.js';
import ChangePassword from './ChangePassword.js';
import ManagePost from './ManagePost.js';
import BindPlayer from './BindPlayer.js';

class UserIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      account_id: '',
      avatar: '',
      showChangePass: false,
      showManagePost: false,
      showBindPlayer: false,
      windowwidth: window.innerWidth,
      avatar_url: '',
      preview: "https://img.moegirl.org/common/a/a7/%E6%98%86%E8%A5%BF%E6%92%95%E9%9D%92%E5%8F%B6.gif"
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateAvatar = this.updateAvatar.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({username: nextProps.username});
    this.reloadData(nextProps.username);
  }

  componentDidMount() {
    if (getCookie("back_mode") === "user" && getCookie("back_id") !== "") {
      this.setState({username: getCookie("back_id")});
    }
    this.reloadData(this.props.username);
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    setCookie("back_mode", "user", 0.1);
    setCookie("back_id", this.state.username, 0.1);
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  handleChange(e) {
    this.setState({avatar_url: e.target.value});
  }

  updateAvatar() {
    axios.put(server + '/users?where={"name":"' + getCookie("username") + '"}&avator=' + this.state.avatar_url)
      .then((response) => {
        console.log(response.data.data.avator);
        alert("update success");
        window.location.reload(false);
      }).catch((error) => console.log(error));
  }

  reloadData(username) {
    axios.get(server + '/users?where={"name":"' + getCookie("username") + '"}')
      .then((response) => {
        var account_id = response.data.data[0].account_id;
        var avatar = response.data.data[0].avator;
        //console.log(response.data);
        this.setState({avatar: avatar});
        //console.log(this.state.avatar);
        if (account_id !== 0) {
          this.setState({account_id: account_id.toString()});
        }
      }).catch((error) => console.log(error));
  }

  updateDimensions() {
    this.setState({windowwidth: window.innerWidth});
  }

  render() {
    if (getCookie("username") && getCookie("username") !== "" && this.state.account_id !== '' && parseInt(this.state.account_id) !== 0) {
      return (
        <Container fluid>
          <HeaderMenu mode="user"/>
          <Container text>
            <Icon name='user circle'
                  style={{
                    fontSize: this.state.windowwidth > 860 ? '4em' : '3em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: this.state.windowwidth > 860 ? '2em' : '1em',
                  }}
            />
            <Header as='h1' content={getCookie("username")}
                    style={{
                      fontSize: this.state.windowwidth > 860 ? '4em' : '3em',
                      fontWeight: 'normal',
                      marginBottom: 0,
                      marginTop: this.state.windowwidth > 860 ? '0.5em' : '0.25em',
                    }}
            />
            <Header as='h2'
                    style={{
                      fontSize: this.state.windowwidth > 860 ? '1.7em' : '1.2em',
                      fontWeight: 'normal',
                      marginTop: this.state.windowwidth > 860 ? '0.5em' : '0.25em',
                    }}
            >
              <NavLink
                to={{pathname: '/player', state: {account_id: this.state.account_id}}}>{this.state.account_id}</NavLink>
            </Header>
          </Container>
          <div
            style={{
              marginTop: this.state.windowwidth > 860 ? '5em' : '2.5em',
              marginLeft: 'auto',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <div style={{margin: "2.5em"}}>
              <Button size="massive" circular icon onClick={() => this.setState({showChangePass: true})}>
                <Icon name="key" circular size="huge"/>
              </Button>
              <Header as="h2">Password</Header>
            </div>
            <div style={{margin: "2.5em"}}>
              <Button size="massive" circular icon onClick={() => this.setState({showManagePost: true})}>
                <Icon name="file alternate" circular size="huge"/>
              </Button>
              <Header as="h2">Posts</Header>
            </div>
            <div style={{margin: "2.5em"}}>
              <Button size="massive" circular icon onClick={() => this.setState({showBindPlayer: true})}>
                <Icon name="user" circular size="huge"/>
              </Button>
              <Header as="h2">Player</Header>
            </div>
          </div>
          <Modal closeIcon size="mini" centered={false} open={this.state.showChangePass}
                 onClose={() => this.setState({showChangePass: false})}>
            <Modal.Content>
              <ChangePassword changepassCallBack={() => this.setState({showChangePass: false})}/>
            </Modal.Content>
          </Modal>
          <Modal closeIcon size="large" centered={false} open={this.state.showManagePost}
                 onClose={() => this.setState({showManagePost: false})}>
            <Modal.Content>
              <ManagePost username={getCookie("username")}/>
            </Modal.Content>
          </Modal>
          <Modal closeIcon size="mini" centered={false} open={this.state.showBindPlayer}
                 onClose={() => this.setState({showBindPlayer: false})}>
            <Modal.Content>
              <BindPlayer bindplayerCallBack={() => this.setState({showBindPlayer: false})}/>
            </Modal.Content>
          </Modal>
        </Container>
      )
    } else if (getCookie("username") && getCookie("username") !== "" && this.state.account_id === '') {
      return (
        <Container fluid>
          <HeaderMenu mode="user"/>
          <Container text>
            <Modal
              trigger={<Image
                style={{
                  marginTop: '2em'
                }}
                as='a'
                target='_blank'
                centered
                src={this.state.avatar}
                size='medium'
                circular
              />}
              closeIcon
            >
              <Modal.Header>Change Avatar</Modal.Header>
              <Modal.Content image>
                <Image wrapped size='medium' src={this.state.preview} />
                <Modal.Description>
                  <Input icon='search' placeholder='Add URL here' value={this.state.avatar_url} onChange={this.handleChange}/>
                  <div style={{marginTop: '5px'}}>
                  <Button
                    primary
                    onClick={() => this.setState({preview: this.state.avatar_url})}
                  >
                    Preview
                  </Button>
                  <Button
                    success
                    onClick={this.updateAvatar}
                  >
                    Update
                  </Button>
                  </div>
                </Modal.Description>
              </Modal.Content>
            </Modal>
            <Header as='h1' content={getCookie("username")}
                    style={{
                      fontSize: this.state.windowwidth > 860 ? '4em' : '3em',
                      fontWeight: 'normal',
                      marginBottom: 0,
                      marginTop: this.state.windowwidth > 860 ? '0.5em' : '0.25em',
                    }}
            />
          </Container>
          <div
            style={{
              marginTop: this.state.windowwidth > 860 ? '5em' : '2.5em',
              marginLeft: 'auto',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <div style={{margin: "2.5em"}}>
              <Button size="massive" circular icon onClick={() => this.setState({showChangePass: true})}>
                <Icon name="key" circular size="huge"/>
              </Button>
              <Header as="h2">Password</Header>
            </div>
            <div style={{margin: "2.5em"}}>
              <Button size="massive" circular icon onClick={() => this.setState({showManagePost: true})}>
                <Icon name="file alternate" circular size="huge"/>
              </Button>
              <Header as="h2">Posts</Header>
            </div>
            <div style={{margin: "2.5em"}}>
              <Button size="massive" circular icon onClick={() => this.setState({showBindPlayer: true})}>
                <Icon name="user" circular size="huge"/>
              </Button>
              <Header as="h2">Player</Header>
            </div>
          </div>
          <Modal closeIcon size="mini" centered={false} open={this.state.showChangePass}
                 onClose={() => this.setState({showChangePass: false})}>
            <Modal.Content>
              <ChangePassword changepassCallBack={() => this.setState({showChangePass: false})}/>
            </Modal.Content>
          </Modal>
          <Modal closeIcon size="large" centered={false} open={this.state.showManagePost}
                 onClose={() => this.setState({showManagePost: false})}>
            <Modal.Content>
              <ManagePost username={getCookie("username")}/>
            </Modal.Content>
          </Modal>
          <Modal closeIcon size="mini" centered={false} open={this.state.showBindPlayer}
                 onClose={() => this.setState({showBindPlayer: false})}>
            <Modal.Content>
              <BindPlayer bindplayerCallBack={() => this.setState({showBindPlayer: false})}/>
            </Modal.Content>
          </Modal>
        </Container>
      )
    } else {
      return (
        <Container fluid>
          <HeaderMenu mode="user"/>
          <Container style={{marginTop: "5em", marginLeft: "auto"}}>
            <Login loginCallBack={() => window.location.reload()}/>
          </Container>
          <Divider horizontal style={{marginTop: "5em"}}>Or</Divider>
          <Container style={{marginTop: "5em", marginLeft: "auto"}}>
            <Register registerCallBack={() => window.location.reload()}/>
          </Container>
        </Container>
      )
    }
  }
}

export default withRouter(UserIndex);
