// start slingin' some d3 here.
var dataset = [1,2,3,4,5,6,7,8,9,10];

var width = 700;
var height = 450;
var playerPointer = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z'


var svgCircleContainer = d3.select(".playground").append("svg")
  .attr("width", 200)
  .attr("height", 200);

var circle = svgCircleContainer.append("circle")
  .attr("x", 30)
  .attr("y", 30)
  .attr("r", 20);

function dragmove(d) {
    d3.select(this)
    .transition()
    .duration(50)
      .attr("y", function(){
        minY = 10;
        maxY = height -35;
        if (d3.event.y < minY) {
          return minY;
        }
        else if (d3.event.y > maxY){
          return maxY;
        }
        else{
          return d3.event.y;
        }
      })
      .attr("x", function(){
        minX = 10;
        maxX = width -35;
        if (d3.event.x < minX) {
          return minX;
        }
        else if (d3.event.x > maxX){
          return maxX;
        }
        else{
          return d3.event.x;
        }
      });
}

var drag = d3.behavior.drag()
    .on("drag", dragmove);

d3.select('.playground').selectAll('.player')
  .data([0])
  .enter()
  .append('svg')
  .attr('class', 'player')
  .attr('fill', '#ff6600')
  .attr("x", width/2)
  .attr("y", height/2)
  .call(drag)
  .append("circle")
  .attr("cx", 15)
  .attr("cy", 15)
  .attr("r", 15)
  .attr('fill', '#ff6600');


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

var player = d3.select('.playground').selectAll('.player');

function randomLocation(){

  enemies
  .transition()
  .duration(2500)
  .attr("x", function(d){
    return (Math.random() * (width-50));
  })
  .attr("y", function(d){
    return (Math.random() * (height-50));
  })



};
setInterval(randomLocation, 2500);

function collisionChecker(){

  return enemies.each(function(d, index){
    // debugger
    if(checkSingleCollision(enemies[0][index])){
      return true;
    }
    return false;
  });

  // use enemies locations
  // compare against player location
  // on intersections use jquery to up the collision counter

}


setInterval(collisionChecker, 500);

function checkSingleCollision(cir1){

  var dx = cir1.x.baseVal.value - player[0][0].x.baseVal.value;
  var dy = cir1.y.baseVal.value - player[0][0].y.baseVal.value;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 40) {
      // collision detected!
      console.log("collision");
      return true;
  }
  return false;
}

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
