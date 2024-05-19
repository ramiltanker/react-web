import { Route, Routes } from 'react-router-dom';
import { CreateUserCardPage } from '../pages/CreateUserCardPage';
import { Header } from '../widgets/Header';
import { DynamicPagination } from 'pages/DynamicPagination';
import './styles/main.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route element={<CreateUserCardPage />} path="/create-user-card" />
      </Routes>
      <Routes>
        <Route element={<DynamicPagination />} path="/dynamic-pagination" />
      </Routes>
    </div>
  );
}

export default App;
