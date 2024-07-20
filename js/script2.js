let discCount=0;
let move=0;
let moveCount=undefined;

let congratulation = document.querySelector('#congratulation');

function towerReset() {
    const towers=document.querySelectorAll('.tower');

    towers.forEach((tower) => {
        tower.childNodes.forEach((disc) => {
            disc.setAttribute('draggable, false');
        });

        if(tower.lastElementChild !== null && complete)
            tower.lastElementChild.setAttribute('draggable', 'true');
    });

    
}

function isSuccess() {
    
}

function dragstart_handler(ev) {
    ev.dataTransfer.setDragImage();
  }

function reset() {
    const towers = document.querySelectorAll('.tower');

    towers.forEach((tower) => {
        tower.innerHTML="";
    });

    move=discCount=0;
    moveLabel=document.getElementById('moveCount');
    moveLabel.textContent=0;
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', this.id);
    this.classList.add("dragging");
    setTimeout(() => {
        this.style.display='none';
    }, 0);
}

function dragEnd(e) {
    this.classList.remove("dragging");
    setTimeout(() => {
        this.style.display='block';
    }, 0);
}


function addDisk() {
    if(discCount>=13) {
        return;
    }
    let towerA=document.getElementById("towerA");
    const disc=document.createElement("div");
    disc.classList.add('disc');

    let width = 150-(discCount*10);

    disc.style.width=width.toString() + 'px';
    
    discCount++;
    towerA.appendChild(disc);

    disc.id='disc'+discCount;
    
    disc.ondragstart=dragStart;
    disc.ondragend=dragEnd;
}

document.addEventListener("DOMContentLoaded", (event) => {
    let towers=document.querySelectorAll('.tower');
    moveLabel=document.getElementById('moveCount');

    let towerA = document.querySelector('#towerA');
    let towerB = document.querySelector('#towerB');
    let towerC = document.querySelector('#towerC');

    moveLabel.textContent=move.toString();
    towers.forEach((tower) => {
        tower.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        tower.addEventListener('drop', (e) => {
            e.preventDefault();
            const id=e.dataTransfer.getData('text');
            console.log(id);
            const disc=document.getElementById(id);

            if (tower.lastElementChild === null || tower.lastElementChild.id < disc.id) {
                tower.appendChild(disc);
                disc.style.display='block';
                move++;
                moveLabel.textContent=move.toString();
            }
            if(towerA.childElementCount===0 && towerB.childElementCount===0 && towerC.childElementCount!==0) {
                congratulation.style.display = "block"
            }
            towerReset();
            isSuccess();
        });
    });
})

