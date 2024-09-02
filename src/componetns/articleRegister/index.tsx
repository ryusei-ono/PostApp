import { useState } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useNavigate } from 'react-router-dom';

export const ArticleRegister = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const userEmail = sessionStorage.getItem('useeEmail');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const postCollection = collection(db, 'posts');
      const postSnapshot = await getDocs(postCollection);
      const postCount = postSnapshot.size;
      let newPostId = "";
      let maxId = 0;
      
      //ドキュメント名設定
    
      if(postCount < 0){
        newPostId = `post${postCount + 1}`;
      }else{
        postSnapshot.docs.forEach((doc) => {
          const docId = doc.id;
          const match = docId.match(/(\d+)$/);
          if (match) {
            const num = parseInt(match[1], 10);
            if (num > maxId) {
              maxId = num;
            }
          }
        })
        newPostId =`post${maxId + 1}`
      }

      //投稿記事登録処理
      const newPostRef = doc(db, 'posts', newPostId);
      await setDoc(newPostRef, {
        id: newPostId,
        email: userEmail,
        title,
        text,
        postingTime: new Date(),
      });
      alert('登録に成功しました');
    } catch (error) {
      console.log(error);
      alert('登録に失敗しました');
    }
  };

  const LoginTransition = () => {
    navigate('/mainMenu');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mb-6">
        <h2 className="mb-6 font-medium">記事投稿画面</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="記事のタイトルを入力してください"
          required
          className="w-full p-4 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-6">
        <textarea
          name="postContent"
          value={text}
          maxLength={140}
          onChange={(e) => setText(e.target.value)}
          placeholder="投稿したい記事を入力してください"
          required
          className="w-full p-4 h-32 border border-gray-300 rounded-md"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        投稿する
      </button>
      <button
        onClick={LoginTransition}
        className="w-full mt-4 p-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
      >
        メニューに戻る
      </button>
    </div>
  );
};
