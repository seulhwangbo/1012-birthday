const CONFIG = {
    name: "기연이",
    birthday: "2026-10-12",
    birthDate: "1992-10-12",
    relationshipDate: "2024-06-16",

    letter: `생일 정말 축하해.

자신을 발전시키는 소통이란
서로 다른 사람끼리 하는 소통이래
우리는 그런 면에서 생각하면
서로에게 발전적인 관계일 거야

우리의 미래가 어떻게 될지는 모르겠지만
각자 하는 거에 따라 다르다고 생각해
사랑은 어쩔 수 없이 빠진 순간이 아니라
함께 노력하면서 훈련해 나아가는 과정이라 생각해
우리 앞으로 더 열심히 훈련해보자

오늘은 누구보다 행복한 하루가 되길.
생일 축하해. 🤍`,

    memories: [
        {
            date: "2024.06.16",
            title: "처음 만난 날",
            text: "우리의 이야기가 시작된 날."
        },
        {
            date: "2024.06.24",
            title: "첫 데이트",
            text: "처음이라 더 선명했던 하루."
        },
        {
            date: "2024.08.24",
            title: "우리의 여름",
            text: "별것 없이도 즐거웠던 날."
        },
        {
            date: "2025.06.16",
            title: "우리의 1주년",
            text: "함께한 지 1년, 그리고 계속."
        },
        {
            date: "2026.06.16",
            title: "우리의 2주년",
            text: "앞으로도 함께 채워갈 시간."
        },
        {
            date: "2026.10.12",
            title: "기연이의 생일",
            text: "오늘을 오래오래 기억하자. 🤍"
        }
    ]
};

const GIFT_MESSAGES = [
    {
        title: "첫 번째 선물",
        emoji: "🫂",
        name: "허그 이용권",
        description: "나 안아 이용권"
    },
    {
        title: "두 번째 선물",
        emoji: "🙏",
        name: "소원 이용권",
        description: "언제든 원하는 걸 들어드릴게요 ex) 조용히 있기, 혼자 두기"
    },
    {
        title: "마지막 선물",
        emoji: "🎁",
        name: "진짜 선물",
        description: "짜잔! 기연이가 진짜로 받게 될 선물은 바로 얼굴 보고 알려줄게."
    }
];

const openedGifts = [];

const screen = document.querySelector("#screen");
const modal = document.querySelector("#modal");
const card = document.querySelector("#modalCard");
const musicBtn = document.querySelector("#musicBtn");
const bgMusic = document.querySelector("#bgMusic");

let route = "home";
let cameraStream = null;
let photoTaken = false;
let photoMode = "single";
let photoShots = [];
let currentShot = 0;

function dateDiff(dateString) {
    const start = new Date(dateString + "T00:00:00");
    const now = new Date();

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    return Math.floor((today - start) / 86400000);
}

function birthdayDiff() {
    const target = new Date(CONFIG.birthday + "T00:00:00");
    const now = new Date();

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    return Math.round((target - today) / 86400000);
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
        const chars = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return chars[char];
    });
}

function formatDate(dateString) {
    return dateString.replaceAll("-", ".");
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(function (track) {
            track.stop();
        });

        cameraStream = null;
    }
}

function resetPhotoState() {
    stopCamera();
    photoTaken = false;
    photoShots = [];
    currentShot = 0;
}

const views = {
    home: function () {
        const d = birthdayDiff();

        let birthdayLabel = "";
        let birthdayText = "";

        if (d === 0) {
            birthdayLabel = "D-DAY";
            birthdayText = "HAPPY BIRTHDAY";
        } else if (d > 0) {
            birthdayLabel = "D-" + d;
            birthdayText = "DAYS UNTIL YOUR DAY";
        } else {
            birthdayLabel = "D+" + Math.abs(d);
            birthdayText = "DAYS SINCE YOUR DAY";
        }

        return `
        <section class="hero">
            <div>
                <span class="pill">I'M YOUR OLGAMI</span>

                <div class="eyebrow" style="margin-top:20px">
                    HAPPY BIRTHDAY
                </div>

                <h1>For<br>${escapeHTML(CONFIG.name)}.</h1>

                <div class="relationship-dday">
                    <div class="dday-item">
                        <span>${escapeHTML(CONFIG.name)}가 태어난 지</span>
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


                <button class="cta" data-route="photo">
                    생일 기념 사진 찍기 📸
                </button>

            </div>
        </section>

        <section class="section">
            <div class="count">
                <div>
                    <strong>${birthdayLabel}</strong>
                    <small>${birthdayText}</small>
                </div>

                <time>
                    ${formatDate(CONFIG.birthday)}<br>
                    YOUR BIRTHDAY
                </time>
            </div>
        </section>

        <section class="section quote">
            <em>“</em>
            <p>기연앙</p>
            <p>우리 앞으로 싸우지 말자<br>언니가 져줘 ♡</p>
        </section>`;
    },

    story: function () {
        return `
        <section class="section">
            <div class="kicker">OUR STORY</div>
            <h1 class="title">우리의 시간</h1>

            <div class="timeline">
                ${CONFIG.memories.map(function (m, i) {
                    return `
                    <article class="event" data-memory="${i}">
                        <div class="date">${escapeHTML(m.date)}</div>
                        <h3>${escapeHTML(m.title)}</h3>
                        <p class="muted">${escapeHTML(m.text)}</p>
                    </article>`;
                }).join("")}
            </div>
        </section>

        <section class="section">
            <div class="kicker">MOMENTS</div>
            <h2 class="title">기억하고 싶은 장면</h2>

            <div class="grid">
                ${CONFIG.memories.map(function (m, i) {
                    return `
                    <article class="memory" data-memory="${i}">
                        <span>${escapeHTML(m.date)}</span>
                        <strong>${escapeHTML(m.title)}</strong>
                    </article>`;
                }).join("")}
            </div>
        </section>`;
    },

    photo: function () {
        return `
        <section class="section photo-booth">
            <div class="kicker">OUR LITTLE PHOTO BOOTH</div>
            <h1 class="title">오늘의 우리 🤍</h1>
            <p class="muted">
                기연이의 생일을 기념하는 우리만의 사진.
            </p>

            <div class="photo-mode-switch">
                <button class="cta" data-photo-mode="single">
                    한 장 사진
                </button>

                <button class="cta" data-photo-mode="four">
                    네 컷 사진
                </button>
            </div>

            <div class="camera-frame" id="cameraFrame">
                <video id="cameraVideo" autoplay playsinline muted></video>

                <img
                    id="photoPreview"
                    class="photo-preview hidden"
                    alt="생일 기념 사진"
                >

                <div id="cameraMessage" class="camera-message">
                    카메라를 켜고<br>우리 사진을 찍어 봐 🤍
                </div>

                <div class="photo-overlay">
                    <span>HAPPY BIRTHDAY</span>
                    <strong>기연이 ♡</strong>
                </div>
            </div>

            <canvas id="photoCanvas" hidden></canvas>

            <div id="photoStatus" class="muted">
                ${photoMode === "four"
                    ? "네 컷 사진은 총 네 장을 촬영해."
                    : "오늘의 우리를 사진으로 남겨 보자."}
            </div>

            <div class="photo-actions">
                <button class="cta" id="startCamera">
                    카메라 켜기
                </button>

                <button class="cta" id="capturePhoto">
                    찰칵! 📸
                </button>

                <button class="cta" id="retakePhoto">
                    다시 찍기
                </button>

                <button class="cta" id="downloadPhoto">
                    사진 저장하기 ↓
                </button>

                <label class="link upload-label" for="photoUpload">
                    앨범에서 사진 가져오기
                </label>

                <input
                    id="photoUpload"
                    type="file"
                    accept="image/*"
                    hidden
                >
            </div>

            <p class="muted photo-caption">
                내 여자의 순간을 오래오래 기억하자.
            </p>
        </section>`;
    },

    letter: function () {
        return `
        <section class="section">
            <div class="letter">
                <h1>HAPPY BIRTHDAY.</h1>
                <p class="letter-content">${escapeHTML(CONFIG.letter)}</p>
                <div class="sign">from. 스리</div>
            </div>
        </section>`;
    },

    gift: function () {
        return `
        <section class="section gift-page">
            <div class="kicker">JUST FOR YOU</div>
            <h1 class="title">기연이의 선물 상자 🎁</h1>

            <p class="muted">
                세 개의 선물 중 하나씩 열어 봐.<br>
                마지막에는 진짜 선물이 기다리고 있어 ♡
            </p>

            <div class="gift-grid">
                <button class="gift-box" data-gift="0">
                    <span class="gift-emoji">🎁</span>
                    <strong>첫 번째 선물</strong>
                    <small>OPEN ME</small>
                </button>

                <button class="gift-box" data-gift="1">
                    <span class="gift-emoji">🎀</span>
                    <strong>두 번째 선물</strong>
                    <small>OPEN ME</small>
                </button>

                <button class="gift-box" data-gift="2">
                    <span class="gift-emoji">💝</span>
                    <strong>세 번째 선물</strong>
                    <small>OPEN ME</small>
                </button>
            </div>

            <div id="giftResult" class="gift-result">
                <span>🤍</span>
            </div>

            <p id="giftProgress" class="muted">0 / 3 OPENED</p>
        </section>`;
    }
};

function render() {
    stopCamera();

    document.querySelectorAll("nav button").forEach(function (button) {
        button.classList.toggle(
            "active",
            button.dataset.route === route
        );
    });

    screen.innerHTML = views[route]();
    screen.scrollTop = 0;
}

function drawPhotoFrame(ctx, width, height) {
    const stripHeight = Math.max(90, height * 0.16);

    ctx.fillStyle = "#fffaf1";
    ctx.fillRect(0, height - stripHeight, width, stripHeight);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#8b7566";

    ctx.font = "bold " + Math.max(16, width * 0.035) + "px Georgia";
    ctx.fillText(
        "HAPPY BIRTHDAY",
        width / 2,
        height - stripHeight * 0.64
    );

    ctx.font = Math.max(20, width * 0.045) + "px sans-serif";
    ctx.fillText(
        "기연이 ♡",
        width / 2,
        height - stripHeight * 0.25
    );
}

async function startCamera() {
    const video = document.querySelector("#cameraVideo");
    const preview = document.querySelector("#photoPreview");
    const message = document.querySelector("#cameraMessage");
    const status = document.querySelector("#photoStatus");

    if (!video) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        message.classList.remove("hidden");
        message.textContent =
            "현재 환경에서는 카메라를 사용할 수 없어. 앨범에서 사진을 가져와 줧";
        return;
    }

    stopCamera();

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: false
        });

        video.srcObject = cameraStream;
        await video.play();

        video.classList.remove("hidden");
        preview.classList.add("hidden");
        message.classList.add("hidden");

        photoTaken = false;
        photoShots = [];
        currentShot = 0;

        status.textContent = photoMode === "four"
            ? "첫 번째 사진을 찍어 줘! (1/4)"
            : "준비됐어? 하나, 둘, 셋! 📸";
    } catch (error) {
        message.classList.remove("hidden");
        message.textContent =
            "카메라 권한을 확인하거나 앨범에서 사진을 가져와 줘 🤍";

        status.textContent = "카메라를 열지 못했어.";
        console.error("카메라 실행 실패:", error);
    }
}

function getCanvasPhoto() {
    const video = document.querySelector("#cameraVideo");
    const canvas = document.querySelector("#photoCanvas");

    if (!video || !video.videoWidth) {
        return null;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    return canvas;
}

function capturePhoto() {
    const canvas = getCanvasPhoto();

    if (!canvas) {
        alert("먼저 카메라를 켜 줘! 🤍");
        return;
    }

    if (photoMode === "four") {
        photoShots.push(canvas.toDataURL("image/jpeg", 0.95));
        currentShot = photoShots.length;

        const status = document.querySelector("#photoStatus");

        if (currentShot < 4) {
            status.textContent =
                currentShot + " / 4장 촬영 완료! 다음 사진도 찰칵 📸";
            return;
        }

        createFourCut();
        return;
    }

    drawPhotoFrame(
        canvas.getContext("2d"),
        canvas.width,
        canvas.height
    );

    photoTaken = true;
    showPreview(canvas);
}

function createFourCut() {
    const canvas = document.querySelector("#photoCanvas");
    const ctx = canvas.getContext("2d");

    const shots = photoShots.slice(0, 4).map(function (src) {
        return new Promise(function (resolve, reject) {
            const img = new Image();

            img.onload = function () {
                resolve(img);
            };

            img.onerror = reject;
            img.src = src;
        });
    });

    Promise.all(shots).then(function (images) {
        const width = 600;
        const height = 1200;
        const padding = 24;
        const gap = 12;
        const footer = 120;
        const shotHeight = (height - padding * 2 - footer - gap * 3) / 4;

        canvas.width = width;
        canvas.height = height;

        ctx.fillStyle = "#fffaf1";
        ctx.fillRect(0, 0, width, height);

        images.forEach(function (img, index) {
            const y = padding + index * (shotHeight + gap);

            drawCoverImage(
                ctx,
                img,
                padding,
                y,
                width - padding * 2,
                shotHeight
            );
        });

        ctx.fillStyle = "#8b7566";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = "bold 25px Georgia";
        ctx.fillText("HAPPY BIRTHDAY", width / 2, height - 77);

        ctx.font = "27px sans-serif";
        ctx.fillText("기연이 ♡ 스리", width / 2, height - 37);

        photoTaken = true;
        showPreview(canvas);

        const status = document.querySelector("#photoStatus");
        status.textContent = "우리의 네 컷 사진 완성! 🤍";
    }).catch(function (error) {
        console.error("네 컷 사진 생성 실패:", error);
        alert("사진을 합치는 데 실패했어. 다시 촬영해 줘.");
    });
}

function drawCoverImage(ctx, img, x, y, width, height) {
    const scale = Math.max(
        width / img.naturalWidth,
        height / img.naturalHeight
    );

    const sourceWidth = width / scale;
    const sourceHeight = height / scale;
    const sourceX = (img.naturalWidth - sourceWidth) / 2;
    const sourceY = (img.naturalHeight - sourceHeight) / 2;

    ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        x,
        y,
        width,
        height
    );
}

function showPreview(canvas) {
    const video = document.querySelector("#cameraVideo");
    const preview = document.querySelector("#photoPreview");
    const message = document.querySelector("#cameraMessage");

    preview.src = canvas.toDataURL("image/jpeg", 0.95);
    preview.classList.remove("hidden");
    video.classList.add("hidden");
    message.classList.add("hidden");

    stopCamera();
}

function retakePhoto() {
    resetPhotoState();

    const preview = document.querySelector("#photoPreview");
    const video = document.querySelector("#cameraVideo");
    const message = document.querySelector("#cameraMessage");
    const status = document.querySelector("#photoStatus");

    if (preview) {
        preview.classList.add("hidden");
        preview.removeAttribute("src");
    }

    if (video) {
        video.classList.remove("hidden");
    }

    if (message) {
        message.classList.remove("hidden");
        message.textContent = "다시 예쁘게 찍어 보자 🤍";
    }

    if (status) {
        status.textContent = photoMode === "four"
            ? "네 컷 사진을 다시 찍어 줘."
            : "다시 찍을 준비 완료!";
    }

    startCamera();
}

function downloadPhoto() {
    if (!photoTaken) {
        alert("먼저 사진을 찍어 줘! 📸");
        return;
    }

    const canvas = document.querySelector("#photoCanvas");

    canvas.toBlob(function (blob) {
        if (!blob) {
            alert("사진 저장에 실패했어. 다시 시도해 줘.");
            return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = photoMode === "four"
            ? "기연이_생일_네컷사진.jpg"
            : "기연이_생일기념사진.jpg";

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 1000);
    }, "image/jpeg", 0.95);
}

function loadUploadedPhoto(file) {
    if (!file || !file.type.startsWith("image/")) {
        alert("이미지 파일을 선택해 줘!");
        return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = function () {
        const canvas = document.querySelector("#photoCanvas");
        const ctx = canvas.getContext("2d");

        if (photoMode === "four") {
            photoShots.push(url);
            currentShot = photoShots.length;

            const status = document.querySelector("#photoStatus");

            if (currentShot < 4) {
                status.textContent =
                    currentShot + " / 4장 선택 완료! 사진을 더 골라 줘.";
                return;
            }

            createFourCut();
            return;
        }

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.drawImage(img, 0, 0);
        drawPhotoFrame(ctx, canvas.width, canvas.height);

        photoTaken = true;
        showPreview(canvas);

        document.querySelector("#photoStatus").textContent =
            "사진 완성! 저장 버튼을 눌러 간직해 줘 🤍";

        URL.revokeObjectURL(url);
    };

    img.onerror = function () {
        URL.revokeObjectURL(url);
        alert("사진을 불러오지 못했어.");
    };

    img.src = url;
}

document.addEventListener("click", function (e) {
    const routeButton = e.target.closest("[data-route]");

    if (routeButton) {
        const nextRoute = routeButton.dataset.route;

        if (views[nextRoute]) {
            route = nextRoute;
            resetPhotoState();
            render();
        }

        return;
    }

    const modeButton = e.target.closest("[data-photo-mode]");

    if (modeButton) {
        photoMode = modeButton.dataset.photoMode;
        resetPhotoState();
        render();
        return;
    }

    const giftButton = e.target.closest("[data-gift]");

    if (giftButton) {
        const index = Number(giftButton.dataset.gift);
        const result = document.querySelector("#giftResult");
        const progress = document.querySelector("#giftProgress");

        if (openedGifts.includes(index)) {
            return;
        }

        if (index !== openedGifts.length) {
            if (result) {
                result.innerHTML =
                    "<span>🤭</span><p>순서대로 열어 봐! 다음 선물을 기다리고 있어 ♡</p>";
            }
            return;
        }

        openedGifts.push(index);

        const gift = GIFT_MESSAGES[index];

        if (index === 2) {
            result.innerHTML = `
                <div class="gift-reveal">
                    <div class="gift-sparkle">✨ 🎉 ✨</div>
                    <span class="gift-big-emoji">${gift.emoji}</span>
                    <p class="kicker">THE REAL PRESENT</p>
                    <h2>${gift.name}</h2>
                    <p>${gift.description}</p>
                    <p>생일 축하해, 기연아. 사랑해 🤍</p>
                </div>`;
        } else {
            result.innerHTML = `
                <div class="gift-reveal">
                    <span class="gift-big-emoji">${gift.emoji}</span>
                    <p class="kicker">${gift.title}</p>
                    <h2>${gift.name}</h2>
                    <p>${gift.description}</p>
                    <p></p>
                </div>`;
        }

        giftButton.classList.add("gift-opened");
        giftButton.querySelector(".gift-emoji").textContent = gift.emoji;
        giftButton.querySelector("strong").textContent = gift.name;
        giftButton.querySelector("small").textContent = "OPENED ♡";
        giftButton.disabled = true;

        if (progress) {
            progress.textContent = openedGifts.length + " / 3 OPENED";
        }

        return;
    }

    const memoryButton = e.target.closest("[data-memory]");

    if (memoryButton) {
        const memory = CONFIG.memories[
            Number(memoryButton.dataset.memory)
        ];

        card.innerHTML = `
            <div class="close">×</div>
            <div class="kicker">${escapeHTML(memory.date)}</div>
            <h2 style="font:31px Georgia,serif;margin:8px 0">
                ${escapeHTML(memory.title)}
            </h2>
            <div class="photo">YOUR PHOTO HERE</div>
            <p class="muted" style="font-size:14px">
                ${escapeHTML(memory.text)}
            </p>`;

        modal.classList.remove("hidden");
        return;
    }

    if (e.target.closest("#startCamera")) {
        startCamera();
        return;
    }

    if (e.target.closest("#capturePhoto")) {
        capturePhoto();
        return;
    }

    if (e.target.closest("#retakePhoto")) {
        retakePhoto();
        return;
    }

    if (e.target.closest("#downloadPhoto")) {
        downloadPhoto();
        return;
    }

    if (
        e.target.classList.contains("backdrop") ||
        e.target.classList.contains("close")
    ) {
        modal.classList.add("hidden");
        return;
    }

    if (e.target.id === "share") {
        if (navigator.share) {
            navigator.share({
                title: "For You",
                text: "내가 준비한 작은 생일 앱이야.",
                url: location.href
            }).catch(function () {});
        } else {
            alert("이 브라우저에서는 공유 기능을 사용할 수 없어.");
        }
    }
});

document.addEventListener("change", function (e) {
    if (e.target.id !== "photoUpload") {
        return;
    }

    const file = e.target.files[0];

    if (file) {
        loadUploadedPhoto(file);
    }

    e.target.value = "";
});

if (musicBtn && bgMusic) {
    let isPlaying = false;

    musicBtn.addEventListener("click", async function () {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;

            musicBtn.classList.remove("playing");
            musicBtn.textContent = "♫";
        } else {
            try {
                await bgMusic.play();

                isPlaying = true;
                musicBtn.classList.add("playing");
                musicBtn.textContent = "Ⅱ";
            } catch (error) {
                console.error("음악 재생 실패:", error);
            }
        }
    });

    bgMusic.addEventListener("ended", function () {
        isPlaying = false;
        musicBtn.classList.remove("playing");
        musicBtn.textContent = "♫";
    });
}

render();