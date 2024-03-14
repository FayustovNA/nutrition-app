import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header/header';
import { MainPage } from './pages/main/main';
import LogIn from './pages/login/login';
import SignUp from './pages/sign-up/sign-up';
import { Settings } from './pages/settings/settings';
import ForgotPassword from './pages/forgot-password/forgot-password';
import ResetPassword from './pages/reset-password/reset-password';
import { Library } from './pages/library/library';


function App() {

  return (
    <>
      <div className={styles.app}>
        <Header />
        <main className={styles.content}>
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/login' element={<LogIn />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/library' element={<Library />}></Route>
            <Route path='/settings' element={<Settings />}></Route>
            <Route path='/forgot-password' element={<ForgotPassword />}></Route>
            <Route path='reset-password' element={<ResetPassword />}></Route>
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App;