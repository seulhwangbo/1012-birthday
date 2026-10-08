const CONFIG = {
    name: "기연이",
    birthday: "2026-10-12",
    birthDate: "1992-10-12",
    relationshipDate: "2024-06-16",
    firstPlace: "마곡",
    firstPlaceDetail: "우리가 처음 만난 곳",
    naverMapUrl: "https://naver.me/IGJjHmDv",
    letter: `생일 정말 축하해.\n\n우리가 처음 만났던 마곡부터\n지금까지 함께한 모든 순간이\n나한테는 정말 소중해.\n\n좋았던 날도, 웃겼던 날도,\n별것 아닌 것 같았던 순간도\n나중에 돌아보면 전부 우리 이야기더라.\n\n앞으로도 우리만의 지도를\n하나씩 채워가자.\n\n오늘은 누구보다 행복한 하루가 되길.\n생일 축하해. 🤍`,
    memories: [
        {date: "2024.06.1", title: "처음 만난 날", text: "ㅎㅎ."},
        {date: "2024.06.24", title: "첫 데이트", text: "처음이라 더 선명했던 하루."},
        {date: "2024.08.24", title: "우리의 여름", text: "별것 없이도 즐거웠던 날."},
        {date: "2025.03.17", title: "1주년", text: "벌써 1년, 그리고 계속."},
        {date: "2025.08.26", title: "1주년", text: "벌써 1년, 그리고 계속."},
        {date: "2025.10.12", title: "1주년", text: "벌써 1년, 그리고 계속."},
        {date: "2026.08.26", title: "1주년", text: "벌써 1년, 그리고 계속."},
        {date: "2026.10.12", title: "1주년", text: "벌써 1년, 그리고 계속."}
    ]
};
const screen = document.querySelector('#screen'), modal = document.querySelector('#modal'),
    card = document.querySelector('#modalCard');
let route = 'home';

function dateDiff(dateString) {
    const start = new Date(dateString + 'T00:00:00');

    const now = new Date();

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    return Math.floor(
        (today - start) / 86400000
    );
}

function birthdayDiff() {
    const target = new Date(CONFIG.birthday + 'T00:00:00');

    const now = new Date();

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    return Math.round(
        (target - today) / 86400000
    );
}
const musicBtn = document.querySelector('#musicBtn');
const bgMusic = document.querySelector('#bgMusic');

let isPlaying = false;

musicBtn.addEventListener('click', async () => {

    if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;

        musicBtn.classList.remove('playing');
        musicBtn.textContent = '♫';

    } else {

        try {
            await bgMusic.play();

            isPlaying = true;

            musicBtn.classList.add('playing');
            musicBtn.textContent = 'Ⅱ';

        } catch (error) {
            console.log('음악 재생 실패:', error);
        }
    }
});

bgMusic.addEventListener('ended', () => {
    isPlaying = false;
    musicBtn.classList.remove('playing');
    musicBtn.textContent = '♫';
});

const views = {
    home: () => {
        let d = birthdayDiff();
        return `<section class="hero"><div><span class="pill">I'M YOUR OLGAMI</span><div class="eyebrow" style="margin-top:20px">HAPPY BIRTHDAY</div><h1>For<br>${CONFIG.name === 'YOUR PERSON' ? 'You.' : CONFIG.name + '.'}</h1>
        <p><div class="relationship-dday">
            <div class="dday-item">
                <span>기연이가 태어난 지</span>
                <strong>D+${dateDiff(CONFIG.birthDate).toLocaleString()}</strong>
                <small>DAY</small>
            </div>
        
            <div class="dday-divider"></div>
        
            <div class="dday-item">
                <span>우리가 함께한 지</span>
                <strong>D+${dateDiff(CONFIG.relationshipDate).toLocaleString()}</strong>
                <small>DAY</small>
            </div>
        </div>
    </p>
<button class="cta" data-route="story">우리 이야기 보기　→</button></div></section><section class="section">
<div class="count">
    <div>
        <strong>
            ${
            d === 0
                ? 'D-DAY'
                : d > 0
                    ? `D-${d}`
                    : `D+${Math.abs(d)}`
        }
        </strong>

        <small>
            ${
            d === 0
                ? 'HAPPY BIRTHDAY'
                : d > 0
                    ? 'DAYS UNTIL YOUR DAY'
                    : 'DAYS SINCE YOUR DAY'
        }
        </small>
    </div>

    <time>
        ${CONFIG.birthday.replaceAll('-', '.')}<br>
        YOUR BIRTHDAY
    </time>
</div>

</section><section class="section quote"><em>“</em><p>기연앙</p><br>우리 앞으로 싸우지 말자<br>언니가 져줘 ♡</p></section>`
    },
    story: () => `<section class="section"><div class="kicker">OUR STORY</div><h1 class="title">우리의 시간</h1><div class="timeline">${CONFIG.memories.map((m, i) => `<article class="event" data-memory="${i}"><div class="date">${m.date}</div><h3>${m.title}</h3><p class="muted">${m.text}</p></article>`).join('')}</div></section><section class="section"><div class="kicker">MOMENTS</div><h2 class="title">기억하고 싶은 장면</h2><div class="grid">${CONFIG.memories.map((m, i) => `<article class="memory" data-memory="${i}"><span>${m.date}</span><strong>${m.title}</strong></article>`).join('')}</div></section>`,
    map: () => `<section class="section"><div class="kicker">OUR MAP</div><h1 class="title">우리의 시작점</h1><p class="muted">처음 만난 곳을 눌러봐.</p><div ="title">우리의 시간</h1><div class="timeline">${CONFIG.memories.map((m, i) => `<article class="event" data-memory="${i}"><div class="date">${m.date}</div><h3>${m.title}</h3><p class="muted">${m.text}</p></article>`).join('')}</div></section><section class="section"><div class="kicker">MOMENTS</div><h2 class="title">기억하고 싶은 장면</h2><div class="grid">${CONFIG.memories.map((m, i) => `<article class="memory" data-memory="${i}"><span>${m.date}</span><strong>${m.title}</strong></article>`).join('')}</div></section>`,
    map: () => `<section class="section"><div class="kicker">OUR MAP</div><h1 class="title">우리의 시작점</h1><p class="muted">처음 만난 곳을 눌러봐.</p><div class="map"><div class="water"></div><div class="road"></div><div class="pin"></div><div class="label"><b>${CONFIG.firstPlace}</b><span>${CONFIG.firstPlaceDetail}</span></div></div><div class="place"><div class="kicker">01 · FIRST PLACE</div><h3>${CONFIG.firstPlace}</h3><p class="muted">${CONFIG.firstPlaceDetail}. 이곳에서 우리의 이야기가 시작됐어.</p><button class="link" id="naver">네이버 지도에서 보기 ↗</button></div></section>`,
    letter: () => `<section class="section"><div class="kicker"></div><div class="letter"><h1>HAPPY BIRTHDAY.</h1><p>${CONFIG.letter}</p><div class="sign">from. 스리</div></div></section>`
};

function render() {
    document.querySelectorAll('nav button').forEach(x => x.classList.toggle('active', x.dataset.route === route));
    screen.innerHTML = views[route]();
    screen.scrollTop = 0
}

document.addEventListener('click', e => {
    const r = e.target.closest('[data-route]');
    if (r) {
        route = r.dataset.route;
        render();
        return
    }
    const m = e.target.closest('[data-memory]');
    if (m) {
        const x = CONFIG.memories[+m.dataset.memory];
        card.innerHTML = `<div class="close">×</div><div class="kicker">${x.date}</div><h2 style="font:31px Georgia,serif;margin:8px 0">${x.title}</h2><div class="photo">YOUR PHOTO HERE</div><p class="muted" style="font-size:14px">${x.text}</p>`;
        modal.classList.remove('hidden');
        return
    }
    if (e.target.id === 'naver') window.open(CONFIG.naverMapUrl, '_blank');
    if (e.target.classList.contains('backdrop') || e.target.classList.contains('close')) modal.classList.add('hidden');
    if (e.target.id === 'share') {
        navigator.share?.({title: 'For You', text: '내가 준비한 작은 생일 앱이야.', url: location.href})
    }
});
render();
