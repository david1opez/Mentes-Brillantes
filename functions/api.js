const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const firebase = require("firebase/app");
const Cryptr = require('cryptr');

require("dotenv").config();

//Define the encryption key
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

//SET THE FIREBASE CREDENTIALS WITH .env
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOM,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PRJ_ID,
    storageBucket: process.env.STRG_BKT,
    messagingSenderId: process.env.MSG_SNDR_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MSMT_ID
};

//INITIALIZE FIREBASE APP
if (!firebase.apps.length) {firebase.initializeApp(firebaseConfig);}else {firebase.app();}

//DEFINE REALTIME DATABASE
var db = firebase.database();


//ENVIORMENTAL VARIABLES

//FIREBASE HIDDEN DOCUMENT NAMES
//eg. db.collection(USERS) --> db.collection("GxzFDJc&twexY")
const USERS = process.env.USERS
const VIEWERS = process.env.VIEWERS
const FOREIGNS = process.env.FOREIGNS
const LOCALS = process.env.LOCALS
const PARTICIPANTS = process.env.PARTICIPANTS
const TEAMS = process.env.TEAMS

const TEAM_NAMES = [
  process.env.TEAM1,
  process.env.TEAM2,
  process.env.TEAM3,
  process.env.TEAM4,
  process.env.TEAM5,
  process.env.TEAM6,
  process.env.TEAM7,
  process.env.TEAM8,
  process.env.TEAM9,
  process.env.TEAM10,
  process.env.TEAM11,
]

//CODES USED TO REGISTER IN A TEAM
const CODES = [
    process.env.CODE1,
    process.env.CODE2,
    process.env.CODE3,
    process.env.CODE4,
    process.env.CODE5,
    process.env.CODE6,
    process.env.CODE7,
    process.env.CODE8,
    process.env.CODE9,
    process.env.CODE10,
    process.env.CODE11,
]

//EXPRESS STUFF...
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static("dist"));
app.use("/", router);

module.exports.handler = serverless(app);

//REGISTER ACTIONS
router.post('/321fc4EE-ec01-4562-8f39-93106fAef42e', (req, res) => {
    var data = req.body;

    var action = data.action;
    var username = data.username;
    var email = data.email;
    var uid = data.uid;
    var grade = data.grade;
    var department = data.department;

    //IF THE USER IS NOT FROM SCHOOL
    if(action == "FOREIGN") {
        var userRef = db.ref(`${USERS}/` + VIEWERS);

        //UPLOAD USERS DATA TO THE FOREIGNS DATABASE
        userRef.child(`${FOREIGNS}/${uid}`).set(
            {
              nombre: username,
              correo: email,

              //EVERY USER STARTS WITH 3 VOTES
              votosRestantes: cryptr.encrypt(3), //NUMBERS ARE ENCRYPTED IN ORDER TO PREVENT UNWANTED CHANGES

              //REGISTER EVERY COMPANY THAT THE USER VOTES FOREIGNS
              //AND EACH CALIFICATION THEY GAVE TO IT
              votos: [
                  {
                    empresa: "",
                    calificacion: {
                        logo: cryptr.encrypt(0),
                        eslogan: cryptr.encrypt(0),
                        video: cryptr.encrypt(0),
                        concepto: cryptr.encrypt(0)
                    }
                  },
                  {
                    empresa: "",
                    calificacion: {
                        logo: cryptr.encrypt(0),
                        eslogan: cryptr.encrypt(0),
                        video: cryptr.encrypt(0),
                        concepto: cryptr.encrypt(0)
                    }
                  },
                  {
                    empresa: "",
                    calificacion: {
                        logo: cryptr.encrypt(0),
                        eslogan: cryptr.encrypt(0),
                        video: 0,
                        concepto: cryptr.encrypt(0)
                    }
                  }]
            }
        )
    }

    //IF THE USER IS A STUDENT FROM THE SCHOOL
    if(action == "LOCAL") {
        var userRef = db.ref(`${USERS}/` + VIEWERS);

        //UPLOAD USERS DATA TO THE FOREIGNS DATABASE
        //THIS DOES THE SAME THING AS ABOVE, BUT ADDS THE SECTION AND
        //IF THE USER BELONGS TO HIGHSCHOOL OR MIDDLESCHOOL
        userRef.child(`${LOCALS}/${uid}`).set(
            {
              nombre: username,
              correo: email,
              votosRestantes: cryptr.encrypt(3),
              votos: [
                  {
                    empresa: "",
                    calificacion: {
                        logo: cryptr.encrypt(0),
                        eslogan: cryptr.encrypt(0),
                        video: cryptr.encrypt(0),
                        concepto: cryptr.encrypt(0)
                    }
                  },
                  {
                    empresa: "",
                    calificacion: {
                        logo: cryptr.encrypt(0),
                        eslogan: cryptr.encrypt(0),
                        video: cryptr.encrypt(0),
                        concepto: cryptr.encrypt(0)
                    }
                  },
                  {
                    empresa: "",
                    calificacion: {
                        logo: cryptr.encrypt(0),
                        eslogan: cryptr.encrypt(0),
                        video: 0,
                        concepto: cryptr.encrypt(0)
                    }
                  }
                ],
              seccion: grade,
              departamento: department
            }
        )
    }

    /*TODO: FIX THE PARTICIPANT REGISTER*/
});

//READ USER TYPE (Participant OR Viewer)
router.post('/45b9Rf6a-c83f-44f9-a71e-c8b622Xw4d8e', (req, res) => {
  var data = req.body;

  var uid = data.uid;

  var userType;

  //TRY TO FIND THE USER'S ID IN THE FOREIGNS DATABASE
  //AND SET THE JSON RESPONSE TO THE USERTYPE "foreign"
  try{
    var ref = db.ref(`${USERS}/` + VIEWERS)

    ref.child(`${FOREIGNS}/${uid}`).get().then((snapshot) => {
      if (snapshot.exists()) {
        userType = "foreign"
        res.json({ userType: userType });
      } else {
        console.log("No data available");
      }
    })
  }
  catch{}
  //TRY TO FIND THE USER'S ID IN THE PARTICIPANTS DATABASE
  //AND SET THE JSON RESPONSE TO THE USERTYPE "participant"
  try{
    var ref = db.ref(`${USERS}/` + PARTICIPANTS)

    ref.child(uid).get().then((snapshot) => {
      if (snapshot.exists()) {
        userType = "participant"
        res.json({ userType: userType });
      } else {
        console.log("No data available");
      }
    })
  }
  catch{}

  //TRY TO FIND THE USER'S ID IN THE LOCALS DATABASE
  //AND SET THE JSON RESPONSE TO THE USERTYPE "local"
  try{
    var ref = db.ref(`${USERS}/` + VIEWERS)

    ref.child(`${LOCALS}/${uid}`).get().then((snapshot) => {
      if (snapshot.exists()) {
        userType = "local"
        res.json({ userType: userType });
      } else {
        console.log("No data available");
      }
    })
  }
  catch{}
});

//TODO: MAKE THIS WORK
router.post('/dc5FF86b9-50aa-4a30-b839-1510665d3fa', (req, res) => {
  let logos = [];
  let names = [];

      db.ref(`${TEAMS}/` + TEAM_NAMES[0]).get().then((snapshot) => {
        if (snapshot.exists()) {
    
          logos.push(snapshot.val().Logo);
          names.push(snapshot.val().Name);
    
        } else {
          console.log("No data available");
        }
      })

      console.log(logos)

  res.json({logos: logos, names: names})
})