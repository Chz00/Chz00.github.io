import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let svg;
let circle;

async function prepareVis() {
    const width = 800;
    const height = 600;
    svg = d3.select("#visContainer")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid black")
}

function drawVis() {
    circle = svg.append("circle").attr("r", 15).attr("fill", "black").attr("cx", 55).attr("cy", 55)
}

function playAnimation() {
    setInterval(()=>{
        let randomX = Math.random() * width;
        let randomY = Math.random() * height;
        circle.attr("cx", randomX).attr("cy", randomY);
    },200)
}

async function runApp() {
    await prepareVis();
    drawVis();
    playAnimation();
}

runApp();