// ============ DATA ============
const scheduleData = [
  { name: 'Силовой CrossFit', trainer: 'Александр Волков', time: '07:00 – 08:00', type: 'group', emoji: '🏋️' },
  { name: 'Йога Утренняя', trainer: 'Мария Соколова', time: '08:00 – 09:00', type: 'group', emoji: '🧘' },
  { name: 'Кардио Blast', trainer: 'Дмитрий Кузнецов', time: '09:30 – 10:30', type: 'group', emoji: '🏃' },
  { name: 'Персональная', trainer: 'Александр Волков', time: '10:00 – 11:00', type: 'personal', emoji: '👤' },
  { name: 'Зумба Dance', trainer: 'Анна Петрова', time: '11:00 – 12:00', type: 'group', emoji: '💃' },
  { name: 'Пилатес', trainer: 'Мария Соколова', time: '12:00 – 13:00', type: 'group', emoji: '🌿' },
  { name: 'Программа Похудения', trainer: 'Дмитрий Кузнецов', time: '14:00 – 15:00', type: 'special', emoji: '🔥' },
  { name: 'Бокс / Единоборства', trainer: 'Игорь Смирнов', time: '16:00 – 17:00', type: 'group', emoji: '🥊' },
  { name: 'Персональная', trainer: 'Мария Соколова', time: '17:00 – 18:00', type: 'personal', emoji: '👤' },
  { name: 'Вечерний CrossFit', trainer: 'Александр Волков', time: '18:00 – 19:00', type: 'group', emoji: '⚡' },
  { name: 'Программа набора массы', trainer: 'Игорь Смирнов', time: '19:00 – 20:00', type: 'special', emoji: '💪' },
  { name: 'Стретчинг', trainer: 'Анна Петрова', time: '20:00 – 21:00', type: 'group', emoji: '🤸' },
];

const trainersData = [
  { name: 'Александр Волков', spec: 'Силовые тренировки · CrossFit', exp: '12 лет', emoji: '💪', photo: 'Тренер_Волков.jpg', tags: ['Кроссфит', 'Силовые', 'Функционал'] },
  { name: 'Мария Соколова', spec: 'Йога · Пилатес · Растяжка', exp: '9 лет', emoji: '🧘', photo: 'Тренер_Соколова.jpg', tags: ['Йога', 'Пилатес', 'Стретчинг'] },
  { name: 'Дмитрий Кузнецов', spec: 'Кардио · Похудение · Кроссфит', exp: '8 лет', emoji: '🏃', photo: 'Тренер_Кузнецов.jpg', tags: ['Кардио', 'HIIT', 'Похудение'] },
  { name: 'Анна Петрова', spec: 'Зумба · Танцевальный фитнес', exp: '7 лет', emoji: '💃', photo: 'Тренер_Петрова.jpg', tags: ['Зумба', 'Аэробика', 'Танцы'] },
  { name: 'Игорь Смирнов', spec: 'Бодибилдинг · Единоборства', exp: '15 лет', emoji: '🥊', photo: 'Тренер_Смирнов.jpg', tags: ['Бодибилдинг', 'Бокс', 'Масса'] },
];

const blogData = [
  { title: '5 ошибок в технике приседа, которые мешают вашему прогрессу', tag: 'Тренировки', cat: 'training', emoji: '🏋️', date: '1 июн 2026', read: '5 мин', excerpt: 'Разбираем самые распространённые технические ошибки и объясняем, как их исправить для максимального результата.' },
  { title: 'Питание до и после тренировки: что есть и когда', tag: 'Питание', cat: 'nutrition', emoji: '🥗', date: '30 май 2026', read: '7 мин', excerpt: 'Подробный гайд по предтренировочному и послетренировочному питанию от нашего нутрициолога.' },
  { title: 'Как не бросить тренировки через месяц: психология мотивации', tag: 'Мотивация', cat: 'motivation', emoji: '🔥', date: '28 май 2026', read: '6 мин', excerpt: 'Научные исследования и практические советы для формирования устойчивой привычки тренироваться.' },
  { title: 'Открытие нового зала функционального тренинга', tag: 'Новости', cat: 'news', emoji: '🎉', date: '25 май 2026', read: '3 мин', excerpt: 'APEX FIT открывает новую зону с функциональным оборудованием TRX, гирями и батутами.' },
  { title: 'Кардио vs Силовые: что выбрать для похудения?', tag: 'Тренировки', cat: 'training', emoji: '⚖️', date: '22 май 2026', read: '8 мин', excerpt: 'Отвечаем на один из самых популярных вопросов с опорой на научные данные и практику.' },
  { title: 'Протеин: мифы и реальность. Разбираем с нутрициологом', tag: 'Питание', cat: 'nutrition', emoji: '🥛', date: '20 май 2026', read: '9 мин', excerpt: 'Сколько белка нужно реально, работает ли протеиновый коктейль и как выбрать добавку.' },
];

// ============ AUTH & USER STATE ============
let currentUser = null;

function loadCurrentUser() {
  const userJson = localStorage.getItem('currentUser');
  if (userJson) {
    currentUser = JSON.parse(userJson);
    return true;
  }
  currentUser = null;
  return false;
}

function saveCurrentUser(user) {
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('currentUser');
  currentUser = null;
  window.location.href = 'profile.html';
}

// Регистрация
function register(email, password, name) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Пользователь с таким email уже существует' };
  }
  const newUser = { id: Date.now(), email, password, name, bookings: [] };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  // Автоматический вход
  saveCurrentUser({ id: newUser.id, email, name });
  return { success: true };
}

function login(email, password) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return { success: false, error: 'Неверный email или пароль' };
  }
  saveCurrentUser({ id: user.id, email, name: user.name });
  return { success: true };
}

function updateUserBookings(updatedBookings) {
  if (!currentUser) return;
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].bookings = updatedBookings;
    localStorage.setItem('users', JSON.stringify(users));
    // обновление сессии
    currentUser.bookings = updatedBookings;
    saveCurrentUser(currentUser);
  }
}

function getUserBookings() {
  if (!currentUser) return [];
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.id === currentUser.id);
  return user ? user.bookings || [] : [];
}

// Добавление новой записи (вызывается при успешном бронировании)
function addBooking(booking) {
  if (!currentUser) return false;
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    const userBookings = users[userIndex].bookings || [];
    const newBooking = { id: Date.now(), ...booking, createdAt: new Date().toISOString() };
    userBookings.push(newBooking);
    users[userIndex].bookings = userBookings;
    localStorage.setItem('users', JSON.stringify(users));
    // обновить currentUser
    currentUser.bookings = userBookings;
    saveCurrentUser(currentUser);
    return true;
  }
  return false;
}

function cancelBooking(bookingId) {
  if (!currentUser) return;
  let bookings = getUserBookings();
  const updated = bookings.filter(b => b.id != bookingId);
  updateUserBookings(updated);
}

// ============ NAVIGATION HELPERS ============
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
    else link.classList.remove('active');
  });
  document.querySelectorAll('.mobile-nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
    else link.classList.remove('active');
  });
}

// ============ SCROLL EFFECTS ============
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  const floatingCta = document.getElementById('floatingCta');
  if (floatingCta) {
    if (window.scrollY > 300 && !window.location.pathname.includes('onlinezap')) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  }
  initReveal();
});

function initReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('visible');
  });
}

// ============ BEFORE/AFTER SLIDER ============
function initSlider() {
  const slider = document.getElementById('baSlider');
  if (!slider) return;
  const sliderAfter = document.getElementById('sliderAfter');
  const sliderHandle = document.getElementById('sliderHandle');
  let isDragging = false;

  function setSliderPos(pct) {
    pct = Math.max(5, Math.min(95, pct));
    sliderAfter.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    sliderHandle.style.left = pct + '%';
  }
  setSliderPos(50);

  slider.addEventListener('mousedown', () => { isDragging = true; });
  slider.addEventListener('touchstart', () => { isDragging = true; });
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const rect = slider.getBoundingClientRect();
    setSliderPos(((e.clientX - rect.left) / rect.width) * 100);
  });
  window.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const rect = slider.getBoundingClientRect();
    setSliderPos(((e.touches[0].clientX - rect.left) / rect.width) * 100);
  });
}

// ============ SCHEDULE ============
function renderSchedule(filter = 'all') {
  const grid = document.getElementById('scheduleGrid');
  if (!grid) return;
  const filtered = filter === 'all' ? scheduleData : scheduleData.filter(i => i.type === filter);
  grid.innerHTML = filtered.map(item => `
    <div class="schedule-card reveal" data-type="${item.type}">
      <span class="schedule-type type-${item.type}">
        ${item.type === 'group' ? 'Групповое' : item.type === 'personal' ? 'Персональное' : 'Спец. программа'}
      </span>
      <div class="schedule-name">${item.emoji} ${item.name}</div>
      <div class="schedule-meta">
        <span class="schedule-trainer">👤 ${item.trainer}</span>
        <span class="schedule-time">⏰ ${item.time}</span>
      </div>
      <button class="schedule-action" onclick="location.href='onlinezap.html'">Записаться</button>
    </div>
  `).join('');
  setTimeout(initReveal, 50);
}

function filterSchedule(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSchedule(type);
}

// ============ TRAINERS ============
function renderTrainers() {
  const grid = document.getElementById('trainersGrid');
  if (!grid) return;
  grid.innerHTML = trainersData.map(t => `
    <div class="trainer-card reveal">
      <div class="trainer-photo">
        <img src="${t.photo}" alt="${t.name}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" onerror="this.style.display='none';this.nextElementSibling&&(this.nextElementSibling.style.display='flex')">
        <div class="trainer-photo-overlay">
          <button class="trainer-overlay-btn" onclick="location.href='onlinezap.html'">Записаться</button>
        </div>
      </div>
      <div class="trainer-info">
        <div class="trainer-name">${t.name}</div>
        <div class="trainer-spec">${t.spec}</div>
        <div class="trainer-tags">
          ${t.tags.map(tag => `<span class="trainer-tag">${tag}</span>`).join('')}
          <span class="trainer-tag">📅 Опыт: ${t.exp}</span>
        </div>
      </div>
    </div>
  `).join('');
  setTimeout(initReveal, 50);
}

// ============ BLOG ============
function renderBlog(filter = 'all') {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;
  const filtered = filter === 'all' ? blogData : blogData.filter(i => i.cat === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="blog-card reveal">
      <div class="blog-img">${p.emoji}</div>
      <div class="blog-body">
        <span class="blog-tag">${p.tag}</span>
        <div class="blog-title">${p.title}</div>
        <p class="blog-excerpt">${p.excerpt}</p>
        <div class="blog-footer">
          <span>📅 ${p.date} · 🕐 ${p.read}</span>
          <a href="blog-article.html?id=${blogData.indexOf(p)}" class="blog-read">Читать →</a>
        </div>
      </div>
    </div>
  `).join('');
  setTimeout(initReveal, 50);
}

function filterBlog(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderBlog(cat);
}

// ============ BOOKING (onlinezap.html) ============
let bookingData = { service: '', trainer: '', date: '', time: '' };
let currentStep = 1;
let calYear = 2026, calMonth = 5;

function selectService(el, val) {
  el.closest('.service-options').querySelectorAll('.service-option').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  if (el.closest('#serviceOptions')) bookingData.service = val;
  if (el.closest('#trainerOptions')) bookingData.trainer = val;
}

function nextStep(step) {
  document.getElementById('formStep' + currentStep).classList.remove('active');
  currentStep = step;
  document.getElementById('formStep' + step).classList.add('active');
  updateStepUI();
  if (step === 4) {
    document.getElementById('confirmService').textContent = bookingData.service || '—';
    document.getElementById('confirmTrainer').textContent = bookingData.trainer || '—';
    document.getElementById('confirmDate').textContent = bookingData.date || '—';
    document.getElementById('confirmTime').textContent = bookingData.time || '—';
  }
}

function prevStep(step) {
  document.getElementById('formStep' + currentStep).classList.remove('active');
  currentStep = step;
  document.getElementById('formStep' + step).classList.add('active');
  updateStepUI();
}

function updateStepUI() {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('step-' + i);
    if (el) {
      el.classList.remove('active', 'done');
      if (i < currentStep) el.classList.add('done');
      if (i === currentStep) el.classList.add('active');
    }
  }
}

const MONTHS_RU = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const DAYS_RU = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

function renderCalendar() {
  const el = document.getElementById('calendarGrid');
  const nameEl = document.getElementById('calMonthName');
  if (!el || !nameEl) return;

  nameEl.textContent = `${MONTHS_RU[calMonth]} ${calYear}`;
  
  let html = DAYS_RU.map(d => `<div class="cal-header">${d}</div>`).join('');
  
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  
  for (let i = 0; i < offset; i++) html += `<div class="cal-day empty"></div>`;
  
  const today = new Date();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(calYear, calMonth, d);
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dateStr = `${d} ${MONTHS_RU[calMonth]}`;
    const isSelected = bookingData.date === dateStr;
    html += `<div class="cal-day ${isPast ? 'past' : ''} ${isSelected ? 'selected' : ''}" 
      onclick="${isPast ? '' : `selectDay(${d}, '${dateStr}')`}">${d}</div>`;
  }
  el.innerHTML = html;
}

function changeMonth(dir) {
  calMonth += dir;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
}

function selectDay(d, str) {
  bookingData.date = str;
  renderCalendar();
}

function renderTimeSlots() {
  const el = document.getElementById('timeSlots');
  if (!el) return;
  const slots = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];
  const booked = ['10:00', '13:00', '17:00'];
  el.innerHTML = slots.map(t => `
    <div class="time-slot ${booked.includes(t) ? 'booked' : ''} ${bookingData.time === t ? 'selected' : ''}" 
      onclick="${booked.includes(t) ? '' : `selectTime('${t}')`}">${t}</div>
  `).join('');
}

function selectTime(t) {
  bookingData.time = t;
  renderTimeSlots();
}

function submitBooking() {
  // Проверка авторизации
  if (!loadCurrentUser()) {
    alert('Для записи необходимо войти в личный кабинет. Перенаправляем...');
    window.location.href = 'profile.html';
    return;
  }

  // Сохраняем запись
  const newBooking = {
    service: bookingData.service,
    trainer: bookingData.trainer,
    date: bookingData.date,
    time: bookingData.time,
    status: 'active'
  };
  if (!newBooking.service || !newBooking.trainer || !newBooking.date || !newBooking.time) {
    alert('Пожалуйста, заполните все поля');
    return;
  }
  const success = addBooking(newBooking);
  if (success) {
    document.getElementById('formStep4').classList.remove('active');
    document.getElementById('formStepSuccess').classList.add('active');
    document.querySelectorAll('.step-item').forEach(s => s.classList.add('done'));
    currentStep = 5;
  } else {
    alert('Ошибка сохранения записи. Попробуйте ещё раз.');
  }
}

function resetBooking() {
  bookingData = { service: '', trainer: '', date: '', time: '' };
  currentStep = 1;
  for (let i = 1; i <= 4; i++) document.getElementById('formStep' + i).classList.remove('active');
  document.getElementById('formStepSuccess').classList.remove('active');
  document.getElementById('formStep1').classList.add('active');
  document.querySelectorAll('#serviceOptions .service-option, #trainerOptions .service-option').forEach(e => e.classList.remove('selected'));
  updateStepUI();
  renderCalendar();
  renderTimeSlots();
}

function initCalendar() {
  renderCalendar();
  renderTimeSlots();
}

// ============ PROFILE PAGE LOGIC ============
function initProfile() {
  if (!document.getElementById('profile-root')) return;
  loadCurrentUser();
  renderProfilePage();
}

function renderProfilePage() {
  const container = document.getElementById('profile-root');
  if (!container) return;
  
  if (!currentUser) {
    // Показать форму входа/регистрации
    container.innerHTML = `
      <div class="auth-card">
        <div class="auth-tabs">
          <button class="auth-tab active" data-tab="login">Вход</button>
          <button class="auth-tab" data-tab="register">Регистрация</button>
          <a href="admin.html" class="auth-tab auth-tab-admin">⚙ Администратор</a>
        </div>
        <div class="auth-form active" id="login-form">
          <div class="form-group"><label>Email</label><input type="email" id="login-email" placeholder="example@mail.ru"></div>
          <div class="form-group"><label>Пароль</label><input type="password" id="login-password" placeholder="******"></div>
          <button class="btn-primary auth-btn" onclick="handleLogin()">Войти</button>
          <div id="auth-error" class="auth-error"></div>
        </div>
        <div class="auth-form" id="register-form">
          <div class="form-group"><label>Имя</label><input type="text" id="reg-name" placeholder="Иван"></div>
          <div class="form-group"><label>Email</label><input type="email" id="reg-email" placeholder="example@mail.ru"></div>
          <div class="form-group"><label>Пароль</label><input type="password" id="reg-password" placeholder="******"></div>
          <button class="btn-primary auth-btn" onclick="handleRegister()">Зарегистрироваться</button>
          <div id="reg-error" class="auth-error"></div>
        </div>
      </div>
    `;
    // Переключение табов
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const target = tab.dataset.tab;
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        document.getElementById(`${target}-form`).classList.add('active');
      });
    });
  } else {
    // Показать личный кабинет
    const bookings = getUserBookings();
    container.innerHTML = `
      <div class="profile-container">
        <div class="profile-header">
          <div class="profile-greeting">
            <h2>Привет, ${currentUser.name}!</h2>
            <p>Добро пожаловать в личный кабинет APEX FIT</p>
          </div>
          <button class="logout-btn" onclick="logout()">Выйти</button>
        </div>
        <div class="profile-tabs">
          <button class="tab-btn active" data-tab="bookings">Мои записи</button>
          <button class="tab-btn" data-tab="profile">Профиль</button>
        </div>
        <div class="tab-content active" id="bookings-tab">
          <div class="bookings-list">
            ${bookings.length === 0 ? '<div class="empty-state">У вас пока нет записей. <a href="onlinezap.html">Записаться</a></div>' : 
              bookings.map(b => `
                <div class="booking-item" data-id="${b.id}">
                  <div class="booking-info">
                    <h4>${b.service}</h4>
                    <p>Тренер: ${b.trainer}</p>
                    <p>Дата: ${b.date} в ${b.time}</p>
                  </div>
                  <div class="booking-status">Подтверждена</div>
                  <button class="cancel-booking" onclick="cancelBookingHandler(${b.id})">Отменить</button>
                </div>
              `).join('')
            }
          </div>
        </div>
        <div class="tab-content" id="profile-tab">
          <div class="profile-form">
            <div class="form-group"><label>Имя</label><input type="text" id="profile-name" value="${currentUser.name}"></div>
            <div class="form-group"><label>Email</label><input type="email" id="profile-email" value="${currentUser.email}" disabled></div>
            <button class="btn-primary" onclick="updateProfile()">Сохранить изменения</button>
          </div>
        </div>
      </div>
    `;
    // Переключение табов
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(`${tab}-tab`).classList.add('active');
      });
    });
  }
}

function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const result = login(email, password);
  if (result.success) {
    window.location.reload();
  } else {
    document.getElementById('auth-error').innerText = result.error;
  }
}

function handleRegister() {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  if (!name || !email || !password) {
    document.getElementById('reg-error').innerText = 'Заполните все поля';
    return;
  }
  const result = register(email, password, name);
  if (result.success) {
    window.location.reload();
  } else {
    document.getElementById('reg-error').innerText = result.error;
  }
}

function updateProfile() {
  const newName = document.getElementById('profile-name').value;
  if (!newName) return;
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].name = newName;
    localStorage.setItem('users', JSON.stringify(users));
    currentUser.name = newName;
    saveCurrentUser(currentUser);
    alert('Имя обновлено');
    renderProfilePage();
  }
}

function cancelBookingHandler(bookingId) {
  if (confirm('Отменить запись?')) {
    cancelBooking(bookingId);
    renderProfilePage();
  }
}

// ============ ДЕНЬ 29: ПАНЕЛЬ АДМИНИСТРАТОРА (admin.html) ============
// Логин и пароль хранятся в коде — упрощённая клиентская защита для учебного проекта,
// полноценная авторизация потребовала бы серверной части.
const ADMIN_LOGIN = 'apexadmin';
const ADMIN_PASSWORD = 'Apex2026!Fit';
let adminModalBuilt = false;

function getAllUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function isAdminAuthed() {
  return sessionStorage.getItem('adminAuth') === 'true';
}

function initAdmin() {
  const root = document.getElementById('admin-root');
  if (!root) return;
  if (isAdminAuthed()) renderAdminPanel();
  else renderAdminLogin();
}

function renderAdminLogin(errorMsg) {
  const root = document.getElementById('admin-root');
  root.innerHTML = `
    <div class="admin-login-wrap">
      <div class="admin-login-icon">🔒</div>
      <h2>ВХОД ДЛЯ АДМИНИСТРАТОРА</h2>
      <p>Доступ к списку пользователей и записей на тренировки</p>
      <div class="auth-card">
        <div class="form-group">
          <label>Логин</label>
          <input type="text" id="admin-login" placeholder="Логин администратора" onkeydown="if(event.key==='Enter')document.getElementById('admin-password').focus()">
        </div>
        <div class="form-group">
          <label>Пароль администратора</label>
          <input type="password" id="admin-password" placeholder="••••••••" onkeydown="if(event.key==='Enter')handleAdminLogin()">
        </div>
        <button class="btn-primary auth-btn" onclick="handleAdminLogin()">Войти в панель</button>
        <div id="admin-auth-error" class="auth-error">${errorMsg || ''}</div>
      </div>
    </div>
  `;
  document.getElementById('admin-login').focus();
}

function handleAdminLogin() {
  const login = document.getElementById('admin-login').value.trim();
  const password = document.getElementById('admin-password').value;
  if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
    sessionStorage.setItem('adminAuth', 'true');
    renderAdminPanel();
  } else {
    document.getElementById('admin-auth-error').innerText = 'Неверный логин или пароль';
  }
}

function adminLogout() {
  sessionStorage.removeItem('adminAuth');
  renderAdminLogin();
}

// Полностью очищает список ранее зарегистрированных пользователей
// (данные хранятся в localStorage браузера, где открыт сайт)
function clearAllUsers() {
  const users = getAllUsers();
  if (users.length === 0) {
    alert('Список пользователей уже пуст.');
    return;
  }
  const confirmed = confirm(`Удалить всех зарегистрированных пользователей (${users.length}) и их записи на тренировки? Это действие необратимо.`);
  if (!confirmed) return;
  localStorage.removeItem('users');
  renderAdminPanel();
}

function renderAdminPanel() {
  const root = document.getElementById('admin-root');
  const users = getAllUsers();
  const totalBookings = users.reduce((sum, u) => sum + (u.bookings ? u.bookings.length : 0), 0);
  const activeUsers = users.filter(u => u.bookings && u.bookings.length > 0).length;

  root.innerHTML = `
    <div class="admin-header">
      <div>
        <h2>ПАНЕЛЬ АДМИНИСТРАТОРА</h2>
        <p>Пользователи сайта и их записи на тренировки</p>
      </div>
      <button class="admin-logout-btn" onclick="adminLogout()">Выйти</button>
    </div>

    <div class="admin-stats">
      <div class="admin-stat-card">
        <div class="admin-stat-value">${users.length}</div>
        <div class="admin-stat-label">Всего пользователей</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${totalBookings}</div>
        <div class="admin-stat-label">Всего записей на тренировки</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-value">${activeUsers}</div>
        <div class="admin-stat-label">Пользователей с записями</div>
      </div>
    </div>

    <div class="admin-toolbar">
      <div class="admin-search-wrap">
        <span class="admin-search-icon">🔍</span>
        <input type="text" id="admin-search" placeholder="Поиск по имени или email..." oninput="renderAdminTableBody(this.value)">
      </div>
      <button class="admin-clear-btn" onclick="clearAllUsers()" ${users.length === 0 ? 'disabled style="opacity:.4;cursor:default;"' : ''}>🗑 Очистить всех пользователей</button>
    </div>

    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Email</th>
            <th>Дата регистрации</th>
            <th>Записи на тренировки</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="admin-table-body"></tbody>
      </table>
    </div>
  `;

  renderAdminTableBody('');
}

function renderAdminTableBody(query) {
  const tbody = document.getElementById('admin-table-body');
  if (!tbody) return;
  const users = getAllUsers();
  const q = (query || '').trim().toLowerCase();
  const filtered = q
    ? users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    : users;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="admin-empty">
      ${users.length === 0 ? 'Пока никто не зарегистрировался на сайте.' : 'По вашему запросу никого не найдено.'}
    </div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(u => {
    const bookingsCount = u.bookings ? u.bookings.length : 0;
    const regDate = new Date(u.id).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `
      <tr>
        <td class="admin-user-name">${u.name}</td>
        <td class="admin-user-email">${u.email}</td>
        <td>${regDate}</td>
        <td><span class="admin-count-badge ${bookingsCount === 0 ? 'zero' : ''}">${bookingsCount} ${bookingsCount === 1 ? 'запись' : 'записей'}</span></td>
        <td><button class="admin-detail-btn" onclick="openAdminUserModal(${u.id})" ${bookingsCount === 0 ? 'disabled style="opacity:.4;cursor:default;"' : ''}>Подробнее →</button></td>
      </tr>
    `;
  }).join('');
}

function buildAdminModalShell() {
  if (adminModalBuilt) return;
  const overlay = document.createElement('div');
  overlay.className = 'admin-modal-overlay';
  overlay.id = 'adminModalOverlay';
  overlay.innerHTML = `<div class="admin-modal" id="adminModalContent"></div>`;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeAdminModal();
  });
  document.body.appendChild(overlay);
  adminModalBuilt = true;
}

function openAdminUserModal(userId) {
  buildAdminModalShell();
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return;
  const bookings = user.bookings || [];

  const content = document.getElementById('adminModalContent');
  content.innerHTML = `
    <div class="admin-modal-header">
      <div>
        <h3>${user.name}</h3>
        <p>${user.email} · ${bookings.length} ${bookings.length === 1 ? 'запись' : 'записей'} на тренировки</p>
      </div>
      <button class="admin-modal-close" onclick="closeAdminModal()">✕</button>
    </div>
    ${bookings.length === 0
      ? '<div class="admin-empty">У пользователя пока нет записей.</div>'
      : bookings.map(b => `
        <div class="admin-modal-booking">
          <h4>${b.service || '—'}</h4>
          <p>Тренер: ${b.trainer || '—'}</p>
          <p>Дата и время: ${b.date || '—'}, ${b.time || '—'}</p>
          <p>Статус: ${b.status === 'active' ? 'Подтверждена' : (b.status || 'Подтверждена')}</p>
        </div>
      `).join('')
    }
  `;
  document.getElementById('adminModalOverlay').classList.add('open');
}

function closeAdminModal() {
  const overlay = document.getElementById('adminModalOverlay');
  if (overlay) overlay.classList.remove('open');
}

// ============ PAGE-SPECIFIC INITIALIZATION ============
// ============ HAMBURGER MENU (День 7) ============
// Мобильное меню с плавной анимацией открытия/закрытия
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  if (!hamburger) return;

  // Создаём оверлей если его ещё нет
  let overlay = document.querySelector('.mobile-menu-overlay');
  if (!overlay) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.innerHTML = `
      <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Главная</a>
      <a href="schedule.html" class="${currentPage === 'schedule.html' ? 'active' : ''}">Расписание</a>
      <a href="coach.html" class="${currentPage === 'coach.html' ? 'active' : ''}">Тренеры</a>
      <a href="money.html" class="${currentPage === 'money.html' ? 'active' : ''}">Цены</a>
      <a href="blog.html" class="${currentPage === 'blog.html' ? 'active' : ''}">Блог</a>
      <a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}">Контакты</a>
      <a href="profile.html" class="${currentPage === 'profile.html' ? 'active' : ''}">Личный кабинет</a>
      <a href="onlinezap.html" style="color:var(--neon)">⚡ Записаться</a>
    `;
    document.body.appendChild(overlay);
  }

  function openMenu() {
    hamburger.classList.add('open');
    overlay.style.display = 'flex';
    // Небольшая задержка для анимации opacity
    requestAnimationFrame(() => overlay.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    // Убираем display:flex только после окончания анимации
    overlay.addEventListener('transitionend', () => {
      if (!overlay.classList.contains('open')) overlay.style.display = 'none';
    }, { once: true });
  }

  hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) closeMenu();
    else openMenu();
  });

  // Закрытие по клику на ссылку
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Закрытие по клику вне меню (на оверлей)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });
}

// ============ COUNTER ANIMATION (День 7 — Intersection Observer API) ============
// Счётчики «докручиваются» до нужного значения в момент появления в области видимости
function initCounters() {
  const statItems = document.querySelectorAll('.stat-item');
  if (!statItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const numEl = entry.target.querySelector('.stat-number');
        if (!numEl) return;

        // Извлекаем целевое значение и суффикс ('+', 'лет' и т.д.)
        const rawText = numEl.textContent.trim();
        const numMatch = rawText.match(/[\d]+/);
        if (!numMatch) return;
        const target = parseInt(numMatch[0]);
        const suffix = rawText.replace(numMatch[0], '');

        let start = 0;
        const duration = 1500; // мс
        const startTime = performance.now();

        function tick(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Easing: ease-out cubic
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(ease * target);
          numEl.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      }
    });
  }, { threshold: 0.3 });

  statItems.forEach(item => observer.observe(item));
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initReveal();
  initHamburger();
  initCounters();
  
  if (document.getElementById('baSlider')) initSlider();
  if (document.getElementById('scheduleGrid')) renderSchedule('all');
  if (document.getElementById('trainersGrid')) renderTrainers();
  if (document.getElementById('blogGrid')) renderBlog('all');
  if (document.getElementById('calendarGrid')) initCalendar();
  if (document.getElementById('profile-root')) initProfile();
  if (document.getElementById('admin-root')) initAdmin();
  
  const floatingCta = document.getElementById('floatingCta');
  if (floatingCta && !window.location.pathname.includes('onlinezap')) {
    setTimeout(() => {
      if (window.scrollY > 300) floatingCta.classList.add('visible');
    }, 100);
  }
});
// ============ ДЕНЬ 23-24: CSS 3D-объекты (пауза при hover) ============
// Управление анимацией через CSS animation-play-state
function init3DObjects() {
  document.querySelectorAll('.css3d-cube').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.animationPlayState = 'paused';
    });
    el.addEventListener('mouseleave', () => {
      el.style.animationPlayState = 'running';
    });
  });
}

// ============ ДЕНЬ 25-26: 3D-галерея блога ============
// will-change и z-index управление для устранения перекрытия floating-cta
function initBlog3DGallery() {
  const blogCards = document.querySelectorAll('.blog-card');
  if (!blogCards.length) return;

  blogCards.forEach(card => {
    // Поднимаем карточку в z-order при наведении
    card.addEventListener('mouseenter', () => {
      card.style.zIndex = '10';
    });
    card.addEventListener('mouseleave', () => {
      card.style.zIndex = '';
    });
  });

  // Гарантируем z-index плавающей кнопки выше галереи
  const floatingCta = document.getElementById('floatingCta');
  if (floatingCta) {
    floatingCta.style.zIndex = '999';
    // isolation: isolate на секции блога устраняет конфликт контекстов
    const blogSection = document.querySelector('.blog-section');
    if (blogSection) {
      blogSection.style.isolation = 'isolate';
    }
  }
}

// ============ ДЕНЬ 26: floating-btn — пауза пульсации при hover ============
function initFloatingBtnPause() {
  const btn = document.querySelector('.floating-btn');
  if (!btn) return;
  btn.addEventListener('mouseenter', () => {
    btn.style.animationPlayState = 'paused';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.animationPlayState = 'running';
  });
}

// Добавляем инициализацию новых функций в DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  init3DObjects();
  initBlog3DGallery();
  initFloatingBtnPause();
});
