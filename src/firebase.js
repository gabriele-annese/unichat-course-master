import firebase from 'firebase/app';
import "firebase/auth";

export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyAEDoHwTR1VtXaegIdwUeWXOOucCQekNtU",
    authDomain: "unichat-467a9.firebaseapp.com",
    projectId: "unichat-467a9",
    storageBucket: "unichat-467a9.appspot.com",
    messagingSenderId: "303820369875",
    appId: "1:303820369875:web:9d154342138ea295c14926"
}).auth();