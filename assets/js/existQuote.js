const quickOrderWrapper = document.querySelector(".quick-order-wrapper");
const quickContentWrapper = document.querySelector(".quick-content-wrapper");
const quoteOrderWrapper = document.querySelector(".quick-order-wrapper");
const existQuoteWrapper = document.querySelector(".exist-quote-wrapper");
const popupOverlay = document.querySelector(".popup-overlay");
const expandModal = popupOverlay.querySelector(".expand-modal");
const expandBtns = document.querySelectorAll(".expand-btn");
const modalContent = document.querySelector(".expand-modal-content");
const formPopup = document.querySelector(".form-popup");
const approveQuoteBtn = document.querySelector(".approve-btn");
const successPopup = document.querySelector(".success-popup");
const delPopup1 = document.querySelector(".del-popup-1");
const delPopup2 = document.querySelector(".del-popup-2");
const del1YesBtn = delPopup1.querySelector(".yes-btn");
const del2YesBtn = delPopup2.querySelector(".yes-btn");
const delPopup2Id = delPopup2.querySelector(".text .id");
const delQuoteText = delPopup2.querySelector(".del-quote-text");
const successidText = successPopup.querySelector(".text .id");
const confirmSuccessBtn = successPopup.querySelector(".ok-btn");
const addBtn = document.querySelector(".add-btn-container .add-btn");
const addPopup = document.querySelector(".add-popup");
const addTable = addPopup.querySelector(".add-table");
const addLineBtns = addTable.querySelectorAll(".add-line-btn");
const canceladdpopupBtn = addPopup.querySelector(".cancel-btn");
const delQuoteBtn = document.querySelector(".del-quote-btn");
const undoQuoteBtn = document.querySelector(".undo-quote-btn");
const approveBtnContainer = document.querySelector(".approve-btn-container");
const loaderWrapper = document.querySelector(".loader-wrapper");
const leftWrapper = quoteOrderWrapper.querySelector(".left-wrapper");
const uploadBtnContainer = leftWrapper.querySelector(".upload-btn-container");
const leftTableWrapper = leftWrapper.querySelector(".table-wrapper");
const descInputs = leftTableWrapper.querySelectorAll(".desc-input");
const qtyInputs = leftTableWrapper.querySelectorAll(".qty-input");
const CreateBtn = document.querySelector(".back-create-btn");
const quoteStat = existQuoteWrapper.querySelector(".quote-status");
const minimizeBtn=document.querySelector(".minimize-btn");
const existFilterWrapper = document.querySelector(
  ".exist-quote-filter-wrapper",
);

const newBtn = document.querySelector(".new-btn");
newBtn.addEventListener(
  "click",
  () => (window.location.href = "./create-quote.html"),
);

//Datepicker
const filterWrapper = document.querySelector(".filter-wrapper");
const dateTexts = filterWrapper.querySelectorAll(".date-text");

const startPicker = document.querySelector(".start-datepicker");
const endPicker = document.querySelector(".end-datepicker");

const datepickers = document.querySelectorAll(".datepicker");

const minDate = new Date(2025, 4, 1);
const maxDate = new Date(2026, 3, 30);

function padZero(num) {
  return num > 9 ? num : "0" + num;
}

let selectedMonth;
let selectedDatee;
let selectedYear = new Date().getFullYear();

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

//create datepicker
function createDatepicker(datePicker) {
  const monthNameEl = datePicker.querySelector(".month-name");
  const datesContainer = datePicker.querySelector(".dates");
  const prevBtn = datePicker.querySelector(".prev-month");
  const nextBtn = datePicker.querySelector(".next-month");
  const yearEl = datePicker.querySelector(".year");

  let today = new Date();

  let current = new Date(today);

  if (current < minDate) {
    current = new Date(minDate);
  }

  if (current > maxDate) {
    current = new Date(maxDate);
  }
  let selectedDate = null;

  function renderCalendar() {
    const year = current.getFullYear();
    const month = current.getMonth();

    monthNameEl.textContent = MONTHS[month];
    yearEl.textContent = year;

    datesContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    let days = [];

    for (let i = firstDay; i > 0; i--) {
      days.push({
        day: prevLastDate - i + 1,
        faded: true,
        date: new Date(year, month - 1, prevLastDate - i + 1),
      });
    }

    for (let i = 1; i <= lastDate; i++) {
      days.push({
        day: i,
        faded: false,
        date: new Date(year, month, i),
      });
    }

    const nextDays = 42 - days.length;

    for (let i = 1; i <= nextDays; i++) {
      days.push({
        day: i,
        faded: true,
        date: new Date(year, month + 1, i),
      });
    }

    days.forEach((d, index) => {
      const btn = document.createElement("button");

      btn.classList.add("date");

      btn.type = "button";

      btn.textContent = d.day;

      const isOutOfRange = d.date < minDate || d.date > maxDate;

      if (d.faded) btn.classList.add("faded");

      if (isOutOfRange) {
        btn.classList.add("disabled");
        btn.disabled = true;
      }

      if (
        selectedDate &&
        d.date.toDateString() === selectedDate.toDateString() &&
        !btn.classList.contains("faded")
      ) {
        btn.classList.add("current-day");
      }

      btn.addEventListener("click", () => {
        if (isOutOfRange) return;

        const allButtons = datesContainer.querySelectorAll(".date");

        selectedDate = d.date;

        allButtons.forEach((b) => b.classList.remove("current-day"));

        btn.classList.add("current-day");

        datePicker.classList.remove("active");

        getSelectedDate(datePicker);
      });

      datesContainer.appendChild(btn);
    });
  }

  prevBtn.addEventListener("click", () => {
    const prevMonth = new Date(
      current.getFullYear(),
      current.getMonth() - 1,
      1,
    );

    if (
      prevMonth.getFullYear() < minDate.getFullYear() ||
      (prevMonth.getFullYear() === minDate.getFullYear() &&
        prevMonth.getMonth() < minDate.getMonth())
    ) {
      return;
    }
    current.setMonth(current.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    const nextMonth = new Date(
      current.getFullYear(),
      current.getMonth() + 1,
      1,
    );

    if (
      nextMonth.getFullYear() > maxDate.getFullYear() ||
      (nextMonth.getFullYear() === maxDate.getFullYear() &&
        nextMonth.getMonth() > maxDate.getMonth())
    ) {
      return;
    }
    current.setMonth(current.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
}

datepickers.forEach((dp) => createDatepicker(dp));

datepickers.forEach((datepicker) => {
  const days = datepicker.querySelector(".days");

  DAYS.forEach((d) => {
    const span = document.createElement("span");
    span.className = "day";
    span.textContent = d;
    days.appendChild(span);
  });
});

//open datepicker

function openDatepicker(trigger, datePicker) {
  const rect = trigger.getBoundingClientRect();

  document.querySelectorAll(".datepicker").forEach((dp) => {
    dp.classList.remove("active");
  });

  datePicker.classList.add("active");

  requestAnimationFrame(() => {
    const pickerWidth = datePicker.offsetWidth || 300;
    const pickerHeight = datePicker.offsetHeight || 350;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Horizontal
    let left = rect.left;

    if (left + pickerWidth > viewportWidth) {
      left = viewportWidth - pickerWidth - 10;
    }

    if (left < 10) {
      left = 10;
    }

    // Vertical
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    let top;

    // OPEN ABOVE
    if (spaceBelow < pickerHeight && spaceAbove > pickerHeight) {
      top = rect.top - pickerHeight - 5;
    } else {
      top = rect.bottom + 5;
    }

    datePicker.style.left = `${left}px`;
    datePicker.style.top = `${top}px`;

    datePicker.style.visibility = "visible";

    datePicker._trigger = trigger;
  });
}

//open datepicker on click
dateTexts.forEach((dateText) => {
  dateText.addEventListener("click", () => {
    dateTexts.forEach((text) => text.classList.remove("active"));
    dateText.classList.add("active");
    if (dateText.classList.contains("start-text")) {
      openDatepicker(dateText, startPicker);
    } else {
      openDatepicker(dateText, endPicker);
    }
  });
});

// get selected date and update text

function getSelectedDate(datePicker) {
  const monthNameEl = datePicker.querySelector(".month-name");
  const yearEl = datePicker.querySelector(".year");
  const monthIndex = MONTHS.findIndex((m) => m === monthNameEl.textContent) + 1;
  selectedMonth = padZero(monthIndex);

  const dates = datePicker.querySelectorAll(".date");

  dates.forEach((d) => {
    if (d.classList.contains("current-day")) {
      selectedDatee = padZero(Number(d.textContent));
    }
  });

  const trigger = datePicker._trigger;

  if (trigger) {
    trigger.childNodes[0].textContent = `${selectedMonth}/${selectedDatee}/${yearEl.textContent}`;
    dateTexts.forEach((text) => text.classList.remove("active"));
  }
  const container = trigger.closest(".date-container");

  const filterType = container.dataset.filter;

  const wrapper = container.parentElement;

  const start = wrapper.querySelector(".start-text").childNodes[0].textContent;

  const end = wrapper.querySelector(".end-text").childNodes[0].textContent;

  let startDate = start.trim() === "mm/dd/yyyy"? "05/01/2025": start;

  let endDate = end.trim() === "mm/dd/yyyy"? "04/30/2026": end;

updateDateFilter(filterType, startDate, endDate);
  // changeStatusChips();
}

//form popup datetext
const formDateText = formPopup.querySelector(".date-text");

formDateText.addEventListener("click", () => {
  const parentContainer = formDateText.parentElement;

  const datePicker = parentContainer.querySelector(".datepicker");

  if (!datePicker) return;

  datePicker.classList.add("active");

  const monthNameEl = datePicker.querySelector(".month-name");

  const MonthArr = monthNameEl.textContent.trim().split(" ");

  let selectedMonth = MONTHS.findIndex((m) => m === MonthArr[0]) + 1;

  if (selectedMonth <= 0) return;

  selectedMonth = padZero(selectedMonth);

  const dates = datePicker.querySelectorAll(".dates .date");

  const parentEl = datePicker.parentElement;

  const dateInp = parentEl.querySelector(".date-input");

  const dateText = parentEl.querySelector(".date-text");

  const formContainer = dateInp.closest(".form-container");

  const errorElement = formContainer.querySelector(".error");

  dates.forEach((d) => {
    d.addEventListener("click", () => {
      const selectedDatee = padZero(Number(d.textContent));

      dateInp.value = `${selectedYear}-${selectedMonth}-${selectedDatee}`;

      dateText.textContent = `${selectedDatee}-${selectedMonth}-${selectedYear}`;

      errorElement.classList.remove("active");

      errorElement.textContent = "";

      datePicker.classList.remove("active");
    });
  });
});

document.addEventListener("click", (e) => {
  const dp = document.querySelector(".datepicker.active");

  if (!dp) return;

  const trigger = dp._trigger;

  if (!trigger ||(!trigger.contains(e.target) && !dp.contains(e.target))) {
    dp.classList.remove("active");

    dateTexts.forEach((text) =>
      text.classList.remove("active")
    );

    dp.querySelector(".datepicker-calendar")
      .classList.remove("not-active");
  }
});

function handleScroll() {
  const activePicker = document.querySelector(".datepicker.active");
  if (!activePicker) return;

  const trigger = activePicker._trigger;
  if (!trigger) return;

  const rect = trigger.getBoundingClientRect();

  const pickerWidth = activePicker.offsetWidth || 300;
  const pickerHeight = activePicker.offsetHeight || 350;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let left = rect.left;

  if (left + pickerWidth > viewportWidth) {
    left = viewportWidth - pickerWidth - 10;
  }

  const spaceBelow = viewportHeight - rect.bottom;
  const spaceAbove = rect.top;

  let top;

  if (spaceBelow < pickerHeight && spaceAbove > pickerHeight) {
    top = rect.top - pickerHeight - 5;
  } else {
    top = rect.bottom + 5;
  }

  activePicker.style.left = `${left}px`;
  activePicker.style.top = `${top}px`;
}

window.addEventListener("resize", handleScroll);

filterWrapper.addEventListener("scroll", handleScroll);

const searchText = document.querySelector(".search-text");
const totalItem = document.querySelector(".total-item");
const filterTable = document.querySelector(".filter-table");
const tBody = filterTable.querySelector("tbody");

//get searched quotes
if (sessionStorage.getItem("searchedItem")) {
  searchText.textContent = sessionStorage.getItem("searchedItem");
}
let totalQuotes = [];
let filteredData = [];

const selectAllChipsBtn = document.querySelector(".select-all-btn");
const clearAllFilterBtn = document.querySelector(".clear-all-filter-btn");
const filterChipBtns = document.querySelectorAll(".filter-chip-btn");

const statusContainer = document.querySelector(".status-container");
const statusChipContainer = document.querySelector(".status-chip-container");

let sorted;
let searchValue = "";
const dateFilters = {
  received: {
    start: null,
    end: null,
  },
  approved: {
    start: null,
    end: null,
  },
};
let selectedNames = [];
let selectedModes = [];
let selectedStatus = [];

if (sessionStorage.getItem("searchedQuotes")) {
  totalQuotes = JSON.parse(sessionStorage.getItem("searchedQuotes"));
  filteredData = [...totalQuotes];
  totalItem.textContent = `${totalQuotes.length} items`;
  // createPagination(currentPage)
  renderFilterTable(filteredData);
  changeNameFilters(filteredData);
  changeModes(filteredData);
  changeFilterChip(filteredData);
}

function renderFilterTable(data) {
  tBody.innerHTML = "";
  if (data.length) {
    data.forEach((d) => {
      tBody.innerHTML += `
      <tr>
          <td class="quote-id-data" onclick="getProducts(event)" data-id="${d.id}">${d.id}</td>
              <td>${d.name} </td>
              <td>${d.received_date}</td>
          <td>${d.approved_date}</td>
          <td>
          <span class=${d.status === "approved" ? "approved" : d.status === "pending" ? "pending" : ""}>${d.status}</span></td>
          <td><span>${d.total_line_no}</span></td>
          <td>$${d.total_price}</td>
        </tr>                               
    `;
    });
  } else {
    tBody.innerHTML = `<p class="not-found">Data Not Found</p>`;
  }
}

//filter function
const searchInput = document.querySelector(".search-table-quote-input");
const searchBtn = document.querySelector(".search-table-quote-btn");

function applyFilters() {
  filteredData = totalQuotes.filter((q) => {
    const matchesSearch =
      !searchValue ||
      q.id.toString().includes(searchValue) ||
      q.name.toLowerCase().includes(searchValue) ||
      q.number.toString().includes(searchValue);

    const matchesReceivedDate = checkDateFilter(q.received_date,dateFilters.received.start,dateFilters.received.end);

    const matchesApprovedDate = checkDateFilter(
      q.approved_date,
      dateFilters.approved.start,
      dateFilters.approved.end
    );

    const matchesName =
      selectedNames.length === 0 || selectedNames.includes(q.name);

    const matchesMode =
      selectedModes.length === 0 || selectedModes.includes(q.mode);

    const matchesStatus =
      selectedStatus.length === 0 ||
      selectedStatus.includes(q.status.toLowerCase());

    return (
      matchesSearch &&
      matchesReceivedDate &&
      matchesApprovedDate &&
      matchesName &&
      matchesMode &&
      matchesStatus
    );
  });

  renderFilterTable(filteredData);
}

//status filter function
selectAllChipsBtn.addEventListener("click", () => {
  const filterChipBtns = document.querySelectorAll(".filter-chip-btn");
  filterChipBtns.forEach((btn) => btn.classList.add("active"));
  statusFilter();
});

clearAllFilterBtn.addEventListener("click", () => {
  resetFilters();
});

function resetFilters() {
  const filterChipBtns = document.querySelectorAll(".filter-chip-btn");
  // statusContainer.classList.remove("active");
  filterChipBtns.forEach((btn) => btn.classList.remove("active"));
  const nameInputs = document.querySelectorAll(".customer-filter input");
  const modeInputs = document.querySelectorAll(".mode-filter input");
    const receivedStart =
  document.querySelector(".received-start-text").childNodes[0];

const receivedEnd =
  document.querySelector(".received-end-text").childNodes[0];

const approvedStart =
  document.querySelector(".approved-start-text").childNodes[0];

const approvedEnd =
  document.querySelector(".approved-end-text").childNodes[0];
  searchInput.value = "";
  searchCustomerInput.value = "";
  receivedStart.textContent = "mm/dd/yyyy";
receivedEnd.textContent = "mm/dd/yyyy";

approvedStart.textContent = "mm/dd/yyyy";
approvedEnd.textContent = "mm/dd/yyyy";

updateDateFilter("received", "05/01/2025", "04/30/2026");

updateDateFilter("approved", "05/01/2025", "04/30/2026");

  nameInputs.forEach((inp) => (inp.checked = false));

  modeInputs.forEach((inp) => (inp.checked = false));

  filteredData = [...totalQuotes];
  renderFilterTable(filteredData);

}
function enableFilterChipClick(filterChipBtns) {
  filterChipBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      statusFilter();
    });
  });
}

function statusFilter() {
  const filterChipBtns = document.querySelectorAll(".filter-chip-btn");
  selectedStatus = [...filterChipBtns]
    .filter((btn) => btn.classList.contains("active"))
    .map((btn) => btn.textContent.trim().toLowerCase());
  applyFilters();
}

function parsePickerDate(dateStr) {
  const [month, day, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
}

function parseQuoteDate(dateStr) {
  const [day, month, year] = dateStr.split("-");
  return new Date(year, month - 1, day);
}

function updateDateFilter(type, start, end) {
  dateFilters[type].start = start;

  dateFilters[type].end = end;

  applyFilters();
}

function checkDateFilter(quoteDateStr,startDateStr,endDateStr) {
  if (!startDateStr || !endDateStr) {
    return true;
  }

  const quoteDate = parseQuoteDate(quoteDateStr);

  const startDate = parsePickerDate(startDateStr);

  const endDate = parsePickerDate(endDateStr);

  return quoteDate >= startDate && quoteDate <= endDate;
}

// name filter
const searchCustomerInput = document.querySelector(".search-customer-input");
const searchCustomerBtn = document.querySelector(".search-customer-btn");
let filteredNameQuotes = [];
function searchNames() {
  const searchNameVal = searchCustomerInput.value.trim().toLowerCase();
  if (searchNameVal != "") {
    filteredNameQuotes = filteredData.filter((dat) =>
      dat.name.toString().includes(searchNameVal),
    );
  } else {
    filteredNameQuotes = totalQuotes;
  }

  changeNameFilters(filteredNameQuotes);
}

function changeFilterChip(filData) {
  const filterChipContainer = document.querySelector(".filter-chip-container");
  const stats = [...new Set(filData.map((p) => p.status))];
  stats.sort();
  filterChipContainer.innerHTML = "";
  stats.forEach((s) => {
    filterChipContainer.innerHTML += `
    <button type="button" class="filter-chip filter-chip-btn">${s}</button>
  `;
  });

  enableFilterChipClick(document.querySelectorAll(".filter-chip-btn"));
}

function changeNameFilters(filData) {
  const customerFilterWrapper = document.querySelector(
    ".customer-filter-wrapper",
  );
  const customerFilterContainer = document.querySelector(
    ".customer-filter-container",
  );
  const custMoreLink = customerFilterWrapper.querySelector(".see-more-link");
  const totalNames = [...new Set(filData.map((q) => q.name))];

  customerFilterContainer.innerHTML = "";

  totalNames.forEach((name, index) => {
    const div = document.createElement("div");
    div.className = "customer-filter checkbox-filter";
    if (index >= 5) div.classList.add("hidden");
    div.innerHTML = `
      <input type="checkbox" name="customer-name" id="${name}" value="${name}">
      <label for="${name}" class="filter-label">${name}</label>`;
    customerFilterContainer.appendChild(div);
  });

  if (totalNames.length > 5) {
    custMoreLink.classList.remove("not-active");
    custMoreLink.textContent = `See More`;

    custMoreLink.onclick = (e) => {
      e.preventDefault();
      const hiddenBrands = customerFilterWrapper.querySelectorAll(".hidden");
      if (hiddenBrands.length > 0) {
        hiddenBrands.forEach((el) => el.classList.remove("hidden"));
        custMoreLink.textContent = "See Less";
      } else {
        customerFilterWrapper
          .querySelectorAll(".checkbox-filter")
          .forEach((el, i) => {
            if (i >= 5) el.classList.add("hidden");
          });
        custMoreLink.textContent = `See More`;
      }
    };
  } else {
    custMoreLink.classList.add("not-active");
  }

  const customCheckBoxInputs = document.querySelectorAll(
    ".customer-filter input[type='checkbox']",
  );
  if (customCheckBoxInputs) {
    customCheckBoxInputs.forEach((input) => {
      input.addEventListener("change", () => {
        handleCustomerFilter();
      });
    });
  }
}

function handleCustomerFilter() {
  const checkedCustomInputs = document.querySelectorAll(
    ".customer-filter input:checked",
  );
  selectedNames = [...checkedCustomInputs].map((input) => input.value);
  applyFilters();
}

searchCustomerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchNames();
  }
});

searchCustomerBtn.addEventListener("click", searchNames);

//mode filter function
function changeModes(filData) {
  const modeFilterContainer = document.querySelector(".mode-filter-container");
  const totalModes = [...new Set(filData.map((p) => p.mode))];

  modeFilterContainer.innerHTML = "";

  totalModes.forEach((mode, index) => {
    // selectedModes.push(mode)
    const div = document.createElement("div");
    div.className = "mode-filter checkbox-filter";
    div.innerHTML = `
      <input type="checkbox" name="mode" id="${mode}" value="${mode}">
      <label for="${mode}" class="filter-label">${mode}</label>`;
    modeFilterContainer.appendChild(div);
  });
  const customModeInputs = document.querySelectorAll(
    ".mode-filter input[type='checkbox']",
  );
  if (customModeInputs) {
    customModeInputs.forEach((input) => {
      input.addEventListener("change", () => {
        handleModeFilter();
      });
    });
  }
}

function handleModeFilter() {
  const checkedCustomInputs = document.querySelectorAll(
    ".mode-filter input:checked",
  );
  selectedModes = [...checkedCustomInputs].map((input) => input.value);
  applyFilters();
}

//sort function
const tabHeaderSpans = filterTable.querySelectorAll("th span");
// let sortedQuote;
function getPrice(price) {
  return parseFloat(price.replace(/[^\d.]/g, "").replace(/\.(?=.*\.)/g, ""));
}
let isAscending = true;
tabHeaderSpans.forEach((sp) => {
  sp.addEventListener("click", () => {
    const filteredCopy = [...filteredData];
    const sortItem = sp.dataset.sort;
    if (isAscending) {
      if (sortItem == "id") {
        filteredData = filteredCopy.sort((a, b) => a.id - b.id);
      } else if (sortItem == "name") {
        filteredData = filteredCopy.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
      } else if (sortItem == "received_date") {
        filteredData = filteredCopy.sort(
          (a, b) =>
            parseQuoteDate(a.received_date) - parseQuoteDate(b.received_date),
        );
      } else if (sortItem == "approved_date") {
        filteredData = filteredCopy.sort(
          (a, b) =>
            parseQuoteDate(a.approved_date) - parseQuoteDate(b.approved_date),
        );
      } else if (sortItem == "status") {
        filteredData = filteredCopy.sort((a, b) =>
          a.status.localeCompare(b.status),
        );
      } else if (sortItem == "total_line_no") {
        filteredData = filteredCopy.sort(
          (a, b) => a.total_line_no - b.total_line_no,
        );
      } else if (sortItem == "total_line_no") {
        filteredData = filteredCopy.sort(
          (a, b) => a.total_line_no - b.total_line_no,
        );
      } else if (sortItem == "total_price") {
        filteredData = filteredCopy.sort(
          (a, b) => getPrice(a.total_price) - getPrice(b.total_price),
        );
      }
    } else if (!isAscending) {
      if (sortItem == "id") {
        filteredData = filteredCopy.sort((a, b) => b.id - a.id);
      } else if (sortItem == "name") {
        filteredData = filteredCopy.sort((a, b) =>
          b.name.localeCompare(a.name),
        );
      } else if (sortItem == "received_date") {
        filteredData = filteredCopy.sort(
          (a, b) =>
            parseQuoteDate(b.received_date) - parseQuoteDate(a.received_date),
        );
      } else if (sortItem == "approved_date") {
        filteredData = filteredCopy.sort(
          (a, b) =>
            parseQuoteDate(b.approved_date) - parseQuoteDate(a.approved_date),
        );
      } else if (sortItem == "status") {
        filteredData = filteredCopy.sort((a, b) =>
          b.status.localeCompare(a.status),
        );
      } else if (sortItem == "total_line_no") {
        filteredData = filteredCopy.sort(
          (a, b) => a.total_line_no - b.total_line_no,
        );
      } else if (sortItem == "total_price") {
        filteredData = filteredCopy.sort(
          (a, b) => getPrice(b.total_price) - getPrice(a.total_price),
        );
      }
    }

    renderFilterTable(filteredData);
    isAscending = !isAscending;
  });
});

//popups
const popups = document.querySelectorAll(".popup");

const formTitle = document.querySelector(".form-title");
const formContainers = document.querySelectorAll(".form-container");
const cancelFormPopupBtn = formPopup.querySelector(".cancel-btn");
const errs = formPopup.querySelectorAll(".error");
const closePopupBtns = document.querySelectorAll(".close-popup-btn");

const selectedItemPopup = document.querySelector(".selected-item-popup");
const selectedPopupHeader = selectedItemPopup.querySelector(
  ".selected-popup-header h3",
);
const selectedTable = document.querySelector(".selected-table");
const selectedTBody = document.querySelector(".selected-table tbody");
const selectedTableCheckInputs = selectedTable.querySelectorAll(
  "input[type='checkbox']",
);
const importBtn = document.querySelector(".import-btn");
const cancelSelectedBtn = selectedItemPopup.querySelector(".cancel-btn");
const selectedCheckedAllInput =
  selectedItemPopup.querySelector(".select-all-items");

closePopupBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    closeModal();
  }),
);

popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    closeModal();
  }
});

//get products
let selectedQuote;
function getProducts(event) {
  const clickedId = event.target.dataset.id;
  totalQuotes.forEach((q) => {
    if (q.id == clickedId) {
      selectedQuote = q;
    }
  });
  openSelectedPopup(clickedId, selectedQuote);
}

//open selected quote
function openSelectedPopup(clickedId, q) {
  popupOverlay.classList.add("active");
  selectedItemPopup.classList.add("active");
  selectedPopupHeader.innerHTML = `Select Line items To Import From Existing Quote ID "${clickedId}"`;
  selectedTBody.innerHTML = "";
  const products = q.products;
  products.forEach((p, i) => {
    selectedTBody.innerHTML += `
    <tr>
      <td><input type="checkbox" id="select-item"></td>
      <td>${i + 1}</td>
      <td>${p.qty_requested}</td>
      <td><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt adipisci necessitatibus veritatis sit quos. Ea id, cum tempore soluta omnis, deserunt recusandae, dignissimos quasi sequi et error eum libero perferendis. </span></td>
      <td><span class="content"><span class="prod-id">${p.requested_id}</span> <span class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt adipisci necessitatibus veritatis sit quos. Ea id, cum tempore soluta omnis, deserunt recusandae, dignissimos quasi sequi et error eum libero perferendis.</span></span></td>
      <td>AD ${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}</td>
    </tr>
    `;
  });
  clickCheckInput(document.querySelector(".selected-table tbody"));
}

function selectAllItems() {
  const selectedTBody = document.querySelector(".selected-table tbody");

  const tableRows = selectedTBody.querySelectorAll("tr");
  // const checkedInputs=tBody.querySelectorAll("tr td input[type='checkbox']").checked;
  const isAllChecked = [...tableRows].every(
    (row) => row.querySelector("input[type='checkbox']").checked,
  );
  selectedProdId = [];
  tableRows.forEach((row) => {
    const inp = row.querySelector("input[type='checkbox']");
    inp.checked = !isAllChecked;

    if (isAllChecked) {
      importBtn.classList.remove("active");
    } else importBtn.classList.add("active");
    const tr = inp.closest("tr");
    const prodId = tr.querySelector(".prod-id").textContent.trim();
    selectedProdId.push(prodId);
  });
}

cancelSelectedBtn.addEventListener("click", () => {
  closeModal();
  selectedTableCheckInputs.forEach((inp) => (inp.checked = false));
});

let selectedProdId = [];

//input checked function for selected quote
function clickCheckInput(tBody) {
  const chkAllInput=selectedTable.querySelector(".select-all-items")
  const checkInputs = tBody.querySelectorAll("tr td input[type='checkbox']");
  checkInputs.forEach((inp) => {
    inp.addEventListener("change", () => {
      const isChecked = [...checkInputs].some((input) => input.checked == true);
      const isAllChecked = [...checkInputs].every((input) => input.checked == true);
     
      if (isChecked) importBtn.classList.add("active");
      else importBtn.classList.remove("active");
      chkAllInput.checked=isAllChecked;
      selectedProdId = [];
      checkInputs.forEach((input) => {
        if (input.checked) {
          const tr = input.closest("tr");
          const prodId = tr.querySelector(".prod-id").textContent.trim();
          selectedProdId.push(prodId);
        }
      });
    });
  });
}

let newId = "";
let newQuote = {};
importBtn.addEventListener("click", () => {
  if (selectedQuote) {
    oldQuoteText.innerHTML = `(Old Quote ID #${selectedQuote.id})`;
    oldQuoteText.classList.add("active");
    newId = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

    let isExists = totalQuotes.some((q) => q.id === newId);
    while (isExists) {
      newId = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
      isExists = totalQuotes.some((q) => q.id === newId);
    }

    const prods = [...selectedQuote.products];
    const filProds = prods.filter((p) =>
      selectedProdId.includes(p.requested_id),
    );
    newQuote = { ...selectedQuote };
    newQuote.status = "pending";
    newQuote.received_date=`${padZero(new Date().getDate())}-${padZero(new Date().getMonth())}-${padZero(new Date().getFullYear())}`;
    newQuote.approved_date="-",
    newQuote.products = filProds;
    newQuote.id = newId;
    newQuote.total_price = selectedQuote.products
      .reduce((sum, p) => sum + parseFloat(p.total_cost), 0)
      .toFixed(2);
    newQuote.lines = filProds.length;
    newQuote.total_line_no = filProds.length;
    closeModal();
    selectedTableCheckInputs.forEach((inp) => (inp.checked = false));
    existFilterWrapper.classList.remove("active");
    minimizeBtn.classList.remove("not-active");
    quoteOrderWrapper.classList.add("active");
    approveBtnContainer.classList.add("active");
    sessionStorage.setItem("newQuote", JSON.stringify(newQuote));
    renderQuickInfo(newQuote);
    updatenewQuoteId(newQuote);
    renderDisplayTable(newQuote);
    quoteStat.classList.add("active")
    quoteStat.classList.add("pending");
    quoteStat.textContent ="Pending";
  }
});

function updatenewQuoteId(newQuote) {
  CreateBtn.querySelector("span").textContent = `#${newQuote.id}`;
  delQuoteBtn.classList.add("active");
}

CreateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if(newQuote.length>0){
    updateQuickInfoData();
    updateQuoteTotals();
    updateNewQuoteData();
    newQuote.status = "pending";
    storeQuote();
  }
  window.location.href = "./dashboard.html";
});

delQuoteBtn.addEventListener("click", () => {
  quickOrderWrapper.classList.add("not-active");
  delQuoteBtn.classList.remove("active");
  undoQuoteBtn.classList.add("active");
  approveQuoteBtn.classList.remove("active");
  approveQuoteBtn.classList.add("not-active");
  quoteStat.classList.remove("pending", "approved");
  newQuote.status = "deleted";
  quoteStat.classList.add(`${newQuote.status}`);
  quoteStat.textContent = `${newQuote.status}`;
  updateQuoteTotals();
  updateNewQuoteData();
  storeQuote();
});
undoQuoteBtn.addEventListener("click", () => {
  quickOrderWrapper.classList.remove("not-active");
  undoQuoteBtn.classList.remove("active");
  delQuoteBtn.classList.add("active");
  approveQuoteBtn.classList.remove("not-active");
  approveQuoteBtn.classList.add("active");
  newQuote.status = "pending";
  quoteStat.classList.remove(`deleted`);
  quoteStat.classList.add(`${newQuote.status}`);
  quoteStat.textContent = `${newQuote.status}`;
  storeQuote();
});

//render quote data

const oldQuoteText = document.querySelector(".old-quote-id");
const quickInfoWrapper = quoteOrderWrapper.querySelector(".quick-info-wrapper");
const displayTable = quoteOrderWrapper.querySelector(".display-table");
const disTableBodyWrapper = displayTable.querySelector(".body-wrapper");
const closeBtn = document.querySelector(".close-modal-btn");

function renderQuickInfo(newQuote) {
  const splittedBill = newQuote.bill_to.split("\n");
  const splittedShip = newQuote.ship_to.split("\n");
  quickInfoWrapper.innerHTML = "";
  quickInfoWrapper.innerHTML = `
    <div class="info">
      <p class="header">Bill To <button type="button" class="edit-btn" data-title="bill to" data-edit="bill_to"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
      <div class="details bill_to_text">
        <p class="name">${splittedBill[0]}</p>
        <p class="address">${splittedBill[1]} <br> ${splittedBill[2]}</p>
      </div>
    </div>
    <div class="info">
      <p class="header">Ship To <button type="button" class="edit-btn" data-title="ship to" data-edit="ship_to"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
      <div class="details ship_to_text">
        <p class="name">${splittedShip[0]}</p>
        <p class="address">${splittedShip[1]} <br> ${splittedShip[2]}</p>
      </div>
    </div>                    
    <div class="info">
      <p class="header">PO No <button type="button" class="edit-btn" data-title="po no" data-edit="po_no"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="po_no_text text">${newQuote.po_no}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Job No <button type="button" class="edit-btn" data-title="job no" data-edit="job_no"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="job_no_text text">${newQuote.job_no}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Buyer <button type="button" class="edit-btn" data-title="buyer" data-edit="buyer"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="buyer_text text">${newQuote.buyer}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">Deleivery Date <button type="button" class="edit-btn" data-title="deleivery date" data-edit="deleivery_date"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
        <div class="details">
          <p class="deleivery_date_text text">${newQuote.deleivery_date}</p>
        </div>
      </div>
      <div class="info">
        <p class="header">#Lines</p>
          <div class="details">
            <p class="lines_text text">${newQuote.lines}</p>
          </div>
        </div>
      <div class="info">
        <p class="header">Total Price</p>
        <div class="details">
          <p class="total_price_text text">$${newQuote.total_price}</p>
        </div>
      </div>
  `;
  editQuoteInfo(document.querySelector(".quick-info-wrapper"));
}

//edit quote info
function editQuoteInfo(quoteInfoWrap) {
  const editBtns = quoteInfoWrap.querySelectorAll(".edit-btn");
  editBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      popupOverlay.classList.add("active");
      formPopup.classList.add("active");
      const editItem = btn.dataset.edit;
      formTitle.textContent = btn.dataset.title;
      formContainers.forEach((container) =>
        container.classList.remove("active"),
      );
      formContainers.forEach((container) => {
        if (container.classList.contains(editItem)) {
          container.classList.add("active");
        }
      });
      updateFormData(quoteInfoWrap, editItem);
    });
  });
}

function updateFormData(quoteInfoWrap, editItem) {
  // console.log(editItem)
  const wrapper = document.querySelector(`.${editItem}_text`);

  formContainers.forEach((container) => {
    if (container.classList.contains(editItem)) {
      if (editItem === "bill_to" || editItem == "ship_to") {
        const inp = container.querySelector("input[name='name']");
        const textarea = container.querySelector("textarea[name='address']");
        if (inp) {
          inp.value = wrapper.querySelector(".name").textContent;
        }
        if (textarea) {
          const addrText = wrapper.querySelector(".address").innerHTML;
          textarea.value = addrText.replace("<br>", "\n");
        }
      } else if (editItem == "deleivery_date") {
        const dateText = container.querySelector(".date-text");
        const datePicker = container.querySelector(".datepicker");
        const minDate = new Date(2025, 4, 1);
        const maxDate = new Date(2026, 3, 30);
        const [day, month, year] = wrapper.textContent.split("-");
        const newSelectedDate = new Date(year, month - 1, day);
        dateText.textContent = wrapper.textContent.replaceAll("-", "/");
        if (newSelectedDate >= minDate && newSelectedDate <= maxDate) {
          selectedDate = newSelectedDate;
          current = new Date(
            newSelectedDate.getFullYear(),
            newSelectedDate.getMonth(),
            1,
          );
          createDatepicker(datePicker);
          const inp = container.querySelector("input");
          inp.value = `${year}-${month}-${day}`;
        }
      } else {
        const inp = container.querySelector("input");
        inp.value = wrapper.textContent;
      }
    }
  });
}

//update form function
const updateForm = formPopup.querySelector(".update-form");
const updateBtn = formPopup.querySelector(".update-btn");

cancelFormPopupBtn.addEventListener("click", () => {
  closeModal();
});

updateBtn.addEventListener("click", () => {
  formContainers.forEach((container) => {
    if (container.classList.contains("active")) {
      validateUpdateForm(container);
    }
  });
});

//validate update form
function validateUpdateForm(container) {
  const inpFields = container.querySelectorAll("input, textarea");

  const errEl = container.querySelector(".error");

  let isValid = true;

  inpFields.forEach((inpField) => {
    const val = inpField.value.trim();

    if (val === "") {
      isValid = false;

      errEl.classList.add("active");

      errEl.textContent = `Please enter the ${inpField.placeholder}`;
    }
  });

  if (!isValid) return;

  errEl.classList.remove("active");

  const con = container.dataset.con;

  inpFields.forEach((inpField) => {
    changeQuickInfo(inpField, con);
  });
}

//update changed form  data in ui
let nameInp = "";
let addrInp = "";
function changeQuickInfo(inp, con) {
  const quoteInfoWrap = document.querySelector(".quick-info-wrapper");
  const editBtns = quoteInfoWrap.querySelectorAll(".edit-btn");
  editBtns.forEach((btn) => {
    const editItem = btn.dataset.edit;
    const info = btn.closest(".info");

    if (editItem == con) {
      if (con == "ship_to" || con == "bill_to") {
        if (inp.name == "name") {
          nameInp = inp;
          const nameText = info.querySelector(".name");
          nameText.textContent = inp.value;
        }
        if (inp.name == "address") {
          const addr = info.querySelector(".address");
          addrInp = inp;
          addr.innerHTML = inp.value.replace(/\n/g, "<br>");
        }
        if (nameInp && addrInp) {
          if (nameInp.value.trim() !== "" && addrInp.value.trim() !== "")
            formPopup.classList.remove("active");
          popupOverlay.classList.remove("active");
          errs.forEach((err) => err.classList.remove("active"));
        }
      } else {
        const text = info.querySelector(".text");
        text.textContent = inp.value;
        // updateForm.reset();
        formPopup.classList.remove("active");
        popupOverlay.classList.remove("active");
        errs.forEach((err) => err.classList.remove("active"));
      }
    }
    updateQuickInfoData();
    storeQuote();
  });
}

//input listeners to the update form inputs
formContainers.forEach((container) => {
  const inpFields = container.querySelectorAll("input, textarea");

  const errEl = container.querySelector(".error");

  inpFields.forEach((inp) => {
    inp.addEventListener("input", () => {
      if (inp.value.trim() !== "") {
        errEl.classList.remove("active");
        // updateBtn.classList.add('not-active')
      } else {
        errEl.classList.add("active");
        errEl.textContent = `Please enter the ${inp.placeholder}`;
        // updateBtn.classList.remove('not-active')
      }
    });
  });
});

//render display table
if (sessionStorage.getItem("newQuote")) {
  renderDisplayTable(JSON.parse(sessionStorage.getItem("newQuote")));
  renderQuickInfo(JSON.parse(sessionStorage.getItem("newQuote")));
}

function renderDisplayTable(newQuote) {
  const bodyWrapper = displayTable.querySelector(".body-wrapper");
  bodyWrapper.innerHTML = "";

  const products = newQuote.products;

  products.forEach((p, i) => {
    bodyWrapper.innerHTML += `<div class="row-group" draggable="true">
    <div class="${p.isDeleted == true ? "table-row not-active" : "table-row"}">
      <p><img src="./assets/images/global/drag_menu.png" alt="drag menu" class="drag-handle"   data-index="${i}"  ></p>
      <p><input type="checkbox" class="check-line-input" onclick=enableDeleteAllBtn()></p>
      <p><span class="line-no">${i + 1}</span>
      </p>
      <p><input type="text" value="${p.qty_requested}" name="qty-requested"></p>
      <p>
        <span class="title-text">${p.title ? p.title : "Mjhsjhs"}</span>
        <span class="dropdown-text">
          <img src="./assets/images/global/down_arrow.png" alt="down-arrow" class="down-arrow-img" onclick=openSuggestPopup(event)> <span class="requested-id">${p.requested_id}</span> - 
          <span class="detail" onclick="enableSourceText(event)">tydlx4ypi6</span> - 
          <span class="${p.isSource == true ? "sourcing active" : "sourcing"}"  onclick="openSourcingPopup(event)"><img src="./assets/images/orderpad/sourcing_icon.png" alt="sourcing">Sourcing</span>
          <span class="${p.isStock == true ? "stock-wrapper active" : "stock-wrapper"}"><span class="supplier-text text-uppercase" onclick="openSupplierPopup(event)">${p.supplier ? p.supplier : "eaton"}</span>
           - <span class="${p.stock == "Ns" ? "stock-text red" : " stock-text green"}">
              ${p.stock ? p.stock : "S"}
              <span class="tooltiptext">${p.stock == "S" ? "Stock" : "Non Stock"}</span>
            </span> &nbsp;- 
           </span>
          <span class="tag-text"><img src="./assets/images/global/tag.png" alt="tag">${p.brand}</span>
          </span>
        <span class="text">${p.desc ? p.desc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam doloribus hic facere, veniam in distinctio id tempora voluptatum? Facilis eius aut numquam. Alias perferendis sunt veniam reprehenderit officiis quas delectus."}</span>  
      </p>
      <p><span class="score">${p.score}</span>
      </p>
      <p> <span class="available-qty">${p.available_qty}</span></p>
      <p><span>$<input type="text" value="${p.unit_cost}" name="cost"></span></p>
      <p><span><input type="text" value="${p.margin}" name="margin">%</span></p>
      <p><span class="selling-price">$${p.selling_price}</span></p>
      <p><span class="total-cost">$${p.total_cost.toFixed(2)}</span></p>
      <p>
        <button type="button" class="delete-line-btn active" onclick=delRow(event)><img src="./assets/images/global/delete_icon.png" alt="delete"></button>
        <button type="button" class="undo-line-btn" onclick=undoRow(event)> <img src="./assets/images/dashboard/undo_icon.png" alt="undo"></button>
      </p>
      <p class="bottom-line"><img src="./assets/images/create_quote/line_add_icon.png" alt="add icon" ><span class="line"></span></p>
      <button class="add-line-note-btn" onclick="openLineNotePopup(event)"><img src="./assets/images/create_quote/add_note_grey_bg.png" class="${p.lineNote ? "img-grey " : "img-grey active"}" alt="add note grey"> <img src="./assets/images/create_quote/add_note icon_blue.png" class="${p.lineNote ? "img-blue active" : "img-blue"}" alt="add note blue "></button>
      <p class="del-id">${p.delId}</p>
      </div>
      <div class="${p.isSourcing == true ? "sourcing-dropdown active" : "sourcing-dropdown"}">
      <div class="desc-wrapper">
        <div class="img-wrapper">
          <div><img src="./assets/images/orderpad/${p.sourceImg}.png" class="thumbnail-img" alt="default"></div>
        </div>

        <div class="desc-container">
          <h3>Description</h3>
          <p>${p.desc ? p.desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."}</p>
        </div>
      </div>

      <div class="spec-wrapper">
        <h3>Specifications</h3>
        <div class="content-container">
          <div class="left-content">
            <p><span class="label">Wire Size</span> <span class="value">${p.wire_size} AWG</span></p>
            <p><span class="label">Material</span> <span class="value">Ploepropylene</span></p>
            <p><span class="label">Specifications</span> <span class="value">#10 Fork Material </span></p>
            <p><span class="label">Dimensions</span> <span class="value">1-1/2 In L</span></p>
          </div>
          <div class="right-content">
            <p><span class="label">Housing Material</span> <span class="value">${p.housing_material}</span></p>
            <p><span class="label">Number of outlets</span> <span class="value">${p.outlet}</span></p>
            <p><span class="label">Brand</span> <span class="value">${p.brand}</span></p>
            <p><span class="label">Type</span> <span class="value">${p.type}</span></p>
          </div>                                   
        </div>
      </div>
    </div>
    </div>
    `;
  });
  bodyWrapper.innerHTML += `<div class="add-btn-container left">
    <button type="button" onclick="openAddPopup()"><img src="./assets/images/create_quote/add_item_icon.png" alt="add"></button>
    <p class="text">Click here to Add Item</p>
    </div>`;
  clickTable(displayTable.querySelector(".body-wrapper"));
  editTableData(displayTable.querySelector(".body-wrapper"));
  checkDeleted(displayTable.querySelector(".body-wrapper"));
  enableDrag(displayTable.querySelector(".body-wrapper"));
}

//click function
function clickTable(bodyWrap) {
  const rows = bodyWrap.querySelectorAll(".table-row");

  rows.forEach((row) => {
    row.addEventListener("click", rowClickHandler);
  });
}

function rowClickHandler(e) {
  const row = e.currentTarget;

  const pTag = e.target.closest("p");

  // clicked directly on text/child inside p
  if (pTag && e.target !== pTag) {
    return;
  }

  if (e.target.closest("button")) {
    return;
  }

  row.style.cursor = "pointer";

  const sourceDropDown = row.nextElementSibling;

  sourceDropDown.classList.toggle("active");
  const delId = row.querySelector(".del-id").textContent;
  const product = newQuote.products.find((p) => String(p.delId) === delId);
  if (product) {
    if (sourceDropDown.classList.contains("active")) {
      product.isSourcing = true;
    } else {
      product.isSourcing = false;
    }
  }
}

//edit table data
function editTableData(bodyWrap) {
  const tableRows = bodyWrap.querySelectorAll(".table-row");

  tableRows.forEach((row) => {
    const qtyInp = row.querySelector('input[name="qty-requested"]');

    const availQty=row.querySelector('.available-qty').textContent;

    const costInp = row.querySelector('input[name="cost"]');

    const marginInp = row.querySelector('input[name="margin"]');

    const sellingPriceEl = row.querySelector(".selling-price");

    const totalPriceEl = row.querySelector(".total-cost");

    const delId = row.querySelector(".del-id").textContent;

    function updatePrices() {
      let qty = parseFloat(qtyInp.value) || 0;

      if (qty > Number(availQty)) {
        qty = Number(availQty);
        qtyInp.value = availQty;
      }

      const cost = parseFloat(costInp.value) || 0;

      const margin = parseFloat(marginInp.value) || 0;

      const sellingPrice = cost + (cost * margin) / 100;

      const totalPrice = qty * sellingPrice;

      sellingPriceEl.textContent = `$${sellingPrice.toFixed(2)}`;

      totalPriceEl.textContent = `$${totalPrice.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;

      const product = newQuote.products.find((p) => String(p.delId) === delId);
      if (product) {
        product.qty_requested = qty;

        product.unit_cost = cost;

        product.margin = margin;

        product.selling_price = Number(sellingPrice.toFixed(2));

        product.total_cost = Number(totalPrice.toFixed(2));
      }
      updateQuoteTotals();
      storeQuote();
    }

    [qtyInp, costInp, marginInp].forEach((inp) => {
      allowNumbers(inp);

      inp.addEventListener("input", updatePrices);
    });
  });
}

function allowNumbers(inp) {
  inp.addEventListener("input", () => {
    inp.value = inp.value.replace(/\D/g, "");
  });
}

function enableDrag(bodyWrap) {
  const groups = bodyWrap.querySelectorAll(".row-group");

  let draggedGroup = null;

  let canDrag = false;

  groups.forEach((group, index) => {
    // STORE ORIGINAL PRODUCT INDEX
    group.dataset.index = index;

    const row = group.querySelector(".table-row");

    const handle = row.querySelector(".drag-handle");

    group.draggable = true;

    // ENABLE DRAG
    handle.addEventListener("mousedown", () => {
      canDrag = true;
    });

    // DISABLE DRAG
    document.addEventListener("mouseup", () => {
      canDrag = false;
    });

    // START
    group.addEventListener("dragstart", (e) => {
      if (!canDrag) {
        e.preventDefault();

        return;
      }

      draggedGroup = group;

      requestAnimationFrame(() => {
        group.classList.add("dragging");
      });
    });

    // END
    group.addEventListener("dragend", () => {
      group.classList.remove("dragging");

      draggedGroup = null;

      updateLineNumbers(bodyWrap);

      // UPDATE PRODUCTS ORDER
      updateProductsOrder(bodyWrap);
    });

    // LIVE SHIFTING
    group.addEventListener("dragover", (e) => {
      e.preventDefault();

      if (!draggedGroup || draggedGroup === group) return;

      const rect = group.getBoundingClientRect();

      const offset = e.clientY - rect.top;

      // TOP HALF
      if (offset < rect.height / 2) {
        bodyWrap.insertBefore(draggedGroup, group);
      }

      // BOTTOM HALF
      else {
        bodyWrap.insertBefore(draggedGroup, group.nextSibling);
      }
    });
  });
}

function updateLineNumbers() {
  const tableRows = displayTable.querySelectorAll(".body-wrapper .table-row");

  tableRows.forEach((row, index) => {
    row.querySelector(".line-no").textContent = index + 1;
  });
}

function updateProductsOrder(bodyWrap) {
  const groups = bodyWrap.querySelectorAll(".row-group");

  const reorderedProducts = [];

  groups.forEach((group) => {
    const originalIndex = Number(group.dataset.index);

    reorderedProducts.push(newQuote.products[originalIndex]);
  });

  newQuote.products = reorderedProducts;

  groups.forEach((group, index) => {
    group.dataset.index = index;
  });

  storeQuote();
}

//check if it is deleted line
function checkDeleted(bodyWrap) {
  const rows = bodyWrap.querySelectorAll(".table-row");
  rows.forEach((row) => {
    if (row.classList.contains("not-active")) {
      const delBtn = row.querySelector(".delete-line-btn");
      const undoBtn = row.querySelector(".undo-line-btn");
      delBtn.classList.remove("active");
      undoBtn.classList.add("active");
      const paras = row.querySelectorAll("p");
      paras.forEach((p) => {
        p.style.pointerEvents = "none";
      });
      delBtn.style.pointerEvents = "auto";
      undoBtn.style.pointerEvents = "auto";
      row.removeEventListener("click", rowClickHandler);
    }
  });
}
