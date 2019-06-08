const React = require("react");
const d3 = require("d3");

class WhatIf extends React.PureComponent {
  //   constructor(props) {
  //     super(props);
  //     this.state = { genre: this.props.genre };

  //     this.updateGenre = this.updateGenre.bind(this);
  //   }
  updateStats(e) {
    debugger;
    this.props.updateProps({
      med: e.med,
      max: e.max
    });
  }

  render() {
    let data = [];
    for (let i = 0; i < this.props.data.length; i++) {
      data.push(this.props.data[i].Global_Sales);
    }
    let sortedData = data.sort((a, b) => a - b);
    debugger;
    let median = d3.median(sortedData);
    let maxAbsolute = d3.max(sortedData);
    this.updateStats({ med: median, max: maxAbsolute });
    return null;
  }
}
module.exports = WhatIf;
