import { UUID as uuidv4 } from "https://unpkg.com/uuidjs@^5";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"; 
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyDutI34Ecux5V7LNJuB0yI0g2JymgTRskQ",
    authDomain: "port-cf69a.firebaseapp.com",
    databaseURL: "https://port-cf69a-default-rtdb.firebaseio.com",
    projectId: "port-cf69a",
    storageBucket: "port-cf69a.firebasestorage.app",
    messagingSenderId: "14893034949",
    appId: "1:14893034949:web:9ee050dada547ad3082fac"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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
var reff = ref(db, "/count/visits");

onValue(reff, (snapshot) => {
    const visitorCounter = snapshot.val();
    if (visitorCounter != null) {
      $("#visitors").text(visitorCounter);
    }
  }, (error) => {
    console.error("Error reading data: ", error);
  });


// on click, if the user does not have an ID in cookies,
// allow them to add 1 to the visit counter
// do nothing if their ID is in cookies
$(document).ready(function () {

    if (readCookie("id") == null) {
        document.cookie = "id=" + uuidv4.genV4().urn.split(":")[2];
    
        visitorCounter++;

        set(ref(db, "/count"), {
            visits: visitorCounter
        });

        set(ref(db, "/visitors/" + readCookie("id")), {
            visited: true
        });

        reff = ref(db, "/count/visits");

        onValue(reff, (snapshot) => {
            $("#visitors").text(snapshot.val());
        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        });
    }
});