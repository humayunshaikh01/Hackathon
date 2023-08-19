// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSOphcYW8s9m2zSD41HJYhCgfP2jszVQo",
  authDomain: "application-cb6f0.firebaseapp.com",
  projectId: "application-cb6f0",
  storageBucket: "application-cb6f0.appspot.com",
  messagingSenderId: "503698928314",
  appId: "1:503698928314:web:9df65c5bab99d38c0e8883"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


const signupBtn = document.getElementById("signupBtn")
signupBtn.addEventListener("click", signUp)


async function signUp(e) {
        try {
            const userName = document.getElementById("userName").value
            const userMObNum = document.getElementById("userMObNum").value
            const userEmail = document.getElementById("userEmail").value
            const userPaswrd = document.getElementById("userPaswrd").value
            const userRepeatPaswrd = document.getElementById("userRepeatPaswrd").value 
    
            if (!userName || !userMObNum || !userEmail || !userPaswrd || !userRepeatPaswrd) {
                alert("Fields Can't be Empty")
                return
            } 
           
            if (userPaswrd !== userRepeatPaswrd ) {
                alert("Your Password didn't Match")
            }

            const userAuth = await createUserWithEmailAndPassword(auth, userEmail, userPaswrd)
            console.log(userAuth.user.uid)
            const uid = userAuth.user.uid
            const userObj = {
                userName,
                userMObNum,
                userEmail,
                uid,
            }
            const userRef = doc(db, "users", uid);
            const userDB = await setDoc(userRef, userObj);
            window.location.replace ("./index.html")
        } catch (error) {
            console.log("error", error.message)
            alert(error.message)
        }
    
    
    }