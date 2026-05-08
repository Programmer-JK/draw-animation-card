const RANK1_MSGS = ['전설의 등장', '누가 막겠어', '압도적 지배', '독보적 1위', '이미 끝났다'];
const RANK2_MSGS = ['아슬아슬했는데...', '다음엔 꼭!', '0.1점 차이의 눈물', '2위도 충분히 멋져'];
const RANK3_MSGS = ['3위도 영광이야!', '동메달도 금으로 보여', '곧 뒤집는다', '참을 수 없는 3위'];
const RANK_MSGS  = ['오늘만 이래...', '점수가 뭐야', '참가에 의미를', '다음 생엔 잘할게'];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function getRankMsg(rank) {
  if (rank === 0) return pick(RANK1_MSGS);
  if (rank === 1) return pick(RANK2_MSGS);
  if (rank === 2) return pick(RANK3_MSGS);
  return pick(RANK_MSGS);
}

function spinSettle(el, target) {
  if (target === 0) {
    setTimeout(() => { el.textContent = '0점'; el.classList.add('settled'); }, 400);
    return;
  }
  const spinDur = 700, settleDur = 500;
  const start = performance.now();
  function frame(now) {
    const t = now - start;
    if (t < spinDur) {
      el.textContent = Math.floor(Math.random() * (target * 2 + 3)) + '점';
    } else {
      const p = Math.min((t - spinDur) / settleDur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + '점';
      if (p >= 1) { el.textContent = target + '점'; el.classList.add('settled'); return; }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function floatIcons(anchorEl) {
  const icons = ['star', 'sparkles', 'zap', 'heart', 'crown', 'trophy'];
  const colors = ['#e8c97a', '#c96a8f', '#6a9fc9', '#8fc96a', '#c9906a', '#a06ac9'];
  const rect = anchorEl.getBoundingClientRect();
  const wrappers = [];
  for (let i = 0; i < 10; i++) {
    const iconName = icons[Math.floor(Math.random() * icons.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 16;
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + rect.height / 2;
    const delay = Math.random() * 0.5;
    const wrap = document.createElement('span');
    wrap.innerHTML = `<i data-lucide="${iconName}" style="width:${size}px;height:${size}px;color:${color}"></i>`;
    wrap.style.cssText = `position:fixed;left:${x}px;top:${y}px;pointer-events:none;z-index:500;
      animation:floatUp 1.4s ease ${delay}s forwards;`;
    document.body.appendChild(wrap);
    wrappers.push(wrap);
    setTimeout(() => wrap.remove(), 2200);
  }
  lucide.createIcons();
}

function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#e8c97a', '#c96a8f', '#6a9fc9', '#8fc96a', '#c9906a', '#a06ac9'];
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width, y: Math.random() * -300,
    w: Math.random() * 9 + 4, h: Math.random() * 5 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 0.18,
    vx: Math.random() * 2.5 - 1.2, vy: Math.random() * 3 + 2, opacity: 1,
  }));
  let elapsed = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      p.angle += p.spin; p.y += p.vy; p.x += p.vx;
      if (elapsed > 90) p.opacity = Math.max(0, p.opacity - 0.012);
      if (p.y < canvas.height + 20 && p.opacity > 0) alive = true;
      ctx.save(); ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    elapsed++;
    if (alive && elapsed < 220) requestAnimationFrame(draw);
    else {
      canvas.style.transition = 'opacity 0.8s'; canvas.style.opacity = '0';
      setTimeout(() => canvas.remove(), 800);
    }
  }
  draw();
}

// ── 점수판 모달 ──────────────────────────────
let sortedMembers = [];

function rankBadge(i) {
  if (i === 0) return '<i data-lucide="crown"></i>';
  if (i === 1) return '<i data-lucide="star"></i>';
  if (i === 2) return '<i data-lucide="award"></i>';
  return `${i + 1}`;
}

window.openScoreModal = function () {
  const maxScore = sortedMembers[0]?.score || 1;
  document.getElementById('modalList').innerHTML = sortedMembers.map((m, i) => {
    const pct = maxScore > 0 ? (m.score / maxScore) * 100 : 0;
    return `
      <div class="modal-item rank-${Math.min(i + 1, 4)}">
        <span class="modal-rank">${rankBadge(i)}</span>
        <span class="modal-name">${m.name}</span>
        <div class="modal-bar-wrap">
          <div class="modal-bar rank-${Math.min(i + 1, 4)}" style="width:${pct}%"></div>
        </div>
        <span class="modal-score">${m.score}점</span>
      </div>
    `;
  }).join('');
  lucide.createIcons();
  document.getElementById('modalBackdrop').classList.remove('hidden');
  document.getElementById('scoreModal').classList.remove('hidden');
};

window.closeScoreModal = function () {
  document.getElementById('modalBackdrop').classList.add('hidden');
  document.getElementById('scoreModal').classList.add('hidden');
};

// ── 자동 역순 공개 ────────────────────────────
function startReveal(allZero) {
  const list = document.getElementById('resultList');
  const n = sortedMembers.length;
  const maxScore = sortedMembers[0]?.score || 1;

  list.innerHTML = sortedMembers.map((m, i) => {
    const pct = maxScore > 0 ? (m.score / maxScore) * 100 : 0;
    return `
      <div class="result-item rank-${Math.min(i + 1, 4)}" id="ri${i}">
        <span class="result-rank">${rankBadge(i)}</span>
        <div class="result-name-wrap">
          <span class="result-name">${m.name}</span>
          <span class="result-msg result-msg-hidden" id="msg${i}">${getRankMsg(i)}</span>
        </div>
        <div class="result-bar-wrap">
          <div class="result-bar rank-${Math.min(i + 1, 4)}" id="bar${i}" data-pct="${pct}"></div>
        </div>
        <span class="result-score" id="sc${i}" data-score="${m.score}">?</span>
      </div>
    `;
  }).join('');

  const PER = 1400;

  for (let rank = n - 1; rank >= 0; rank--) {
    const order = n - 1 - rank;
    const t = order * PER;

    setTimeout(() => {
      const item = document.getElementById(`ri${rank}`);
      item.classList.add('reveal');

      setTimeout(() => {
        const bar = document.getElementById(`bar${rank}`);
        if (bar) bar.style.width = bar.dataset.pct + '%';
        spinSettle(document.getElementById(`sc${rank}`), parseInt(document.getElementById(`sc${rank}`).dataset.score));
      }, 200);

      setTimeout(() => {
        document.getElementById(`msg${rank}`)?.classList.remove('result-msg-hidden');
      }, 1500);

      if (rank === 0) {
        const firstItem = document.getElementById('ri0');
        if (!allZero) {
          setTimeout(() => floatEmojis(firstItem), 300);
          setTimeout(launchConfetti, 600);
        }
        setTimeout(() => {
          document.getElementById('resultActions').classList.remove('hidden');
          lucide.createIcons();
        }, 1600);
      }
    }, t);
  }
}

// ── 초기화 ────────────────────────────────────
window.onload = () => {
  const saved = sessionStorage.getItem('results');
  const list  = document.getElementById('resultList');
  const sub   = document.getElementById('resultSub');

  lucide.createIcons();

  if (!saved || JSON.parse(saved).length === 0) {
    list.innerHTML = '<div class="no-players">결과 데이터가 없어요</div>';
    document.getElementById('resultActions').classList.remove('hidden');
    return;
  }

  const members = JSON.parse(saved);
  sortedMembers = [...members].sort((a, b) => b.score - a.score);
  const allZero = sortedMembers.every(m => m.score === 0);
  const tie = sortedMembers.length > 1 && sortedMembers[0].score === sortedMembers[1].score && !allZero;

  if (allZero)  sub.textContent = '점수가 없어요... 다들 괜찮으신가요?';
  else if (tie) sub.innerHTML = `공동 1위! 결판을 내야 해요 <i data-lucide="flame" style="width:14px;height:14px;vertical-align:middle;color:#ff7043"></i>`;
  else          sub.textContent = `${sortedMembers[0].name}의 완벽한 승리!`;

  startReveal(allZero);
};
