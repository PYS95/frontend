// 초기 상태 정의
const initialState = {
    // 그리드에 표시할 초기 데이터
    gridData: [
        {
            id: 1,
            title: '개발자의 삶',
            name: '김철수',
            content: '안녕하세요. 저는 웹 개발자로 일하고 있는 김철수입니다. 오늘은 Vue.js를 사용하여 프로젝트를 진행하고 있습니다. Vue.js는 정말 간편하면서도 강력한 프레임워크인 것 같습니다. 여러분은 어떤 기술을 사용하고 계신가요?',
            comment: 0,
            comments: []
        },
        {
            id: 2,
            title: '여행이야기',
            name: '이영희',
            content: '여름 휴가를 맞아 해외로 여행을 다녀왔어요. 그냥 가볍게 즐기려고 했는데, 예상치 못한 모험이 있었습니다. 고장 난 렌트카, 길을 잃은 일정, 그리고 예약하지 않은 호텔에서의 머무름 등등... 여행 이야기를 공유하고 싶어졌어요.',
            comment: 0,
            comments: []
        },
        {
            id: 3,
            title: '코딩 일기',
            name: '박지원',
            content: '오늘은 어려운 버그를 해결하는 데 성공했습니다. 여러분들도 코딩 중에 어려움을 겪고 있다면 함께 해결해봐요!',
            comment: 0,
            comments: []
        },
        {
            id: 4,
            title: '맛집 탐방',
            name: '김맛있어',
            content: '지난 주말에 다녀온 맛집을 소개합니다. 맛있는 음식과 함께한 시간은 언제나 행복해요. 다들 자신의 맛집 소개해주세요!',
            comment: 0,
            comments: []
        },
        {
            id: 5,
            title: '운동 일지',
            name: '이스트레스아웃',
            content: '스트레스 해소를 위해 매일 조깅을 시작했습니다. 체력 향상과 스트레스 해소에 탁월한 효과가 있어요. 함께 운동하는 동료를 찾습니다!',
            comment: 0,
            comments: []
        },
        {
            id: 6,
            title: '독서 감상',
            name: '김독서',
            content: '최근에 읽은 책 중에서 인상 깊은 구절을 공유합니다. 여러분도 추천 도서가 있다면 나눠주세요!',
            comment: 0,
            comments: []
        },
        {
            id: 7,
            title: '게임 이야기',
            name: '박게이머',
            content: '최근에 플레이한 게임 중에서 재밌었던 게임을 소개합니다. 다같이 이야기 나눠요!',
            comment: 0,
            comments: []
        },
        {
            id: 8,
            title: '음악 감상',
            name: '이음악중독',
            content: '좋아하는 음악을 듣는 것만으로 기분이 좋아지는 이야기를 나눠봐요. 여러분의 플레이리스트도 궁금해요!',
            comment: 0,
            comments: []
        },
        {
            id: 9,
            title: '여름 휴가 계획',
            name: '최휴가',
            content: '올해 여름 휴가 계획을 세우고 있는데, 여러분들은 어떤 계획이 있나요? 함께 이야기 나눠요!',
            comment: 0,
            comments: []
        },
        {
            id: 10,
            title: '취미 공유',
            name: '김취미러',
            content: '저는 주말에 그림 그리기를 즐깁니다. 여러분들의 취미도 궁금해요. 취미를 공유해주세요!',
            comment: 0,
            comments: []
        },
        {
            id: 11,
            title: '휴식의 시간',
            name: '이휴식',
            content: '매주 토요일은 나만의 휴식의 날로 정해놓고 즐기고 있어요. 여러분들은 어떻게 휴식을 취하시나요?',
            comment: 0,
            comments: []
        },
        {
            id: 12,
            title: '공부 습관',
            name: '김공부',
            content: '공부를 하는데 효과적인 방법이 있다면 공유해주세요. 함께 습관을 만들어 나가요!',
            comment: 0,
            comments: []
        },
        {
            id: 13,
            title: '반려동물 이야기',
            name: '박펫러',
            content: '최근에 입양한 강아지와의 즐거운 일상을 공유합니다. 여러분들도 반려동물과의 소소한 이야기를 나눠주세요!',
            comment: 0,
            comments: []
        },
        {
            id: 14,
            title: '가볍게 산책',
            name: '김산책',
            content: '매일 저녁 가볍게 산책하는 것이 즐거운 시간입니다. 산책 이야기를 나눠봐요!',
            comment: 0,
            comments: []
        },
        {
            id: 15,
            title: '주말 드라이브',
            name: '이드라이브',
            content: '주말마다 가족과 함께하는 드라이브는 기분 전환에 딱이에요. 여러분들도 좋아하는 드라이브 코스가 있다면 알려주세요!',
            comment: 0,
            comments: []
        },
        {
            id: 16,
            title: '영화 감상 중',
            name: '김영화',
            content: '요즘 영화를 많이 보는 중입니다. 함께 좋은 영화 추천하고 이야기 나눠요!',
            comment: 0,
            comments: []
        },
        {
            id: 17,
            title: '음악 감상 중',
            name: '이음악',
            content: '좋아하는 음악을 듣는 것을 즐깁니다. 함께 음악 이야기를 나눠요!',
            comment: 0,
            comments: []
        },
        {
            id: 18,
            title: '요리 이야기',
            name: '최요리',
            content: '최근에 시도한 레시피 중에서 맛있게 만든 음식을 소개합니다. 다들 자신의 요리 이야기를 나눠주세요!',
            comment: 0,
            comments: []
        },
        {
            id: 19,
            title: '일상 이야기',
            name: '박일상',
            content: '매일매일의 소소한 일상을 공유하고 싶어졌어요. 여러분들도 나만의 소중한 순간을 나눠주세요!',
            comment: 0,
            comments: []
        },
        {
            id: 20,
            title: '테크 트렌드',
            name: '김테크',
            content: '최근의 테크 트렌드와 관련된 이야기를 나눠봐요. 여러분들은 어떤 기술 동향에 관심이 있나요?',
            comment: 0,
            comments: []
        },
    ],
    // 현재 선택된 그리드 데이터
    currentGridData: null,
};

export default {
    namespaced: true, // 네임스페이스 사용
    state: { ...initialState }, // 상태 초기화
    mutations: {
        // 특정 그리드 데이터를 현재 선택된 그리드 데이터로 설정하는 뮤테이션
        setCurrentGridData(state, gridId) {
            state.currentGridData = state.gridData.find(grid => grid.id === gridId);
        },
        // 댓글 추가 뮤테이션
        addComment(state, { gridId, comment }) {
            const gridIndex = state.gridData.findIndex(grid => grid.id === gridId);

            if (gridIndex !== -1) {
                const grid = state.gridData[gridIndex];
                // comments 배열이 정의되어 있는지 확인하고, 없으면 빈 배열로 초기화
                if (!grid.comments) {
                    grid.comments = [];
                }
                // 댓글을 comments 배열에 추가
                grid.comments.push(comment);
                // 댓글 수 업데이트
                grid.comment = grid.comments.length;
                // currentGridData 업데이트
                state.currentGridData = { ...grid };
                // gridData 배열 업데이트
                state.gridData.splice(gridIndex, 1, grid);
                // 상태를 로컬 스토리지에 저장
                localStorage.setItem('gridModule', JSON.stringify(state));
            }
        },
        // 댓글 삭제 뮤테이션
        deleteComment(state, { gridId, commentId }) {
            const gridIndex = state.gridData.findIndex((grid) => grid.id === gridId);

            if (gridIndex !== -1) {
                const grid = state.gridData[gridIndex];
                const commentIndex = grid.comments.findIndex((comment) => comment.id === commentId);

                if (commentIndex !== -1) {
                    // 댓글 삭제 후 댓글 수 갱신
                    grid.comments.splice(commentIndex, 1);
                    grid.comment = grid.comments.length;

                    // 댓글 삭제 후 currentGridData 업데이트 (현재 페이지에서 바로 확인 가능하도록)
                    state.currentGridData = { ...grid };

                    // 배열의 특정 인덱스에 업데이트된 grid 저장
                    state.gridData.splice(gridIndex, 1, grid);

                    // 상태를 로컬 스토리지에 저장
                    localStorage.setItem('gridModule', JSON.stringify(state));
                }
            }
        },
    },
    actions: {},
};
