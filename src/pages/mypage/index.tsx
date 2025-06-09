import UserInfo from '@/components/mypage/UserInfo';

const MyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">마이페이지</h1>

      {/* 사용자 정보 */}
      <section className="mb-6">
        <UserInfo />
      </section>
    </div>
  );
};

export default MyPage;
