import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './store/authSlice';
import { RootState } from './store/store';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import Chatbots from './pages/Chatbots';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        {/* Protected routes wrapper */}
        {isLoggedIn ? (
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Chatbots />} />
            {routes.map((route, index) => {
              const { path, component: Component } = route;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/auth/signin" replace />} />
        )}
      </Routes>
    </>
  );
}

export default App;
