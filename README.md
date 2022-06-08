<iframe width="800" height="450" src="https://www.youtube.com/embed/w34KdyQ2BKU?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

# + React Cloud PC

---

### + 소개

이 프로젝트는 JSP 기반의 SKB Cloud PC 사용자 포털을 모델로 React로 재구성한 간단한 프로젝트 입니다.
실제 사용자 포털의 모든 기능이 포함되어 있지는 않으며, React 프로젝트 진행시 구성원들이 참고할 수 있도록 개발되었습니다.
이 프로젝트는 프레임워크나, 템플릿이 아니므로 개발된 취지에 맞게 참고해주시길 바랍니다.

**또한, 이 프로젝트의 사용 된 모든 이미지와 이미지 아이콘은 SK.Broadband의 자산이므로 개인 학습목적 이외 어떠한 목적으로도 재사용 및 배포할수없습니다.
소스를 수정하고 싶다면 fork하여 비공개 저장소로 사용해주시길 당부 드립니다.**

---

### 구현 된 기능

1. 로그인 / 로그아웃
2. 사용자 인증
3. 가상 PC 대시보드
4. 가상 PC 상세 정보
5. 별칭 변경
6. 기간 연장 신청 / 취소
7. 자가 오류 복구
8. 공지사항 조회 / 조건별 검색

- 모든 기술의 사용법은 아래 링크를 참조 하시길 바랍니다.
- 별도로 지원을 해드릴 수 없으므로 양해 부탁 드립니다.

### UI Spec

1. [React v18](https://ko.reactjs.org/)
2. [React Router v6](https://reactrouter.com/)
3. [Redux v8](https://ko.redux.js.org/)
4. [i18n](https://react.i18next.com/)

### UI Design Framework

- [Ant Design framework](https://ant.design/)
- UI의 모든 태그 구조는 Antd 만 사용 합니다.

### Mocking

- [mswjs](https://github.com/mswjs/msw)
- 실제 API를 시뮬레이션 하기 위해 ServiceWorker Mocking을 사용 합니다.

### Database

- [mswjs@data (In-memory database)](https://github.com/mswjs/data)
- 동적인 데이터 적용 여부를 확인하기 위해 In-memory 방식의 데이터베이스를 사용합니다.
- In-Memory 방식의 데이터베이스는 휘발성이므로 페이지 새로고침시 초기 데이터로 복원 됩니다.

### Bundler

- Webpack 5

### Package

- ESLint 및 Prettier 설명은 생략 합니다.
- 모든 소스는 Functional Component를 사용합니다.

```
src
└└ api                    - 모든 연동 인터페이스 및 Factory가 정의 되어 있습니다.
└└ assets                 - 정적 데이터 관리
└└ components             - 공통 컴포넌트 관리
└└ i18n                   - 다국어 (샘플은 한국어만 사용하며, 로그인 페이지만 적용되어 있습니다.)
└└ layouts                - 레이아웃을 관리
└└ mocks                  - Mocking을 위한 설정 입니다. 모든 API 요청과 응답을 가로채어 In-memory 데이터베이스와 연동합니다.
   └└ db                    - DB Table을 생성 및 관리
   └└ handlers              - API 요청을 가로채어 원하는 결과를 얻기위해 DB로 Query하여 Response합니다.
   └└ json                  - 초기 데이터
   - server.js              - Mock start
└└ router                 - React Router를 관리
└└ store                  - Reducer 정의
└└ styles                 - scss 스타일 정의
└└ utils                  - axios 및 기타 유틸리티 관리
└└ views                  - 화면 컴포넌트를 관리
-
- index.js                - App Bootstrap

```

### Dev

- 이 프로젝트는 로컬 개발 환경에서만 사용할 수 있습니다.
- 이 프로젝트는 NodeJS v16.14.2 환경에서 테스트 되었습니다.
- 가급적 최신 브라우저를 사용해주세요.
- 이 프로젝트는 해상도 1920x1080 해상도만 적용되며, 별도로 반응형 레이아웃을 구성하지 않았으므로 크거나 작을 때 UI가 깨질 수 있습니다.

```js
> npm install or yarn install
> npm start or yarn start
```

### Test

- 프로젝트 기동 후 브라우저 DevTool console에서 아래 로그가 출력되면 정상적으로 기동된 것 입니다.

```
[MSW] Mocking enabled.
[MSW] 11:12:21 GET /v1/nauth/system/portals/ui/BBB/public/user (200 OK)
```
