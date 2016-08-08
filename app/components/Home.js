import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NotificationSystem from 'react-notification-system';
import  { saveContentAsync, loadContentAsync, uploadContentAsync } from '../actions/home';

import styles from './Home.css';


class Home extends Component {
  constructor(props) {
    super(props);
    this.handleAutomaticSave = this.handleAutomaticSave.bind(this);
    this.handleChangeEditor = this.handleChangeEditor.bind(this);
    this._timeout = null;
    this._notificationSystem = null;
    this.state = {
      content : ''
    };
  }

  componentDidMount() {
    this.props.dispatch(loadContentAsync());
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.notification != null) {
      this._notificationSystem.addNotification({
        message: nextProps.notification.message,
        level: nextProps.notification.level,
        autoDismiss: 2,
        position: 'bl'
      });
    }

    this.setState({content: nextProps.content});
  }

  render() {
    return (
      <div className={styles.container}>
        <NotificationSystem ref="notificationSystem" allowHTML={true} />
        <textarea placeholder="## Type your memos here :)" className={styles.editor} onChange={this.handleChangeEditor} onKeyUp={this.handleAutomaticSave} value={this.state.content}></textarea>
      </div>
    );
  }

  handleAutomaticSave(e) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.dispatch(saveContentAsync(this.state.content));
    }, 1000);
  }

  handleChangeEditor(e) {
    this.setState({content: e.target.value});
  }
}

function mapStateToProps(state) {
  return {
    content: state.home.content,
    notification: state.home.notification
  };
}

export default connect(mapStateToProps)(Home);
