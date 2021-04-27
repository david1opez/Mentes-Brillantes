const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const firebase = require("firebase/app");
const Cryptr = require('cryptr');

require("dotenv").config();

const app = express();
const router = express.Router();

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOM,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PRJ_ID,
    storageBucket: process.env.STRG_BKT,
    messagingSenderId: process.env.MSG_SNDR_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MSGR_ID
};

//INIT FIREBASE
if (!firebase.apps.length) {firebase.initializeApp(firebaseConfig);}else {firebase.app();}

var db = firebase.database();

//ENVIORMENTAL VARIABLES
const USERS = process.env.USERS
const VIEWERS = process.env.VIEWERS
const FOREIGNS = process.env.FOREIGNS
const LOCALS = process.env.LOCALS
const PARTICIPANTS = process.env.PARTICIPANTS

const CODES = [
    process.env.EQUIPO1,
    process.env.EQUIPO2,
    process.env.EQUIPO3,
    process.env.EQUIPO4,
    process.env.EQUIPO5,
    process.env.EQUIPO6,
    process.env.EQUIPO7,
    process.env.EQUIPO8,
    process.env.EQUIPO9,
    process.env.EQUIPO10,
    process.env.EQUIPO11,
]


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static("dist"));
app.use("/", router);

module.exports.handler = serverless(app);

//REGISTER
router.post('/321fc4EE-ec01-4562-8f39-93106fAef42e', (req, res) => {
    var data = req.body;

    var action = data.action;
    var username = data.username;
    var email = data.email;
    var uid = data.uid;
    var grade = data.grade;
    var department = data.department;

    if(action == "FOREIGN") {
        var userRef = db.ref(`${USERS}/` + VIEWERS);

        userRef.child(`${FOREIGNS}/${uid}`).set(
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
                  }]
            }
        )
    }

    if(action == "LOCAL") {
        var userRef = db.ref(`${USERS}/` + VIEWERS);

        console.log(req)

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
})