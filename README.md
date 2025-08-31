# 📚 프리윌린 과제전형

## 🚀 실행 방법

### 개발 환경 설정

```bash
# node 버전
v22.18.0

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

```

### 환경 변수

```bash
NEXT_PUBLIC_API_URL=https://assignment.mathflat.com/
```

## 🧪 테스트

### 테스트 커버리지

-   **useProblems 훅**: 14개 테스트 케이스
-   **API 호출**: 성공/실패 시나리오
-   **상태 관리**: 모든 액션 함수 테스트
-   **에러 처리**: 예외 상황 처리

### 테스트 실행

```bash
# 전체 테스트
npm test

# 특정 테스트 파일
npm test useProblems.test.tsx

# 테스트 커버리지
npm test -- --coverage
```

## 📋 과제 요구사항 구현

### ✅ 완료된 기능

-   [x] 문제 리스트 조회 및 표시
-   [x] 문제 선택 기능
-   [x] 유사문제 조회 및 표시
-   [x] 유사문제 추가/교체 기능
-   [x] 문제 삭제 기능
-   [x] 성능 최적화 (가상 스크롤링)
-   [x] 에러 처리
-   [x] 반응형 디자인
-   [x] 테스트 코드 작성

## 📁 프로젝트 구조

```
src/
├── components/                  # 컴포넌트
│   ├── common/                  # 공통 컴포넌트
│   │   ├── Image.tsx            # 이미지 컴포넌트 (에러 처리 포함)
│   │   ├── Icon.tsx             # 아이콘 컴포넌트 (자동 타입 생성)
│   │   └── VirtualScroller.tsx  # 가상 스크롤링 컴포넌트
│   │
│   └── workbook/                # 학습지 관련 컴포넌트
│       ├── common/              # workbook 공통 컴포넌트
│       │   ├── ItemContent.tsx  # 문제 아이템 컴포넌트
│       │   └── LevelBadge.tsx   # 문제 레벨 Badge UI 컴포넌트
│       │
│       ├── editDetails/         # 문제 상세 편집
│       │   ├── Layout.tsx       # 편집 레이아웃
│       │   └── Footer.tsx       # 하단 버튼 영역
│       │
│       ├── similarQuestion/     # 유사문제 관련
│       │   └── Layout.tsx       # 유사문제 레이아웃
│       │
│       ├── hooks/               # 커스텀 훅
│       │   ├── useProblems.ts   # 문제 관리 로직
│       │   └── useProblems.test.tsx # 훅 테스트
│       │
│       ├── types/               # 타입 정의
│       │   └── index.ts         # Problem 인터페이스 등
│       │
│       └── Layout.tsx           # 메인 레이아웃
│
├── service/                     # API 서비스
│   └── problems.ts              # 문제 관련 API 함수
│
├── utils/                       # 유틸리티
│   ├── axios-instance.ts        # Axios 인스턴스 (인터셉터 포함)
│   └── cn.ts                    # CSS 클래스 유틸리티
│
├── styles/                      # 스타일
│   └── globals.css              # 전역 스타일
│
└── pages/                       # Next.js 페이지
    ├── _app.tsx                 # 앱 루트
    ├── _document.tsx            # HTML 문서
    └── index.tsx                # 메인 페이지
```

### 🎯 기술적 특징

-   **성능 최적화**: React Query + 가상 스크롤링 (특정갯수 이상일 경우 렌더링 속도개선을 위해 사용했습니다.)
-   **테스트**: Jest + React Testing Library
-   **아키텍처**: 관심사 분리 및 재사용 가능한 컴포넌트

---

**개발자**: [박호연]  
**개발 기간**: [08.30 ~ 08.31]
