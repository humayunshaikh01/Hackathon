// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import { getAuth , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
  import { getFirestore, doc, getDoc} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
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

  const loginBtn = document.getElementById("loginBtn")
loginBtn.addEventListener("click", login)
// console.log(loginBtn)




window.addEventListener("load", function () {
    if (localStorage.getItem("user") !== null) {
        // history.back()
        return
    }
})

async function login(e) {
    try {

        const userEmail = document.getElementById("userEmail").value
        const userPaswrd = document.getElementById("userPaswrd").value
        // console.log(userEmail, userPaswrd)
        const userLogin = await signInWithEmailAndPassword(auth, userEmail, userPaswrd)
        // console.log(userLogin)
        const userRef = doc(db, "users", userLogin.user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
            // console.log("No such document!");
            alert("invalid user")
            return
        }
        // console.log("Document data:", docSnap.data());
        const userData = docSnap.data()
        localStorage.setItem("user", JSON.stringify(userData))
        window.location.assign("./deshboard.html")
    } catch (error) {
        console.log("error", error.message)
        loginBtn.className = "btn btn-danger"
        loginBtn.innerHTML = `Login`
        alert(error.message)
    }
}