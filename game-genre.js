// ── 카테고리 선택 모드 ────────────────────────

const MAX_GENRE_CARDS = 8;
const GENRE_CARD_ROTS = [-2.8, 1.6, -1.4, 2.4, -0.6, 1.8, -2.2, 2.0, -1.8, 1.2, -0.9, 2.6, -1.6];

let genreRevealState = { catCounts: new Map(), totalCards: 0 };

function initGenreSelector() {
  const el = document.getElementById('genreSelector');
  el.innerHTML = `
    <div class="genre-selector-label">카테고리를 선택해 카드를 뽑으세요</div>
    <div class="genre-btn-row">
      ${CATEGORIES.map((cat, idx) => `
        <button class="genre-cat-btn" data-idx="${idx}" onclick="revealGenreCard(${idx})"
          style="border-color:var(--accent${cat.colorIdx + 1});color:var(--accent${cat.colorIdx + 1})">
          ${cat.name}<span class="genre-btn-count" style="display:none"></span>
        </button>
      `).join('')}
    </div>
    <div class="genre-footer-row">
      <div class="genre-progress" id="genreProgress">0 / ${MAX_GENRE_CARDS}장 뽑음</div>
      <button class="genre-reset-btn" onclick="resetGenre()">↺ 다시 시작</button>
      <button class="infinite-toggle" id="infiniteToggle" onclick="toggleInfinite()">∞</button>
    </div>
  `;
}

function revealGenreCard(catIdx) {
  if (genreRevealState.totalCards >= MAX_GENRE_CARDS) return;

  const prevCount = genreRevealState.catCounts.get(catIdx) || 0;
  genreRevealState.catCounts.set(catIdx, prevCount + 1);
  genreRevealState.totalCards++;

  const btn = document.querySelector(`.genre-cat-btn[data-idx="${catIdx}"]`);
  if (btn) {
    btn.classList.add('used');
    const countEl = btn.querySelector('.genre-btn-count');
    if (countEl) { countEl.textContent = prevCount + 1; countEl.style.display = ''; }
  }

  const total = genreRevealState.totalCards;
  const progress = document.getElementById('genreProgress');
  if (progress) progress.textContent = `${total} / ${MAX_GENRE_CARDS}장 뽑음`;

  if (total >= MAX_GENRE_CARDS) {
    document.querySelectorAll('.genre-cat-btn').forEach(b => b.classList.add('maxed'));
  }

  const deckEntry = catDecks[catIdx];
  const item = nextItem(deckEntry);
  const cardIdx = total - 1;

  const area = document.getElementById('cardsArea');
  const wrap = makeCardWrap(deckEntry.cat, item, `g${cardIdx}`);
  wrap.classList.add('genre-card', 'entering');
  wrap.style.setProperty('--card-rot', `${GENRE_CARD_ROTS[cardIdx % GENRE_CARD_ROTS.length]}deg`);

  area.appendChild(wrap);
  lucide.createIcons();
  updateCounter();

  setTimeout(() => {
    document.getElementById(`cig${cardIdx}`)?.classList.add('flipped');
  }, 50);
  setTimeout(() => wrap.classList.remove('entering'), 620);
}

function resetGenre() {
  genreRevealState = { catCounts: new Map(), totalCards: 0 };
  document.getElementById('cardsArea').innerHTML = '';
  document.querySelectorAll('.genre-cat-btn').forEach(b => {
    b.classList.remove('used', 'maxed');
    const countEl = b.querySelector('.genre-btn-count');
    if (countEl) { countEl.textContent = ''; countEl.style.display = 'none'; }
  });
  const progress = document.getElementById('genreProgress');
  if (progress) progress.textContent = `0 / ${MAX_GENRE_CARDS}장 뽑음`;
}

window.onload = () => {
  const saved = sessionStorage.getItem('players');
  if (saved) members = JSON.parse(saved).map(name => ({ name, score: 0 }));
  const savedInfinite = sessionStorage.getItem('infinite') === 'true';

  buildDecks();
  initGuide();
  initGenreSelector();
  renderMembers();

  if (savedInfinite) {
    infiniteActive = true;
    document.getElementById('infiniteToggle').classList.add('active');
  }

  lucide.createIcons();
};
