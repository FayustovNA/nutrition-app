import styles from './app.module.css'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/header/header'
import { MainPage } from './pages/main/main'
import LogIn from './pages/login/login'
import SignUp from './pages/sign-up/sign-up'
import { Settings } from './pages/settings/settings'
import ForgotPassword from './pages/forgot-password/forgot-password'
import SetPassword from './pages/set-password/set-password'
import { Library } from './pages/library/library'
import { Сalculators } from './pages/сalculators/сalculators'
import { Stats } from './pages/stats/stats'
import { Clients } from './pages/clients/clients'
import { AdminPanel } from './pages/adminpanel/adminpanel'
import { PrivateRoute } from './protect/private-route'
import { RoleBasedRoute } from './protect/role-based-route'
import { RootState } from './services/root-reducer'
import { useSelector } from './services/hooks'
import { useDispatch } from './services/hooks'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchUserData } from './services/slices/userSlice'
import { useState } from 'react'
import { Loader } from './components/loader/loader'
import UserActivate from './pages/user-activate/user-activate'
// import ResetPasswordActive from './pages/reset-password_active/reset-password_acttive'
import SucessSignup from './pages/sucess-signup/sucess-signup'

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state: RootState) => state.userData.isLoggedIn);
  const isUser = useSelector((state: RootState) => state.userData.role);
  const [isLoading, setIsLoading] = useState(true); // состояние загрузки данных пользователя

  // Проверка на наличие токена при загрузке приложения
  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const currentRoute = location.pathname;
    if (accessToken) {
      // Если токен существует, восстанавливаем данные пользователя
      dispatch(fetchUserData()).finally(() => {
        setIsLoading(false);
      });
      // Сохраняем текущий маршрут для восстановления после перезагрузки
      sessionStorage.setItem('lastRoute', currentRoute);
    } else {
      // Если токен отсутствует направляем на логирование
      if (currentRoute !== '/login') {
        sessionStorage.setItem('lastRoute', currentRoute); // Сохраняем маршрут для восстановления
      }
      setIsLoading(false); // Ставим состояние в false если токен отсутствует
    }
  }, [dispatch, navigate, location]);

  // Пока идет загрузка
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.app}>
        <Header />
        <main className={styles.content}>
          <Routes>
            {/* Общедоступные маршруты */}
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/login' element={<LogIn />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/auth/set_password' element={<SetPassword />}></Route>
            {/* <Route path='/auth/reset_password' element={<ResetPasswordActive />}></Route> */}
            <Route path='/forgot-password' element={<ForgotPassword />}></Route>
            <Route path='/calculators' element={<Сalculators />}></Route>
            <Route path='/auth/activate' element={<UserActivate />}></Route>
            <Route path='/auth/sucess_signup' element={<SucessSignup />} />

            <Route path='/library'
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Library />
                </PrivateRoute>
              }></Route>

            <Route path='/settings'
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Settings />
                </PrivateRoute>
              }></Route>

            <Route path='/stats'
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Stats />
                </PrivateRoute>
              }></Route>

            <Route path='/clients'
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Clients />
                </PrivateRoute>
              }></Route>

            <Route path='/adminpanel'
              element={
                <RoleBasedRoute requiredRole="admin" isUser={isUser}>
                  <AdminPanel />
                </RoleBasedRoute>
              }></Route>

          </Routes>
        </main>
      </div>
    </>
  )
}

export default App;