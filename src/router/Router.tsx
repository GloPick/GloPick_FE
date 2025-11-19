import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from '@/pages/test';
import Layout from '@/components/layout/Layout';
import Main from '@/pages/main/Main';
import AccessRoute from './AccessRoute';
import InputPage from '@/pages/profile/InputPage';
import CountryRecommendationPage from '@/pages/recommendation/CountryRecommendationPage';
import KakaoCallback from '@/components/auth/KakaoCallback';
import CityRecommendationPage from '@/pages/recommendation/CityRecommendationPage';
import SimulationInputPage from '@/pages/simulation/SimulationInputPage';
import SimulationResultPage from '@/pages/simulation/SimulationResultPage';
import MyPage from '@/pages/mypage/MyPage';
import GuestInputPage from '@/pages/guest/GuestInputPage';
import GuestResultPage from '@/pages/guest/GuestResultPage';

interface RouterProps {
  children?: ReactNode;
}

export default function Router({ children }: RouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/oauth/kakao" element={<KakaoCallback />} />

        {/* 비로그인 전용 라우트 */}
        <Route element={<AccessRoute access="guest" />}>
          <Route path="/guest" element={<GuestInputPage />} />
          <Route path="/guest/result" element={<GuestResultPage />} />
        </Route>

        {/* 레이아웃 제외 & 로그인 전용 */}
        <Route element={<AccessRoute access="private" />}>
          <Route path="/profile" element={<InputPage />} />
          <Route path="/countries" element={<CountryRecommendationPage />} />
          <Route path="/cities" element={<CityRecommendationPage />} />
          <Route path="/simulation/input" element={<SimulationInputPage />} />
          <Route path="/simulation/result" element={<SimulationResultPage />} />
          <Route path="/simulation/result/:simulationId" element={<SimulationResultPage />} />
        </Route>

        {/* 공통 레이아웃 */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Test />} />

          {/* 로그인 전용 라우트 */}
          <Route element={<AccessRoute access="private" />}>
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Route>
      </Routes>
      {children}
    </BrowserRouter>
  );
}
