  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDz5JbOlm_xQNUzvTxm6iBqdNKs-_LwWyE",
    authDomain: "themoviegame-cfc88.firebaseapp.com",
    databaseURL: "https://themoviegame-cfc88.firebaseio.com",
    projectId: "themoviegame-cfc88",
    storageBucket: "themoviegame-cfc88.appspot.com",
    messagingSenderId: "1048965913024",
    appId: "1:1048965913024:web:197326d281c59af26ed025",
    measurementId: "G-8G3VSG85KD"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database();