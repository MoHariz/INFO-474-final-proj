const React = require("react");
const d3 = require("d3");

class WhatIf extends React.PureComponent {
  render() {
    let data = [];
    for (let i = 0; i < this.props.data.length; i++) {
      data.push(this.props.data[i].Global_Sales);
    }
    let sortedData = data.sort((a, b) => a - b);
    let median = d3.median(sortedData);
    median = Math.round(median * 100) / 100;
    let maxAbsolute = d3.max(sortedData);

    return (
      <div>
        game, the median prediction sales will be{" "}
        <span className="sales-number">{median}</span> million copies, with the
        largest sale of <span className="sales-number">{maxAbsolute}</span>{" "}
        million copies.
      </div>
    );
  }
}
module.exports = WhatIf;
