import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardHeader,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import {
  POSTS_QUERY,
  CREATE_POST_MUTATION,
  POSTS_SUBSCRIPTION
} from '../../graphql'
import Post from '../../components/Post/Post'
import classes from './App.module.css'

let unsubscribe = null

let andrewstyles = {
  display: 'none'
}
let sarahstyles = {
  display: 'none'
}
let mikestyles = {
  display: 'none'
}
class App extends Component {
  constructor(props) {
    super(props);

    this.andrewToggle = this.andrewToggle.bind(this);
    this.sarahToggle = this.sarahToggle.bind(this);
    this.mikeToggle = this.mikeToggle.bind(this);
    this.state = {
      formUser: '',
      formTitle: '',
      formBody: '',
      andrewDropdownOpen: false,
      sarahDropdownOpen: false,
      mikeDropdownOpen: false
    };
  }

  andrewToggle() {
    if(this.state.andrewDropdownOpen === false){
      andrewstyles = {};
      this.setState({andrewDropdownOpen: true});
    }
    else{
      andrewstyles = {
        display: 'none',
      }
      this.setState({andrewDropdownOpen: false});
    }
  }
  sarahToggle() {
    if(this.state.sarahDropdownOpen === false){
      sarahstyles = {};
      this.setState({sarahDropdownOpen: true});
    }
    else{
      sarahstyles = {
        display: 'none',
      }
      this.setState({sarahDropdownOpen: false});
    }
  }
  mikeToggle() {
    if(this.state.andrewDropdownOpen === false){
      mikestyles = {};
      this.setState({mikeDropdownOpen: true});
    }
    else{
      mikestyles = {
        display: 'none',
      }
      this.setState({mikeDropdownOpen: false});
    }
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { formUser, formTitle, formBody } = this.state

    if (!formUser || !formTitle || !formBody) return

    if (formUser === 'Andrew'){
      this.createPost({
        variables: {
          title: formTitle,
          body: formBody,
          published: true,
          authorId: 1 //formUser
        }
      })
      this.setState({andrewCnt: this.state.andrewCnt + 1});
    }
    else if(formUser === 'Sarah'){
      this.createPost({
        variables: {
          title: formTitle,
          body: formBody,
          published: true,
          authorId: 2 //formUser
        }
      })
    }
    else if(formUser === 'Mike'){
      this.createPost({
        variables: {
          title: formTitle,
          body: formBody,
          published: true,
          authorId: 3 //formUser
        }
      })
    }

    this.setState({
      formUser: '',
      formTitle: '',
      formBody: ''
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Modern GraphQL Tutorial</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6" className={classes.form}>
            <Mutation mutation={CREATE_POST_MUTATION}>
              {createPost => {
                this.createPost = createPost

                return (
                  <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                      <Label for="user" sm={2}>
                        User
                      </Label>
                      <Col sm={10}>
                        <Input 
                          type="select" 
                          name="select"
                          value={this.state.formUser}
                          onChange={e =>
                            this.setState({ formUser: e.target.value })}
                          >
                          <option disabled></option>
                          <option>Andrew</option>
                          <option>Sarah</option>
                          <option>Mike</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="title" sm={2}>
                        Title
                      </Label>
                      <Col sm={10}>
                        <Input
                          name="title"
                          value={this.state.formTitle}
                          id="title"
                          placeholder="Post title..."
                          onChange={e =>
                            this.setState({ formTitle: e.target.value })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label for="body">Body</Label>
                      <Input
                        type="textarea"
                        name="body"
                        value={this.state.formBody}
                        id="body"
                        placeholder="Post body..."
                        onChange={e =>
                          this.setState({ formBody: e.target.value })
                        }
                      />
                    </FormGroup>
                    <Button type="submit" color="primary">
                      Post!
                    </Button>
                  </Form>
                )
              }}
            </Mutation>
          </Col>
          <Col xs="6">
            {/* <Card style={{ margin: '30px auto', width: '400px' }}>
              <CardHeader>
                Andrew
                <Button close aria-label="Cancel">
                  <span aria-hidden>&ndash;</span>
                </Button>
              </CardHeader> */}
              <Query query={POSTS_QUERY}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(((</p>
                
                const cnt = data.posts.filter((post) =>{
                  return post.author.name === 'Andrew'
                }).length;

                const posts = data.posts.map((post, id) => {
                  if(post.author.name === 'Andrew'){
                    return(
                      <Post name={post.author.name} data={post} key={id}/>
                    )
                  }
                })
                

                if (!unsubscribe)
                  unsubscribe = subscribeToMore({
                    document: POSTS_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      
                      const newPost = subscriptionData.data.post.data;
                      return {
                        ...prev,
                        posts: [newPost, ...prev.posts]
                      }
                    }
                  })
                return(
                  <div>
                    <Card style={{ margin: '30px auto', width: '400px' }}>
                      <CardHeader>
                        Andrew
                        <Button close aria-label="Cancel" onClick={this.andrewToggle}>
                          {cnt}
                        </Button>
                      </CardHeader>
                      <div className="posts" style={andrewstyles}>{posts}</div>
                    </Card>
                  </div>

                )
                
              }}
              </Query>
            

            {/* <Card style={{ margin: '30px auto', width: '400px' }}>
              <CardHeader>
                Sarah
                <Button close aria-label="Cancel">
                  <span aria-hidden>&ndash;</span>
                </Button>
              </CardHeader> */}
              <Query query={POSTS_QUERY}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(((</p>

                const cnt = data.posts.filter((post) =>{
                  return post.author.name === 'Sarah'
                }).length;

                const posts = data.posts.map((post, id) => {
                  if(post.author.name === 'Sarah')
                    
                    return(
                      <Post name={post.author.name} data={post} key={id} />
                    )
                })
                
                if (!unsubscribe)
                  unsubscribe = subscribeToMore({
                    document: POSTS_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      
                      const newPost = subscriptionData.data.post.data;
                      return {
                        ...prev,
                        posts: [newPost, ...prev.posts]
                      }
                    }
                  })
                return (
                  <Card style={{ margin: '30px auto', width: '400px' }}>
                    <CardHeader>
                      Sarah
                      <Button close aria-label="Cancel" onClick={this.sarahToggle}>
                        {cnt}
                      </Button>
                    </CardHeader>
                    <div className="posts" style={sarahstyles}>{posts}</div>
                  </Card>
                )
              }}
              </Query>
            
            {/* <Card style={{ margin: '30px auto', width: '400px' }}>
              <CardHeader>
                Mike
                <Button close aria-label="Cancel">
                  <span aria-hidden>&ndash;</span>
                </Button>
              </CardHeader> */}
              <Query query={POSTS_QUERY}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(((</p>

                const cnt = data.posts.filter((post) =>{
                  return post.author.name === 'Mike'
                }).length;

                const posts = data.posts.map((post, id) => {
                  if(post.author.name === 'Mike')
                    return(
                      <Post name={post.author.name} data={post} key={id} />
                    )
                })
                
                if (!unsubscribe)
                  unsubscribe = subscribeToMore({
                    document: POSTS_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      
                      const newPost = subscriptionData.data.post.data;
                      return {
                        ...prev,
                        posts: [newPost, ...prev.posts]
                      }
                    }
                  })
                return (
                  <Card style={{ margin: '30px auto', width: '400px' }}>
                    <CardHeader>
                      Mike
                      <Button close aria-label="Cancel" onClick={this.mikeToggle}>
                        {cnt}
                      </Button>
                    </CardHeader>
                    <div className="posts" style={mikestyles}>{posts}</div>
                  </Card>  
                )
              }}
              </Query>
            
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
