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



const getUser = document.getElementById("getUser")

const productCollection = collection(db, "product")
const ProductForm = document.getElementById("productForm")
ProductForm.addEventListener("submit", addproduct)
window.addEventListener("load", getProduct)
window.addEventListener("load", loginUser)
const productParent = document.getElementById("productParent")
function loginUser() {
    if (localStorage.getItem("user") === null) {
        window.location.replace("../index.html")
        return
    }
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            getUser.textContent = `${userData.userName}`;
        }
    }
})

async function getProduct() {
    console.log("getProduct")
    const getProduct = await getDocs(productCollection)
    getProduct.forEach(function (doc) {
        console.log(doc.data())
        const getData = doc.data();
        console.log(getData)
        productParent.innerHTML += `<div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${getData.name}</h5>
            <p class="card-text">${getData.desc}</p>
            <button class="editBtn btn btn-primary">Edit</button>
            <button class="dltBtn btn btn-danger">Delete</button>
        </div>
    </div>
        `
    })

}

async function addproduct(e) {
    e.preventDefault();
    try {
        const productName = e.target.productName.value
        const productDesc = e.target.productDesc.value
        if (!productName || !productDesc) {
            swal("Error" , "Fields Can't be Empty")
            return
        }
        const user = JSON.parse(localStorage.getItem("user"))
        const productObj = {
            name: productName,
            desc: productDesc,
        }
        console.log("Add", productObj)

        await addDoc(productCollection, productObj)
        


    } catch (error) {
        alert(error.message)
    }

}



document.addEventListener('click', function () {
    const editButtons = document.querySelectorAll('.editBtn');
    const deleteButtons = document.querySelectorAll('.dltBtn');
  
    editButtons.forEach(button => {
      button.addEventListener('click', function () {
        const itemText = this.parentNode.querySelector('.card-text');
        const newText = prompt('Edit the item:', itemText.textContent);
        if (newText !== null) {
          itemText.textContent = newText;
        }
      });
    });

    deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
    const listItem = button.parentNode;
    listItem.remove();
  });
});;
});














const logoutBtn = document.querySelector("#logout")
logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("user")
    window.location.replace("../index.html")
})














productParent.innerHTML  = ""