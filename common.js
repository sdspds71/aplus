// =============================================
// GA 시책관리 시스템 - 공통 LNB / GNB 렌더링
// =============================================

const MENU_STRUCTURE = [
  {
    section: '로그인 / 메인',
    items: [
      { id: 'SCR_019', label: '로그인', icon: '🔐', path: 'SCR_019.html' },
      { id: 'SCR_020', label: '메인화면', icon: '🏠', path: 'SCR_020.html' },
      { id: 'SCR_000', label: '시스템구성도', icon: '🗂️', path: 'SCR_000.html' },
    ]
  },
  {
    section: '기준관리',
    items: [
      { id: 'SCR_001', label: '원수사 시책목록', icon: '📋', path: 'SCR_001.html' },
      { id: 'SCR_003', label: '시책 지급기준 관리', icon: '💰', path: 'SCR_003.html' },
      { id: 'SCR_008', label: '시책 환수기준 관리', icon: '↩️', path: 'SCR_008.html' },
    ]
  },
  {
    section: '입수 데이터',
    items: [
      { id: 'SCR_021', label: '상품정보 관리', icon: '📦', path: 'SCR_021.html' },
      { id: 'SCR_022', label: '인사정보 조회', icon: '👤', path: 'SCR_022.html' },
      { id: 'SCR_023', label: '조직정보 조회', icon: '🏢', path: 'SCR_023.html' },
      { id: 'SCR_024', label: '계약정보 조회', icon: '📄', path: 'SCR_024.html' },
    ]
  },
  {
    section: '시책 일보',
    items: [
      { id: 'SCR_025', label: '일일 지급 목록', icon: '📤', path: 'SCR_025.html' },
      { id: 'SCR_027', label: '일일 환수 목록', icon: '📥', path: 'SCR_027.html' },
      { id: 'SCR_029', label: '일일 시책 예측', icon: '🔮', path: 'SCR_029.html' },
    ]
  },
  {
    section: '원수사 시책',
    items: [
      { id: 'SCR_030', label: '시책 엑셀 매핑', icon: '🗺', path: 'SCR_030.html' },
      { id: 'SCR_031', label: '시책 엑셀 업로드', icon: '⬆️', path: 'SCR_031.html' },
      { id: 'SCR_032', label: '원수사 시책 통계', icon: '📈', path: 'SCR_032.html' },
    ]
  },
  {
    section: '시책 마감',
    items: [
      { id: 'SCR_033', label: '마감 지급 결과', icon: '✅', path: 'SCR_033.html' },
      { id: 'SCR_034', label: '마감 환수 결과', icon: '🔄', path: 'SCR_034.html' },
      { id: 'SCR_035', label: '마감 변경 관리', icon: '✏️', path: 'SCR_035.html' },
      { id: 'SCR_036', label: '마감 확정', icon: '🔏', path: 'SCR_036.html' },
      { id: 'SCR_037', label: '결과 송신', icon: '📡', path: 'SCR_037.html' },
    ]
  },
  {
    section: '공통업무',
    items: [
      { id: 'SCR_010', label: '화면관리', icon: '🖥', path: 'SCR_010.html' },
      { id: 'SCR_011', label: '메뉴관리', icon: '☰', path: 'SCR_011.html' },
      { id: 'SCR_012', label: '권한관리', icon: '🔒', path: 'SCR_012.html' },
      { id: 'SCR_013', label: '화면권한관리', icon: '🛡', path: 'SCR_013.html' },
      { id: 'SCR_014', label: '사용자관리', icon: '👤', path: 'SCR_014.html' },
      { id: 'SCR_015', label: '사용자권한관리', icon: '👥', path: 'SCR_015.html' },
      { id: 'SCR_016', label: '공통코드관리', icon: '🏷', path: 'SCR_016.html' },
      { id: 'SCR_017', label: '로그인이력', icon: '📜', path: 'SCR_017.html' },
      { id: 'SCR_018', label: '사용현황', icon: '📊', path: 'SCR_018.html' },
    ]
  },
];

function renderGNB() {
  return `
  <nav class="gnb">
    <a href="index.html" class="gnb-logo">
      <span class="logo-badge">GA</span>
      시책관리 시스템
    </a>
    <div class="gnb-spacer"></div>
    <div class="gnb-user">
      <span class="user-name">장수연</span>
      <span class="user-role">관리자</span>
      <button class="gnb-btn">로그아웃</button>
    </div>
  </nav>`;
}

function renderLNB(activeId) {
  // Determine which section the active item belongs to
  let activeSectionIndex = -1;
  MENU_STRUCTURE.forEach((s, idx) => {
    if (s.items.some(item => item.id === activeId)) {
      activeSectionIndex = idx;
    }
  });

  const sections = MENU_STRUCTURE.map((s, idx) => {
    const sectionKey = 'lnb_collapsed_' + idx;
    const hasActive = s.items.some(item => item.id === activeId);
    // Active section is always open by default; others use stored state
    const dataDefault = hasActive ? 'open' : 'closed';

    const items = s.items.map(item => {
      const isActive = item.id === activeId;
      return `<a href="${item.path}" class="lnb-item${isActive ? ' active' : ''}">
        <span class="icon">${item.icon}</span>
        <span>${item.label}</span>
      </a>`;
    }).join('');

    return `<div class="lnb-section" data-section-key="${sectionKey}" data-default="${dataDefault}">
      <div class="lnb-section-title lnb-section-toggle" data-idx="${idx}">
        <span>${s.section}</span>
        <span class="lnb-chevron">▾</span>
      </div>
      <div class="lnb-section-items">
        ${items}
      </div>
    </div>`;
  }).join('');

  return `<aside class="lnb" id="lnb-aside">${sections}</aside>`;
}

// Call this after inserting LNB HTML into the DOM
function initLNB() {
  const lnb = document.getElementById('lnb-aside');
  if (!lnb) return;

  const LNB_SCROLL_KEY = 'lnb_scroll';

  // Restore collapse state for each section
  lnb.querySelectorAll('.lnb-section').forEach(section => {
    const key = section.dataset.sectionKey;
    const defaultState = section.dataset.default;
    const stored = sessionStorage.getItem(key);
    const isOpen = stored !== null ? stored === 'open' : defaultState === 'open';

    const itemsEl = section.querySelector('.lnb-section-items');
    const chevron = section.querySelector('.lnb-chevron');

    if (!isOpen) {
      itemsEl.style.display = 'none';
      chevron.style.transform = 'rotate(-90deg)';
    }

    // Toggle on section title click
    section.querySelector('.lnb-section-toggle').addEventListener('click', () => {
      const nowOpen = itemsEl.style.display !== 'none';
      if (nowOpen) {
        itemsEl.style.display = 'none';
        chevron.style.transform = 'rotate(-90deg)';
        sessionStorage.setItem(key, 'closed');
      } else {
        itemsEl.style.display = '';
        chevron.style.transform = '';
        sessionStorage.setItem(key, 'open');
      }
    });
  });

  // Restore scroll position
  const savedScroll = sessionStorage.getItem(LNB_SCROLL_KEY);
  if (savedScroll !== null) {
    lnb.scrollTop = parseInt(savedScroll, 10);
  }

  // Save scroll position on scroll
  lnb.addEventListener('scroll', () => {
    sessionStorage.setItem(LNB_SCROLL_KEY, lnb.scrollTop);
  });
}
