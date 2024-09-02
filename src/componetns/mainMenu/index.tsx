import { useNavigate } from 'react-router-dom';

export const MainMenu = () => {
  const navigate = useNavigate();
  
  const AriticleResiterTransition = () => {
    navigate('/articleRegister');
  };

  const ArticleListTransition = () => {
    navigate('/articleList');
  };

  const LoginTransition = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={AriticleResiterTransition}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          記事投稿画面
        </button>
        <button
          onClick={ArticleListTransition}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
        >
          記事一覧画面
        </button>
      </div>
      <div>
        <button
          onClick={LoginTransition}
          className="mt-8 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out"
        >
          ログイン画面へ
        </button>
      </div>
    </>
  );
};
