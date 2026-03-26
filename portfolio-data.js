// =============================================================
// 포트폴리오 자산 현황 데이터
// 이 파일을 직접 수정하면 portfolio-tracker.html에 반영됩니다.
// =============================================================

// ---------------------------------------------------------------
// 전체 목표 비중 (%) — 10개 ETF 합계 = 100
// ---------------------------------------------------------------
const GLOBAL_TARGETS = {
    'TIGER 미국배당 다우존스': 20,
    'KODEX 종합채권(AA-이상)': 20,
    'KODEX CD금리액티브': 12,
    'KODEX 미국나스닥100': 11,
    'KODEX 미국S&P500': 11,
    'PLUS 신흥국MSCI(합성H)': 9,
    'ACE KRX금현물': 9,
    'TIGER 차이나항셍테크': 4,
    'KODEX 선진국MSCI World': 3,
    'TIGER 글로벌자원생산기업INDXX(합성H)': 1,
    'TIGER CD금리투자KIS': 0,
    'RISE CD금리액티브': 0,
};

// ---------------------------------------------------------------
// ETF 약칭 (화면 표시용)
// ---------------------------------------------------------------
const ETF_SHORT = {
    'TIGER 미국배당 다우존스': '미국배당',
    'KODEX 종합채권(AA-이상)': '종합채권',
    'KODEX CD금리액티브': 'KODEX CD금리',
    'KODEX 미국나스닥100': '나스닥100',
    'KODEX 미국S&P500': 'S&P500',
    'PLUS 신흥국MSCI(합성H)': 'PLUS신흥국',
    'KODEX MSCI선진국': 'KODEX선진국',
    'ACE KRX금현물': 'KRX금',
    'TIGER 차이나항셍테크': '항셍테크',
    'TIGER 글로벌자원생산기업INDXX(합성H)': '자원생산기업',
    'TIGER CD금리투자KIS': 'TIGER CD금리',
    'RISE CD금리액티브': 'RISE CD금리'
};

// ---------------------------------------------------------------
// 계좌별 구성
//
//   id              : HTML 패널 ID와 일치해야 함
//   label           : 네비게이션 탭에 표시할 계좌명
//   showSafeCol     : 안전/위험 구분 컬럼 표시 여부
//   irpSafetyRequired : IRP 안전자산 30% 의무 적용 여부
//   irpSafetyEtfs   : 안전자산으로 분류할 ETF 목록 (IRP 전용)
//
//   holdings 배열 — 각 항목:
//     etf        : ETF 전체 이름 (GLOBAL_TARGETS/ETF_SHORT 키와 동일)
//     targetPct  : 이 계좌 내 목표 비중 (%)
//     defaultAmt : 현재 보유 금액 (만원) ← 잔액 변경 시 이 값을 수정하세요
//     safe       : 안전자산 여부
// ---------------------------------------------------------------
const ACCOUNTS = [
    {
        id: 'isa',
        label: 'ISA',
        showSafeCol: false,
        irpSafetyRequired: false,
        irpSafetyEtfs: [],
        holdings: [
            {etf: 'TIGER 미국배당 다우존스', targetPct: 40, defaultAmt: 230, defaultCost: 230, safe: false},
            {etf: 'KODEX CD금리액티브', targetPct: 25, defaultAmt: 7205, defaultCost: 7195, safe: true},
            {etf: 'KODEX 종합채권(AA-이상)', targetPct: 20, defaultAmt: 112, defaultCost: 112, safe: true},
            {etf: 'ACE KRX금현물', targetPct: 15, defaultAmt: 114, defaultCost: 114, safe: false}
        ]
    },
    {
        id: 'pension1',
        label: '연금저축1',
        showSafeCol: false,
        irpSafetyRequired: false,
        irpSafetyEtfs: [],
        holdings: [
            {etf: 'KODEX 미국S&P500', targetPct: 50, defaultAmt: 115, defaultCost: 115, safe: false},
            {etf: 'PLUS 신흥국MSCI(합성H)', targetPct: 30, defaultAmt: 68, defaultCost: 68, safe: false},
            {etf: 'TIGER 차이나항셍테크', targetPct: 20, defaultAmt: 45, defaultCost: 46, safe: false},
            {etf: 'TIGER CD금리투자KIS', targetPct: 0, defaultAmt: 2062, defaultCost: 2060, safe: true}
        ]
    },
    {
        id: 'pension2',
        label: '연금저축2',
        showSafeCol: false,
        irpSafetyRequired: false,
        irpSafetyEtfs: [],
        holdings: [
            {etf: 'KODEX 미국S&P500', targetPct: 30, defaultAmt: 74, defaultCost: 74, safe: false},
            {etf: 'TIGER 미국배당 다우존스', targetPct: 15, defaultAmt: 37, defaultCost: 37, safe: false},
            {etf: 'KODEX 종합채권(AA-이상)', targetPct: 20, defaultAmt: 45, defaultCost: 45, safe: true},
            {etf: 'TIGER CD금리투자KIS', targetPct: 5, defaultAmt: 2262, defaultCost: 2260, safe: true},
            {etf: 'ACE KRX금현물', targetPct: 15, defaultAmt: 37, defaultCost: 37, safe: false},
            {etf: 'TIGER 글로벌자원생산기업INDXX(합성H)', targetPct: 15, defaultAmt: 35, defaultCost: 35, safe: false}
        ]
    },
    {
        id: 'irp-retire',
        label: 'IRP 퇴직연금',
        showSafeCol: true,
        irpSafetyRequired: true,
        irpSafetyEtfs: ['KODEX 종합채권(AA-이상)', 'KODEX CD금리액티브'],
        holdings: [
            {etf: 'KODEX 미국나스닥100', targetPct: 50, defaultAmt: 189, defaultCost: 189, safe: false},
            {etf: 'PLUS 신흥국MSCI(합성H)', targetPct: 15, defaultAmt: 56, defaultCost: 56, safe: false},
            {etf: 'TIGER 차이나항셍테크', targetPct: 5, defaultAmt: 18, defaultCost: 19, safe: false},
            {etf: 'KODEX 종합채권(AA-이상)', targetPct: 30, defaultAmt: 112, defaultCost: 112, safe: true},
            {etf: 'KODEX CD금리액티브', targetPct: 0, defaultAmt: 3334, defaultCost: 3331, safe: true}
        ]
    },
    {
        id: 'irp-personal',
        label: 'IRP 개인연금',
        showSafeCol: true,
        irpSafetyRequired: true,
        irpSafetyEtfs: ['KODEX 종합채권(AA-이상)', 'KODEX CD금리액티브'],
        holdings: [
            {etf: 'KODEX MSCI선진국', targetPct: 40, defaultAmt: 44, defaultCost: 44, safe: false},
            {etf: 'PLUS 신흥국MSCI(합성H)', targetPct: 30, defaultAmt: 34, defaultCost: 34, safe: false},
            {etf: 'KODEX 종합채권(AA-이상)', targetPct: 30, defaultAmt: 34, defaultCost: 34, safe: true},
            {etf: 'KODEX CD금리액티브', targetPct: 0, defaultAmt: 323, defaultCost: 323, safe: true},
            {etf: 'TIGER CD금리투자KIS', targetPct: 0, defaultAmt: 304, defaultCost: 303, safe: true},
            {etf: 'RISE CD금리액티브', targetPct: 0, defaultAmt: 393, defaultCost: 392, safe: true},
        ]
    },
];
