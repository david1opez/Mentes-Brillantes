//Variables for elements and inputs in the Popup
var nameInput = document.querySelector(".registerPopup .name input");
var numberInput = document.querySelector(".registerPopup .numberInput");
var letterInput = document.querySelector(".registerPopup .letterInput");
var codeInput = document.querySelector(".code input");
var select = document.querySelector("select") //Highscool or middle school input
var checkbox = document.querySelector(".registerPopup .checkbox");

var buttonP = document.querySelector(".p"); //Participant button
var buttonE = document.querySelector(".e"); //Viewer button
var codeDiv = document.querySelector(".code");
var accessPopup = document.querySelector(".accessPopup");
var popupsContainer = document.querySelector(".popups");
var popup = document.querySelector(".registerPopup");

//Add event listener to the register button
document.querySelector(".register").addEventListener("click", () => {
    //Show Regster Popup
    popupsContainer.style.opacity = 1
    popupsContainer.style.display = "block"

    //Set the user type to Viewer by default
    viewer();
})

//If the user clicks the login button close the register Popup
document.querySelector(".login").addEventListener("click", () => {hidePopup()})

//Close the Register Popup when the user clicks outside of it
document.addEventListener("click", (e) => {if(e.target == popupsContainer) {hidePopup()}})

function hidePopup() {
    popupsContainer.style.opacity = 0;
    window.setTimeout(() => {popupsContainer.style.display = "none"}, 300)
}

//If the user is not from the school, block the participant button
//and change the section input style
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

//Check if the user clicks on Participant or Viewer's button
//and set it's user type accordingly
var userType;

//Change the style from the buttons on click
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

//Pass to the next input when the user press enter
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

//Validate input values on submit
function validate() {
    //Get the value from the inputs
    var name = nameInput.value;
    var grade = numberInput.value;
    var section = letterInput.value;

    //This variable is for checking for errors in
    //It passes thru 3 filters, and in each filter it substracts one
    //So at the end if everything its okay, "ok" must be 0
    var ok = 3;
    
    //Variables for checking if an input has weird characters
    var unsoportedChar;
    var unsuportedChar2;

    //Weird characters or numbers that are not allowed to use
    var characters = ["0","1","2","3","4","5","6","7","8","9","~","`","!","@","#","$","%","^","&","*","(",")","-","_","+","=","{","[","]","}","|","/",":",";","'","<",">",",",".","?","¿","¡"]

    //Check if then name or section input has weird characters
    for(var i = 0; i < characters.length; i++) {
        if(name.includes(characters[i])) {unsoportedChar = true;}
        if(section == characters[i]) {unsuportedChar2 = true;}
    }

    //Check if name input is empty
    if(name == "") {
        ok++;
        nameInput.style.background = "#ffd2cc"
        nameInput.style.borderBottom = "2px solid red";
    }
    //Check if the name is too short
    else if(name.length < 15) {
        ok++;
        errorPopup(0, nameInput);
    }
    //Check if name input "unsuportedChar" variable is true
    else if(unsoportedChar) {
        ok++;
        errorPopup(4, nameInput);
    }
    //If everything is okay subtract an error from "ok"
    //And remove error styles if needed
    else{
        ok--;
        noErrorStyles(nameInput);
    }

    //Check if grade input is empty
    if(grade == "") {
        ok++;
        numberInput.style.background = "#ffd2cc"
        numberInput.style.borderBottom = "2px solid red";
    }
    //Check if the grade exists in the school
    /*TODO: ADD CHECK IF THE GRADE IS BETWEEN
      2-4 IF THE USER SELECTED HIGHSCHOOL
      AND 1-3 IF THE USER SELECTED MIDDLESCHOOL*/
    else if(!checkbox.checked && select == "secundaria") {
        if(grade > 3 || grade < 1) {
            ok++;
            errorPopup(1, numberInput);
        }
        console.log("P")
    }
    else if(!checkbox.checked && select == "preparatoria") {
        if(grade != 4 || grade != 2) {
            ok++;
            errorPopup(1, numberInput);
        }
        console.log("S")
    }
    //If everything is okay subtract an error from "ok"
    //And remove error styles if needed
    else {
        ok--;
        if(!checkbox.checked) {
            noErrorStyles(numberInput);
        }
    }

    //Check if section input is empty
    if(section == "") {
        ok++;
        letterInput.style.background = "#ffd2cc"
        letterInput.style.borderBottom = "2px solid red";
    }
    //Check if section input "unsuportedChar" variable is true
    else if(unsuportedChar2) {
        ok++;
        errorPopup(5, letterInput);
    }
    //Check if section is other than A, B, C, D or E
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
        //If everything is okay subtract an error from "ok"
        //And remove error styles if needed
        else {
            ok--
            noErrorStyles(section)
        }
    }

    //Check if there were errors
    if(ok > 0) { ok = false; }
    else {ok = true;}

    return ok
}

function errorPopup(messageId, element) {
    var bg = document.querySelector(".errorContainer");
    var popup = document.querySelector(".errorPopup");
    var errorMsg = document.querySelector(".errorPopup h2");
    var errorEmoji = document.querySelector(".errorPopup h3");
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

    //Show error popup
    bg.classList.add("showErrorBg");
    popup.classList.add("showError");

    //If the user clicks outside the popup or clicks the x, hide the popup
    bg.addEventListener("click", (e) => {
        if(e.target == bg || e.target == close) {
            bg.classList.remove("showErrorBg");
            popup.classList.remove("showError");
        }
    })

    //Put the error styles in the input
    //I put this in a try/catch because somethimes the function
    //gets called without the element argument
    try {
        element.style.borderBottom = "2px solid red";
        element.style.color = "red";
        element.style.background = "#ffd2cc";
    } catch (error) {console.log(error);}

    
}

//Function to put the styles back to normal if an error gets corrected
function noErrorStyles(element) {
    element.style.borderBottom = "1px solid #000";
    element.style.color = "#000";
    element.style.background = "#fff";
}