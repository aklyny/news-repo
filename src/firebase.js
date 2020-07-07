import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAZAEn7gT4Jk4chUqepb9vB1MFS5NEy4sw",
    authDomain: "blog-backend-5236b.firebaseapp.com",
    databaseURL: "https://blog-backend-5236b.firebaseio.com",
    projectId: "blog-backend-5236b",
    storageBucket: "blog-backend-5236b.appspot.com",
    messagingSenderId: "389667305684",
    appId: "1:389667305684:web:fd7c9b1b4ad706a6e4a341",
    measurementId: "G-1CQSKDRYFR"
  };

  firebase.initializeApp(firebaseConfig);

  const firebaseDB= firebase.database();
  const firebaseArticle=firebaseDB.ref('articles');
  const firebaseVideos=firebaseDB.ref('videos');
  const firebaseTeams = firebaseDB.ref('teams');

  const firebaseLopper = (snapShot)=>{
        const data = [];
        snapShot.forEach((child)=>{
            data.push({
                ...child.val(),
                id:child.key
            })
        })
        return data;
  }

  export {
      firebaseDB,
      firebase,
      firebaseTeams,
      firebaseVideos,
      firebaseArticle,
      firebaseLopper
  }