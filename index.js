const boxes=document.querySelectorAll(".box");
const gameInfo=document.getElementById("game-info");
const newgamebtn=document.getElementById("btn");


let currentPlayer;
let gameGrid;

const winPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


//lets create a funtion to intialise the game
console.log("Out side Init");
function initgame(){

    console.log("In Init funtion");
    
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        //remove green color,initalise box with css properties
        box.classList=`box box${index+1}`; 
    })


    newgamebtn.classList.remove("active");
    console.log("Before current player");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    
    // newgamebtn.classList.remove("active")
    console.log("After current player");

}

initgame();


function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}


function checkGameOver(){
    let answer="";


    winPosition.forEach((position)=>{
        //all three boxes should be non-empty and exactly smae value
            if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!="" || gameGrid[position[2]]!="") && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])  ){
                if(gameGrid[position[0]]==="X"){
                    answer="X";
                }else{
                    answer="O";
                }
                
                //disable pointer
                boxes.forEach((box)=>{
                    box.style.pointerEvents="none"; 
                })

                //now we know who wins X/O
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });


    //if we found winner
    if(answer!=""){
        gameInfo.innerText=`Winner Player -${answer}`;
        newgamebtn.classList.add("active");
        return;
    }


    //if game tie
    let fillcount=0;
    gameGrid.forEach((position)=>{
        if(position!=""){
            fillcount++;
        }
    });

    console.log(fillcount);
    if(fillcount===9){
        gameInfo.innerText=`Game Tied !`;
        newgamebtn.classList.add("active");
    }


};



function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText=currentPlayer;
        console.log("After boxes.innerHTML");
        gameGrid[index]=currentPlayer;
        console.log("After game grid");

        boxes[index].style.pointerEvents="none";

        //swap karo current player ko
        swapTurn();
        //check karo jeet to nahi gaya
        console.log("Call checkGame over");
        checkGameOver();
        console.log("Call checkGame over Done");

    }
}


boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
        console.log("Called handle click");
    })
});

newgamebtn.addEventListener("click",initgame);