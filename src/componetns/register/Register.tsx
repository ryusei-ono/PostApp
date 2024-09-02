import { useForm } from 'react-hook-form';
import { auth, db, storage } from '../../../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
interface FormData {
  username: string;
  email: string;
  password: string;
  profilePic: FileList;
  birthdate: string;
  gender: string;
  agreeTerms: boolean;
}

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const {
        username,
        email,
        password,
        profilePic,
        birthdate,
        gender,
        agreeTerms,
      } = data;
      console.log(data);
      await createUserWithEmailAndPassword(auth, email, password);

      const file = profilePic[0];
      const storageRef = ref(storage, `profile_pics/${file.name}`);
      console.log(storageRef);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'users'), {
        username: username,
        email: email,
        profilePic: downloadURL,
        birthdate: birthdate,
        gender: gender,
        agreedToTerms: agreeTerms,
      });
      alert('登録成功');
    } catch (error) {
      console.error('Error registering user: ', error);
      alert('登録失敗');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">ユーザー登録</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700">ユーザー名</label>
            <input
              type="text"
              {...register('username', { required: 'ユーザー名は必須です' })}
              placeholder="ユーザー名"
              className=" px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="form-error text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">メールアドレス</label>
            <input
              type="email"
              {...register('email', { required: 'メールアドレスは必須です' })}
              placeholder="メールアドレス"
              className=" px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="form-error text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">パスワード</label>
            <input
              type="password"
              {...register('password', { required: 'パスワードは必須です' })}
              placeholder="パスワード"
              className=" px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="form-error text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">プロフィールアイコン</label>
            <input
              type="file"
              {...register('profilePic', {
                required: 'プロフィールアイコンは必須です',
              })}
              className=" text-gray-500"
            />
            {errors.profilePic && (
              <p className="form-error text-red-500">
                {errors.profilePic.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">生年月日</label>
            <input
              type="date"
              {...register('birthdate', { required: '生年月日は必須です' })}
              className=" px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.birthdate && (
              <p className="form-error text-red-500">
                {errors.birthdate.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">性別</label>
            <select
              {...register('gender', { required: '性別は必須です' })}
              className=" px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">性別を選択</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
              <option value="other">その他</option>
            </select>
            {errors.gender && (
              <p className="form-error text-red-500">{errors.gender.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 flex items-center">
              <input
                type="checkbox"
                {...register('agreeTerms', {
                  required: '利用規約に同意する必要があります',
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2">利用規約に同意する</span>

              <a
                href="https://luna-matching.notion.site/a714620bbd8740d1ac98f2326fbd0bbc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline ml-5"
              >
                利用規約はこちら
              </a>
            </label>
            {errors.agreeTerms && (
              <p className="form-error text-red-500 mt-1">
                {errors.agreeTerms.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            登録
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">登録済みの方はこちら</p>
          <Link
            to="/login"
            className="text-blue-500 underline hover:text-blue-600"
          >
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
};
