import React, {Component} from 'react';
import {Label, Button, Comment, Form, Header, Icon} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import {getCookie} from '../../Common/cookie.js';
import {time, server} from '../../Common/utlity.js';

export default class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ship_id: '',
      user_post: null,
      hidden: true,
      content: '',
      post_list: [],
      ship_name: '',
      avatar_list: [],
    };
    this.handleNewPost = this.handleNewPost.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
    this.avatar = ["ade", "chris", "daniel", "helen", "joe", "justen", "lena", "laura", "steve", "matt", "nan", "veronika", "tom", "zoe"]
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ship_id: nextProps.ship_id,
      ship_name: nextProps.ship_name,
      user_post: getCookie("username") !== "" ? getCookie("username") : null,
      hidden: false
    });
  }

  componentDidMount() {
    this.updatePosts(this.props.ship_id);
  }

  async handleNewPost(e) {
    e.preventDefault();
    await axios.post(server + "/posts", {
      ship_id: this.state.ship_id,
      ship_name: this.state.ship_name,
      user_post: this.state.user_post,
      user_rating: 0,
      content: this.state.content
    })
      .then((response) => {
        if (response.data.data && response.data.data.ship_id && response.data.data.ship_id === this.state.ship_id) {

        } else {
          console.log("different data" + response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    this.updatePosts(this.state.ship_id);
  }

  async handleDeletePost(e, idx) {
    let post = this.state.post_list[idx];
    e.preventDefault();
    await axios.delete(server + "/posts/" + post._id)
      .then((response) => {
        if (response.data.data && response.data.data._id === post._id) {

        } else {
          console.log("different data" + response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    this.updatePosts(this.state.ship_id);
  }

  async handleVotePost(e, idx, rateChange) {
    let post = this.state.post_list[idx];
    let newRating = post.user_rating + rateChange;
    e.preventDefault();
    await axios.put(server + "/posts/" + post._id + "?user_rating=" + newRating).then((response) => {
      if (response.data.data && response.data.data._id === post._id) {
        console.log(response)
      } else {
        console.log("different data" + response.data.data);
      }
    })
      .catch((error) => {
        console.log(error);
      });
    this.updatePosts(this.state.ship_id);
  }

  updatePosts(ship_id) {
    let obj = this;
    axios.get(server + "/posts?where={\"ship_id\":" + ship_id + "}").then((response) => {
      let new_list = response.data.data;
      let promises = response.data.data.map(data => new Promise(function(resolve, reject) {
        axios.get(server + '/users?where={"name":"' + data.user_post + '"}')
          .then((response) => {
            if (response.data.data[0]) {
              resolve(response.data.data[0].avator);
            }
            else {
              resolve("https://react.semantic-ui.com/images/avatar/small/" + obj.avatar[Math.floor(data.user_post.charCodeAt(0) % obj.avatar.length)] + ".jpg");
            }
          }).catch((error) => reject(error));
      }));
      Promise.all(promises).then(function(values) {
        obj.setState({avatar_list: values});
      });
      this.setState({post_list: new_list});
    });
    this.setState({content: ""})
  }

  render() {
    const post_list = this.state.post_list.map((post, idx) => {
      let action_selection = post.user_post === this.state.user_post ?
        (
          <Comment.Actions>
            <Button
              circular
              size="mini"
              basic
              icon
              onClick={e => this.handleDeletePost(e, idx)}
            >
              <Icon name="trash alternate outline"/>
            </Button>
          </Comment.Actions>
        ) : (
          <Comment.Actions>
            <Button
              disabled={!this.state.user_post}
              circular
              size="mini"
              basic
              icon
              onClick={e => this.handleVotePost(e, idx, 1)}
            >
              <Icon name="thumbs up outline"/>
            </Button>
            <Button
              disabled={!this.state.user_post}
              circular
              size="mini"
              basic
              icon
              onClick={e => this.handleVotePost(e, idx, -1)}
            >
              <Icon name="thumbs down outline"/>
            </Button>
          </Comment.Actions>
        );

      return (
        <Comment>
          <Comment.Avatar as='a' src={this.state.avatar_list[idx]}/>
          <Comment.Content>
            <Comment.Author as='a'>{post.user_post}</Comment.Author>
            <Comment.Metadata>
              <span>{time(post.date_created)}</span>
              <Icon name="thumbs up"/>
              <span>{post.user_rating}</span>
            </Comment.Metadata>
            <Comment.Text>{post.content}</Comment.Text>
            {action_selection}
          </Comment.Content>
        </Comment>
      )
    });

    return (
      <Comment.Group threaded>
        <Header as='h3' dividing>
          {this.state.user_post ? "You are currently posting as " + this.state.user_post : "Log in to post comments"}
        </Header>
        {post_list}
        <Form reply>
          {!this.state.user_post &&
          <Label basic color='red' pointing='below'>
            Please log in first
          </Label>
          }
          <Form.TextArea
            disabled={!this.state.user_post}
            placeholder='write your comments here'
            onChange={(e, data) => {
              this.setState({content: data.value}, () => {
                console.log(this.state.content.value)
              })
            }}/>
          <Button
            disabled={!this.state.user_post}
            content='Add Reply'
            labelPosition='left'
            icon='edit'
            primary
            onClick={e => this.handleNewPost(e)}
          />
        </Form>
      </Comment.Group>
    );
  }
}
