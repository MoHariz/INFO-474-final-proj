const D3Component = require("idyll-d3-component");
const d3 = require("d3");
const queue = require("d3-queue");
const d3tip = require("d3-tip");
const topojson = require("topojson");
const NA_REGION = ["USA", "CAN", "MEX"];
const EU_REGION = [
  "ALB",
  "AND",
  "AUT",
  "BLR",
  "BEL",
  "BIH",
  "BGR",
  "HRV",
  "CYP",
  "CZE",
  "DNK",
  "EST",
  "FRO",
  "FIN",
  "FRA",
  "DEU",
  "GIB",
  "GRC",
  "HUN",
  "ISL",
  "IRL",
  "IMN",
  "ITA",
  "XKX",
  "LVA",
  "LIE",
  "LTU",
  "LUX",
  "MKD",
  "MLT",
  "MDA",
  "MCO",
  "MNE",
  "NLD",
  "NOR",
  "POL",
  "PRT",
  "ROU",
  "RUS",
  "SMR",
  "SRB",
  "SVK",
  "SVN",
  "ESP",
  "SWE",
  "CHE",
  "UKR",
  "GBR",
  "VAT"
];
class Map extends D3Component {
  initialize(node, props) {
    var format = d3.format(",");
    let salesData;
    console.log("ASDASD");
    for (let i = 0; i < props.country.length; i++) {
      if (props.country[i].Genre == props.genre) {
        salesData = props.country[i];
      }
    }

    // debugger;
    // Set tooltips
    var tip = d3tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d) {
        console.log(d);
        // debugger;
        return (
          "<strong>Region Name: </strong><span class='details'>" +
          d.region +
          "<br></span>" +
          "<strong>Total Sales: </strong><span class='details'>" +
          format(d.sales) +
          " million copies</span>"
        );
      });

    var margin = { top: 0, right: 0, bottom: 0, left: 0 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var color = d3
      .scaleThreshold()
      .domain([
        100000,
        500000,
        1000000,
        1200000,
        1500000,
        2000000,
        3000000,
        4000000,
        5000000,
        500000000,
        1500000000
      ])
      .range([
        "rgb(247,251,255)",
        "rgb(222,235,247)",
        "rgb(198,219,239)",
        "rgb(158,202,225)",
        "rgb(107,174,214)",
        "rgb(66,146,198)",
        "rgb(33,113,181)",
        "rgb(8,81,156)",
        "rgb(8,48,107)",
        "rgb(3,19,43)"
      ]);

    var path = d3.geoPath();

    var svg = d3
      .select(node)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("class", "map");

    var projection = d3
      .geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.5]);

    var path = d3.geoPath().projection(projection);
    svg.call(tip);

    // d3.tsv("../data/world_population.tsv").then(data => {
    //   debugger;
    //   console.log("data");
    // });

    // d3.tsv(prp, function(data) {
    //   //   debugger;
    //   console.log(data[0]);
    // });
    // d3.json("../data/world_countries.json").then(data => {
    //   data.features.forEach(function(d) {
    //     d.population = populationById[d.id];
    //   });
    // });
    // debugger;
    queue
      .queue()
      .defer(
        d3.json,
        "https://gist.githubusercontent.com/jeremycflin/b43ab253f3ae02dced07/raw/8e7e38b28c247610939427008451ec18463d2b8e/world_countries.json"
      )
      //   .defer(
      //     d3.tsv,
      //     "https://gist.githubusercontent.com/jeremycflin/b43ab253f3ae02dced07/raw/8e7e38b28c247610939427008451ec18463d2b8e/world_population.tsv"
      //   )
      .await(ready);
    function ready(error, data) {
      var salesByRegion = {};
      data.features.forEach(function(d) {
        if (NA_REGION.includes(d.id)) {
          salesByRegion[d.id] = salesData.total_NA_sales;
          d.sales = salesData.total_NA_sales;
          d.region = "NA";
        } else if (EU_REGION.includes(d.id)) {
          salesByRegion[d.id] = salesData.total_EU_sales;
          d.sales = salesData.total_EU_sales;
          d.region = "EU";
        } else if (d.id === "JPN") {
          salesByRegion.JPN = salesData.total_JP_sales;
          d.sales = salesData.total_JP_sales;
          d.region = "JPN";
        }
      });

      svg
        .append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", function(d) {
          //   console.log(d.id);
          //   debugger;
          if (!isNaN(salesByRegion[d.id])) {
            if (NA_REGION.includes(d.id)) {
              return "rgb(8,48,107)";
            } else if (EU_REGION.includes(d.id)) {
              return "rgb(158,202,225)";
            } else if (d.id === "JPN") {
              return "rgb(255,192,203)";
            }
          } else {
            return "rgba(255,255,255,0)";
          }
        })
        .style("stroke", "white")
        .style("stroke-width", 1.5)
        .style("opacity", 0.8)
        // tooltips
        .style("stroke", "white")
        .style("stroke-width", 0.3)
        .on("mouseover", function(d) {
          if (!isNaN(salesByRegion[d.id])) {
            tip.show(d, this);

            d3.select(this)
              .style("opacity", 1)
              .style("stroke", "white")
              .style("stroke-width", 3);
          }
        })
        .on("mouseout", function(d) {
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke", "white")
            .style("stroke-width", 0.3);
        });

      svg
        .append("path")
        .datum(
          topojson.mesh(data.features, function(a, b) {
            return a.id !== b.id;
          })
        )
        // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
        .attr("class", "names")
        .attr("d", path);
    }
  }
}

module.exports = Map;
