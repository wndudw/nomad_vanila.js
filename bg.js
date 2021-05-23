const body = document.querySelector("body");

const IMG_NUMBER = 5;


function paintImage(imgNumber){
    const image = new Image();
    //random함수에 0이 결과값으로 올수 있기때문에 0을 막기 위해 +1을 해줌.
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){    
    const randomNumber = genRandom();
    paintImage(randomNumber);
};

init();