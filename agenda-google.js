// ====================================
// CONFIGURAÇÃO - EDITE AQUI
// ====================================

// Cole aqui a URL do seu Google Apps Script (após fazer deploy)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwkwdLA5-KoXFrIVKxd2emXKYW0Q6R5kNI4bEZC_M5rXEPDTjB3VEpLfaWobVbetO-f/exec';

// ====================================
// NÃO EDITE DAQUI PRA BAIXO
// ====================================

const state = {
    selectedDate: null,
    selectedTime: null,
    availableDays: [],
    availableSlots: [],
};

const elements = {
    calendarGroups: document.getElementById('calendar-groups'),
    calendarContext: document.getElementById('calendar-context'),
    calendarLoading: document.getElementById('calendar-loading'),
    timeGrid: document.getElementById('time-grid'),
    timeLoading: document.getElementById('time-loading'),
    stepDate: document.getElementById('step-date'),
    stepTime: document.getElementById('step-time'),
    stepInfo: document.getElementById('step-info'),
    stepConfirm: document.getElementById('step-confirm'),
    form: document.getElementById('booking-form'),
    btnConfirm: document.getElementById('btn-confirm'),
    alertContainer: document.getElementById('alert-container'),

    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    telefone: document.getElementById('telefone'),
    mensagem: document.getElementById('mensagem'),

    summaryDate: document.getElementById('summary-date'),
    summaryTime: document.getElementById('summary-time'),
    summaryName: document.getElementById('summary-name'),
    summaryEmail: document.getElementById('summary-email'),
    summaryPhone: document.getElementById('summary-phone'),
    summaryType: document.getElementById('summary-type')
};

// ====================================
// FUNÇÕES AUXILIARES
// ====================================

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

function getWeekday(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return weekdays[date.getDay()];
}

function getMonthYear(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const month = date.toLocaleDateString('pt-BR', { month: 'long' });
    const year = date.getFullYear();
    return `${month} de ${year}`;
}

function capitalizeMonthLabel(label) {
    return label.charAt(0).toUpperCase() + label.slice(1);
}

function getSelectedType() {
    const checked = document.querySelector('input[name="tipo"]:checked');
    return checked ? checked.value : 'online';
}

function syncTypeSelection() {
    document.querySelectorAll('.type-option').forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        option.classList.toggle('selected', radio.checked);
    });
}

function showAlert(message, type = 'success') {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
    elements.alertContainer.innerHTML = `<div class="alert ${alertClass}">${message}</div>`;

    setTimeout(() => {
        elements.alertContainer.innerHTML = '';
    }, 6000);
}

function activateStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    step.classList.add('active');
    
    // Rolagem automática suave para o step ativado
    setTimeout(() => {
        step.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        });
    }, 100);
}

function updateCalendarContext() {
    if (!state.availableDays.length) {
        elements.calendarContext.classList.add('hidden');
        elements.calendarContext.textContent = '';
        return;
    }

    const uniqueMonths = [...new Set(state.availableDays.map(day => getMonthYear(day.data)))];

    if (uniqueMonths.length === 1) {
        elements.calendarContext.textContent = `Disponibilidade de ${capitalizeMonthLabel(uniqueMonths[0])}`;
    } else {
        const firstMonth = capitalizeMonthLabel(uniqueMonths[0]);
        const lastMonth = capitalizeMonthLabel(uniqueMonths[uniqueMonths.length - 1]);
        elements.calendarContext.textContent = `Disponibilidade entre ${firstMonth} e ${lastMonth}`;
    }

    elements.calendarContext.classList.remove('hidden');
}

function getValidationMessage() {
    if (!state.selectedDate) return 'Selecione uma data.';
    if (!state.selectedTime) return 'Selecione um horário.';
    if (!elements.nome.value.trim()) return 'Informe seu nome.';
    if (!elements.email.checkValidity()) return 'Informe um e-mail válido.';
    if (!elements.telefone.value.trim()) return 'Informe seu telefone.';
    return 'Preencha todos os campos corretamente.';
}

function goToFirstError() {
    if (!state.selectedDate) {
        activateStep(elements.stepDate);
        return;
    }

    if (!state.selectedTime) {
        activateStep(elements.stepTime);
        return;
    }

    if (!elements.form.checkValidity()) {
        activateStep(elements.stepInfo);

        const firstInvalid = elements.form.querySelector(':invalid');
        if (firstInvalid) {
            firstInvalid.focus();
        }
    }
}

function updateSummary() {
    elements.summaryDate.textContent = state.selectedDate ? formatDate(state.selectedDate) : '-';
    elements.summaryTime.textContent = state.selectedTime || '-';
    elements.summaryName.textContent = elements.nome.value || '-';
    elements.summaryEmail.textContent = elements.email.value || '-';
    elements.summaryPhone.textContent = elements.telefone.value || '-';

    const tipoSelecionado = getSelectedType();
    elements.summaryType.textContent = tipoSelecionado === 'online' ? '🌐 Online' : '📍 Presencial';
}

// ====================================
// API CALLS
// ====================================

async function fetchAvailableDays() {
    try {
        elements.calendarLoading.classList.remove('hidden');
        elements.calendarGroups.innerHTML = '';

        const response = await fetch(`${APPS_SCRIPT_URL}?action=getDays&numDays=21`);
        if (!response.ok) throw new Error('Erro ao carregar dias disponíveis');

        const data = await response.json();
        state.availableDays = data.dias;
        renderCalendar();
    } catch (error) {
        console.error('Erro:', error);
        showAlert('Não foi possível carregar as datas. Verifique se configurou o APPS_SCRIPT_URL corretamente.', 'error');
    } finally {
        elements.calendarLoading.classList.add('hidden');
    }
}

async function fetchAvailableSlots(date) {
    try {
        elements.timeLoading.classList.remove('hidden');
        elements.timeGrid.innerHTML = '';

        const response = await fetch(`${APPS_SCRIPT_URL}?action=getSlots&date=${date}`);
        if (!response.ok) throw new Error('Erro ao carregar horários');

        const data = await response.json();
        state.availableSlots = data.slots;
        renderTimeSlots();
    } catch (error) {
        console.error('Erro:', error);
        showAlert('Não foi possível carregar os horários para esta data.', 'error');
    } finally {
        elements.timeLoading.classList.add('hidden');
    }
}

async function submitBooking() {
    try {
        elements.btnConfirm.disabled = true;
        elements.btnConfirm.textContent = 'Enviando solicitação...';

        const bookingData = {
            action: 'createEvent',
            nome: elements.nome.value.trim(),
            email: elements.email.value.trim(),
            telefone: elements.telefone.value.trim(),
            data: state.selectedDate,
            horario: state.selectedTime,
            tipo_atendimento: getSelectedType(),
            mensagem: elements.mensagem.value.trim()
        };

        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(bookingData)
        });

        const result = await response.json();

        if (!response.ok || result.error) {
            throw new Error(result.error || 'Erro ao criar agendamento');
        }

        showAlert('✅ Agendamento criado com sucesso! Você receberá um e-mail de confirmação.', 'success');

// 🔥 NOVO: rolar para o topo (onde aparece o alerta)
window.scrollTo({
    top: 0,
    behavior: 'smooth'
});
        setTimeout(() => {
            resetForm();
        }, 3000);
    } catch (error) {
        console.error('Erro:', error);
        showAlert(error.message || 'Não foi possível concluir o agendamento. Tente novamente.', 'error');
    } finally {
        elements.btnConfirm.disabled = false;
        elements.btnConfirm.textContent = 'Confirmar solicitação de agendamento';
    }
}

// ====================================
// RENDERIZAÇÃO
// ====================================

function renderCalendar() {
    elements.calendarGroups.innerHTML = '';
    updateCalendarContext();

    const groupedByMonth = state.availableDays.reduce((groups, day) => {
        const monthKey = getMonthYear(day.data);
        if (!groups[monthKey]) {
            groups[monthKey] = [];
        }
        groups[monthKey].push(day);
        return groups;
    }, {});

    const monthEntries = Object.entries(groupedByMonth);
    const showInternalMonthLabel = monthEntries.length > 1;

    monthEntries.forEach(([monthLabel, days]) => {
        const monthBlock = document.createElement('div');
        monthBlock.className = 'calendar-month-block';

        if (showInternalMonthLabel) {
            const monthTitle = document.createElement('div');
            monthTitle.className = 'calendar-month-label';
            monthTitle.textContent = capitalizeMonthLabel(monthLabel);
            monthBlock.appendChild(monthTitle);
        }

        const daysGrid = document.createElement('div');
        daysGrid.className = 'calendar-month-days';

        days.forEach(day => {
            const dayButton = document.createElement('button');
            dayButton.className = 'day-button';
            dayButton.type = 'button';

            const date = new Date(day.data + 'T00:00:00');
            const dayNumber = date.getDate();
            const weekday = getWeekday(day.data);

            dayButton.innerHTML = `
                <span class="day-date">${dayNumber}</span>
                <span class="day-weekday">${weekday}</span>
            `;

            dayButton.addEventListener('click', () => selectDate(day.data, dayButton));
            daysGrid.appendChild(dayButton);
        });

        monthBlock.appendChild(daysGrid);
        elements.calendarGroups.appendChild(monthBlock);
    });
}

function renderTimeSlots() {
    elements.timeGrid.innerHTML = '';

    if (state.availableSlots.length === 0) {
        elements.timeGrid.innerHTML = '<p class="empty-state">Nenhum horário disponível para esta data.</p>';
        return;
    }

    state.availableSlots.forEach(slot => {
        const timeButton = document.createElement('button');
        timeButton.className = 'time-button';
        timeButton.type = 'button';
        timeButton.textContent = slot.horario;
        timeButton.disabled = !slot.disponivel;

        if (slot.disponivel) {
            timeButton.addEventListener('click', () => selectTime(slot.horario, timeButton));
        }

        elements.timeGrid.appendChild(timeButton);
    });
}

// ====================================
// SELEÇÃO
// ====================================

function selectDate(date, button) {
    state.selectedDate = date;
    state.selectedTime = null;

    document.querySelectorAll('.day-button').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.time-button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    updateSummary();
    activateStep(elements.stepTime);
    fetchAvailableSlots(date);
}

function selectTime(time, button) {
    state.selectedTime = time;

    document.querySelectorAll('.time-button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    updateSummary();
    activateStep(elements.stepInfo);
}

function resetForm() {
    state.selectedDate = null;
    state.selectedTime = null;
    state.availableSlots = [];

    elements.form.reset();
    document.querySelector('#type-online input[type="radio"]').checked = true;
    syncTypeSelection();

    document.querySelectorAll('.day-button').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.time-button').forEach(btn => btn.classList.remove('selected'));

    elements.timeGrid.innerHTML = '<p class="empty-state">Escolha primeiro uma data para visualizar os horários disponíveis.</p>';

    elements.stepTime.classList.remove('active');
    elements.stepInfo.classList.remove('active');
    elements.stepConfirm.classList.remove('active');
    elements.stepDate.classList.add('active');

    updateSummary();
    fetchAvailableDays();
}

// ====================================
// EVENT LISTENERS
// ====================================

// evitar submit padrão
elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
});

// inputs: apenas atualizam resumo
[elements.nome, elements.email, elements.mensagem].forEach(input => {
    input.addEventListener('input', () => {
        updateSummary();
    });
});

// telefone: máscara + resumo (SEM avanço automático)
elements.telefone.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);

    if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;

    e.target.value = v;
    updateSummary();
});

// tipo de atendimento: seleção + avanço inteligente
document.querySelectorAll('.type-option').forEach(option => {
    option.addEventListener('click', function () {
        const radio = this.querySelector('input[type="radio"]');
        radio.checked = true;
        syncTypeSelection();
        updateSummary();

// ✅ rolagem acontece AQUI (momento certo)
        if (
    elements.form.checkValidity() &&
    state.selectedDate &&
    state.selectedTime &&
    document.querySelector('.step.active') === elements.stepInfo
) {
    setTimeout(() => {
        activateStep(elements.stepConfirm);
    }, 150);
}
    });
});

// botões do wizard
document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!canProceed()) {
            showAlert('Preencha corretamente antes de continuar.', 'error');
            return;
        }
        showStep(currentStep + 1);
    });
});

document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', () => {
        showStep(currentStep - 1);
    });
});

// confirmar (COM validação, SEM duplicação)
elements.btnConfirm.addEventListener('click', () => {
    if (!state.selectedDate || !state.selectedTime) {
        showAlert('Selecione uma data e um horário antes de confirmar.', 'error');
        showStep(state.selectedDate ? 1 : 0);
        return;
    }

    if (!elements.form.checkValidity()) {
        showAlert('Preencha todos os campos obrigatórios.', 'error');
        showStep(2);
        elements.form.reportValidity();
        return;
    }

    updateSummary();
    submitBooking();
});

// ====================================
// INICIALIZAÇÃO
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    // Verificar se a URL do Apps Script foi configurada
    if (APPS_SCRIPT_URL === 'COLE_SUA_URL_DO_APPS_SCRIPT_AQUI') {
        showAlert('⚠️ Configure primeiro o APPS_SCRIPT_URL no arquivo agenda-google.js', 'error');
        return;
    }

    syncTypeSelection();
    updateSummary();
    fetchAvailableDays();
});
