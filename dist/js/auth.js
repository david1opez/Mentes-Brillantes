var provider = new firebase.auth.GoogleAuthProvider();
var user = firebase.auth().currentUser;

document.querySelector(".navbar .login").addEventListener("click", () => {login();})

function submit() {
    if(validate()) {
        register();
        hidePopup();
    }
}

function register() {
    firebase.auth().signInWithPopup(provider).then((result) => {
        if(result.additionalUserInfo.isNewUser == false) {
            popupsContainer.style.opacity = 1
            popupsContainer.style.display = "block"
            errorPopup(7);
            logout();
        }
        else{
            uploadUserData(result.user, result.user.uid);
            showButtons();
        }
    })
}

function logout() {
    firebase.auth().signOut().then(() => {}).catch((error) => {console.log(error)});
    document.querySelector(".navbar .register").style.display = "inline-block"
    document.querySelector(".navbar .login").style.display = "inline-block"
    document.querySelector(".navbar .logout").style.display = "none"
    document.querySelector(".navbar .edit").style.display = "none"
}

async function uploadUserData(user, uid) {
    var users_name = nameInput.value;
    var section = `${numberInput.value}${letterInput.value.toUpperCase()}`;
    var e_mail = user.email;
    var department = select.value;
    var code = codeInput.value.toLowerCase();

    var info;

    //IF THE "No soy estudiante" CHECKBOX IS CHECKED
    //THEN WE REGISTER THE USER AS A FOREIGN
    if(checkbox.checked) {
        info = {
            action: "FOREIGN",
            username: users_name,
            email: e_mail,
            uid: uid,
            grade: "",
            department: ""
        }
    }
    //IF THE USER IS PARTICIPANT
    else if(userType == "participant"){
        info = {
            action: "PARTICIPANT",
            username: users_name,
            email: e_mail,
            uid: uid,
            department: department,
            grade: section,
            code: code
        }
    }
    //IF THE USER IS NOT A PARTICIPANT NOR A FOREIGN
    else{
        info = {
            action: "LOCAL",
            username: users_name,
            email: e_mail,
            uid: uid,
            department: department,
            grade: section,
        }
    }

    //CONFIGURATION FOR THE REQUEST
    var options={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    }

    fetch("/321fc4EE-ec01-4562-8f39-93106fAef42e", options);
}

function login() {
    firebase.auth().signInWithPopup(provider).then((result) => {
        if(result.additionalUserInfo.isNewUser == true) {
            popupsContainer.style.opacity = 1
            popupsContainer.style.display = "block"
            errorPopup(8);

            buttonE.click();
            
            var user = firebase.auth().currentUser;

            user.delete().then(function() {}).catch(function(error) {console.log(error)});
        }
        else{
            showButtons();
        }
    })
}

firebase.auth().onAuthStateChanged(function(u) {
    if (u) {
        user = u;
        showButtons();
    }
});


async function showButtons() {
    var options={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({uid: user.uid})
    }

    const response = await fetch("/45b9Rf6a-c83f-44f9-a71e-c8b622Xw4d8e", options)
    const data = await response.json();
        
        if(data.userType == "participant") {
            document.querySelector(".navbar .register").style.display = "none"
            document.querySelector(".navbar .login").style.display = "none"
            document.querySelector(".navbar .logout").style.display = "inline-block"
            document.querySelector(".navbar .edit").style.display = "inline-block"

            document.querySelector(".navbar .logout").addEventListener("click", logout)
        }
        else{
            document.querySelector(".navbar .register").style.display = "none"
            document.querySelector(".navbar .login").style.display = "none"
            document.querySelector(".navbar .logout").style.display = "inline-block"

            document.querySelector(".navbar .logout").addEventListener("click", logout)
        }
}
