const salesData = [
    { year: 2015, value: 1500 },
    { year: 2016, value: 2100 },
    { year: 2017, value: 2300 },
    { year: 2018, value: 2500 },
    { year: 2019, value: 2900 },
    { year: 2020, value: 3800 },
    { year: 2021, value: 9200 },
    { year: 2022, value: 9700 },
    { year: 2023, value: 8900 },
    { year: 2024, value: 10500 }
];

const svg = document.getElementById('chart');


const barWidth = 60;
const maxHeight = 300;
const spacing = 80;

for (let i = 0; i < salesData.length; i++) {
    const data = salesData[i];
    
    const barHeight = (data.value / 10500) * maxHeight;
    
    const x = 50 + (i * spacing);
    
    const y = 350 - barHeight;
    
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', barHeight);
    rect.setAttribute('fill', '#3498db');
    
    rect.addEventListener('mouseenter', function() {
        rect.setAttribute('fill', '#2980b9');
    });
    rect.addEventListener('mouseleave', function() {
        rect.setAttribute('fill', '#3498db');
    });
    
    svg.appendChild(rect);
    
    const yearText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yearText.setAttribute('x', x + 30);  
    yearText.setAttribute('y', 380);
    yearText.setAttribute('text-anchor', 'middle');
    yearText.setAttribute('fill', '#333');
    yearText.textContent = data.year;
    
    svg.appendChild(yearText);
    
    const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    valueText.setAttribute('x', x + 30);
    valueText.setAttribute('y', y - 10); 
    valueText.setAttribute('text-anchor', 'middle');
    valueText.setAttribute('fill', '#333');
    valueText.setAttribute('font-size', '12');
    valueText.textContent = data.value + 'M';
    
    svg.appendChild(valueText);
}

const treeSvg = document.getElementById('tree');
//Tree trunk
const trunk = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
trunk.setAttribute('x', 425); 
trunk.setAttribute('y', 200);  
trunk.setAttribute('width', 50);
trunk.setAttribute('height', 150);
trunk.setAttribute('fill', '#8B4513'); 
treeSvg.appendChild(trunk);

//Main 
const mainFoliage = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
mainFoliage.setAttribute('cx', 450); 
mainFoliage.setAttribute('cy', 150);  
mainFoliage.setAttribute('r', 80);   
mainFoliage.setAttribute('fill', '#228B22'); 
treeSvg.appendChild(mainFoliage);

//Left side
const leftFoliage = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
leftFoliage.setAttribute('cx', 380);
leftFoliage.setAttribute('cy', 170);
leftFoliage.setAttribute('r', 50);
leftFoliage.setAttribute('fill', '#2E8B57'); 
treeSvg.appendChild(leftFoliage);

//Right side
const rightFoliage = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
rightFoliage.setAttribute('cx', 520);
rightFoliage.setAttribute('cy', 170);
rightFoliage.setAttribute('r', 50);
rightFoliage.setAttribute('fill', '#2E8B57'); 
treeSvg.appendChild(rightFoliage);

//Top
const topFoliage = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
topFoliage.setAttribute('cx', 450);
topFoliage.setAttribute('cy', 90);
topFoliage.setAttribute('r', 40);
topFoliage.setAttribute('fill', '#2E8B57');  
treeSvg.appendChild(topFoliage);

//Ground
const ground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
ground.setAttribute('x', 0);
ground.setAttribute('y', 350);
ground.setAttribute('width', 900);
ground.setAttribute('height', 50);
ground.setAttribute('fill', '#8B7355'); 
treeSvg.appendChild(ground);

//Grass
for (let i = 0; i < 15; i++) {
    const grass = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    grass.setAttribute('cx', 100 + (i * 50));
    grass.setAttribute('cy', 345);
    grass.setAttribute('r', 8);
    grass.setAttribute('fill', '#90EE90'); 
    treeSvg.appendChild(grass);
}