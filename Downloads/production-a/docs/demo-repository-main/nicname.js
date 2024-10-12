// firebaseModule.jsから関数をインポート
import { fetchUserDocumentByEmail } from '/production/demo-repository-main/nicknameModule.js';

// ドキュメントを取得して表示する関数
async function displayUserData() {
    try {
        const userData = await fetchUserDocumentByEmail();
        if (userData) {
            console.log("取得したユーザーデータ:", userData);
            // 取得したユーザー情報をHTMLに表示するなどの処理をここで行う
        } else {
            console.log("ユーザーデータが見つかりませんでした。");
        }
    } catch (error) {
        console.error("データ取得エラー:", error);
    }
}

// 関数を実行してデータを表示
displayUserData();