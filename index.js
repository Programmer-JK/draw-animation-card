const AVATAR_COLORS = [
  'var(--accent1)', 'var(--accent2)', 'var(--accent3)',
  'var(--accent4)', 'var(--accent5)', 'var(--accent6)'
];

let setupMembers = [];
let selectedMode = 'basic';
let infiniteEnabled = false;

function selectMode(mode) {
  selectedMode = mode;
  document.querySelectorAll('.setup-mode-chip').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

function toggleInfiniteSetup() {
  infiniteEnabled = !infiniteEnabled;
  document.getElementById('infiniteBtn').classList.toggle('active', infiniteEnabled);
}

function setupAddMember() {
  const input = document.getElementById('setupInput');
  const name = input.value.trim();
  if (!name) return;
  setupMembers.push({ name });
  input.value = '';
  renderSetupMembers();
  input.focus();
}

function setupRemoveMember(idx) {
  setupMembers.splice(idx, 1);
  renderSetupMembers();
}

function renderSetupMembers() {
  const list = document.getElementById('setupMemberList');
  const btn = document.getElementById('btnStartGame');

  if (setupMembers.length === 0) {
    list.innerHTML = '<div class="setup-empty">아직 플레이어가 없어요</div>';
    btn.classList.remove('ready');
    return;
  }

  btn.classList.add('ready');
  list.innerHTML = setupMembers.map((m, i) => `
    <div class="setup-member-item">
      <div class="setup-member-avatar"
           style="background:${AVATAR_COLORS[i % AVATAR_COLORS.length]};opacity:0.3"></div>
      <span class="setup-member-name">${m.name}</span>
      <button class="btn-del" onclick="setupRemoveMember(${i})">
        <i data-lucide="x" style="width:15px;height:15px;"></i>
      </button>
    </div>
  `).join('');
  lucide.createIcons();
}

function startGame() {
  if (setupMembers.length === 0) return;
  sessionStorage.setItem('players', JSON.stringify(setupMembers.map(m => m.name)));
  sessionStorage.setItem('infinite', String(infiniteEnabled));
  location.href = selectedMode === 'genre' ? 'game-genre.html' : 'game-basic.html';
}

function openModeGuide() {
  document.getElementById('modeGuideOverlay').classList.add('open');
}

function closeModeGuide(e) {
  if (!e || e.target === document.getElementById('modeGuideOverlay')) {
    document.getElementById('modeGuideOverlay').classList.remove('open');
  }
}

window.onload = () => {
  lucide.createIcons();
  document.getElementById('setupInput')
    .addEventListener('keydown', e => { if (e.key === 'Enter') setupAddMember(); });
};
