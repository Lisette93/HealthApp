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
  player: {
    key: 'player',
    title: 'Passpelare',
    type: 'player'
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

const progressStorageKey = 'balans-frontend-progress';
const defaultWeek = {
  completed: 3,
  planned: 4,
  days: [true, false, true, false, true, false, false],
  workoutDayIndex: null
};
const defaultTasks = [
  { id: 1, title: 'Morning flow', meta: '20 min · planerat idag', done: false },
  { id: 2, title: 'Proteinbowl med linser', meta: 'Lunch · 15 min', done: false },
  { id: 3, title: 'Kvällsnedvarvning', meta: '10 min · 21:30', done: false }
];
const savedProgress = loadProgress();

const state = {
  currentScreen: 'home',
  activeTab: 'home',
  favorite: false,
  selectedWorkoutId: 'morning-flow',
  trainingFilters: { level: 2, duration: null, tempo: null },
  breathing: { started: false, running: false, phaseIndex: 0, secondsLeft: 4, sessionSecondsLeft: 180 },
  recipeSearch: '',
  recipeFilter: 'quick',
  recipeFilterManuallySet: false,
  lastWorkoutCompletedAt: savedProgress.lastWorkoutCompletedAt || null,
  week: {
    ...defaultWeek,
    ...(savedProgress.week || {}),
    days: savedProgress.week?.days || [...defaultWeek.days]
  },
  player: {
    started: false,
    running: false,
    completed: false,
    stepIndex: 0,
    secondsLeft: 240
  },
  tasks: defaultTasks.map((task) => ({
    ...task,
    ...(savedProgress.tasks?.find((savedTask) => savedTask.id === task.id) || {})
  }))
};

const workouts = [
  {
    id: 'morning-flow', title: 'Morning flow', minutes: 20, level: 2, tempo: 'medium', popular: true,
    image: 'yoga-girl.png',
    description: 'Ett mjukt men aktivt flöde som väcker höfter, rygg och axlar. Passet börjar lugnt och byggs upp mot stabilitet – passar direkt efter uppstigning.',
    steps: [
      { title: 'Andning & uppvärmning', minutes: 4, cue: 'Hitta ett lugnt andetag och mjuka upp kroppen.' },
      { title: 'Flow – solhälsning', minutes: 8, cue: 'Rör dig mjukt mellan positionerna i ditt eget tempo.' },
      { title: 'Stabilitet & balans', minutes: 5, cue: 'Håll fokus på stadig grund och jämn andning.' },
      { title: 'Nedvarvning', minutes: 3, cue: 'Sänk tempot och låt kroppen landa.' }
    ]
  },
  {
    id: 'core-balance', title: 'Core balance', minutes: 25, level: 3, tempo: 'calm',
    image: 'woman-in-white-outfit-stretches-body-on-mat-2026-03-25-04-30-01-utc.JPG',
    description: 'Ett fokuserat pass med kontrollerade rörelser för bål, höfter och balans. Ta det lugnt och låt varje position få ta plats.',
    steps: [
      { title: 'Rörlighet & kontakt', minutes: 5, cue: 'Hitta kontakten med bålen och förbered kroppen.' },
      { title: 'Styrka från mitten', minutes: 7, cue: 'Arbeta långsamt med stabilitet i varje rörelse.' },
      { title: 'Balans & kontroll', minutes: 8, cue: 'Håll blicken stadig och rör dig med kontroll.' },
      { title: 'Stretch & vila', minutes: 5, cue: 'Släpp på spänningar och avsluta mjukt.' }
    ]
  },
  {
    id: 'power-strength', title: 'Power strength', minutes: 30, level: 2, tempo: 'high',
    image: 'yoga-girl2.png',
    description: 'Ett energifyllt helkroppspass med kroppsvikten som motstånd. Välj ett tempo där du fortfarande kan hålla rörelserna stabila.',
    steps: [
      { title: 'Dynamisk uppvärmning', minutes: 5, cue: 'Väck kroppen med stora, mjuka rörelser.' },
      { title: 'Styrkeflöde', minutes: 10, cue: 'Hitta ett jämnt tempo och använd hela rörelsebanan.' },
      { title: 'Kraft & stabilitet', minutes: 10, cue: 'Håll kroppen stadig när tempot ökar.' },
      { title: 'Nedvarvning', minutes: 5, cue: 'Sänk pulsen med lugna rörelser och andetag.' }
    ]
  },
  {
    id: 'gentle-mobility', title: 'Gentle mobility', minutes: 15, level: 1, tempo: 'calm',
    image: 'woman-stretches-on-mat-in-light-filled-room-2026-03-24-05-13-47-utc.JPG',
    description: 'Ett varsamt rörelsepass för stela axlar, rygg och höfter. Passar när du vill komma igång utan att stressa kroppen.',
    steps: [
      { title: 'Landa i andetaget', minutes: 3, cue: 'Börja lugnt och känn efter hur kroppen känns idag.' },
      { title: 'Mjuk rörlighet', minutes: 4, cue: 'Utforska rörelsen utan att pressa ytterlägen.' },
      { title: 'Höfter & rygg', minutes: 5, cue: 'Låt andetaget guida mjuka rotationer och sträck.' },
      { title: 'Vila', minutes: 3, cue: 'Avsluta med några lugna andetag.' }
    ]
  },
  {
    id: 'pilates-foundation', title: 'Pilates foundation', minutes: 20, level: 2, tempo: 'medium',
    image: 'woman-in-white-outfit-stretches-body-on-mat-2026-03-25-04-30-01-utc.JPG',
    description: 'Bygg styrka med lugna pilatesinspirerade rörelser. Fokus ligger på hållning, andning och ett stabilt centrum.',
    steps: [
      { title: 'Andning & hållning', minutes: 4, cue: 'Länga på ryggraden och hitta ett jämnt andetag.' },
      { title: 'Bålaktivering', minutes: 6, cue: 'Arbeta kontrollerat och behåll kontakten med bålen.' },
      { title: 'Styrka & stabilitet', minutes: 6, cue: 'Låt rörelsen vara liten, stadig och medveten.' },
      { title: 'Avslappning', minutes: 4, cue: 'Mjukna i kroppen och låt andningen bli fri.' }
    ]
  },
  {
    id: 'evening-unwind', title: 'Evening unwind', minutes: 15, level: 1, tempo: 'calm',
    image: 'woman-practices-yoga-on-mat-indoors-2026-01-07-01-25-40-utc.jpg',
    description: 'Lugna positioner och mjuka sträck för att varva ner efter dagen. Håll rörelserna bekväma och andas utan ansträngning.',
    steps: [
      { title: 'Lugn start', minutes: 3, cue: 'Låt axlarna sjunka och hitta ett långsamt andetag.' },
      { title: 'Mjuka sträck', minutes: 5, cue: 'Stanna där sträcken känns behaglig.' },
      { title: 'Vila för ryggen', minutes: 4, cue: 'Låt ryggen vila mot underlaget.' },
      { title: 'Avslut', minutes: 3, cue: 'Ta några andetag innan du reser dig.' }
    ]
  }
];

let workoutTimer = null;
let breathingTimer = null;
const breathingPhases = [
  { label: 'ANDAS IN', seconds: 4 },
  { label: 'HÅLL', seconds: 7 },
  { label: 'ANDAS UT', seconds: 8 }
];
const tempoLabels = { calm: 'Lugnt', medium: 'Medel', high: 'Högt' };

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
  const isPlayer = state.currentScreen === 'player';

  app.innerHTML = `
    <div class="phone ${isReset ? 'reset-screen' : ''} ${isPlayer ? 'player-screen' : ''}">
      <div class="app-content">
        ${renderScreen(screen)}
      </div>
      ${isPlayer ? '' : `
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
      `}
    </div>
  `;

  bindEvents();
}

function renderScreen(screen) {
  switch (screen.key) {
    case 'home':
      return `
        <div class="home-screen" style="display:flex; flex-direction:column; height:100%;">
          <div class="hero" style="background-image:url('design/uploads/yoga-girl.png');">
            <div class="hero-content">
              <h1 class="hero-greeting">God morgon, Elin</h1>
              <p class="muted-copy">Du har gjort 3 pass den här veckan</p>
                  <button class="cta-button" type="button" data-screen="power">Utforska pass</button>
            </div>
          </div>

          <div class="home-feed" style="display:flex; flex-direction:column; gap:26px; padding-top:26px; overflow:hidden;">
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
                <button class="feature-card" type="button" data-screen="power" style="background-image:url('design/uploads/woman-stretches-on-mat-in-light-filled-room-2026-03-24-05-13-47-utc.JPG');">
                  <div class="label"><span>RÖRLIGHET</span></div>
                  <div class="subtitle">Mjukt &amp; följsamt</div>
                </button>
                <button class="feature-card" type="button" data-screen="power" style="background-image:url('design/uploads/woman-in-white-outfit-stretches-body-on-mat-2026-03-25-04-30-01-utc.JPG');">
                  <div class="label"><span>STYRKA</span></div>
                  <div class="subtitle">Stabilitet &amp; fokus</div>
                </button>
                <button class="feature-card reset" type="button" data-screen="reset" style="background-image:url('design/uploads/woman-practices-yoga-on-mat-indoors-2026-01-07-01-25-40-utc.jpg');">
                  <div class="label"><span>VILA</span></div>
                  <div class="subtitle">Lugn efter dagen</div>
                </button>
              </div>
            </div>

            <div class="section-block">
              <div class="section-header">
                <div class="section-title">Fortsätt där du var</div>
                <button class="link-button" type="button" data-screen="power">Se allt</button>
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
        <div class="power-screen" style="position:relative; flex:1; display:flex; flex-direction:column; overflow:hidden;">
          <div style="position:absolute; top:-60px; right:-90px; width:260px; height:260px; border-radius:50%; border:1px solid var(--decor-ring);"></div>
          <div style="position:absolute; top:120px; left:-120px; width:240px; height:240px; border-radius:50%; border:1px solid var(--decor-ring);"></div>

          <div class="phone-header">
            <div class="title-display" style="font-size:38px; letter-spacing:.2em; text-align:center;">POWER</div>
            <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:16px; color:var(--ink-secondary); text-align:center;">Rörelse för energi och stabilitet</div>
          </div>

          <div class="filter-row" style="padding-top:24px;">
            ${renderTrainingFilter('level', state.trainingFilters.level === null ? 'Nivå' : `Nivå ${state.trainingFilters.level}`)}
            ${renderTrainingFilter('duration', state.trainingFilters.duration === null ? 'Tid' : `${state.trainingFilters.duration} min`)}
            ${renderTrainingFilter('tempo', state.trainingFilters.tempo === null ? 'Tempo' : tempoLabels[state.trainingFilters.tempo])}
          </div>

          <div class="help-text">Alla pass är 15–30 minuter och anpassade att utföra när och var du vill.</div>

          <div class="session-list">
            ${workouts.map((workout) => `
              <button class="workout-card" type="button" data-screen="detail" data-workout="${workout.id}" data-level="${workout.level}" data-duration="${workout.minutes}" data-tempo="${workout.tempo}" style="background-image:url('design/uploads/${workout.image}');">
                <div class="card-header">
                  <div class="title">${workout.title}</div>
                  ${workout.popular ? '<div class="badge">Populär</div>' : ''}
                </div>
                <div class="card-footer">
                  <span class="meta-pill">${workout.minutes} min</span>
                  <span class="meta-pill">Nivå ${workout.level}</span>
                  <span class="meta-pill">${tempoLabels[workout.tempo]}</span>
                </div>
              </button>
            `).join('')}
            <p class="workout-empty" hidden>Inga pass matchar de här filtren.</p>
          </div>
        </div>
      `;

    case 'detail': {
      const workout = getSelectedWorkout();
      return `
        <div class="detail-shell">
          <div class="detail-hero" style="background-image:url('design/uploads/${workout.image}');">
            <div class="top-controls">
              <button class="icon-button" type="button" data-back="power" aria-label="Gå tillbaka">←</button>
              <button class="icon-button" type="button" data-favorite="toggle" aria-label="Favorit">${state.favorite ? '♥' : '♡'}</button>
            </div>
            <div class="title-wrap">
              <p class="kicker">POWER · ${tempoLabels[workout.tempo].toUpperCase()}</p>
              <h2 class="detail-title">${workout.title}</h2>
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-box"><strong>${workout.minutes}</strong><span>minuter</span></div>
            <div class="meta-box"><strong>Nivå ${workout.level}</strong><span>${tempoLabels[workout.tempo].toLowerCase()}</span></div>
            <div class="meta-box"><strong>Matta</strong><span>utrustning</span></div>
          </div>

          <div class="description-block">
            ${workout.description}
          </div>

          <div class="steps-block">
            <h3 class="steps-title">Så går passet till</h3>
            <div class="step-list">
              ${workout.steps.map((step, index) => `
                <div class="step-row">
                  <div class="step-number">${index + 1}</div>
                  <div class="step-content"><span class="step-name">${step.title}</span><span class="step-time">${step.minutes} min</span></div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="bottom-action">
            <button class="primary-button" type="button" data-player-start>${state.player.started && !state.player.completed ? 'Fortsätt passet' : 'Starta passet'}</button>
            <button class="secondary-button" type="button" aria-label="Ladda ner offline">↓</button>
          </div>
        </div>
      `;
    }

    case 'player':
      return renderPlayer();

    case 'reset':
      return `
        <div class="reset-layout" style="display:flex; flex-direction:column; height:100%;">
          <div class="phone-header" style="padding-top:38px;">
            <div class="title-display" style="font-size:38px; letter-spacing:.2em; text-align:center;">RESET</div>
            <div style="font-family:'Cormorant Garamond',serif; font-style:italic; font-size:16px; color:var(--ink-secondary); text-align:center;">Andning, vila och stillhet</div>
          </div>

          <div class="reset-inner">
            <div class="breathing-orb">
              <div class="breathing-inner ${state.breathing.running ? `active phase-${state.breathing.phaseIndex}` : ''}">
                <div class="breathing-count" aria-live="polite">${state.breathing.running ? state.breathing.secondsLeft : '4 · 7 · 8'}</div>
                <div class="breathing-phase">${state.breathing.running ? breathingPhases[state.breathing.phaseIndex].label : 'ANDAS IN'}</div>
              </div>
            </div>
            <div class="reset-subtitle">3 minuter · sänk pulsen före sömn</div>
            <button class="primary-button" type="button" data-breathing-toggle style="width:auto; padding:13px 30px; flex:0;">${state.breathing.running ? 'Pausa' : state.breathing.sessionSecondsLeft === 0 ? 'Börja igen' : state.breathing.started ? 'Fortsätt andas' : 'Börja andas'}</button>
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

    case 'nutrition': {
      const recipeFilter = getActiveRecipeFilter();
      return `
        <div class="nutrition-wrap">
          <div class="nutrition-header">
            <div>
              <h2>Näring</h2>
            </div>
            <p class="subcopy">Enkla recept med råvaror du redan har hemma</p>
            <input class="search-bar" type="search" data-recipe-search placeholder="Sök recept eller råvara" value="${state.recipeSearch || ''}" aria-label="Sök recept eller råvara" />
            <div class="chip-row">
              <button class="chip ${recipeFilter === 'post-workout' ? 'active' : ''}" type="button" data-recipe-filter="post-workout">Efter passet</button>
              <button class="chip ${recipeFilter === 'breakfast' ? 'active' : ''}" type="button" data-recipe-filter="breakfast">Frukost</button>
              <button class="chip ${recipeFilter === 'quick' ? 'active' : ''}" type="button" data-recipe-filter="quick">Under 20 min</button>
            </div>
          </div>

          <div class="nutrition-body">
            <div class="hero-recipe recipe-item" data-recipe-tags="post-workout quick" ${recipeMatchesFilter(recipeFilter, 'post-workout quick') ? '' : 'hidden'} style="background-image:url('design/uploads/bowl-of-fresh-salad-with-cooked-meat-2026-03-25-04-27-28-utc.jpg'); background-size:cover; background-position:50% 50%;">
              <div class="label-tag">BILD: SKÅLAR MED GRÖNT</div>
              <div class="text-wrap">
                <h3>Proteinbowl med linser</h3>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <span class="meta-pill">15 min</span>
                  <span class="meta-pill">28 g protein</span>
                </div>
              </div>
            </div>

            <div class="recipe-row recipe-item" data-recipe-tags="breakfast quick" ${recipeMatchesFilter(recipeFilter, 'breakfast quick') ? '' : 'hidden'}>
              <div class="recipe-thumb" style="background-image:url('design/uploads/oatmeal-cereal-with-blueberries-for-healthy-breakf-2026-03-09-05-15-14-utc.jpg'); background-size:cover; background-position:50% 50%;"></div>
              <div class="recipe-copy">
                <strong>Havregrynsgröt med tahini</strong>
                <span>10 min · frukost · 12 g protein</span>
              </div>
            </div>

            <div class="recipe-row recipe-item" data-recipe-tags="post-workout" ${recipeMatchesFilter(recipeFilter, 'post-workout') ? '' : 'hidden'}>
              <div class="recipe-thumb" style="background-image:url('design/uploads/savory-chickpea-curry-in-a-black-bowl-with-lemon-w-2026-06-30-23-13-18-utc.jpg'); background-size:cover; background-position:50% 50%;"></div>
              <div class="recipe-copy">
                <strong>Kikärtsgryta med spenat</strong>
                <span>25 min · middag · 22 g protein</span>
              </div>
            </div>

            <div class="recipe-row recipe-item" data-recipe-tags="breakfast quick" ${recipeMatchesFilter(recipeFilter, 'breakfast quick') ? '' : 'hidden'}>
              <div class="recipe-thumb" style="background-image:url('design/uploads/healthy-chia-seed-pudding-with-fresh-blueberries-a-2026-09-11-18-37-12-utc-web.jpg'); background-size:cover; background-position:50% 50%;"></div>
              <div class="recipe-copy">
                <strong>Overnight oats med blåbär</strong>
                <span>5 min · frukost · förbered kvällen före</span>
              </div>
            </div>

            <div class="recipe-row recipe-item" data-recipe-tags="post-workout quick" ${recipeMatchesFilter(recipeFilter, 'post-workout quick') ? '' : 'hidden'}>
              <div class="recipe-thumb" style="background-image:url('design/uploads/bowl-of-fresh-salad-with-cooked-meat-2026-03-25-04-27-28-utc.jpg'); background-size:cover; background-position:35% 50%;"></div>
              <div class="recipe-copy">
                <strong>Grön linssallad med citron</strong>
                <span>15 min · lunch · 18 g protein</span>
              </div>
            </div>

            <div class="recipe-row recipe-item" data-recipe-tags="breakfast quick" ${recipeMatchesFilter(recipeFilter, 'breakfast quick') ? '' : 'hidden'}>
              <div class="recipe-thumb" style="background-image:url('design/uploads/fresh-strawberries-and-seeds-in-healthy-yogurt-bow-2026-09-21-17-02-05-utc (1).jpeg'); background-size:cover; background-position:50% 50%;"></div>
              <div class="recipe-copy">
                <strong>Yoghurt med bär &amp; frön</strong>
                <span>8 min · frukost · enkelt att variera</span>
              </div>
            </div>

            <div class="shopping-note">
              <span>Veckans inköpslista är uppdaterad</span>
              <button type="button">Öppna</button>
            </div>
          </div>
        </div>
      `;
    }

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
                <span>${state.week.completed} av ${state.week.planned} pass klara</span>
                <strong>${Math.round((state.week.completed / state.week.planned) * 100)}%</strong>
              </div>
              <div class="progress-track"><span class="progress-fill" style="width:${(state.week.completed / state.week.planned) * 100}%"></span></div>
              <div class="week-grid">
                ${['M', 'T', 'O', 'T', 'F', 'L', 'S'].map((day, index) => `
                  <div class="day-cell"><span class="letter">${day}</span><div class="day-bar ${state.week.days[index] ? 'done' : index > 4 ? 'tomorrow' : ''}"></div></div>
                `).join('')}
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
  document.querySelectorAll('[data-training-filter]').forEach((button) => {
    button.addEventListener('click', () => cycleTrainingFilter(button.dataset.trainingFilter));
  });

  document.querySelectorAll('[data-breathing-toggle]').forEach((button) => {
    button.addEventListener('click', toggleBreathing);
  });

  document.querySelectorAll('[data-player-start]').forEach((button) => {
    button.addEventListener('click', startWorkout);
  });

  document.querySelectorAll('[data-player-pause]').forEach((button) => {
    button.addEventListener('click', toggleWorkoutTimer);
  });

  document.querySelectorAll('[data-player-next]').forEach((button) => {
    button.addEventListener('click', advanceWorkoutStep);
  });

  document.querySelectorAll('[data-player-exit]').forEach((button) => {
    button.addEventListener('click', () => {
      pauseWorkoutTimer();
      state.currentScreen = 'detail';
      render();
    });
  });

  document.querySelectorAll('[data-completion-nav]').forEach((button) => {
    button.addEventListener('click', () => {
      pauseWorkoutTimer();
      const target = button.dataset.completionNav;
      state.currentScreen = target;
      state.activeTab = target;
      render();
    });
  });

  document.querySelectorAll('[data-player-done]').forEach((button) => {
    button.addEventListener('click', () => {
      completeWorkout();
    });
  });

  document.querySelectorAll('[data-screen]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.screen;
      if (target) {
        if (target === 'detail' && button.dataset.workout) {
          state.selectedWorkoutId = button.dataset.workout;
          state.player = { started: false, running: false, completed: false, stepIndex: 0, secondsLeft: getSelectedWorkout().steps[0].minutes * 60 };
        }
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
      const task = state.tasks.find((item) => item.id === id);
      if (task) {
        task.done = !task.done;
        if (id === 1) updateWorkoutRoutine(task.done);
        if (id === 1 && !task.done) task.meta = '20 min · planerat idag';
        saveProgress();
      }
      render();
    });
  });

  document.querySelectorAll('[data-recipe-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      state.recipeFilter = button.dataset.recipeFilter;
      state.recipeFilterManuallySet = true;
      render();
    });
  });

  document.querySelector('[data-recipe-search]')?.addEventListener('input', (event) => {
    state.recipeSearch = event.currentTarget.value;
    updateRecipeList();
  });

  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;
      state.activeTab = tab;
      state.currentScreen = tab;
      render();
    });
  });

  updateTrainingList();
  updateRecipeList();
}

function renderTrainingFilter(key, label) {
  const active = state.trainingFilters[key] !== null;
  return `
    <button class="filter-chip ${active ? 'active' : ''}" type="button" data-training-filter="${key}">
      ${active && key === 'level' ? '<span class="dot"></span>' : ''}${label}
    </button>
  `;
}

function getSelectedWorkout() {
  return workouts.find((workout) => workout.id === state.selectedWorkoutId) || workouts[0];
}

function cycleTrainingFilter(key) {
  const options = {
    level: [1, 2, 3, null],
    duration: [15, 20, 25, 30, null],
    tempo: ['calm', 'medium', 'high', null]
  };
  const values = options[key];
  const currentIndex = values.indexOf(state.trainingFilters[key]);
  state.trainingFilters[key] = values[(currentIndex + 1) % values.length];
  render();
}

function updateTrainingList() {
  const cards = [...document.querySelectorAll('.workout-card[data-level]')];
  if (!cards.length) return;
  const visibleCount = cards.filter((card) => {
    const filters = state.trainingFilters;
    const matches = (filters.level === null || Number(card.dataset.level) === filters.level) &&
      (filters.duration === null || Number(card.dataset.duration) === filters.duration) &&
      (filters.tempo === null || card.dataset.tempo === filters.tempo);
    card.hidden = !matches;
    return matches;
  }).length;
  const emptyState = document.querySelector('.workout-empty');
  if (emptyState) emptyState.hidden = visibleCount > 0;
}

function updateRecipeList() {
  const items = [...document.querySelectorAll('.recipe-item')];
  if (!items.length) return;
  const activeFilter = getActiveRecipeFilter();
  const query = state.recipeSearch.trim().toLocaleLowerCase('sv-SE');
  items.forEach((item) => {
    const matchesFilter = recipeMatchesFilter(activeFilter, item.dataset.recipeTags);
    const matchesQuery = item.textContent.toLocaleLowerCase('sv-SE').includes(query);
    item.hidden = !(matchesFilter && matchesQuery);
  });
}

function toggleBreathing() {
  if (state.breathing.running) {
    window.clearInterval(breathingTimer);
    breathingTimer = null;
    state.breathing.running = false;
    render();
    return;
  }

  if (state.breathing.sessionSecondsLeft === 0) {
    state.breathing = { started: false, running: false, phaseIndex: 0, secondsLeft: 4, sessionSecondsLeft: 180 };
  }
  state.breathing.started = true;
  state.breathing.running = true;
  render();
  breathingTimer = window.setInterval(tickBreathing, 1000);
}

function tickBreathing() {
  const breathing = state.breathing;
  breathing.sessionSecondsLeft -= 1;
  breathing.secondsLeft -= 1;
  if (breathing.sessionSecondsLeft <= 0) {
    window.clearInterval(breathingTimer);
    breathingTimer = null;
    breathing.running = false;
    breathing.sessionSecondsLeft = 0;
    render();
    return;
  }

  if (breathing.secondsLeft <= 0) {
    breathing.phaseIndex = (breathing.phaseIndex + 1) % breathingPhases.length;
    breathing.secondsLeft = breathingPhases[breathing.phaseIndex].seconds;
    render();
    return;
  }

  const count = document.querySelector('.breathing-count');
  if (count) count.textContent = breathing.secondsLeft;
}

function renderPlayer() {
  const { player } = state;
  const workout = getSelectedWorkout();
  const workoutSteps = workout.steps;
  const currentStep = workoutSteps[player.stepIndex];
  const totalSeconds = workout.minutes * 60;
  const elapsedSeconds = totalSeconds - workoutSteps
    .slice(player.stepIndex + 1)
    .reduce((total, step) => total + step.minutes * 60, 0) - player.secondsLeft;
  const progress = player.completed ? 100 : Math.max(0, Math.min(100, (elapsedSeconds / totalSeconds) * 100));
  const minutes = Math.floor(player.secondsLeft / 60).toString().padStart(2, '0');
  const seconds = (player.secondsLeft % 60).toString().padStart(2, '0');

  if (player.completed) {
    return `
      <div class="player-complete">
        <div class="complete-mark" aria-hidden="true">✓</div>
        <p class="player-kicker">${workout.title.toUpperCase()} · ${workout.minutes} MIN</p>
        <h1>Fint jobbat, Elin.</h1>
        <p class="player-cue">Du har genomfört hela passet. Ta en stund och känn efter hur kroppen mår.</p>
        <div class="completion-actions">
          <button class="primary-button" type="button" data-completion-nav="routine">Visa min rutin</button>
          <button class="completion-secondary" type="button" data-completion-nav="nutrition">Hitta något gott</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="player-layout">
      <header class="player-header">
        <button class="icon-button" type="button" data-player-exit aria-label="Avsluta spelaren">←</button>
        <div class="player-header-copy">
          <span class="player-kicker">${workout.title.toUpperCase()}</span>
          <span class="player-step-count">STEG ${player.stepIndex + 1} AV ${workoutSteps.length}</span>
        </div>
        <span class="player-header-spacer" aria-hidden="true"></span>
      </header>

      <div class="player-progress" aria-label="Passförlopp">
        <div class="progress-track"><span class="progress-fill" style="width:${progress}%"></span></div>
      </div>

      <main class="player-main">
        <div class="player-orbit" aria-hidden="true">
          <div class="player-orbit-inner ${player.running ? 'is-running' : ''}">
            <span class="player-timer" aria-live="off">${minutes}:${seconds}</span>
            <span class="player-timer-label">KVAR I STEGET</span>
          </div>
        </div>
        <p class="player-kicker">BLOCK ${String(player.stepIndex + 1).padStart(2, '0')}</p>
        <h1 class="player-step-title">${currentStep.title}</h1>
        <p class="player-cue">${currentStep.cue}</p>
      </main>

      <div class="player-step-list">
        ${workoutSteps.map((step, index) => `
          <div class="player-step-row ${index === player.stepIndex ? 'current' : ''} ${index < player.stepIndex ? 'passed' : ''}">
            <span class="player-step-index">${index < player.stepIndex ? '✓' : String(index + 1).padStart(2, '0')}</span>
            <span class="player-step-name">${step.title}</span>
            <span class="player-step-duration">${step.minutes} min</span>
          </div>
        `).join('')}
      </div>

      <footer class="player-controls">
        <button class="player-control-secondary" type="button" data-player-exit aria-label="Lämna passet">Lämna</button>
        <button class="player-control-primary" type="button" data-player-pause>${player.running ? 'Pausa' : 'Fortsätt'}</button>
        <button class="player-control-secondary" type="button" data-player-next>${player.stepIndex === workoutSteps.length - 1 ? 'Avsluta' : 'Nästa'}</button>
      </footer>
    </div>
  `;
}

function startWorkout() {
  const workoutSteps = getSelectedWorkout().steps;
  if (!state.player.started || state.player.completed) {
    state.player = {
      started: true,
      running: false,
      completed: false,
      stepIndex: 0,
      secondsLeft: workoutSteps[0].minutes * 60
    };
  }

  state.currentScreen = 'player';
  state.activeTab = 'power';
  state.player.running = true;
  render();
  workoutTimer = window.setInterval(tickWorkoutTimer, 1000);
}

function toggleWorkoutTimer() {
  if (state.player.running) {
    pauseWorkoutTimer();
  } else {
    state.player.running = true;
    workoutTimer = window.setInterval(tickWorkoutTimer, 1000);
  }
  render();
}

function pauseWorkoutTimer() {
  if (workoutTimer !== null) {
    window.clearInterval(workoutTimer);
    workoutTimer = null;
  }
  state.player.running = false;
}

function tickWorkoutTimer() {
  if (state.player.secondsLeft > 1) {
    state.player.secondsLeft -= 1;
    updatePlayerTimerDisplay();
    return;
  }
  advanceWorkoutStep();
}

function advanceWorkoutStep() {
  const workoutSteps = getSelectedWorkout().steps;
  if (state.player.stepIndex >= workoutSteps.length - 1) {
    completeWorkout();
    return;
  }

  state.player.stepIndex += 1;
  state.player.secondsLeft = workoutSteps[state.player.stepIndex].minutes * 60;
  render();
}

function completeWorkout() {
  pauseWorkoutTimer();
  const workout = getSelectedWorkout();
  const workoutTask = state.tasks.find((task) => task.id === 1);
  if (workoutTask && !workoutTask.done) {
    workoutTask.done = true;
    workoutTask.title = workout.title;
    workoutTask.meta = `${workout.minutes} min · klart ${new Intl.DateTimeFormat('sv-SE', { hour: '2-digit', minute: '2-digit' }).format(new Date())}`;
    updateWorkoutRoutine(true);
  }
  state.lastWorkoutCompletedAt = Date.now();
  state.recipeFilter = 'post-workout';
  state.recipeFilterManuallySet = false;
  state.player.completed = true;
  state.currentScreen = 'player';
  saveProgress();
  render();
}

function loadProgress() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(progressStorageKey) || '{}');
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
  } catch {
    return {};
  }
}

function saveProgress() {
  try {
    window.localStorage.setItem(progressStorageKey, JSON.stringify({
      lastWorkoutCompletedAt: state.lastWorkoutCompletedAt,
      week: state.week,
      tasks: state.tasks
    }));
  } catch {
    // Keep the prototype usable when storage is unavailable.
  }
}

function updateWorkoutRoutine(done) {
  const { week } = state;
  if (done) {
    if (week.workoutDayIndex !== null || week.completed >= week.planned) return;
    const dayIndex = week.days.slice(0, 5).findIndex((isDone) => !isDone);
    if (dayIndex !== -1) {
      week.days[dayIndex] = true;
      week.workoutDayIndex = dayIndex;
      week.completed += 1;
    }
    return;
  }

  if (week.workoutDayIndex !== null) {
    week.days[week.workoutDayIndex] = false;
    week.workoutDayIndex = null;
    week.completed = Math.max(0, week.completed - 1);
  }
}

function getActiveRecipeFilter() {
  const recentWorkout = state.lastWorkoutCompletedAt !== null &&
    Date.now() - state.lastWorkoutCompletedAt < 2 * 60 * 60 * 1000;
  if (recentWorkout && !state.recipeFilterManuallySet) return 'post-workout';
  if (state.recipeFilter === 'post-workout' && !recentWorkout) return 'quick';
  return state.recipeFilter;
}

function recipeMatchesFilter(filter, tags) {
  return tags.split(' ').includes(filter);
}

function updatePlayerTimerDisplay() {
  const timer = document.querySelector('.player-timer');
  if (!timer) return;
  const minutes = Math.floor(state.player.secondsLeft / 60).toString().padStart(2, '0');
  const seconds = (state.player.secondsLeft % 60).toString().padStart(2, '0');
  timer.textContent = `${minutes}:${seconds}`;
}

render();
