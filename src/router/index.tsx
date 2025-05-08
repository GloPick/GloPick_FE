import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from '@/pages/test';
import Landing from '@/pages/landing';
import Layout from '@/components/layout';
import Main from '@/pages/main';
import Recommendation from '@/pages/recommendation';

interface RouterProps {
  children?: ReactNode;
}

export default function Router({ children }: RouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 layout 적용 */}
        <Route index element={<Landing />} />
        <Route path="/" element={<Layout />}>
          <Route path="/test" element={<Test />} />
          <Route path="/main" element={<Main />} />
          <Route path="/recommend/:id" element={<Recommendation />} />
        </Route>
      </Routes>
      {children}
    </BrowserRouter>
  );
}
