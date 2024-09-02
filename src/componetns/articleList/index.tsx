import { useEffect, useState } from 'react';
import {collection, query, orderBy, getDocs, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { Link } from 'react-router-dom';


interface Post {
  id: string;
  title: string;
  text: string;
  email: string;
  postingTime: Timestamp;
}

export const ArticleList = () => {
  //セッション情報取得
  const userEmail = sessionStorage.getItem('useeEmail');
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('postingTime', 'desc'));
    const querySnapshot = await getDocs(q);
    const recipesData = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Post),
    }));
    setPosts(recipesData);
    console.log(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      console.log(e.currentTarget.value);
      await deleteDoc(doc(db, 'posts', e.currentTarget.value));
      alert('投稿が削除されました');
      getPosts();
    } catch (error) {
      alert('削除に失敗しました');
      console.error('削除中にエラーが発生しました:', error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">投稿一覧</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-black-200 mb-7">
          <thead>
            <tr className="bg-slate-400">
              <th className="border px-4 py-2">タイトル</th>
              <th className="border px-4 py-2 min-w-[300px]">投稿内容</th>
              <th className="border px-4 py-2">投稿日</th>
              <th className="border px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr
                key={post.id}
                className={index % 2 === 1 ? 'bg-neutral-300' : ''}
              >
                <td className="border px-4 py-2 min-w-[300px]">{post.title}</td>
                <td className="border px-4 py-2 min-w-[400px]">{post.text}</td>
                <td className="border px-4 py-2">
                  {post.postingTime.toDate().toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 text-right">
                  {userEmail === post.email && (
                    <button
                      onClick={handleDelete}
                      value={post.id}
                      className="text-red-600 hover:text-red-800"
                    >
                      削除
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link
            to="/mainMenu"
            className="text-blue-500 underline hover:text-blue-600"
          >
          メニューへ戻る
          </Link>
      </div>
    </div>
  );
};
