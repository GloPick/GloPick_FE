import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from '@/pages/test';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
