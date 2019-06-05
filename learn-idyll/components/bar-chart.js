const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

class BarChart extends React.Component {
    initialize(node, props) {
    // node is a <div> container,
    const svg = d3.select(node).append('svg');

    //...

    // do something with the props object passed in
    svg.data(props.data);
    }

    update(props) {
    // ...
    }
}

module.exports = BarChart;