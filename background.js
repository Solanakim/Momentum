const body = document.querySelector("body");

const IMG_NUMBER = 6;

/*
function paintImage(imgNumber){
    const image = new Image();
    image.src =`./images/${imgNumber + 1}.jpg`;
    image.classList.add('bgImage');
    body.prepend(image);
}
*/

/* wait until the image is fully loaded */
async function loadImage(imgSrc, imgTag){
    return new Promise((resolve,reject) => {
        imgTag.onload = () => resolve(imgTag);
        imgTag.onerror = reject;
        imgTag.src = imgSrc;
    })
}

async function paintImage(imgNumber){
    const image = new Image();
   await loadImage(`./images/${imgNumber + 1}.jpg`,image);
    image.classList.add('bgImage');
    body.prepend(image);
}

function getRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();