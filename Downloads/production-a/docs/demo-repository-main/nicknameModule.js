// Firebase関連のスクリプトをインポート
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

// Firebaseの初期化（Firebaseプロジェクトがすでに初期化されていることが前提）
const auth = getAuth();
const db = getFirestore();

// ユーザーのEメールに基づいてFireStoreのデータを取得する関数
export async function fetchUserDocumentByEmail() {
    return new Promise((resolve, reject) => {
        // Firebase Authでログイン状態を監視
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                // ユーザーがログインしている場合、Eメールを取得
                const email = user.email;
                console.log("ログインしているユーザーのEメール:", email);

                try {
                    // Firestoreのuser_nameコレクションからEメールが一致するドキュメントを取得するクエリを作成
                    const userCollectionRef = collection(db, "user_name");
                    const q = query(userCollectionRef, where("email", "==", email));

                    // クエリを実行して一致するドキュメントを取得
                    const querySnapshot = await getDocs(q);

                    // ドキュメントが存在する場合、最初のドキュメントを返す
                    if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0].data(); // 最初のドキュメントを取得
                        resolve(userDoc);
                    } else {
                        console.log("一致するドキュメントがありません。");
                        resolve(null); // 一致するドキュメントがない場合はnullを返す
                    }
                } catch (error) {
                    console.error("Firestoreからのデータ取得エラー:", error);
                    reject(error); // エラーが発生した場合はrejectする
                }
            } else {
                console.log("ユーザーはログインしていません。");
                resolve(null); // ユーザーがログインしていない場合はnullを返す
            }
        });
    });
}
