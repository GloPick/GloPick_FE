import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from '@/pages/test';
import Layout from '@/components/layout/Layout';
import Main from '@/pages/main/Main';
import MyPage from '@/pages/mypage';
import SimulationSummary from '@/components/mypage/SimulationSummarySection';
import GuestResult from '@/pages/guest/GuestResult';
import Guest from '@/pages/guest/Guest';
import AccessRoute from './AccessRoute';
import InputPage from '@/pages/profile/InputPage';
import CountryRecommendationPage from '@/pages/recommendation/CountryRecommendationPage';
import KakaoCallback from '@/components/auth/KakaoCallback';
import CityRecommendationPage from '@/pages/recommendation/CityRecommendationPage';
import SimulationInputPage from '@/pages/simulation/SimulationInputPage';

interface RouterProps {
  children?: ReactNode;
}

export default function Router({ children }: RouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/" element={<Main />} />
        <Route path="/oauth/kakao" element={<KakaoCallback />} />

        {/* 레이아웃 제외 & 로그인 전용 */}
        <Route element={<AccessRoute access="private" />}>
          <Route path="/profile" element={<InputPage />} />
          <Route path="/countries" element={<CountryRecommendationPage />} />
          <Route path="/cities" element={<CityRecommendationPage />} />
          <Route path="/simulation/input" element={<SimulationInputPage />} />
        </Route>

        {/* 공통 레이아웃 */}
        <Route path="/" element={<Layout />}>
          <Route path="/test" element={<Test />} />

          {/* 비로그인 전용 라우트 */}
          <Route element={<AccessRoute access="guest" />}>
            <Route path="/guest" element={<Guest />} />
            <Route path="/guest/result" element={<GuestResult />} />
          </Route>

          {/* 로그인 전용 라우트 */}
          <Route element={<AccessRoute access="private" />}>
            {/* <Route path="/mypage" element={<MyPage />} /> */}
            {/* <Route path="/simulation/:simulationId" element={<SimulationSummary />} /> */}
          </Route>
        </Route>
      </Routes>
      {children}
    </BrowserRouter>
  );
}
