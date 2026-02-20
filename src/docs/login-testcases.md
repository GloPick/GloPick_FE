# 🔐 Login Test Cases

## 📌 Test Scope
- Email validation
- Password validation
- Authentication success/failure
- Network error handling
- Duplicate request prevention

---

## 🧪 Test Cases

| ID | Scenario | Input | Expected Result | Severity | Priority |
|----|----------|-------|----------------|----------|----------|
| TC01 | 정상 로그인 | valid email + valid pw | 메인 페이지 이동 | High | P0 |
| TC02 | 비밀번호 불일치 | valid email + wrong pw | 에러 메시지 표시 | Medium | P1 |
| TC03 | 이메일 형식 오류 | invalid email | 형식 오류 안내 | Low | P2 |
| TC04 | 버튼 연타 | 3번 클릭 | API 요청 1회 | High | P0 |
| TC05 | 네트워크 끊김 | offline | 네트워크 오류 메시지 | High | P0 |