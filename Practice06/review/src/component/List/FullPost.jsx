import React, {Component} from 'react'

const styles = {
  fullPostWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  post: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    width: 640,
    height: 200,
    padding: '10px 5px 5px 10px',
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px',
  },
  topic: {
    width: '100%',
    height: 40,
    fontSize: 34,
  },
  content: {
    margin:'10px 0 0 5px',
  }

}

class FullPost extends Component {
	render() {
		const { topic, content } = this.props
		return (
      <div style={styles.fullPostWrapper}>
      <button style={styles.post}>
        <div style={styles.topic}>{topic}</div>
        <div style={styles.content}>{content}</div>
      </button>
    </div>
		)
	}
}



export default FullPost
