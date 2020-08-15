import React, { Component } from 'react'
import { Grid, Header, Container, Divider, Card } from 'semantic-ui-react';
import axios from 'axios';
import {server} from '../Common/utlity.js';

class ManagePost extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
        post_list: null
    }
    this.build = this.build.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
      this.props.username && this.build();
  }

  build(){
      axios.get(server + "/posts?where={\"user_post\":\""+ this.props.username+"\"}")
          .then((response)=>{
              let new_list = response.data.data;
              console.log(response.data.data);
              this.setState({post_list:new_list});
          })
  }

  async deletePost(e, idx){
      let post = this.state.post_list[idx]
      e.preventDefault();
      await axios.delete(server + "/posts/"+ post._id).
      then((response)=>{
          if (response.data.data && response.data.data._id === post._id){

          }else{
              console.log("different data" + response.data.data);
          }
      })
          .catch((error) => {
              console.log(error);
          });
      await axios.get(server + "/posts?where={\"user_post\":\""+ this.props.username+"\"}")
          .then((response)=>{
              let new_list = response.data.data;
              console.log(response.data.data);
              this.setState({post_list:new_list});
          })
  }

  render() {
      const content = this.state.post_list && this.state.post_list.map((post, idx) => {
          return (
              <Card key={idx} fluid color='violet'>
                  <Card.Content>
                      <Card.Header content={post.ship_name} />
                      <Card.Meta content={post.date_created} />
                      <Card.Description>
                          <Grid>
                              <Grid.Column floated='left' width={10}>
                                  {post.content}
                              </Grid.Column>
                              <Grid.Column floated='right'>
                                  <a onClick={(e) => this.deletePost(e, idx)}>Delete</a>
                              </Grid.Column>
                          </Grid>
                      </Card.Description>
                  </Card.Content>
              </Card>
          )
      });
    return (
      <Container fluid>
          <Header as="h1" textAlign="center">{this.props.username}'s Posts</Header>
          <Divider />
          {content}
      </Container>

    );
  }
}

export default ManagePost;
