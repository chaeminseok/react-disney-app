import "./App.css";
import Nav from "./components/Nav";
import { Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import styled from "styled-components";
const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
};
const Container = styled.main`
  position: relative;
  min-height: calc(100-vh-250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw+5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat;
  }
`;
export default App;
