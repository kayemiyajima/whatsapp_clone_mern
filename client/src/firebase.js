import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDxZb0FSk7kW8udHcSScOjb5fhHgI2zwDM",
    authDomain: "whatsapp-mern-18ba6.firebaseapp.com",
    databaseURL: "https://whatsapp-mern-18ba6.firebaseio.com",
    projectId: "whatsapp-mern-18ba6",
    storageBucket: "whatsapp-mern-18ba6.appspot.com",
    messagingSenderId: "295830162295",
    appId: "1:295830162295:web:9f22a26fcf79bdf8612f72"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider } ;

