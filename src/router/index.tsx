import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Test from '@/pages/test';
import Landing from '@/pages/landing';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
