import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Test from '@/pages/test';
import Landing from '@/pages/landing';
import Layout from '@/components/layout';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 layout 적용 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/test" element={<Test />} />
          {/* <Route path="/home" element={<Home />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
