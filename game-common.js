const CATEGORIES = [
  {
    name: "의상", desc: "캐릭터의 외형과 시대적 배경", colorIdx: 0, items: [
      { name: "교복", desc: "청춘의 상징", icon: "graduation-cap" },
      { name: "갑옷", desc: "철벽 방어", icon: "shield" },
      { name: "정장", desc: "단정한 실루엣", icon: "briefcase" },
      { name: "코트", desc: "고독한 분위기", icon: "shirt" },
      { name: "운동복", desc: "활동적인 에너지", icon: "dumbbell" },
      { name: "수영복", desc: "여름의 추억", icon: "droplets" },
      { name: "로브", desc: "신비로운 마력", icon: "sparkles" },
      { name: "드레스", desc: "화려한 우아함", icon: "star" },
      { name: "제복", desc: "규율과 질서", icon: "award" },
      { name: "전신슈트", desc: "완벽한 밀착감", icon: "scan" }
    ]
  },
  {
    name: "전투방식", desc: "싸우는 스타일과 능력의 근원", colorIdx: 1, items: [
      { name: "검술", desc: "날카로운 베기", icon: "sword" },
      { name: "격투", desc: "묵직한 타격", icon: "hand" },
      { name: "마법", desc: "신비한 영창", icon: "wand-2" },
      { name: "소환", desc: "강력한 부름", icon: "dog" },
      { name: "암살", desc: "어둠 속 일격", icon: "moon" },
      { name: "방어형", desc: "철벽의 가드", icon: "shield-alert" },
      { name: "치유형", desc: "빛의 회복", icon: "heart-pulse" },
      { name: "기계병기", desc: "압도적 화력", icon: "bot" },
      { name: "신체변형", desc: "극한의 변화", icon: "dna" },
      { name: "독/함정", desc: "교활한 전략", icon: "flask-conical" },
      { name: "화기", desc: "폭발적 화력", icon: "target" }
    ]
  },
  {
    name: "장르", desc: "세계관의 전체적인 분위기", colorIdx: 2, items: [
      { name: "액션", desc: "폭발적 긴장감", icon: "zap" },
      { name: "스포츠", desc: "땀과 열정", icon: "trophy" },
      { name: "공포", desc: "서늘한 공포", icon: "ghost" },
      { name: "코믹", desc: "유쾌한 웃음", icon: "laugh" },
      { name: "로맨스", desc: "달콤한 설렘", icon: "heart" },
      { name: "추리", desc: "진실의 추적", icon: "search" },
      { name: "판타지", desc: "꿈의 모험", icon: "mountain" },
      { name: "일상", desc: "소소한 행복", icon: "coffee" },
      { name: "SF", desc: "미래의 상상", icon: "rocket" },
      { name: "시대극", desc: "역사의 한 장면", icon: "scroll" },
      { name: "학원물", desc: "청춘의 이야기", icon: "book-open" },
      { name: "이세계", desc: "또 다른 세계로", icon: "globe" },
      { name: "음악물", desc: "선율의 이야기", icon: "music" }
    ]
  },
  {
    name: "스타일", desc: "외모와 신체적 특성", colorIdx: 3, items: [
      { name: "큰 체형", desc: "압도적 존재감", icon: "maximize-2" },
      { name: "작은 체형", desc: "앙증맞은 귀여움", icon: "minimize-2" },
      { name: "흑발", desc: "신비로운 매력", icon: "droplet" },
      { name: "금발", desc: "눈부신 빛깔", icon: "sparkle" },
      { name: "흰 머리카락", desc: "초월적 분위기", icon: "circle" },
      { name: "붉은 눈", desc: "강렬한 시선", icon: "eye" },
      { name: "트윈테일", desc: "생기 넘치는 활기", icon: "git-fork" },
      { name: "짧은 머리", desc: "시원한 인상", icon: "arrow-up" },
      { name: "긴 생 머리", desc: "우아하게 흐르는", icon: "arrow-down" },
      { name: "은발", desc: "차갑고 우아한 빛", icon: "moon" },
    ]
  },
  {
    name: "성격", desc: "내면의 기질과 행동의 동기", colorIdx: 4, items: [
      { name: "소심한", desc: "수줍은 마음", icon: "cloud" },
      { name: "다정한", desc: "따뜻한 시선", icon: "sun" },
      { name: "까칠한", desc: "날카로운 말", icon: "zap" },
      { name: "낯가리는", desc: "조심스러운 태도", icon: "eye-off" },
      { name: "장난꾸러기", desc: "즐거운 사고", icon: "party-popper" },
      { name: "집착하는", desc: "강한 집념", icon: "link" },
      { name: "로맨틱한", desc: "낭만적 무드", icon: "rose" },
      { name: "냉정한", desc: "차가운 판단", icon: "snowflake" },
      { name: "츤데레", desc: "숨겨진 진심", icon: "smile" },
      { name: "열혈", desc: "뜨거운 열정", icon: "activity" },
      { name: "사차원", desc: "독특한 세계관", icon: "shuffle" }
    ]
  },
  {
    name: "특징", desc: "외형적 포인트와 상징적 개성", colorIdx: 5, items: [
      { name: "안경", desc: "지적 매력", icon: "glasses" },
      { name: "문신", desc: "강렬한 표식", icon: "pen-tool" },
      { name: "흉터", desc: "전투의 흔적", icon: "scissors" },
      { name: "대머리", desc: "당당한 민머리", icon: "circle-dashed" },
      { name: "장신구", desc: "빛나는 개성", icon: "gem" },
      { name: "가면", desc: "숨겨진 얼굴", icon: "mask" },
      { name: "이색 눈동자", desc: "신비로운 눈", icon: "eye" },
      { name: "의수/의족", desc: "강철의 의지", icon: "armchair" },
      { name: "남성", desc: "남성적 외형", icon: "mars" },
      { name: "여성", desc: "여성적 외형", icon: "venus" },
      { name: "노출", desc: "대담한 패션", icon: "wind" },
      { name: "근육질", desc: "다져진 몸", icon: "dumbbell" },
      { name: "이종족", desc: "인간을 넘은 존재", icon: "paw-print" },
      { name: "수염", desc: "남성미의 상징", icon: "align-justify" },
      { name: "퍼리", desc: "수인의 매력", icon: "cat" }
    ]
  }
];

// ── 공통 상태 ──────────────────────────────────
let catDecks = null;
let infiniteActive = false;
let members = [];

// ── 덱 관리 ───────────────────────────────────
function buildDecks() {
  catDecks = CATEGORIES.map(cat => ({
    cat,
    remaining: [...cat.items].sort(() => Math.random() - 0.5)
  }));
}

function nextItem(deckEntry, usedNames) {
  if (infiniteActive) {
    const pool = usedNames
      ? deckEntry.cat.items.filter(i => !usedNames.has(i.name))
      : deckEntry.cat.items;
    const src = pool.length > 0 ? pool : deckEntry.cat.items;
    return src[Math.floor(Math.random() * src.length)];
  }
  if (deckEntry.remaining.length === 0) {
    deckEntry.remaining = [...deckEntry.cat.items].sort(() => Math.random() - 0.5);
  }
  return deckEntry.remaining.pop();
}

function updateCounter() {
  const el = document.getElementById('cardCounter');
  if (!el || !catDecks) return;
  const rem = catDecks.reduce((s, d) => s + d.remaining.length, 0);
  const total = CATEGORIES.reduce((s, c) => s + c.items.length, 0);
  el.textContent = `남은 카드  ${rem} / ${total}`;
}

// ── 카드 렌더링 ───────────────────────────────
function makeCardWrap(cat, item, idx) {
  const wrap = document.createElement('div');
  wrap.className = 'card-wrap';
  wrap.innerHTML = `
    <div class="card-inner" id="ci${idx}">
      <div class="card-face card-back"><span>?</span></div>
      <div class="card-face card-front" style="color:var(--accent${cat.colorIdx + 1})">
        <div class="cat-bar" style="background:var(--accent${cat.colorIdx + 1})"></div>
        <div class="card-body">
          <div class="card-cat-name">${cat.name}</div>
          <div style="margin-bottom:8px;"><i data-lucide="${item.icon}"></i></div>
          <div class="card-name">${item.name}</div>
          <div class="card-desc">${item.desc}</div>
        </div>
      </div>
    </div>
  `;
  return wrap;
}

// ── 무한 모드 ─────────────────────────────────
function toggleInfinite() {
  infiniteActive = !infiniteActive;
  document.getElementById('infiniteToggle').classList.toggle('active', infiniteActive);
}

// ── 도감 ──────────────────────────────────────
function toggleGuide() {
  const overlay = document.getElementById('guideOverlay');
  overlay.classList.toggle('active');
  document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : 'auto';
}

function initGuide() {
  const list = document.getElementById('guideList');
  list.innerHTML = CATEGORIES.map((cat, cIdx) => `
    <div class="guide-section c-${cIdx}">
      <div class="guide-section-title">
        <i data-lucide="sparkle" style="width:18px;"></i> ${cat.name}
      </div>
      <div class="guide-section-desc">${cat.desc}</div>
      <div class="mini-card-grid">
        ${cat.items.map(item => `
          <div class="mini-card">
            <div class="m-cat-bar"></div>
            <div class="m-body">
              <div class="m-icon"><i data-lucide="${item.icon}"></i></div>
              <div class="m-name">${item.name}</div>
              <div class="m-desc">${item.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ── 점수판 ────────────────────────────────────
function toggleScoreDrawer() {
  const drawer = document.getElementById('scoreDrawer');
  const backdrop = document.getElementById('scoreBackdrop');
  const open = drawer.classList.toggle('open');
  backdrop.classList.toggle('active', open);
}

function addScore(idx) {
  members[idx].score++;
  renderMembers();
}

function removeScore(idx) {
  if (members[idx].score > 0) members[idx].score--;
  renderMembers();
}

function resetScores() {
  members.forEach(m => m.score = 0);
  renderMembers();
}

function endGame() {
  sessionStorage.setItem('results', JSON.stringify(members));
  location.href = 'result.html';
}

function renderMembers() {
  const list = document.getElementById('memberList');
  if (members.length === 0) {
    list.innerHTML = '<div class="no-members-hint">플레이어가 없어요</div>';
    return;
  }
  const maxScore = Math.max(...members.map(m => m.score));
  list.innerHTML = members.map((m, i) => {
    const isTop = m.score > 0 && m.score === maxScore;
    return `
    <div class="member-item">
      <span class="member-name" style="${isTop ? 'color:var(--accent1)' : ''}">
        ${m.name}${isTop ? ' <i data-lucide="crown" style="width:14px;height:14px;vertical-align:middle;color:var(--accent1)"></i>' : ''}
      </span>
      <span class="member-score">${m.score}</span>
      <div class="score-btns">
        <button class="btn-score minus" onclick="removeScore(${i})" title="-1">−</button>
        <button class="btn-score plus" onclick="addScore(${i})" title="+1">+</button>
      </div>
    </div>`;
  }).join('');
  lucide.createIcons();
}
