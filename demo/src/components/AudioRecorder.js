import React, { Component } from 'react'
import { ReactMic } from '../../../src'

require('./styles.scss')

class AudioRecorder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      downloadLinkURL: null,
      isRecording: false,
      recordingStarted: false,
      recordingStopped: false
    }
  }

  stopRecording= () => {
    this.setState({ isRecording: false })
  }

  onSave=(blobObject) => {
    this.setState({
      downloadLinkURL: blobObject.blobURL
    })
  }

  onStart=() => {
    console.log('You can tap into the onStart callback')
  }

  onStop= (blobObject) => {
    this.setState({ blobURL: blobObject.blobURL })
  }

  onData(recordedBlob){
    // console.log('ONDATA CALL IS BEING CALLED! ', recordedBlob);
  }

  onBlock() {
    alert('ya blocked me!')
  }

  startRecording= () => {
    this.setState({
      isRecording: true,
      recordingInSession: true,
      recordingStarted: true,
      recordingStopped: false,
      isPaused: false
    })
  }

  stopRecording=() => {
    this.setState({
      isRecording: false,
      recordingInSession: false,
      recordingStarted: false,
      recordingStopped: true
    })
  }

  render() {
    const {
      blobURL,
      downloadLinkURL,
      isRecording,
      recordingInSession,
      recordingStarted,
      recordingStopped
    } = this.state

    const recordBtn = recordingInSession ? "fa disabled fa-record-vinyl fa-fw" : "fa fa-record-vinyl fa-fw"
    const stopBtn = !recordingStarted ? "fa disabled fa-stop-circle" : "fa fa-stop-circle"
    const downloadLink = recordingStopped ? "fa fa-download" : "fa disabled fa-download"

    const tabrecords = []; let i = 0;

    return (
      <div>
        <div id="project-wrapper">
          <div id="project-container">
            <div id="overlay" />
            <div id="content">
              <h2>React-Mic</h2>
              <h3>Record a .wav Audio File</h3>
              <ReactMic
                className="oscilloscope"
                record={isRecording}
                backgroundColor="#333333"
                visualSetting="sinewave"
                audioBitsPerSecond={128000}
                onStop={this.onStop}
                onStart={this.onStart}
                onSave={this.onSave}
                onData={this.onData}
                onBlock={this.onBlock}
                onPause={this.onPause}
                strokeColor="#0096ef"
              />
              <div id="oscilloscope-scrim">
                {!recordingInSession && <div id="scrim" />}
              </div>
              <div id="controls">
                <div className="column active">
                  <i
                    onClick={this.startRecording}
                    className={recordBtn}
                    aria-hidden="true"
                  />
                </div>
                <div className="column">
                  <i
                    onClick={this.stopRecording}
                    className={stopBtn}
                    aria-hidden="true"
                  />
                </div>
                <div className="column download">
                  <a
                    className={downloadLink}
                    href={downloadLinkURL}
                    download={`recording.wav`}
                  />
                </div>
              </div>
            </div>
            <div id="audio-playback-controls">
              <audio ref="audioSource" controls="controls" src={blobURL} controlsList="nodownload"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioRecorder
