// =============================================================
// 포트폴리오 자산 현황 데이터
// 이 파일을 직접 수정하면 portfolio-tracker.html에 반영됩니다.
// =============================================================
// ---------------------------------------------------------------
// 자산 유형 분류 및 표시 순서 정의
//   type     : 'stock' | 'alt' | 'safe'
//   currency : 환 노출 비중 (합계 1.0)
//              USD · KRW · CNY · INR · GOLD · OTHER_DM
//   전체 포트폴리오 현황 테이블은 이 목록의 순서로 표시됩니다.
// ---------------------------------------------------------------
const ETF_LIST = [
    {name: 'KODEX 미국나스닥100', type: 'stock', currency: {USD: 1.0}},
    {name: 'KODEX 미국S&P500', type: 'stock', currency: {USD: 1.0}},
    {name: 'TIGER 미국배당 다우존스', type: 'stock', currency: {USD: 1.0}},
    {name: 'KODEX MSCI선진국', type: 'stock', currency: {USD: 0.7, OTHER_DM: 0.3}},
    {name: 'PLUS 신흥국MSCI(합성H)', type: 'stock', currency: {KRW: 1.0}},
    {name: 'TIGER 차이나항셍테크', type: 'stock', currency: {CNY: 1.0}},
    {name: 'KODEX 차이나AI테크액티브', type: 'stock', currency: {CNY: 1.0}},
    {name: 'TIGER 인도니프티50', type: 'stock', currency: {INR: 1.0}},
    {name: 'ACE KRX금현물', type: 'alt', currency: {GOLD: 1.0}},
    {name: 'TIGER 글로벌자원생산기업INDXX(합성H)', type: 'alt', currency: {KRW: 1.0}},
    {name: 'KODEX 종합채권(AA-이상)', type: 'safe', currency: {KRW: 1.0}},
    {name: 'KODEX CD금리액티브', type: 'safe', currency: {KRW: 1.0}},
    {name: 'TIGER CD금리투자KIS', type: 'safe', currency: {KRW: 1.0}},
    {name: 'RISE CD금리액티브', type: 'safe', currency: {KRW: 1.0}},
];
// ---------------------------------------------------------------
// 계좌별 구성
//
//   id              : HTML 패널 ID와 일치해야 함
//   label           : 네비게이션 탭에 표시할 계좌명
//   irpSafetyRequired : IRP 안전자산 30% 의무 적용 여부
//
//   holdings 배열 — 각 항목:
//     etf        : ETF 전체 이름
//     targetPct  : 이 계좌 내 목표 비중 (%)
//     purchaseCost : 현재 보유 금액 (만원) ← 잔액 변경 시 이 값을 수정하세요
//     currentCost : 현재 가치 (만원) ← 가격 변동 시 이 값을 수정하세요
//   * 분류(주식/대안/안전)는 ETF_LIST의 type 필드에서 자동으로 읽어옵니다.
// ---------------------------------------------------------------
const ACCOUNTS = [
    {
        id: 'isa',
        label: 'ISA',   // 배당코어
        irpSafetyRequired: false,
        holdings: [
            {etf: 'TIGER 미국배당 다우존스', targetPct: 60, purchaseCost: 460, currentCost: 459},
            {etf: 'KODEX 종합채권(AA-이상)', targetPct: 20, purchaseCost: 224, currentCost: 226},
            {etf: 'KODEX CD금리액티브', targetPct: 20, purchaseCost: 6551, currentCost: 6550},
            {etf: '현금', targetPct: 0, purchaseCost: 467, currentCost: 467},
        ]
    },
    {
        id: 'pension1',
        label: '연금저축1', // 공격적 알파 추구
        irpSafetyRequired: false,
        holdings: [
            {etf: 'KODEX 미국나스닥100', targetPct: 40, purchaseCost: 0, currentCost: 0},
            {etf: 'TIGER 차이나항셍테크', targetPct: 25, purchaseCost: 91, currentCost: 88},
            {etf: 'KODEX 차이나AI테크액티브', targetPct: 10, purchaseCost: 0, currentCost: 0},
            {etf: 'TIGER 인도니프티50', targetPct: 25, purchaseCost: 0, currentCost: 0},
            {etf: 'TIGER CD금리투자KIS', targetPct: 0, purchaseCost: 1825, currentCost: 1828},
            {etf: '현금', targetPct: 0, purchaseCost: 373, currentCost: 373},
        ]
    },
    {
        id: 'pension2',
        label: '연금저축2', // 올웨더
        irpSafetyRequired: false,
        holdings: [
            {etf: 'KODEX 미국S&P500', targetPct: 35, purchaseCost: 148, currentCost: 149},
            {etf: 'TIGER 미국배당 다우존스', targetPct: 15, purchaseCost: 74, currentCost: 74},
            {etf: 'KODEX 종합채권(AA-이상)', targetPct: 20, purchaseCost: 89, currentCost: 90},
            {etf: 'ACE KRX금현물', targetPct: 15, purchaseCost: 73, currentCost: 76},
            {etf: 'TIGER 글로벌자원생산기업INDXX(합성H)', targetPct: 15, purchaseCost: 71, currentCost: 72},
            {etf: 'TIGER CD금리투자KIS', targetPct: 0, purchaseCost: 2020, currentCost: 2023},
            {etf: '현금', targetPct: 0, purchaseCost: 19, currentCost: 19},
        ]
    },
    {
        id: 'irp-retire',
        label: 'IRP 퇴직연금',  // 선진국 베타 추종
        irpSafetyRequired: true,
        holdings: [
            {etf: 'KODEX 미국S&P500', targetPct: 50, purchaseCost: 0, currentCost: 0},
            {etf: 'KODEX MSCI선진국', targetPct: 20, purchaseCost: 0, currentCost: 0},
            {etf: 'KODEX 종합채권(AA-이상)', targetPct: 30, purchaseCost: 224, currentCost: 226},
            {etf: 'KODEX CD금리액티브', targetPct: 0, purchaseCost: 2901, currentCost: 2899},
            {etf: '현금', targetPct: 0, purchaseCost: 652, currentCost: 652},
        ]
    },
    {
        id: 'irp-personal',
        label: 'IRP 개인연금',  // 세계 분산
        irpSafetyRequired: true,
        holdings: [
            {etf: 'KODEX MSCI선진국', targetPct: 40, purchaseCost: 88, currentCost: 90},
            {etf: 'PLUS 신흥국MSCI(합성H)', targetPct: 30, purchaseCost: 68, currentCost: 66},
            {etf: 'KODEX 종합채권(AA-이상)', targetPct: 30, purchaseCost: 67, currentCost: 68},
            {etf: 'KODEX CD금리액티브', targetPct: 0, purchaseCost: 323, currentCost: 322},
            {etf: 'TIGER CD금리투자KIS', targetPct: 0, purchaseCost: 229, currentCost: 229},
            {etf: 'RISE CD금리액티브', targetPct: 0, purchaseCost: 393, currentCost: 393},
            {etf: '현금', targetPct: 0, purchaseCost: 13, currentCost: 13},
        ]
    },
];

// ---------------------------------------------------------------
// 분할매수 설정
//   totalRounds     : 목표 분할매수 총 횟수
//   completedRounds : 현재까지 완료한 회차 수
// ---------------------------------------------------------------
const DCA_CONFIG = {
    totalRounds: 10,
    completedRounds: 1,
};
