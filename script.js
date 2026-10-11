// 명언 목록
const quotes = [
    { text: '천 리 길도 한 걸음부터.', author: '노자' },
    { text: '배움에는 왕도가 없다.', author: '유클리드' },
    { text: '오늘 할 수 있는 일을 내일로 미루지 마라.', author: '벤저민 프랭클린' },
    { text: '실패는 성공의 어머니이다.', author: '토머스 에디슨' },
    { text: '아는 것이 힘이다.', author: '프랜시스 베이컨' },
    { text: '나는 생각한다, 고로 존재한다.', author: '르네 데카르트' },
    { text: '행동은 모든 성공의 기본 열쇠이다.', author: '파블로 피카소' }
];

function displayRandomQuote() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote-text').textContent = `"${q.text}"`;
    document.getElementById('quote-author').textContent = `- ${q.author}`;
}

// WMO 날씨 코드 → 한글 설명
function weatherCodeToText(code) {
    if (code === 0) return '☀️ 맑음';
    if (code <= 2) return '🌤️ 구름 조금';
    if (code === 3) return '☁️ 흐림';
    if (code <= 48) return '🌫️ 안개';
    if (code <= 57) return '🌦️ 이슬비';
    if (code <= 67) return '🌧️ 비';
    if (code <= 77) return '❄️ 눈';
    if (code <= 82) return '🌧️ 소나기';
    if (code <= 86) return '🌨️ 눈 소나기';
    return '⛈️ 뇌우';
}

// Open-Meteo OpenAPI로 현재 날씨 조회 (API Key 불필요)
async function fetchWeather(lat, lon, elementId, cityName) {
    const el = document.getElementById(elementId);
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`);
        if (!response.ok) throw new Error('날씨 정보를 가져오는 데 실패했습니다.');
        const data = await response.json();
        const w = data.current_weather;
        el.textContent = `${cityName} ${weatherCodeToText(w.weathercode)} ${w.temperature}°C`;
    } catch (error) {
        el.textContent = `${cityName} 날씨 정보 없음`;
        console.error(error);
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    displayRandomQuote();
    fetchWeather(37.5665, 126.9780, 'weather-seoul', '서울');
    fetchWeather(33.4996, 126.5312, 'weather-jeju', '제주');

    // I'm Feeling Lucky 버튼 이벤트
    document.getElementById('lucky-btn').addEventListener('click', () => {
        window.location.href = "https://www.google.com/doodles";
    });
});
