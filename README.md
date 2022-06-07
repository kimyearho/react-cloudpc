<div align="center">
  <img src="./src/assets/images/sample.jpg">
</div>

---

# + React Sample Project

---

이 프로젝트는 JSP 기반의 SKB Cloud PC 사용자 포털을 모델로 React로 재구성한 간단한 프로젝트 입니다.
실제 사용자 포털의 모든 기능이 포함되어 있지는 않으며, React 프로젝트 진행시 구성원들이 참고할 수 있도록 개발되었습니다.
또한, 이 프로젝트의 사용 된 모든 이미지와 아이콘은 SK.Broadband의 자산이므로 개인 학습목적 이외 어떠한 목적으로도 재사용 및 배포할수없습니다.
소스를 수정하고 싶다면 fork하여 비공개 저장소로 사용해주시길 당부 드립니다.

---

### 구현 된 기능

1. 로그인 / 로그아웃
2. 가상 PC 대시보드
3. 가상 PC 상세 정보
4. 별칭 변경
5. 기간 연장 신청 / 취소
6. 자가 오류 복구
7. 공지사항 조회
8. 공지사항 조건 별 검색

### UI Spec

1. [React v18](https://ko.reactjs.org/)
2. [React Router v6](https://reactrouter.com/)
3. [Redux v8](https://ko.redux.js.org/)
4. i18n

### UI Design Framework

- [Ant Design framework](https://ant.design/)
- UI의 모든 태그 구조는 Antd 만 사용 합니다.

### Mocking

- mswjs
- 실제 API를 시뮬레이션 하기 위해 ServiceWorker Mocking을 사용 합니다.

### Database

- mswjs@data (In-memory database)
- 동적인 데이터 적용 여부를 확인하기 위해 In-memory 방식의 데이터베이스를 사용합니다.
- In-Memory 방식의 데이터베이스는 휘발성이므로 페이지 새로고침시 초기 데이터로 복원 됩니다.

### Bundler

- Webpack 5

### 패키지 구조

- ESLint 및 Prettier 설명은 생략 합니다.

```
src
└└ api                    - 모든 연동 인터페이스 및 Factory가 정의 되어 있습니다.
└└ assets                 - 정적 데이터 관리
└└ components             - 공통 컴포넌트 관리
└└ i18n                   - 다국어 (샘플은 한국어만 사용)
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

### dev

- 이 프로젝트는 로컬 개발 환경에서만 사용할 수 있습니다.
- 이 프로젝트는 NodeJS v16.14.2 환경에서 테스트 되었습니다.
- 이 프로젝트는 해상도 1920x1080 해상도만 적용되며, 별도로 반응형 레이아웃을 구성하지 않았으므로 크거나 작을 때 UI가 깨질 수 있습니다.

```js
> npm install or yarn install
> npm start or yarn start
```

---

### 공통 컴포넌트

- 자세한 설명은 소스내 주석으로 대체 합니다.
- src/components 항목을 참고해주세요.
- 중요한 몇가지만 아래에 작성 합니다.

### Layout

```js
/**
 * @description
 * 사용자 인증 정보 유무 따라 어떤 레이아웃 컴포넌트를 노출할지 결정 합니다.
 * Router의 인증 구현을 참고해주세요.
 *
 * @returns EmptyLayout(빈 레이아웃) / AppLayout(앱 레이아웃)
 */
<Layout></Layout>
```

### ContainerWrapper

```js
/**
 * @description
 * 컨테이너 래퍼 컴포넌트 입니다. slot 형태로 사용합니다.
 * 메인 페이지를 제외한 모든 페이지에서 사용되는 카드형 공통 컨테이너로,
 * Router meta props를 이용하여 컨테이너 알림 메시지나, extra를 사용할 수 있습니다.
 * 전용 컨테이너 props는 아래 정보를 참고 해주세요.
 *
 * @param {...props} {
 *                      loading: true / false   | 컨테이너에 로딩을 표시할지 여부 | (default: false)
 *                      routeMeta: {...props}   | 라우터 props (Vue style)
 *                      height: number          | 컨테이너 높이                  | (default: 700px)
 *                      useSearch: true / false | 검색기능 사용 여부             | (default: false)
 *                      searchType: object      | 검색 옵션
 *                      children: JSX
 *                      callback: function      | child callback
 *                   }
 */
<ContainerWrapper {...props}>{slot}</ContainerWrapper>
```

### CommonWrapperModal

```js
/**
 * @description
 * 팝업 래퍼 컴포넌트 입니다.
 * 기본적으로 폼을 가지는 팝업 컴포넌트로써, slot 형태로 사용할 수 있습니다.
 * modal props를 사용하여 하나의 컴포넌트로 다양한 팝업을 개발 가능 합니다.
 * 전용 props는 아래 정보를 참고 해주세요.
 *
 * @param {...props} {
 *                      isModalVisible: true / false   | 팝업을 표시할지 여부 | (default: false)
 *                      modalData: {object}            | 팝업 Form에 bind될 데이터 모음
 *                      modalOptions: {object}         | 팝업 옵션
 *                      handleOk: function             | 팝업에서 submit 이벤트가 발생시
 *                      handleCancel: function         | 팝업을 닫을 때 사용
 *                      children: JSX
 *                   }
 */
<CommonWrapperModal {...props}>{slot}</CommonWrapperModal>
```

### Breadcrumb

```js
/**
 * @description
 * Router 정보를 이용하여 현재 페이지의 Breadcrumb를 생성 합니다.
 * callback은 Home(집 모양 아이콘)을 클릭했을 때 트리거될 function을 정의합니다.
 *
 * @param {function} callback
 */
<BreadCrumb callback={callback} />
```

---
