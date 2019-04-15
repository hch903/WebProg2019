import React, {Component} from 'react';
import Radium from 'radium';
import Posts from './Posts';
import FullPost from './FullPost';

const appear = Radium.keyframes({
  '0%': {opacity: 0,},
  '100%': {opacity: 1},
}, 'pulse');

const fackPost = [
  {
    id: 1,
    topic: '前端好難',
    content: 'TT',
  },
  {
    id: 2,
    topic:'後端也好難',
    content: 'TAT',
  },
  {
    id: 3,
    topic: '學完redux發現有graphql',
    content: 'QAQ',
  },
]

const styles = {
  postsWrapper: {
    animationName: appear,
    animationDuration: '1s',
    animationFillMode: 'forwards',
    height: '500%',
    width: '100%',
    padding: '15% 0 0 0',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  h1:{
    animationName: appear,
    animationDuration: '1s',
    animationFillMode: 'forwards',
  },
};

class List extends Component {

  componentDidMount(){
    this.node.scrollIntoView();
  }

  postSelectedHandler = id => {
    // this.props.history.push({pathname: '/posts/' + id});
    this.props.history.push("/list/" + id);
};


  render() {
    const { id } = this.props.match.params;
    let display = null;
    if (id) {
        const post = fackPost[id - 1];
        display = post ? (
            <FullPost
                topic={post.topic}
                content={post.content}
            />
        ) : (
            <h1>Not found.</h1>
        );
    } else {
        display = fackPost.map((post, id) => (
            <Posts
                key={id}
                topic={post.topic}
                clicked={() => this.postSelectedHandler(post.id)}
            />
        ));
    }

    return (
      <>
        <div ref={node => this.node = node} />
        <div style={styles.postsWrapper}>
          {display}
        </div>
      </>
    )
  }
}


export default Radium(List)
