// ── 기본 모드: 6장 랜덤 뽑기 ──────────────────

function pickRandom6() {
  const catCounts = new Map();
  const results = [];
  const usedNames = new Set();
  while (results.length < 6) {
    const available = catDecks.filter((_, i) => (catCounts.get(i) || 0) < 3);
    if (available.length === 0) break;
    const deckEntry = available[Math.floor(Math.random() * available.length)];
    const catIdx = catDecks.indexOf(deckEntry);
    const item = nextItem(deckEntry, usedNames);
    usedNames.add(item.name);
    results.push({ cat: deckEntry.cat, item });
    catCounts.set(catIdx, (catCounts.get(catIdx) || 0) + 1);
  }
  return results;
}

function startGame() {
  const area = document.getElementById('cardsArea');
  area.innerHTML = '';
  pickRandom6().forEach(({ cat, item }, i) => {
    const wrap = makeCardWrap(cat, item, i);
    area.appendChild(wrap);
    setTimeout(() => document.getElementById(`ci${i}`)?.classList.add('flipped'), 150 + i * 100);
  });
  lucide.createIcons();
  updateCounter();
}

window.onload = () => {
  const saved = sessionStorage.getItem('players');
  if (saved) members = JSON.parse(saved).map(name => ({ name, score: 0 }));
  const savedInfinite = sessionStorage.getItem('infinite') === 'true';

  buildDecks();
  initGuide();
  renderMembers();

  if (savedInfinite) {
    infiniteActive = true;
    document.getElementById('infiniteToggle').classList.add('active');
  }

  startGame();
  lucide.createIcons();
};
