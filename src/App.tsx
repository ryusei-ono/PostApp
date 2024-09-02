import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegistrationForm } from './componetns/register/Register';
import { Login } from './componetns/login/Login';
import { MainMenu } from './componetns/mainMenu';
import { ArticleRegister } from './componetns/articleRegister';
import { ArticleList } from './componetns/articleList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/articleRegister" element={<ArticleRegister />} />
        <Route path="/articleList" element={<ArticleList />} />
        <Route path="/mainMenu" element={<MainMenu />} />
        <Route path="/" element={<RegistrationForm />} />{' '}
        {/* デフォルトルート */}
      </Routes>
    </Router>
  );
}

export default App;
