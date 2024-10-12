fetch('/docs/demo-repository-main/always.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('always-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error));

function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.defer = true;
    script.onload = callback;  // スクリプトの読み込みが完了したらコールバックを実行
    document.head.appendChild(script);
}

// Firebase関連のスクリプトを動的に読み込む
loadScript("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js", function() {
    loadScript("https://www.gstatic.com/firebasejs/9.6.10/firebase-auth-compat.js", function() {
        loadScript("https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore-compat.js", function() {
            loadScript("../firebaseConfig.js", function() {
                initializeFirebaseAuth(); // 全スクリプトが読み込まれたら実行
            });
        });
    });
});

// Firebase認証の初期化処理
function initializeFirebaseAuth() {
    const auth = firebase.auth();

    auth.onAuthStateChanged(user => {
        const loginButton = document.getElementById('login-button');
        const signupButton = document.getElementById('signup-button');
        const accountName = document.getElementById('account-name');

        if (!accountName ) {
            console.error('必要な要素が見つかりません');
            return;
        }

        if (user) {
            // ログインしている場合、アカウント名を表示
            accountName.innerText = user.displayName ? user.displayName.charAt(0) : user.email.charAt(0);
            accountName.style.display = 'flex';


            // ドロップダウンメニューの表示切替
            accountName.onclick = () => {
                const dropdownMenu = document.getElementById('dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.display = dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '' ? 'block' : 'none';
                }
            };


        }
    });

    // ニックネーム更新処理（ボタンクリックイベントで処理）
    document.getElementById('save-nickname').onclick = function() {
        const nickname = document.getElementById('nickname').value;
        const user = auth.currentUser; // 現在のユーザーを取得

        if (user && nickname) {
            user.updateProfile({
                displayName: nickname
            }).then(() => {
                console.log("ニックネームが更新されました:", nickname);
                document.getElementById('account-name').innerText = nickname.charAt(0); // 表示を更新
                alert("ニックネームが更新されました！");
                const dropdownMenu = document.getElementById('dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.display = 'none'; // メニューを閉じる
                }
            }).catch(error => {
                console.error("ニックネーム更新エラー:", error);
            });
        } else {
            console.log("ユーザーがログインしていないか、ニックネームが空です");
        }
    };
}












// fetch('../../demo-repository-main/always.html')
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById('always-container').innerHTML = data;
//     })
//     .catch(error => console.error('Error loading header:', error));


//     function loadScript(url, callback) {
//         const script = document.createElement('script');
//         script.src = url;
//         script.type = 'text/javascript';
//         script.defer = true;
//         script.onload = callback;  // スクリプトの読み込みが完了したらコールバックを実行
//         document.head.appendChild(script);
//     }
    
//     // Firebase関連のスクリプトを動的に読み込む
//     loadScript("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js", function() {
//         loadScript("https://www.gstatic.com/firebasejs/9.6.10/firebase-auth-compat.js", function() {
//             loadScript("https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore-compat.js", function() {
//                 loadScript("../firebaseConfig.js", function() {
//                     // Firebase スクリプトがすべて読み込まれた後に、ここで Firebase 関連の処理を実行
//                     initializeFirebaseAuth();
//                 });
//             });
//         });
//     });
    
//     //Firebase認証の初期化処理を分離して、スクリプトが完全に読み込まれた後に呼び出す
//     function initializeFirebaseAuth() {
//         // Firebase authenticationの設定
//         firebase.auth().onAuthStateChanged(function(user) {
//             if (user) {
//                 document.getElementById('account-name').innerText = user.displayName ? user.displayName.charAt(0) : user.email.charAt(0);
//                 document.getElementById('account-name').style.display = 'flex';
//             } else {
//                 document.getElementById('account-name').style.display = 'none';
//             }
//         });
    
//         const auth = firebase.auth();
//         auth.onAuthStateChanged(user => {
//             const loginButton = document.getElementById('login-button');
//             const signupButton = document.getElementById('signup-button');
//             const accountName = document.getElementById('account-name');

//             window.onload = () => {
//                 const accountName = document.getElementById('account-name');
//                 if (accountName) {
//                     // 要素が存在する場合のみ処理を続ける
//                     accountName.innerText = user.displayName ? user.displayName.charAt(0) : user.email.charAt(0);
//                 } else {
//                     console.error('Element with id "account-name" is not found.');
//                 }
//             };
            
    
//             if (user) {
//                 accountName.innerText = user.displayName ? user.displayName.charAt(0) : user.email.charAt(0);
//                 accountName.style.display = 'flex';
    
//                 loginButton.innerText = 'ログアウト';
//                 loginButton.onclick = () => {
//                     auth.signOut().then(() => {
//                         console.log('ユーザーはログアウトしました。');
//                         location.reload();
//                     }).catch(error => {
//                         console.error('ログアウトエラー:', error);
//                     });
//                 };
//                 signupButton.style.display = 'none';
    
//                 document.getElementById('account-name').onclick = () => {
//                     const dropdownMenu = document.getElementById('dropdown-menu');
//                     dropdownMenu.style.display = dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '' ? 'block' : 'none';
//                 };
    
//                 const newNickname = document.getElementById('nickname').value;
//                 if (newNickname) {
//                     user.updateProfile({
//                         displayName: newNickname
//                     }).then(() => {
//                         console.log("ニックネームが更新されました:", newNickname);
//                         document.getElementById('account-name').innerText = newNickname.charAt(0);
//                         alert("ニックネームが更新されました！");
//                         document.getElementById('dropdown-menu').style.display = 'none';
//                     }).catch(error => {
//                         console.error("ニックネーム更新エラー:", error);
//                     });
//                 }
    
//             } else {
//                 accountName.style.display = 'none';
//                 loginButton.innerText = 'ログイン';
//                 loginButton.onclick = () => {
//                     location.href = 'login.html';
//                 };
//                 signupButton.innerText = '新規登録';
//                 signupButton.onclick = () => {
//                     location.href = 'signup.html';
//                 };
//             }
//         });
//     }
    