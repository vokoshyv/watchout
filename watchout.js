// start slingin' some d3 here.
var dataset = [0,1,2,3,4,5,6,7,8,9];
var width = 700;
var height = 450;

d3.select('.playground').selectAll('.enemies')
  .data(dataset)
  .enter()
  .append('svg')
  .attr('class','enemies')
  .attr("width", 50)
  .attr("height", 50)
  .attr("x", function(d){
    return (Math.random() * (width-50));
  })
  .attr("y", function(d){
    return (Math.random() * (height-50));
  })
  .append("svg:image")
  .attr("width", 50)
  .attr("height", 50)
  .attr("xlink:href", "img/asteroid.png");

var enemies = d3.select('.playground').selectAll('.enemies');


function randomLocation(){

  enemies
  .transition()
  .attr("x", function(d){
    return (Math.random() * (width-50));
  })
  .attr("y", function(d){
    return (Math.random() * (height-50));
  })

};
setInterval(randomLocation, 1000);

// randomLocation();
// update(alphabet);

// // Grab a random sample of letters from the alphabet, in alphabetical order.
// setInterval(function() {
//   update(shuffle(alphabet)
//       .slice(0, Math.floor(Math.random() * 26))
//       .sort());
// }, 1500);
//
//
  // .attr("x", "60")
  // .attr("y", "60")
  // .attr("width", "20")
  // .attr("height", "20");

// var svg = d3.select("body")
//                 .append("svg")
//                 .attr("width", 50)
//                 .attr("height", 50)
//                 .style("border", "1px solid black")
//                 .attr("xlink:href", "img/asteroid.png")
//                 .attr("x", "60")
//                 .attr("y", "60")
//                 .attr("width", "20")
//                 .attr("height", "20");

// // var text = svg.selectAll("text")
// //                 .data([0])
// //                 .enter()
// //                 .append("text")
// //                 .text("Testing")
// //                 .attr("x", "40")
// //                 .attr("y", "60");

// var imgs = svg.selectAll("img").data([0]);
//                 imgs.enter()
//                 .append("svg:img")
//                 .attr("xlink:href", "file:///D:/d3js_projects/refresh.png")
//                 .attr("x", "60")
//                 .attr("y", "60")
//                 .attr("width", "20")
//                 .attr("height", "20");
