import flv from 'flv.js';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);

    // After first rendering the component, tries to build the video player.
    // This helps at least showing the video player when the user refreshes the page
    // and we do not still have the stream fetched from the store.
    this.buildVideoPlayer();
  }

  componentDidUpdate() {
    // After fetching successfully the stream from the store,
    // we attempt to build the video player again but this time
    // with all the information.
    this.buildVideoPlayer();
  }

  componentWillUnmount() {
    this.videoPlayer.destroy();
  }

  buildVideoPlayer() {
    if (this.videoPlayer || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;

    this.videoPlayer = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.videoPlayer.attachMediaElement(this.videoRef.current);
    this.videoPlayer.load();
  }

  render() {
    if (!this.props.stream) {
      return null;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
