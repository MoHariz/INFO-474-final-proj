const React = require("react");
const D3Component = require("idyll-d3-component");
const d3 = require("d3");

class BoxPlot extends D3Component {
  initialize(node, props) {
    // target the single container and include introductory HTML elements
    const container = d3.select(node);

    container.append("h1").text("Box Plot");

    // define also a tooltip, showing the actual value of each observation when hovering on the circle elements
    const tooltip = container
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);

    // DATA
    // include an array of 20 items, randomly picked from 1 to 1000
    const data = [];
    for (let i = 0; i < props.data.length; i++) {
      data.push(props.data[i].Global_Sales);
    }

    // console.log(data);

    // sort the data from smallest to biggest value (as to easily retrieve the quartile, median values)
    const sortedData = data.sort((a, b) => a - b);

    // console.log(sortedData);

    const median = d3.median(sortedData);
    // console.log(median);

    const firstQuartile = d3.quantile(sortedData, 0.25);
    // console.log(firstQuartile);
    const thirdQuartile = d3.quantile(sortedData, 0.75);
    // console.log(thirdQuartile);

    const interQuartileRange = thirdQuartile - firstQuartile;
    // console.log(interQuartileRange);

    const minAbsolute = d3.min(sortedData);
    const minIQR = firstQuartile - interQuartileRange * 1.5;

    const min = minIQR > minAbsolute ? minIQR : minAbsolute;

    const maxAbsolute = d3.max(sortedData);

    const maxIQR = thirdQuartile + interQuartileRange * 1.5;

    const max = maxIQR < maxAbsolute ? maxIQR : maxAbsolute;

    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    };
    const width = 550 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svgContainer = container
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${height +
          margin.top +
          margin.bottom}`
      )
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([0, max])
      .range([0, width]);

    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(0)
      .tickPadding(10);

    const groupAxis = svgContainer
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    groupAxis
      .select("path")
      .attr("fill", "none")
      .attr("stroke", "#00000055")
      .attr("stroke-width", "1px");

    groupAxis
      .selectAll("text")
      .attr("fill", "#00000088")
      .attr("stroke", "none")
      .style("font-weight", "bold")
      .style("font-size", "0.7rem");

    svgContainer
      .append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "#00000055")
      .attr("stroke-width", "1px");

    svgContainer
      .append("line")
      .attr("x1", xScale(min))
      .attr("x2", xScale(max))
      // vertically centered
      .attr("y1", height / 2)
      .attr("y2", height / 2)

      .attr("stroke", "#443785")
      .attr("stroke-width", "4px");

    svgContainer
      .append("text")
      .attr("x", xScale(min))
      .attr("y", height / 2 - 10)
      .attr("text-anchor", "middle")
      .text(min)
      .attr("fill", "#443785")
      .attr("font-weight", "bold");

    svgContainer
      .append("text")
      .attr("x", xScale(max))
      .attr("y", height / 2 - 10)
      .attr("text-anchor", "middle")
      .text(max)
      .attr("fill", "#443785")
      .attr("font-weight", "bold");

    svgContainer
      .append("rect")
      .attr("x", xScale(firstQuartile))
      .attr("width", xScale(thirdQuartile) - xScale(firstQuartile))
      .attr("y", height / 2 - height / 8)
      .attr("height", height / 4)
      .attr("fill", "#fff")
      .attr("stroke", "#443785")
      .attr("stroke-width", "4px");

    svgContainer
      .append("text")
      .attr("x", xScale(firstQuartile))
      .attr("y", height / 2 - height / 8 - 10)
      .attr("text-anchor", "middle")
      .text(firstQuartile)
      .attr("fill", "#443785")
      .attr("font-weight", "bold");

    svgContainer
      .append("text")
      .attr("x", xScale(thirdQuartile))
      .attr("y", height / 2 - height / 8 - 10)
      .attr("text-anchor", "middle")
      .text(thirdQuartile)
      .attr("fill", "#443785")
      .attr("font-weight", "bold");

    svgContainer
      .append("line")
      .attr("x1", xScale(median))
      .attr("x2", xScale(median))
      .attr("y1", height / 2 - height / 8)
      .attr("y2", height / 2 + height / 8)
      .attr("stroke", "#443785")
      .attr("stroke-width", "4px");

    svgContainer
      .append("text")
      .attr("x", xScale(median))
      .attr("y", height / 2 - height / 8 - 10)
      .attr("text-anchor", "middle")
      .text(median)
      .attr("fill", "#443785")
      .attr("font-weight", "bold");
  }
}

module.exports = BoxPlot;
