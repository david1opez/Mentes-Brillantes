var popupsContainer = document.querySelector(".popups");
var popup = document.querySelector(".registerPopup");
var nameInput = document.querySelector(".registerPopup .name input");
var numberInput = document.querySelector(".registerPopup .numberInput");
var letterInput = document.querySelector(".registerPopup .letterInput");
var checkbox = document.querySelector(".registerPopup .checkbox");
var buttonP = document.querySelector(".p");
var buttonE = document.querySelector(".e");
var codeDiv = document.querySelector(".code");
var codeInput = document.querySelector(".code input");
var accessPopup = document.querySelector(".accessPopup");
var select = document.querySelector("select")

//Show registration popup
document.querySelector(".register").addEventListener("click", () => {
    popupsContainer.style.opacity = 1
    popupsContainer.style.display = "block"
    viewer();
})

//Hide registration popup
document.querySelector(".login").addEventListener("click", () => {hidePopup()})
document.addEventListener("click", (e) => {if(e.target == popupsContainer) {hidePopup()}})

function hidePopup() {
    popupsContainer.style.opacity = 0;
    window.setTimeout(() => {popupsContainer.style.display = "none"}, 300)
}

//If the user is not from the school
checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
        numberInput.type = "text";

        numberInput.value = "X";
        letterInput.value = "X";

        numberInput.style.pointerEvents = "none";
        letterInput.style.pointerEvents = "none";

        numberInput.style.color = "#ff5b46";
        letterInput.style.color = "#ff5b46";
        numberInput.style.fontWeight = "700";
        letterInput.style.fontWeight = "700";
        numberInput.style.background = "rgba(255, 255, 255, 0.7)";
        letterInput.style.background = "rgba(255, 255, 255, 0.7)";
        numberInput.style.borderBottom = "1px solid #000";
        letterInput.style.borderBottom = "1px solid #000";

        select.style.display = "none"
        select.value = "";

        document.querySelector(".p").style.pointerEvents = "none";
        viewer();
    }
    else {
        numberInput.type = "number";
        
        numberInput.value = "";
        letterInput.value = "";

        numberInput.style.pointerEvents = "all";
        letterInput.style.pointerEvents = "all";

        numberInput.style.color = "#000";
        letterInput.style.color = "#000";
        numberInput.style.fontWeight = "400";
        letterInput.style.fontWeight = "400";

        select.style.display = "inline"
        select.value = "secundaria";

        document.querySelector(".p").style.pointerEvents = "all";
    }
});

//Participant or Viewer
var userType;

buttonP.addEventListener("click", () => {participant()});
buttonE.addEventListener("click", () => {viewer()});

function participant() {
    buttonP.focus();

    buttonP.style.color = "#FFC940";
    codeDiv.style.display = "block";

    buttonE.style.color = "#fff";

    userType = "participant"
}

function viewer() {
    buttonE.focus();

    buttonE.style.color = "#FFC940";
    codeDiv.style.display = "none";

    buttonP.style.color = "#fff";

    userType = "viewer"
}

//Submit on enter
nameInput.addEventListener("keyup", (e) => { 
    if(e.keyCode == 13) {
        if(checkbox.checked) {
            submit();
        }
        else{
            e.preventDefault();
            numberInput.focus();
        }
    }
})

numberInput.addEventListener("keyup", (e) => { 
    if(e.keyCode == 13) {
        e.preventDefault();
        letterInput.focus();
    }
})

letterInput.addEventListener("keyup", (e) => {
    if(userType == "viewer"){
        if(e.keyCode == 13) {
            e.preventDefault();
            submit();
        }
    }
    else{
        e.preventDefault();
        codeInput.focus();
    }  
})

codeInput.addEventListener("keyup", (e) => { 
    if(e.keyCode == 13) {
        e.preventDefault();
        submit();
    }
})

// Validate
function validate() {
    var name = nameInput.value;
    var grade = numberInput.value;
    var section = letterInput.value;

    var ok = 3;

    var unsoportedChar;
    var unsuportedChar2;

    var characters = ["0","1","2","3","4","5","6","7","8","9","~","`","!","@","#","$","%","^","&","*","(",")","-","_","+","=","{","[","]","}","|","/",":",";","'","<",">",",",".","?","¿","¡"]

    for(var i = 0; i < characters.length; i++) {
        if(name.includes(characters[i])) {unsoportedChar = true;}
        if(section == characters[i]) {unsuportedChar2 = true;}
    }

    //Check name input
    if(name == "") {
        ok++;
        nameInput.style.background = "#ffd2cc"
        nameInput.style.borderBottom = "2px solid red";
    }
    else if(name.length < 10) {
        ok++;
        errorPopup(0, nameInput);
    }
    else if(unsoportedChar) {
        ok++;
        errorPopup(4, nameInput);
    }
    else{
        ok--;
        noErrorStyles(nameInput);
    }

    //Check grade input
    if(grade == "") {
        ok++;
        numberInput.style.background = "#ffd2cc"
        numberInput.style.borderBottom = "2px solid red";
    }
    else if(grade > 4) {
        ok++;
        errorPopup(1, numberInput);
    }
    else {
        ok--;
        if(!checkbox.checked) {
            noErrorStyles(numberInput);
        }
    }

    //Check section input
    if(section == "") {
        ok++;
        letterInput.style.background = "#ffd2cc"
        letterInput.style.borderBottom = "2px solid red";
    }
    else if(unsuportedChar2) {
        ok++;
        errorPopup(5, letterInput);
    }
    else {
        if(!checkbox.checked) {
            if(section.toUpperCase() == "A" || section.toUpperCase() == "B" || section.toUpperCase() == "C" || section.toUpperCase() == "D" || section.toUpperCase() == "E"){
                ok--
            }
            else{
                ok++;
                errorPopup(2, letterInput);
            }
        }
        else {
            ok--
        }
    }

    //Check code input

    //Errors?
    if(ok > 0) { ok = false; }
    else {ok = true;}

    return ok
}

function errorPopup(messageId, element) {
    var bg = document.querySelector(".errorContainer");
    var popup = document.querySelector(".errorPopup");
    var errorMsg = document.querySelector(".errorPopup h2");
    var errorEmoji = document.querySelector(".errorPopup h3")
    var close = document.querySelector(".errorPopup .fa-times");

    var messages = [
        "Olvidamos decirte, preferímos que utilices tu nombre completo ",
        "Um... Creo que el colegio no tiene hasta ese grado",
        "Lamento decirte que esa sección no existe",
        "El código no coincide con alguno de los equipos",
        "Creo que utilizaste un símbolo algo exótico en tú nombre",
        "Creo que utilizaste un símbolo algo exótico en la sección",
        "???",
        "Parece que esta cuenta ya estaba registrada, prueba iniciando sesión",
        "Wowowow...parece que no estás registrado!"
    ]

    var emojis = ["😅","🤨","😔","🙃","😳","😳"," ","😳","🤨"];

    errorMsg.innerHTML = messages[messageId];
    errorEmoji.innerHTML = emojis[messageId];

    bg.classList.add("showErrorBg");
    popup.classList.add("showError");

    bg.addEventListener("click", (e) => {
        if(e.target == bg || e.target == close) {
            bg.classList.remove("showErrorBg");
            popup.classList.remove("showError");
        }
    })

    try {
        element.style.borderBottom = "2px solid red";
        element.style.color = "red";
        element.style.background = "#ffd2cc";
    } catch (error) {console.log(error);}

    
}

function noErrorStyles(element) {
    element.style.borderBottom = "1px solid #000";
    element.style.color = "#000";
    element.style.background = "#fff";
}