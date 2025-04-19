import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Test from '@/pages/test';
import Landing from '@/pages/landing';
import Layout from '@/components/layout';
import Main from '@/pages/main';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 layout 적용 */}
        <Route index element={<Landing />} />
        <Route path="/" element={<Layout />}>
          <Route path="/test" element={<Test />} />
          <Route path="/main" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
