import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ConfirmedPage from './confirmed-page';


export function Router() {
  return (
    <BrowserRouter>
      <Routes>
       
          <Route path="/" element={<ConfirmedPage />} />
      </Routes>
    </BrowserRouter>
  );
}