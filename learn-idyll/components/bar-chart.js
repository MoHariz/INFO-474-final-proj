const React = require("react");
const D3Component = require("idyll-d3-component");
const d3 = require("d3");

class BarChart extends D3Component {
  initialize(node, props) {
    // node is a <div> container,
    // console.log(props.data);
    var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 100
    };

    var width = 500 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var svg = d3
      .select(node)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // for sorted barchart. comment it if not want sorted data
    props.data.sort(function(a, b) {
      return a.total_NA_sales - b.total_NA_sales;
    });

    var x = d3.scaleLinear().range([0, width]);

    var y = d3.scaleBand().range([height, 0]);

    var xAxis = d3.axisBottom(x).ticks(10);

    var yAxis = d3.axisLeft(y);

    x.domain([
      0,
      d3.max(props.data, function(d) {
        return d.total_NA_sales;
      })
    ]);

    y.domain(
      props.data.map(function(d) {
        return d.Genre;
      })
    )
      .paddingInner(0.1)
      .paddingOuter(0.5);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "translate(" + width + ",0)")
      .attr("y", -5)
      .style("text-anchor", "end")
      .text("Total North America Sales (in millions)");

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(props.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("y", function(d) {
        return y(d.Genre);
      })
      .attr("width", function(d) {
        return x(d.total_NA_sales);
      });
  }

  update(props) {
    // ...
  }
}

module.exports = BarChart;
