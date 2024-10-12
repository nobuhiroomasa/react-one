// Firebase関連のスクリプトを読み込んでいることを前提としています
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Firebaseの初期化を行う場合はfirebaseConfig.jsをインポートする
import '../production-a/docs/firebaseConfig';

// ユーザー情報を取得する関数をエクスポート
export function getUserInfo(callback) {
    const auth = getAuth();

    // Firebaseの認証状態を監視
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // ユーザーがログインしている場合、コールバックにユーザー情報を渡す
            callback({
                displayName: user.displayName,
                email: user.email,
                uid: user.uid
            });
        } else {
            // ログインしていない場合はnullを返す
            callback(null);
        }
    });
}
