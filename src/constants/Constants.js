export const Constants = {
  inputTypes: {
    select: "select",
    input: "input",
    button: "button",
    upload: "upload",
    datePicker: "datePicker",
    label: "label",
  },
  // 주메뉴
  headerMenus: [
    {
      label: "자동차 DB",
      key: "car",
      link: "/car/brand",
    },
    {
      label: "금융견적 DB",
      key: "finance",
      link: "/finance/brand",
    },
    {
      label: "견적 관리",
      key: "estimation",
      link: "/estimation/quotation",
    },
    {
      label: "콘텐츠 관리",
      key: "content",
      link: "/content/content",
    },
    {
      label: "관리자 관리",
      key: "user",
      link: "/user",
    },
  ],
  // 보조메뉴
  siderMenus: [
    // User
    {
      headerMenu: "user",
      label: "내 정보 관리",
      link: "/user/mine/1",
    },
    {
      headerMenu: "user",
      label: "사용자 관리",
      link: "/user/manage",
    },
    {
      headerMenu: "user",
      label: "사용자 권한",
      link: "/user/role",
    },
    // Car
    {
      headerMenu: "car",
      label: "브랜드",
      link: "/car/brand",
    },
    {
      headerMenu: "car",
      label: "모델 그룹",
      link: "/car/group",
    },
    {
      headerMenu: "car",
      label: "모델",
      link: "/car/model",
    },
    {
      headerMenu: "car",
      label: "라인업",
      link: "/car/lineup",
    },
    {
      headerMenu: "car",
      label: "트림",
      link: "/car/trim",
    },
    {
      headerMenu: "car",
      label: "할인/비용",
      link: "/car/discount",
    },
    {
      headerMenu: "car",
      label: "취득세/공세/탁송",
      link: "/car/extra",
    },
    //Estimation
    {
      headerMenu: "estimation",
      label: "견적신청",
      link: "/estimation/quotation",
    },
    {
      headerMenu: "estimation",
      label: "견적 할당",
      link: "/estimation/assignment",
    },
    {
      headerMenu: "estimation",
      label: "견적상담 카운트",
      link: "/estimation/count",
    },
    {
      headerMenu: "estimation",
      label: "견적상담 카운트 설정",
      link: "/estimation/setting",
    },
    //Content
    {
      headerMenu: "content",
      label: "콘텐츠",
      link: "/content/content",
    },
    {
      headerMenu: "content",
      label: "추천 뉴스",
      link: "/content/recommendation",
    },
    {
      headerMenu: "content",
      label: "포토 뉴스",
      link: "/content/photo",
    },
    {
      headerMenu: "content",
      label: "포토 갤러리",
      link: "/content/gallery",
    },
    {
      headerMenu: "content",
      label: "인기 포토",
      link: "/content/popular",
    },
    {
      headerMenu: "content",
      label: "자동차 인기순위",
      link: "/content/carRank",
    },
    {
      headerMenu: "content",
      label: "콘텐츠 인기순위",
      link: "/content/contentRank",
    },
    {
      headerMenu: "content",
      label: "동영상 인기순위",
      link: "/content/movieRank",
    },
    {
      headerMenu: "content",
      label: "매체 PV",
      link: "/content/media",
    },
  ],
  // 사용여부
  availableOptions: [
    {
      label: "사용",
      value: "0",
    },
    {
      label: "미사용",
      value: "1",
    },
  ],
  // 추천뉴스
  isRecommendOptions: [
    {
      label: "예",
      value: "0",
    },
    {
      label: "아니오",
      value: "1",
    },
  ],
  // 수입여부
  incomeOptions: [
    {
      label: "국산",
      value: "0",
    },
    {
      label: "수입",
      value: "1",
    },
  ],
  // 국가
  nationOptions: [
    {
      label: "국산",
      value: "0",
    },
    {
      label: "미국",
      value: "1",
    },
    {
      label: "유럽",
      value: "2",
    },
    {
      label: "일본",
      value: "3",
    },
    {
      label: "중국",
      value: "4",
    },
  ],
  // 신차여부
  isNewOptions: [
    {
      label: "예",
      value: "0",
    },
    {
      label: "아니오",
      value: "1",
    },
  ],
  // 연료
  fuelTypeOptions: [
    {
      label: "휘발유",
      value: "0",
    },
    {
      label: "경유",
      value: "1",
    },
    {
      label: "LPG",
      value: "2",
    },
    {
      label: "전기",
      value: "3",
    },
    {
      label: "휘발유/전기",
      value: "4",
    },
    {
      label: "수소",
      value: "5",
    },
    {
      label: "CNG",
      value: "6",
    },
  ],
  // 변속기
  gearBoxTypeOptions: [
    {
      label: "A/T",
      value: "0",
    },
    {
      label: "M/T",
      value: "1",
    },
  ],
  // 가격단위
  currencyTypeOptions: [
    {
      label: "원",
      value: "0",
    },
    {
      label: "%",
      value: "1",
    },
  ],
  // 날짜형식
  dateTypeOptions: [
    {
      label: "등록일",
      value: "0",
    },
    {
      label: "계약일",
      value: "1",
    },
    {
      label: "출고일",
      value: "2",
    },
  ],
  // 구입방법
  purchaseMethodOptions: [
    {
      label: "리스",
      value: "0",
    },
    {
      label: "렌탈",
      value: "1",
    },
    {
      label: "할부",
      value: "2",
    },
    {
      label: "현금",
      value: "3",
    },
  ],
  // 검색구분
  searchTypeOptions: [
    {
      label: "이름",
      value: "0",
    },
    {
      label: "연락처",
      value: "1",
    },
    {
      label: "차종",
      value: "2",
    },
  ],
  //
  statusOptions: [
    {
      label: "진행",
      value: "0",
    },
    {
      label: "완료",
      value: "1",
    },
  ],
  // 년
  yearOptions: [
    {
      label: new Date().getFullYear() + "년",
      value: new Date().getFullYear(),
    },
  ],
  // 월
  monthOptions: [
    {
      label: "1월",
      value: 1,
    },
    {
      label: "2월",
      value: 2,
    },
    {
      label: "3월",
      value: 3,
    },
    {
      label: "4월",
      value: 4,
    },
    {
      label: "5월",
      value: 5,
    },
    {
      label: "6월",
      value: 6,
    },
    {
      label: "7월",
      value: 7,
    },
    {
      label: "8월",
      value: 8,
    },
    {
      label: "9월",
      value: 9,
    },
    {
      label: "10월",
      value: 10,
    },
    {
      label: "11월",
      value: 11,
    },
    {
      label: "12월",
      value: 12,
    },
  ],
  // 사용자구분
  userTypeOptions: [
    {
      label: "콘텐츠",
      value: "0",
    },
    {
      label: "자동차",
      value: "1",
    },
  ],
  // 사용자팀그룹
  userTeamGroupOptions: [
    {
      label: "1팀",
      value: "0",
    },
    {
      label: "2팀",
      value: "1",
    },
  ],
  // 사용자지점그룹
  userAreaGroupOptions: [
    {
      label: "일산",
      value: "0",
    },
    {
      label: "합정",
      value: "1",
    },
  ],
  //사양
  specificationOptions: [
    {
      label: "파워트레인/성능",
      value: "0",
    },
    {
      label: "엔진/성능",
      value: "1",
    },
    {
      label: "지능형 안전 기술",
      value: "2",
    },
    {
      label: "외관",
      value: "3",
    },
    {
      label: "내장",
      value: "4",
    },
    {
      label: "시트",
      value: "5",
    },
    {
      label: "편의",
      value: "6",
    },
    {
      label: "안전",
      value: "7",
    },
    {
      label: "인포테이먼트",
      value: "8",
    },
    {
      label: "멀티미디어",
      value: "9",
    },
    {
      label: "공조 시스템",
      value: "10",
    },
  ],
};
