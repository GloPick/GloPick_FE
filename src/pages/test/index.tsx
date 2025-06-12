import GuestResult from '../guest/GuestResult';

export const guestResultMock = [
  {
    country: '일본',
    job: '데이터 분석가',
    reason: '데이터 분석가 수요가 많고, 한국인 커뮤니티도 잘 형성되어 있습니다.',
  },
  {
    country: '미국',
    job: '프론트엔드 개발자',
    reason: '영어 능력을 갖춘 개발자에게 좋은 기회가 많습니다.',
  },
  {
    country: '캐나다',
    job: 'UX 디자이너',
    reason: '다문화 환경과 디자인 직군의 비자 지원이 용이합니다.',
  },
];

const Test = () => {
  return <GuestResult result={guestResultMock} />;
};
export default Test;
