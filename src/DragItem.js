import React from 'react';

const CIRCLE_DIAMETER = 100;

export default class DragItem extends React.Component {
  state = {
    gotCapture: false,
    circleLeft: 80,
    circleTop: 80,
  };
  isDragging = false;
  previousLeft = 0;
  previousTop = 0;

  onDown = event => {
    this.isDragging = true;
    event.target.setPointerCapture(event.pointerId);

    this.extractPositionDelta(event);
  };

  onMove = event => {
    if (!this.isDragging) {
      return;
    }
    const {left, top} = this.extractPositionDelta(event);

    this.setState(({circleLeft, circleTop}) => ({
      circleLeft: circleLeft + left,
      circleTop: circleTop + top,
    }));
  };

  onUp = event => (this.isDragging = false);
  onGotCapture = event => this.setState({gotCapture: true});
  onLostCapture = event =>
    this.setState({gotCapture: false});

  extractPositionDelta = event => {
    const left = event.pageX;
    const top = event.pageY;
    const delta = {
      left: left - this.previousLeft,
      top: top - this.previousTop,
    };
    this.previousLeft = left;
    this.previousTop = top;
    return delta;
  };

  render() {
    const {gotCapture, circleLeft, circleTop} = this.state;

    const boxStyle = {
      border: '2px solid #cccccc',
      margin: '10px 0 20px',
      minHeight: 400,
      width: '100%',
      position: 'relative',
    };

    const circleStyle = {
      width: CIRCLE_DIAMETER,
      height: CIRCLE_DIAMETER,
      borderRadius: CIRCLE_DIAMETER / 2,
      position: 'absolute',
      left: circleLeft,
      top: circleTop,
      backgroundColor: gotCapture ? 'red' : 'green',
      touchAction: 'none',
    };

    return (
      <div style={boxStyle}>
        <div
          style={circleStyle}
          onPointerDown={this.onDown}
          onPointerMove={this.onMove}
          onPointerUp={this.onUp}
          onPointerCancel={this.onUp}
          onGotPointerCapture={this.onGotCapture}
          onLostPointerCapture={this.onLostCapture}
        />
      </div>
    );
  }
}