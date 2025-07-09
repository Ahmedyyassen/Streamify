import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NotificationsPage from "./pages/NotificationsPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnBoarding from "./pages/OnBoarding";
import useAuthUser from "./hooks/useAuthUser";
import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";

function App() {
    const {isLoading, authUser} = useAuthUser();
    const {theme} = useThemeStore();

    const isAuthenticated = Boolean(authUser);
    const isOnBoarded = authUser?.isOnboarded;

    if (isLoading) return <PageLoader />
    
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            isAuthenticated && isOnBoarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnBoarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnBoarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnBoarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
            element={
            isAuthenticated && isOnBoarded ? (
                <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnBoarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
/>
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnBoarded ? (
                <OnBoarding />
              ) : (
                <Navigate to={"/"} />
              )
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
      </>
    )
  );
  
  return (
    <div data-theme={theme}>
      <RouterProvider router={router} />
    </div>);
}

export default App;
