// firebaseConfig.js



    // Firebaseの初期化
    const firebaseConfig = {
        apiKey: "AIzaSyBiHjBk7rMiz4Fw7IoLPpFo1FTrQxqy_58",
        authDomain: "acau-3ebcf.firebaseapp.com",
        projectId: "acau-3ebcf",
        storageBucket: "acau-3ebcf.appspot.com",
        messagingSenderId: "407904196633",
    };

    // 初期化
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();





