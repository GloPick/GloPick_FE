import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from '@/pages/test';
import Landing from '@/pages/landing';
import Layout from '@/components/layout/Layout';
import Main from '@/pages/main/Main';
import Recommendation from '@/pages/recommendation';
import MyPage from '@/pages/mypage';
import SimulationSummary from '@/components/mypage/SimulationSummarySection';
import GuestResult from '@/pages/guest/GuestResult';
import Guest from '@/pages/guest/Guest';
import AccessRoute from './AccessRoute';

interface RouterProps {
  children?: ReactNode;
}

export default function Router({ children }: RouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공개 라우트 */}
        <Route index element={<Landing />} />

        {/* 공통 레이아웃 */}
        <Route path="/" element={<Layout />}>
          <Route path="/test" element={<Test />} />
          <Route path="/main" element={<Main />} />

          {/* 비로그인 전용 라우트 */}
          <Route element={<AccessRoute access="guest" />}>
            <Route path="/guest" element={<Guest />} />
            <Route path="/guest/result" element={<GuestResult />} />
          </Route>

          {/* 로그인 전용 라우트 */}
          <Route element={<AccessRoute access="private" />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/recommend/:recommendationId" element={<Recommendation />} />
            <Route path="/simulation/:simulationId" element={<SimulationSummary />} />
          </Route>
        </Route>
      </Routes>
      {children}
    </BrowserRouter>
  );
}
