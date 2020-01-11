import React from "react";
import Controller from "../Class/Controller";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth
    };
    this.resizeCanvas = this.resizeCanvas.bind(this);
    window.addEventListener("resize", this.resizeCanvas, false);
  }

  resizeCanvas() {
    this.setState(() => {
      return {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth
      };
    });
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    this.props.game.init(ctx);
  }

  render() {
    return (
      <div>
        <canvas
          onMouseMove={ev =>
            Controller.setMousePos({ x: ev.nativeEvent.x, y: ev.nativeEvent.y })
          }
          style={{ display: "block" }}
          ref="canvas"
          width={this.state.innerWidth}
          height={this.state.innerHeight}
        />
      </div>
    );
  }
}

export default Canvas;
