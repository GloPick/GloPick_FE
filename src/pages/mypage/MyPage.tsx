// import { getUserInfo } from '@/api/auth';
// import { deleteResume, editResume, getResume, postResume } from '@/api/resume';
// import Modal from '@/components/layout/Modal';
// import ResumeSection from '@/components/mypage/ResumeSection';
// import UserInfoSection, { UserInfo } from '@/components/mypage/UserInfoSection';
// import Loading from '@/components/shared/Loading';
// import { useAuthStore } from '@/store/authStore';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SimulationSummary from '../../components/mypage/SimulationSummarySection';

// const MyPage = () => {
//   const navigate = useNavigate();

//   const { token } = useAuthStore();

//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//   const [resumes, setResumes] = useState<GetProfileResponseData[]>([]);
//   const [editingResume, setEditingResume] = useState<GetProfileResponseData | null>(null);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // const [simulationList, setSimulationList] = useState<GetSimulationSummaryResponseData[]>([]);
//   // const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
//   // const [showSimulationListModal, setShowSimulationListModal] = useState(false);

//   // 사용자 정보 조회
//   const fetchUserInfo = async () => {
//     if (!token) return;
//     try {
//       const response = await getUserInfo(token);
//       setUserInfo(response.data);
//     } catch (error) {
//       console.error('사용자 정보 조회 실패', error);
//     }
//   };

//   // 이력 목록 조회
//   const fetchResumes = async () => {
//     if (!token) return;
//     try {
//       const res = await getResume(token);
//       if (res.code === 200 && res.data.length > 0) {
//         setResumes(res.data);
//       }
//     } catch (error) {
//       alert('이력 조회 중 오류가 발생했습니다.');
//       console.error('이력 조회 실패', error);
//     }
//   };

//   useEffect(() => {
//     fetchUserInfo();
//     fetchResumes();
//   }, [token]);

//   // 이력 수정
//   const handleClickEdit = (resume: GetProfileResponseData) => {
//     setEditingResume(resume);
//     setShowForm(true);
//   };

//   // 이력 추가
//   const handleAddResume = () => {
//     if (!token) return;

//     setEditingResume(null);
//     setShowForm(true);
//   };

//   // 이력 수정 및 등록
//   const handleSubmitResume = async (formData: PostProfilePayloadData) => {
//     if (!token) return;

//     try {
//       if (editingResume) {
//         // 수정
//         const res = await editResume(editingResume.profileId, formData, token);
//         if (res.code === 200 && res.data) {
//           setResumes((prev) =>
//             prev.map((resume) =>
//               resume.profileId === editingResume.profileId ? { ...resume, ...res.data } : resume,
//             ),
//           );
//           alert('이력이 수정되었습니다.');
//         }
//       } else {
//         // 등록
//         const res = await postResume(formData, token);
//         if (res.code === 201) {
//           alert('이력이 등록되었습니다.');
//           await fetchResumes();
//         }
//       }
//     } catch (error) {
//       alert('저장 중 오류가 발생했습니다.');
//       console.error(error);
//     } finally {
//       setShowForm(false);
//       setEditingResume(null);
//     }
//   };

//   // 이력 삭제
//   const handleDeleteResume = async (profileId: string) => {
//     if (!token) return;
//     const confirmDelete = window.confirm('이력을 삭제하시겠습니까?');
//     if (!confirmDelete) return;

//     try {
//       const res = await deleteResume(profileId, token);
//       if (res.code === 200) {
//         setResumes((prev) => prev.filter((resume) => resume.profileId !== profileId));
//         alert('이력이 삭제되었습니다.');
//       }
//     } catch (error) {
//       alert('이력 삭제 중 오류가 발생했습니다.');
//       console.error(error);
//     }
//   };

//   // 추천 생성
//   const handleGenerateRecommendation = async (profileId: string) => {
//     if (!token) return;

//     try {
//       setLoading(true);
//       const response = await postCountryRecommend(profileId, token);
//       if (response.code === 200) {
//         const recommendationId = response.data.recommendationId;
//         navigate(`/recommend/${recommendationId}`);
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       const resData = error?.response?.data;

//       // 이미 추천받은 이력일 때
//       if (
//         error?.response?.status === 400 &&
//         resData?.message === '이미 추천받은 이력입니다.' &&
//         resData?.data?.recommendationId
//       ) {
//         const existingId = resData.data.recommendationId;
//         alert('이미 추천받은 이력입니다. 해당 페이지로 이동합니다.');
//         navigate(`/recommend/${existingId}`);
//       } else {
//         alert('추천 생성 중 오류가 발생했습니다.');
//         console.error(error);
//       }
//     }
//     setLoading(false);
//   };

//   // 시뮬레이션 요약 리스트
//   // const handleLoadSimulationList = async (profileId: string) => {
//   //   if (!token) return;
//   //   try {
//   //     const res = await getSimulationSummary(token);
//   //     setSimulationList(res.data);
//   //     setSelectedResumeId(profileId);
//   //     setShowSimulationListModal(true);
//   //   } catch (error) {
//   //     alert('시뮬레이션 목록을 불러오는 데 실패했습니다.');
//   //     console.error(error);
//   //   }
//   // };

//   if (!userInfo) return null;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
//       <UserInfoSection data={userInfo} onUpdate={fetchUserInfo} />
//       <ResumeSection
//         resumes={resumes}
//         onEdit={handleClickEdit}
//         onDelete={handleDeleteResume}
//         onRecommend={handleGenerateRecommendation}
//         onAdd={handleAddResume}
//         // onLoadSimulationList={handleLoadSimulationList}
//       />
//       <SimulationSummary />

//       {/* 이력 수정, 등록 모달 */}
//       {showForm && (
//         <Modal
//           onClose={() => {
//             setShowForm(false);
//             setEditingResume(null);
//           }}
//         >
//           <div className="p-4 max-h-[80vh] overflow-y-auto">
//             <ResumeForm
//               initialData={editingResume ?? undefined}
//               onSubmit={handleSubmitResume}
//               onClose={() => {
//                 setShowForm(false);
//                 setEditingResume(null);
//               }}
//             />
//           </div>
//         </Modal>
//       )}

//       {loading && <Loading message="이력 기반으로 추천 국가 생성 중" />}
//     </div>
//   );
// };

// export default MyPage;
