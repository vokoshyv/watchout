// start slingin' some d3 here.
var dataset = [1,2,3,4,5,6,7,8,9,10];

var width = 700;
var height = 450;
var playerPointer = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z'
var collisionCounter = 0;
var currentScoreCount = 0;
var highScoreCount = 0;

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
      particle();
}

var drag = d3.behavior.drag()
    .on("drag", dragmove)

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
  .attr("xlink:href", "img/test.png");
  // .transition()
  // .duration(1000)
  // .attr("transform", function(d){
  //   return "translate(25,25) rotate(180,25,25) translate(25,25)";
  // });

// function tween(d, i, a) {
//   return d3.interpolateString("rotate(-60, 150, 130)", "rotate(60, 150, 130)");
// }

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








function updateScore(){
  if (currentScoreCount > highScoreCount){
    highScoreCount = currentScoreCount;
    d3.select('.high').text("High Score: " + highScoreCount);
  }
  currentScoreCount = 0;
  d3.select('.current')
    .text("Current Score: " + currentScoreCount);
}


setInterval(function(){
  currentScoreCount++
  d3.select('.current').text("Current Score: " + currentScoreCount);
  if (currentScoreCount > highScoreCount){
    highScoreCount = currentScoreCount;
    d3.select('.high').text("High Score: " + highScoreCount);
  }
}, 50);
setInterval(collisionChecker, 150);

function collisionChecker(){

  return enemies.each(function(d, index){
     //debugger
    if(checkSingleCollision(enemies[0][index])){
      //cause collision counter to increase;
      collisionCounter++;
      d3.select('.collisions')
        .text("Collisions: " + collisionCounter);
        updateScore();
    }
  });

}


function checkSingleCollision(cir1){

  var dx = cir1.x.baseVal.value - player[0][0].x.baseVal.value;
  var dy = cir1.y.baseVal.value - player[0][0].y.baseVal.value;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 40) {
      return true;
  }
  return false;
}

function particle() {
  var m = d3.mouse(this);

  svg.insert("circle", "rect")
      .attr("cx", m[0])
      .attr("cy", m[1])
      .attr("r", 1e-6)
      .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
      .style("stroke-opacity", 1)
    .transition()
      .duration(2000)
      .ease(Math.sqrt)
      .attr("r", 100)
      .style("stroke-opacity", 1e-6)
      .remove();

  d3.event.preventDefault();
}

