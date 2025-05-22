import Loading from '@/components/shared/Loading';
import { useState } from 'react';

const Test = () => {
  const [isLoading, setIsLoading] = useState(true);

  return <>{isLoading && <Loading message="추천 결과 생성 중입니다." />}</>;
};
export default Test;
