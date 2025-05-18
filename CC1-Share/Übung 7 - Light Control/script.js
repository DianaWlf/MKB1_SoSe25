//Variablen
let power = true;
let modus = 1;
let helligkeit = 0;

let color;

let holdTime;
let isHeld = false;

let partyInterval = null;

//EventListener
//An-Aus
document.getElementById("power").addEventListener("click", () => {
    if(power){
        power = false;
        color = "rgb(40, 40, 40)";
        document.body.style.backgroundColor = color;
        setTitle();
    } else {
        power = true;
        farbeSetzen();
    }
});
//Rechts
document.getElementById("next").addEventListener("mousedown", () => {
    if(power) {
        startHoldTimer(true);
    }
});
document.getElementById("next").addEventListener("mouseup",  () => {
    cancelHoldTimer(true);
});
//Links
document.getElementById("prev").addEventListener("mousedown", () => {
    if(power) {
        startHoldTimer(false);
    }
});
document.getElementById("prev").addEventListener("mouseup", () => {
    cancelHoldTimer(false);
});

//Funktionen
function farbeSetzen(){
    if(power){

        if(modus === 1){
            stopPartyMode();
            color = "rgb(255, 248, 225)";
        }else if(modus === 2){
            stopPartyMode();
            color = "rgb(221, 200, 255)";
        }else if(modus === 3){
            startPartyMode();
        }
        
        const change = helligkeit < 0 ? -2 : helligkeit;
        const rgb = color.match(/\d+/g).map(Number);
        const newRgb = rgb.map(channel => Math.min(255, Math.max(0, channel + (change * 20))));
        document.body.style.backgroundColor = `rgb(${newRgb.join(',')})`;

    }
    setTitle();
}

function startHoldTimer(next){
    isHeld = false;
    holdTime = setTimeout(() => {
        isHeld = true;
        if(next == true){
            helligkeit = helligkeit < 1 ? helligkeit + 1 : helligkeit;
        } else {
            helligkeit = helligkeit > -1 ? helligkeit - 1 : helligkeit;
        }
        farbeSetzen()
    }, 1000);
}

function cancelHoldTimer(next) {
    clearTimeout(holdTime);
    if(!isHeld && power){
        if(next == true){
            modus = modus < 3 ? modus + 1 : 1;
        } else {
            modus = modus > 1 ? modus - 1 : 3;
        }
        farbeSetzen();
    }
}

function startPartyMode() {
  if (partyInterval) return;
  changecolorRandomly();
}

function changecolorRandomly() {
    color = randomColor();

    const nextChange = Math.random() * 500 + 200;
    partyInterval = setTimeout(changecolorRandomly, nextChange);
    farbeSetzen();
}


function stopPartyMode() {
  clearTimeout(partyInterval);
  partyInterval = null;
}

function setTitle(){
    let title = document.getElementById("title");
    let text = "";

    if(modus === 1){
        text = "Leselicht";
    }else if(modus === 2){
        text = "Yogalicht";
    }else if(modus === 3){
        text = "Partylicht";
    }

    if(helligkeit === -1){
        text += " - Dunkel";
    } else if(helligkeit === 0){
        text += "";
    } else if(helligkeit === 1){
        text += " - Hell";
    }

    if(power == false){
        title.innerHTML = "Licht Aus";
        title.style.color = "rgb(224, 224, 224)";
        return;
    }
    
    title.innerHTML = text;
    title.style.color = "rgb(0, 0, 0)";
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    if(helligkeit === -1){
        r = r > 128 ? r - 128 : r;
        g = g > 128 ? g - 128 : g;
        b = b > 128 ? b - 128 : b;
    }

    if(helligkeit === 0){
        r = r > 192 ? r - 64 : r;
        g = g > 192 ? g - 64 : g;
        b = b > 192 ? b - 64 : b;

        r = r < 64 ? r + 64 : r;
        g = g < 64 ? g + 64 : g;
        b = b < 64 ? b + 64 : b;
    }

    if(helligkeit === 1){
        r = r < 128 ? r + 128 : r;
        g = g < 128 ? g + 128 : g;
        b = b < 128 ? b + 128 : b;
    }

    return `rgb(${r}, ${g}, ${b})`;
}

//Start
farbeSetzen();