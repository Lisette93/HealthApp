const screens = {
  home: {
    key: 'home',
    title: '01 Start',
    type: 'home'
  },
  power: {
    key: 'power',
    title: '02 Power',
    type: 'power'
  },
  detail: {
    key: 'detail',
    title: '03 Passdetalj',
    type: 'detail'
  },
  reset: {
    key: 'reset',
    title: '04 Reset',
    type: 'reset'
  },
  nutrition: {
    key: 'nutrition',
    title: '05 Näring',
    type: 'nutrition'
  },
  routine: {
    key: 'routine',
    title: '06 Min rutin',
    type: 'routine'
  }
};

const state = {
  currentScreen: 'home',
  activeTab: 'home',
  favorite: false,
  selectedLevel: 'Nivå 2',
  tasks: [
    { id: 1, title: 'Morning flow', meta: '20 min · klart 07:15', done: true },
    { id: 2, title: 'Proteinbowl med linser', meta: 'Lunch · 15 min', done: false },
    { id: 3, title: 'Kvällsnedvarvning', meta: '10 min · 21:30', done: false }
  ]
};

const tabConfig = [
  { key: 'home', label: 'Hem', icon: homeIcon },
  { key: 'power', label: 'Träning', icon: trainingIcon },
  { key: 'nutrition', label: 'Kost', icon: foodIcon },
  { key: 'routine', label: 'Rutin', icon: routineIcon }
];

function homeIcon() {
  return `
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3.2 8.6 10 3.4l6.8 5.2V16a1 1 0 0 1-1 1h-3.4v-4.6H7.6V17H4.2a1 1 0 0 1-1-1z"></path>
    </svg>
  `;
}

function trainingIcon() {
  return `
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M2.4 10h2.9l2.2-5.6 3 11.2 2.3-5.6h4.8"></path>
    </svg>
  `;
}

function foodIcon() {
  return `
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M2.8 9.2h14.4a7.2 7.2 0 0 1-14.4 0z"></path>
      <path d="M10 6.4c0-1.5.9-2.3 1.8-2.9"></path>
    </svg>
  `;
}

function routineIcon() {
  return `
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="4.6" width="14" height="12.2" rx="2.4"></rect>
      <path d="M3 8.6h14M7 3.2v2.6M13 3.2v2.6"></path>
    </svg>
  `;
}

const app = document.querySelector('#app');

function render() {
  const screen = screens[state.currentScreen];
  const isReset = state.currentScreen === 'reset';

  app.innerHTML = `
    <div class="phone ${isReset ? 'reset-screen' : ''}">
      <div class="app-content">
        ${renderScreen(screen)}
      </div>
      <nav class="tab-bar" aria-label="Tabbar">
        ${tabConfig.map((tab) => {
          const active = state.activeTab === tab.key ? 'active' : '';
          return `
            <button class="tab ${active}" type="button" data-tab="${tab.key}" aria-label="${tab.label}">
              ${tab.icon()}
              <span class="label">${tab.label}</span>
            </button>
          `;
        }).join('')}
      </nav>
    </div>
  `;

  bindEvents();
}

function renderScreen(screen) {
  switch (screen.key) {
    case 'home':
      return `
        <div style="display:flex; flex-direction:column; height:100%;">
          <div class="hero" style="background-image:url('design/uploads/yoga-girl.png');">
            <div class="hero-content">
              <h1 class="hero-greeting">God morgon, Elin</h1>
              <p class="muted-copy">Du har gjort 3 pass den här veckan</p>
              <button class="cta-button" type="button">Testa appen gratis</button>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:26px; padding-top:26px; overflow:hidden;">
            <div style="display:flex; flex-direction:column; gap:14px;">
              <div style="padding:0 22px;" class="section-title">Vad behöver din kropp idag?</div>
              <div class="option-row">
                <button class="feature-card" type="button" data-screen="power" style="background-image:url('design/uploads/woman-in-white-outfit-stretches-body-on-mat-2026-03-25-04-30-01-utc.JPG');">
                  <div class="label"><span>POWER</span></div>
                  <div class="subtitle">Energi &amp; styrka</div>
                </button>
                <button class="feature-card reset" type="button" data-screen="reset" style="background-image:url('design/uploads/yoga-girl2.png');">
                  <div class="label"><span>RESET</span></div>
                  <div class="subtitle">Andning &amp; vila</div>
                </button>
                <div class="feature-card peek-card" style="background-image:url('design/uploads/woman-stretches-on-mat-in-light-filled-room-2026-03-24-05-13-47-utc.JPG');"></div>
              </div>
            </div>

            <div class="section-block">
              <div class="section-header">
                <div class="section-title">Fortsätt där du var</div>
                <button class="link-button" type="button">Se allt</button>
              </div>
              <div class="resume-card">
                <div class="thumb" style="background-image:url('design/uploads/woman-stretches-on-mat-in-light-filled-room-2026-03-24-05-13-47-utc.JPG');"></div>
                <div class="resume-meta">
                  <div class="resume-title">Core balance</div>
                  <div class="resume-time">25 min · 12 min kvar</div>
                  <div class="progress-track"><span class="progress-fill" style="width:52%"></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

    case 'power':
      return `
        <div style="position:relative; flex:1; display:flex; flex-direction:column; overflow:hidden;">
          <div style="position:absolute; top:-60px; right:-90px; width:260px; height:260px; border-radius:50%; border:1px solid var(--decor-ring);"></div>
          <div style="position:absolute; top:120px; left:-120px; width:240px; height:240px; border-radius:50%; border:1px solid var(--decor-ring);"></div>

          <div class="phone-header">
            <div class="title-display" style="font-size:38px; letter-spacing:.2em; text-align:center;">POWER</div>
            <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:16px; color:var(--ink-secondary); text-align:center;">Rörelse för energi och stabilitet</div>
          </div>

          <div class="filter-row" style="padding-top:24px;">
            <button class="filter-chip active" type="button"><span class="dot"></span>${state.selectedLevel}</button>
            <button class="filter-chip" type="button">Tid</button>
            <button class="filter-chip" type="button">Tempo</button>
          </div>

          <div class="help-text">Alla pass är 15–30 minuter och anpassade att utföra när och var du vill.</div>

          <div class="session-list">
            <button class="workout-card" type="button" data-screen="detail" style="background-image:url('design/uploads/yoga-girl.png');">
              <div class="card-header">
                <div class="title">Morning flow</div>
                <div class="badge">Populär</div>
              </div>
              <div class="card-footer">
                <span class="meta-pill">20 min</span>
                <span class="meta-pill">Nivå 2</span>
              </div>
            </button>

            <button class="workout-card" type="button" data-screen="detail" style="background-image:url('design/uploads/woman-in-white-outfit-stretches-body-on-mat-2026-03-25-04-30-01-utc.JPG');">
              <div class="card-header">
                <div class="title">Core balance</div>
              </div>
              <div class="card-footer">
                <span class="meta-pill">25 min</span>
                <span class="meta-pill">Nivå 3</span>
              </div>
            </button>

            <button class="workout-card" type="button" data-screen="detail" style="background-image:url('design/uploads/yoga-girl2.png');">
              <div class="card-header">
                <div class="title">Power strength</div>
              </div>
              <div class="card-footer">
                <span class="meta-pill">30 min</span>
              </div>
            </button>
          </div>
        </div>
      `;

    case 'detail':
      return `
        <div class="detail-shell">
          <div class="detail-hero" style="background-image:url('design/uploads/yoga-girl.png');">
            <div class="top-controls">
              <button class="icon-button" type="button" data-back="power" aria-label="Gå tillbaka">←</button>
              <button class="icon-button" type="button" data-favorite="toggle" aria-label="Favorit">${state.favorite ? '♥' : '♡'}</button>
            </div>
            <div class="title-wrap">
              <p class="kicker">POWER · FLOW</p>
              <h2 class="detail-title">Morning flow</h2>
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-box"><strong>20</strong><span>minuter</span></div>
            <div class="meta-box"><strong>Nivå 2</strong><span>medel</span></div>
            <div class="meta-box"><strong>Matta</strong><span>utrustning</span></div>
          </div>

          <div class="description-block">
            Ett mjukt men aktivt flöde som väcker höfter, rygg och axlar. Passet börjar lugnt och byggs upp mot stabilitet – passar direkt efter uppstigning.
          </div>

          <div class="steps-block">
            <h3 class="steps-title">Så går passet till</h3>
            <div class="step-list">
              <div class="step-row">
                <div class="step-number">1</div>
                <div class="step-content"><span class="step-name">Andning &amp; uppvärmning</span><span class="step-time">4 min</span></div>
              </div>
              <div class="step-row">
                <div class="step-number">2</div>
                <div class="step-content"><span class="step-name">Flow – solhälsning</span><span class="step-time">8 min</span></div>
              </div>
              <div class="step-row">
                <div class="step-number">3</div>
                <div class="step-content"><span class="step-name">Stabilitet &amp; balans</span><span class="step-time">5 min</span></div>
              </div>
              <div class="step-row">
                <div class="step-number">4</div>
                <div class="step-content"><span class="step-name">Nedvarvning</span><span class="step-time">3 min</span></div>
              </div>
            </div>
          </div>

          <div class="bottom-action">
            <button class="primary-button" type="button" data-screen="reset">Starta passet</button>
            <button class="secondary-button" type="button" aria-label="Ladda ner offline">↓</button>
          </div>
        </div>
      `;

    case 'reset':
      return `
        <div style="display:flex; flex-direction:column; height:100%;">
          <div class="phone-header" style="padding-top:38px;">
            <div class="title-display" style="font-size:38px; letter-spacing:.2em; text-align:center;">RESET</div>
            <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:16px; color:var(--ink-secondary); text-align:center;">Andning, vila och stillhet</div>
          </div>

          <div class="reset-inner">
            <div class="breathing-orb">
              <div class="breathing-inner active">
                <div style="font-family:'Cormorant Garamond',serif; font-size:30px; color:var(--ink);">4 · 7 · 8</div>
                <div class="breathing-phase">ANDAS IN</div>
              </div>
            </div>
            <div class="reset-subtitle">3 minuter · sänk pulsen före sömn</div>
            <button class="primary-button" type="button" style="width:auto; padding:13px 30px; flex:0;">Börja andas</button>
          </div>

          <div class="reset-actions">
            <div class="section-label-row">
              <div style="font-family:'Cormorant Garamond',serif; font-size:22px; color:var(--ink);">Korta sessioner</div>
              <button class="link-button" type="button">Visa alla 12</button>
            </div>

            <div class="session-cards">
              <button class="list-card" type="button" data-screen="reset">
                <div class="mini-thumb" style="background-image:url('design/uploads/woman-practices-yoga-on-mat-indoors-2026-01-07-01-25-40-utc.jpg');"></div>
                <div class="list-copy">
                  <div class="name">Kvällsnedvarvning</div>
                  <div class="meta">10 min · guidad</div>
                </div>
                <div class="arrow">▸</div>
              </button>

              <button class="list-card" type="button" data-screen="reset">
                <div class="mini-thumb" style="background-image:url('design/uploads/yoga-girl2.png');"></div>
                <div class="list-copy">
                  <div class="name">Stretch för stel rygg</div>
                  <div class="meta">8 min · rörlighet</div>
                </div>
                <div class="arrow">▸</div>
              </button>
            </div>
          </div>
        </div>
      `;

    case 'nutrition':
      return `
        <div class="nutrition-wrap">
          <div class="nutrition-header">
            <div>
              <h2>Näring</h2>
            </div>
            <p class="subcopy">Enkla recept med råvaror du redan har hemma</p>
            <div class="search-bar">Sök recept eller råvara</div>
            <div class="chip-row">
              <button class="chip active" type="button">Efter passet</button>
              <button class="chip" type="button">Frukost</button>
              <button class="chip" type="button">Under 20 min</button>
            </div>
          </div>

          <div class="nutrition-body">
            <div class="hero-recipe" style="background-image:url('design/uploads/bowl-of-fresh-salad-with-cooked-meat-2026-03-25-04-27-28-utc.jpg'); background-size:cover; background-position:50% 50%;">
              <div class="label-tag">BILD: SKÅLAR MED GRÖNT</div>
              <div class="text-wrap">
                <h3>Proteinbowl med linser</h3>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <span class="meta-pill">15 min</span>
                  <span class="meta-pill">28 g protein</span>
                </div>
              </div>
            </div>

            <div class="recipe-row">
              <div class="recipe-thumb" style="background-image:url('design/uploads/oatmeal-cereal-with-blueberries-for-healthy-breakf-2026-03-09-05-15-14-utc.jpg'); background-size:cover; background-position:50% 50%;"></div>
              <div class="recipe-copy">
                <strong>Havregrynsgröt med tahini</strong>
                <span>10 min · frukost · 12 g protein</span>
              </div>
            </div>

            <div class="recipe-row">
              <div class="recipe-thumb" style="background-image:url('design/uploads/savory-chickpea-curry-in-a-black-bowl-with-lemon-w-2026-06-30-23-13-18-utc.jpg'); background-size:cover; background-position:50% 50%;"></div>
              <div class="recipe-copy">
                <strong>Kikärtsgryta med spenat</strong>
                <span>25 min · middag · 22 g protein</span>
              </div>
            </div>

            <div class="shopping-note">
              <span>Veckans inköpslista är uppdaterad</span>
              <button type="button">Öppna</button>
            </div>
          </div>
        </div>
      `;

    case 'routine':
      return `
        <div class="routine-wrap">
          <div class="routine-header">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; flex-direction:column; gap:5px;">
                <h2>Min rutin</h2>
                <div style="font-size:13px; color:var(--ink-tertiary);">Vecka 38</div>
              </div>
              <div style="width:46px; height:46px; border-radius:50%; background-image:url('design/uploads/yoga-girl2.png'); background-size:cover; background-position:center;"></div>
            </div>

            <div class="routine-card">
              <div class="routine-summary">
                <span>3 av 4 pass klara</span>
                <strong>75%</strong>
              </div>
              <div class="progress-track"><span class="progress-fill" style="width:75%"></span></div>
              <div class="week-grid">
                <div class="day-cell"><span class="letter">M</span><div class="day-bar done"></div></div>
                <div class="day-cell"><span class="letter">T</span><div class="day-bar"></div></div>
                <div class="day-cell"><span class="letter">O</span><div class="day-bar done"></div></div>
                <div class="day-cell"><span class="letter">T</span><div class="day-bar"></div></div>
                <div class="day-cell"><span class="letter">F</span><div class="day-bar done"></div></div>
                <div class="day-cell"><span class="letter">L</span><div class="day-bar tomorrow"></div></div>
                <div class="day-cell"><span class="letter">S</span><div class="day-bar tomorrow"></div></div>
              </div>
            </div>
          </div>

          <div style="font-family:'Cormorant Garamond',serif; font-size:22px; color:var(--ink); padding:22px 22px 0; margin:0;">Idag</div>

          <div class="day-list">
            ${state.tasks.map(task => `
              <div class="task-item" data-task-id="${task.id}">
                <button class="task-check ${task.done ? 'done' : ''}" type="button" data-task-toggle="${task.id}">${task.done ? '✓' : ''}</button>
                <div class="task-copy">
                  <strong>${task.title}</strong>
                  <span>${task.meta}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="insight-box">
            <strong>Din rutin håller i 5 veckor</strong>
            <span>Små pass på vardagar och en längre session i helgen – fortsätt så.</span>
          </div>
        </div>
      `;

    default:
      return '';
  }
}

function bindEvents() {
  document.querySelectorAll('[data-screen]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.screen;
      if (target) {
        state.currentScreen = target;
        if (target === 'power') state.activeTab = 'power';
        if (target === 'nutrition') state.activeTab = 'nutrition';
        if (target === 'routine') state.activeTab = 'routine';
        if (target === 'reset') state.activeTab = 'power';
        if (target === 'detail') state.activeTab = 'power';
        render();
      }
    });
  });

  document.querySelectorAll('[data-back]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.back;
      state.currentScreen = target;
      state.activeTab = target === 'nutrition' ? 'nutrition' : target === 'routine' ? 'routine' : 'power';
      render();
    });
  });

  document.querySelectorAll('[data-favorite]').forEach((button) => {
    button.addEventListener('click', () => {
      state.favorite = !state.favorite;
      render();
    });
  });

  document.querySelectorAll('[data-task-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.taskToggle);
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      );
      render();
    });
  });

  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;
      state.activeTab = tab;
      state.currentScreen = tab;
      render();
    });
  });
}

render();
