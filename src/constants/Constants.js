export const Constants = {
    inputTypes: {
        select: "select",
        input: "input",
        button: "button",
        upload: "upload",
        datePicker: "datePicker",
        label: "label"
    },
    headerMenus: [
        {
            label: "자동차 DB",
            key: "car",
            link: "/car/brand"
        },
        {
            label: "금융견적 DB",
            key: "finance",
            link: "/finance/brand"
        },
        {
            label: "견적 관리",
            key: "estimation",
            link: "/estimation/request"
        },
        {
            label: "콘텐츠 관리",
            key: "content",
            link: "/content/content"
        }
    ],
    siderMenus: [
        // User
        {
            headerMenu: "user",
            label: "내 정보 관리",
            link: "/user/mine"
        },
        {
            headerMenu: "user",
            label: "사용자 관리",
            link: "/user/manage"
        },
        {
            headerMenu: "user",
            label: "사용자 권한",
            link: "/user/role"
        },
        // Car
        {
            headerMenu: "car",
            label: "브랜드",
            link: "/car/brand"
        },
        {
            headerMenu: "car",
            label: "모델 그룹",
            link: "/car/group"
        },
        {
            headerMenu: "car",
            label: "모델",
            link: "/car/model"
        },
        {
            headerMenu: "car",
            label: "라인업",
            link: "/car/lineup"
        },
        {
            headerMenu: "car",
            label: "트림",
            link: "/car/trim"
        },
        {
            headerMenu: "car",
            label: "할인/비용",
            link: "/car/discount"
        },
        {
            headerMenu: "car",
            label: "취득세/공세/탁송",
            link: "/car/extra"
        },
        //Estimation
        {
            headerMenu: "estimation",
            label: "견적신청",
            link: "/estimation/request"
        },
        {
            headerMenu: "estimation",
            label: "견적 할당",
            link: "/estimation/assignment"
        },
        {
            headerMenu: "estimation",
            label: "견적상담 카운트",
            link: "/estimation/count"
        },
        {
            headerMenu: "estimation",
            label: "견적상담 카운트 설정",
            link: "/estimation/setting"
        },
        //Content
        {
            headerMenu: "content",
            label: "콘텐츠",
            link: "/content/content"
        },
        {
            headerMenu: "content",
            label: "추천 뉴스",
            link: "/content/recommendation"
        },
        {
            headerMenu: "content",
            label: "포토 뉴스",
            link: "/content/photo"
        },
        {
            headerMenu: "content",
            label: "포토 갤러리",
            link: "/content/gallery"
        },
        {
            headerMenu: "content",
            label: "인기 포토",
            link: "/content/popular"
        },
        {
            headerMenu: "content",
            label: "자동차 인기순위",
            link: "/content/carRank"
        },
        {
            headerMenu: "content",
            label: "콘텐츠 인기순위",
            link: "/content/contentRank"
        },
        {
            headerMenu: "content",
            label: "동영상 인기순위",
            link: "/content/movieRank"
        },
        {
            headerMenu: "content",
            label: "매체 PV",
            link: "/content/media"
        }
    ],
    availableOptions: [
        {
            label: "사용",
            value: '0'
        },
        {
            label: "미사용",
            value: '1'
        }
    ],
    incomeOptions: [
        {
            label: "국산",
            value: '0'
        },
        {
            label: "수입",
            value: '1'
        }
    ],
    nationOptions: [
        {
            label: "국산",
            value: '0'
        },
        {
            label: "미국",
            value: '1'
        },
        {
            label: "유럽",
            value: '2'
        },
        {
            label: "일본",
            value: '3'
        },
        {
            label: "중국",
            value: '4'
        }
    ],
    isNewOptions: [
        {
            label: "예",
            value: '0'
        },
        {
            label: "아니오",
            value: '1'
        }
    ],
    fuelTypeOptions: [
        {
            label: "휘발유",
            value: '0'
        },
        {
            label: "경유",
            value: '1'
        }
    ],
    gearBoxTypeOptions: [
        {
            label: "휘발유",
            value: '0'
        },
        {
            label: "경유",
            value: '1'
        }
    ],
    currencyTypeOptions: [
        {
            label: "원",
            value: '0'
        },
        {
            label: "유로",
            value: '1'
        }
    ]
}