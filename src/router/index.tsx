import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from '@/pages/test';
import Landing from '@/pages/landing';
import Layout from '@/components/layout';
import Main from '@/pages/main';
import Recommendation from '@/pages/recommendation';
import MyPage from '@/pages/mypage';
import SimulationSummary from '@/components/mypage/SimulationSummarySection';
import GuestResult from '@/pages/guest/GuestResult';
import Guest from '@/pages/guest';

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
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="/guest/result" element={<GuestResult />} />
          <Route path="/recommend/:recommendationId" element={<Recommendation />} />
          <Route path="/simulation/:simulationId" element={<SimulationSummary />} />
        </Route>
      </Routes>
      {children}
    </BrowserRouter>
  );
}
