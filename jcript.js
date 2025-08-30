let level = 1;
let score = 0;
let blocks = [];
const gameArea = document.getElementById('gameArea');
const message = document.getElementById('message');

document.getElementById('startBtn').onclick = startGame;

function startGame() {
    score = 0;
    level = 1;
    nextLevel();
}

function nextLevel() {
    message.textContent = '';
    document.getElementById('level').textContent = "關卡: " + level;
    document.getElementById('score').textContent = "分數: " + score;

    gameArea.innerHTML = '';
    let gridSize = Math.min(5 + level, 10); // 最大10x10
    gameArea.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;

    let totalBlocks = gridSize * gridSize;
    let targetBlocks = Math.min(level + 2, totalBlocks);

    blocks = [];
    for (let i = 0; i < totalBlocks; i++) {
        let div = document.createElement('div');
        div.className = 'block';
        div.onclick = () => clickBlock(div);
        gameArea.appendChild(div);
        blocks.push({div: div, target: false, clicked: false});
    }

    // 隨機選targetBlocks作為目標
    let selected = [];
    while(selected.length < targetBlocks){
        let idx = Math.floor(Math.random()*totalBlocks);
        if(!selected.includes(idx)){
            selected.push(idx);
            blocks[idx].target = true;
        }
    }

    // 顯示目標短暫提示
    blocks.forEach(b => { if(b.target) b.div.style.backgroundColor = '#e74c3c'; });
    setTimeout(() => blocks.forEach(b => b.div.style.backgroundColor = '#3498db'), 1000 + level*200);
}

function clickBlock(block) {
    let b = blocks.find(x => x.div === block);
    if(b.clicked) return;
    b.clicked = true;

    if(b.target){
        block.style.backgroundColor = '#2ecc71';
        score += 10;
    } else {
        block.style.backgroundColor = '#e67e22';
        score -= 5;
    }
    document.getElementById('score').textContent = "分數: " + score;

    if(blocks.filter(x=>x.target && !x.clicked).length === 0){
        level++;
        if(level > 10){
            message.textContent = "遊戲結束！你的總分: " + score;
        } else {
            setTimeout(nextLevel, 1000);
        }
    }
}