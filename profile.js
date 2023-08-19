import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { onAuthStateChanged, getAuth } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
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




const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userMObNum = document.getElementById("userMObNum")

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            userName.textContent = `Name: ${userData.userName}`;
            userEmail.textContent = `Email: ${userData.userEmail}`;
            userMObNum.textContent = `Phone Number: ${userData.userMObNum}`;
        }
    }
})




const logoutBtn = document.querySelector("#logout")
logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("user")
    window.location.replace("./index.html")
})