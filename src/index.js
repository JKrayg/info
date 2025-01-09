// firebase
import { UUID as uuidv4 } from "https://unpkg.com/uuidjs@^5";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_URL,
    databaseURL: "https://port-cf69a-default-rtdb.firebaseio.com",
    projectId: "port-cf69a",
    storageBucket: "port-cf69a.firebasestorage.app",
    messagingSenderId: "14893034949",
    appId: process.env.APP_ID
};

const app = firebase.initializeApp(firebaseConfig);
var db = app.database();

// read cookie -- from UPENN Coding Bootcamp files
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
}

var visitorCounter = 0;
var ref = db.ref("/count/visits");

// display visit count
ref.on('value', (snapshot) => {
    if (snapshot.val() != null) {
        visitorCounter = snapshot.val();
    }
    $("#visitors").text(snapshot.val());
}, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
});


// on click, if the user does not have an ID in cookies,
// allow them to add 1 to the visit counter
// do nothing if their ID is in cookies
$("#save-visit").on("click", function () {

    if (readCookie("id") == null) {
        document.cookie = "id=" + uuidv4.genV4().urn.split(":")[2];
    
        visitorCounter++;

        db.ref("/count").set({
            visits: visitorCounter
        });

        db.ref("/visitors/" + readCookie("id")).set({
            visited: true
        });

        ref = db.ref("/count/visits");

        ref.on('value', (snapshot) => {
            $("#visitors").text(snapshot.val());
        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        });
    }
});