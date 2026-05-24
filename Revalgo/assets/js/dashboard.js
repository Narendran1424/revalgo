const dashBoardBodyWrapper = document.querySelector(".dashboard-body-wrapper");
const expandOverlay = document.querySelector(".expand-overlay");
const loaderWrapper=document.querySelector(".loader-wrapper");
const dashboardWrapper=document.querySelector(".dashboard-wrapper")
let quotes;
let filteredQuotes;
let start = new Date(new Date().setMonth(new Date().getMonth() - 6));
end = new Date();

async function initializeQuotes() {
  await loadQuotes();

  quotes = JSON.parse(sessionStorage.getItem("quotes"));
  filteredQuotes = JSON.parse(sessionStorage.getItem("quotes"));
  filterQuotesByDate(quotes, format(start), format(end));
  setTimeout(() => {
    loaderWrapper.classList.add("not-active");
    dashboardWrapper.classList.add("active");
  },400)
}
 


//datepicker
const dateText = document.querySelector(".date-text");
const dateFilter = document.querySelector(".date-filter");
const dateMenu = dateFilter.querySelector(".dropdown-menu");
const customText = document.querySelector(".custom-text");
const startText = document.querySelector(".start-text");
const endText = document.querySelector(".end-text");

const minDate = new Date(2025, 4, 1);
const maxDate = new Date(2026, 3, 30);
dateText.addEventListener("click", () => {
  if (!datePicker.classList.contains("active")) {
    dateMenu.classList.toggle("active");
  }
});

dateMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.tagName === "LI") {
    const value = e.target.dataset.value;
    dateText.childNodes[0].data = e.target.textContent;
    dateMenu.classList.remove("active");
    handleSelection(value);
  }
});

function handleSelection(value) {
  customText.classList.remove("active");
  datePicker.classList.remove("active");

  const today = new Date();

  switch (value) {
    case "today":
      start = end = today;
      break;

    case "yesterday":
      start = end = new Date(today.setDate(today.getDate() - 1));
      break;
    case "lastWeek": {
      const current = new Date();

      const day = current.getDay();
      const diff = day === 0 ? 6 : day - 1;

      end = new Date(current);
      end.setDate(current.getDate() - diff - 1);

      start = new Date(end);
      start.setDate(end.getDate() - 6);
      break;
    }

    case "lastMonth":
      end = new Date();

      start = new Date();
      start.setDate(start.getDate() - 30);

      break;

    case "last6Months":
      start = new Date(today.setMonth(today.getMonth() - 6));
      end = new Date();
      break;

    case "custom":
      customText.classList.add("active");
      datePicker.classList.add("active");
      return;
  }

  filterQuotesByDate(quotes, format(start), format(end));
}

let dateFilteredQuotes;
function filterQuotesByDate(quotes, start, end) {
  const startDate = start.replaceAll("/", "-");
  const endDate = end.replaceAll("/", "-");
  const startObj = parseDate(startDate);
  const endObj = parseDate(endDate);
  dateFilteredQuotes = quotes.filter((q) => {
    const quoteDate = parseDate(q.received_date);

    return quoteDate >= startObj && quoteDate <= endObj;
  });
  dateFilteredQuotes=dateFilteredQuotes.sort((a, b) => a.name.localeCompare(b.name))

  renderQuoteTable(dateFilteredQuotes);

  renderQuoteCounts(dateFilteredQuotes);

  getTrendChartData(dateFilteredQuotes, "all");
  tableBtns.forEach(btn=>{
    btn.classList.remove("active");
    if(btn.dataset.filter=="all"){
       btn.classList.add("active");
    }
  })

}

const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const datePicker = document.querySelector(".date-picker");

let activeDate = null;

startDate.addEventListener("click", () => {
  activeDate = "start";
  showCalendar();
});

endDate.addEventListener("click", () => {
  activeDate = "end";
  showCalendar();
});

function showCalendar() {
  datePicker.classList.add("active");
}

function format(date) {
  return date.toLocaleDateString("en-GB");
}

function selectDate(year, month, day) {
  const selected = new Date(year, month, day);

  if (activeDate === "start") {
    startDate.value = format(selected);
  }

  if (activeDate === "end") {
    endDate.value = format(selected);
  }

  datePicker.classList.remove("active");
}

customText.addEventListener("click", (e) => {
  e.stopPropagation();
  datePicker.classList.toggle("active");
  dateMenu.classList.remove("active");
});

//Datepicker

const calendarDays = document.querySelectorAll(".custom-date-day");

calendarDays.forEach((dayBtn) => {
  dayBtn.addEventListener("click", () => {
    let day = Number(dayBtn.dataset.day);
    let month = Number(dayBtn.dataset.month);
    let year = Number(dayBtn.dataset.year);

    let selectedDate = new Date(year, month - 1, day);
  });
});

function padZero(num) {
  if (num > 9) {
    return num;
  } else {
    return "0" + num;
  }
}
let flag = 0;
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

let today = new Date();
let current = new Date(today);
if (current < minDate) {
  current = new Date(minDate);
}

if (current > maxDate) {
  current = new Date(maxDate);
}
let selectedDate = null;
function createDatepicker(datePicker) {
  const monthNameEl = datePicker.querySelector(".month-name");
  const yearEl = datePicker.querySelector(".year");
  const datesContainer = datePicker.querySelector(".dates");
  const prevBtn = datePicker.querySelector(".prev-month");
  const nextBtn = datePicker.querySelector(".next-month");
  const tags = datePicker.querySelectorAll(".tag");

  const START_YEAR = Number(new Date().getFullYear()) - 200;
  const END_YEAR = Number(new Date().getFullYear());

  for (let y = START_YEAR; y <= END_YEAR; y++) {
    const div = document.createElement("div");
    div.className = "year-item";
    div.textContent = y;

    div.addEventListener("click", () => {
      const activeSpan = datePicker.querySelector(".input-wrapper span.active");

      let day = 1,
        month = 0;

      if (activeSpan) {
        const [dayText, monthText] = activeSpan.textContent.trim().split("/");

        day = Number(dayText);
        month = Number(monthText) - 1;

        activeSpan.textContent = `${dayText}/${monthText}/${y}`;
      }

      selectedDate = new Date(y, month, day);
      current = new Date(selectedDate);

      selectedYear = y;

      const content = datePicker.querySelector(".content");
      content.classList.remove("not-active");

      setActiveYear(datePicker, y);

      renderCalendar();
    });
  }

  function renderCalendar() {
    const year = current.getFullYear();
    const month = current.getMonth();

    monthNameEl.textContent = `${MONTHS[month]}`;
    yearEl.textContent = `${year}`;
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
        // console.log(startDate)
      });

      datesContainer.appendChild(btn);
    });
  }

  //prev button click
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

    const actDate = setActiveDate();

    current.setMonth(current.getMonth() - 1);

    renderCalendar();

    const dates = document.querySelectorAll(".date");

    dates.forEach((date) => {
      if (date.textContent == String(actDate)) {
        date.classList.add("current-day");
      }
    });
  });

  //next button click
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

    const actDate = setActiveDate();

    current.setMonth(current.getMonth() + 1);

    renderCalendar();

    const dates = document.querySelectorAll(".date");

    dates.forEach((date) => {
      if (date.textContent == String(actDate)) {
        date.classList.add("current-day");
      }
    });
  });
  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      let type = tag.dataset.type;

      if (type === "today") selectedDate = new Date();
      if (type === "yesterday") selectedDate = new Date(Date.now() - 86400000);
      if (type === "tomorrow") selectedDate = new Date(Date.now() + 86400000);

      current = new Date(selectedDate);
      renderCalendar();
    });
  });
  datePicker.renderCalendar = renderCalendar;
  const year = current.getFullYear();
  setActiveYear(datePicker, year);
  renderCalendar();
}

function setActiveDate() {
  const activeSpan = datePicker.querySelector(".input-wrapper span.active");
  let day = 1;

  if (activeSpan) {
    let [dayText, monthText, yearText] = activeSpan.textContent
      .trim()
      .split("/");

    day = Number(dayText);
    return day;
  }
}

//activeyear
function setActiveYear(datePicker, year) {
  const yearItems = datePicker.querySelectorAll(".year-item");

  yearItems.forEach((item) => {
    item.classList.toggle("active", Number(item.textContent) === year);
  });
}

const datepicker = dateFilter.querySelector(".date-picker");

createDatepicker(datepicker);

const days = datepicker.querySelector(".days");
for (let i = 0; i < DAYS.length; i++) {
  const dayEl = document.createElement("span");
  dayEl.className = "day";
  dayEl.textContent = DAYS[i];
  days.appendChild(dayEl);
}

function getSelectedDate(datePicker) {
  const monthNameEl = datePicker.querySelector(".month-name");
  const yearEl = datePicker.querySelector(".year");
  const dateInpWrapper = datePicker.querySelector(".input-wrapper");
  const MonthArr = monthNameEl.textContent.split(" ");
  selectedMonth = Number(MONTHS.findIndex((m) => m === MonthArr[0])) + 1;
  selectedMonth = padZero(selectedMonth);
  // yearEl.
  const dates = datePicker.querySelectorAll(".dates .date");
  const startDateText = document.querySelector(".start-text");
  const endDateText = document.querySelector(".end-text");
  const startDat = datePicker.querySelector(".start");
  const endDat = datePicker.querySelector(".end");
  dates.forEach((d) => {
    if (d.classList.contains("current-day")) {
      selectedDatee = padZero(Number(d.textContent));
    }
  });

  dateInpWrapper.querySelectorAll("span").forEach((dat) => {
    if (dat.classList.contains("active")) {
      dat.textContent = `${selectedDatee}/${selectedMonth}/${yearEl.textContent}`;
    }
    startDateText.textContent = startDat.textContent;
    endDateText.textContent = endDat.textContent;

    filterQuotesByDate(
      quotes,
      startDateText.textContent,
      endDateText.textContent,
    );
  });
}

const dateInpWrapper = datePicker.querySelector(".input-wrapper");
const dateSpan = dateInpWrapper.querySelectorAll("span");
dateSpan.forEach((span) => {
  span.addEventListener("click", () => {
    dateSpan.forEach((span) => span.classList.remove("active"));
    span.classList.add("active");

    const dateText = span.textContent.trim();

    const [day, month, year] = dateText.split("/").map(Number);

    selectedDate = new Date(year, month - 1, day);

    current = new Date(selectedDate);
    setActiveYear(datePicker, year);
    datepicker.renderCalendar();
  });
  if (span.classList.contains("active")) {
    const dateText = span.textContent.trim();

    const [day, month, year] = dateText.split("/").map(Number);

    selectedDate = new Date(year, month - 1, day);

    current = new Date(selectedDate);
    setActiveYear(datePicker, year);

    datepicker.renderCalendar();
  }
});

document.addEventListener("click", (e) => {
  const dp = document.querySelector(".date-picker");
  const dateText = document.querySelector(".date-text");
  const customText = document.querySelector(".custom-text");

  if (!dp) return;

  const clickedInsidePicker = dp.contains(e.target);
  const clickedDateText = dateText.contains(e.target);
  const clickedCustomText = customText.contains(e.target);

  // close picker when clicking dateText
  if (clickedDateText) {
    dp.classList.remove("active");

    dp.querySelector(".content")?.classList.remove("not-active");

    return;
  }

  // outside click
  if (!clickedInsidePicker && !clickedCustomText) {
    dp.classList.remove("active");

    dp.querySelector(".content")?.classList.remove("not-active");

    dateMenu.classList.remove("active");
  }
});

//widget button

const widgetText = document.querySelector(".widget-text");
const widgetDropdown = document.querySelector(".widget-dropdown-menu");

widgetText.addEventListener("click", () => {
  widgetDropdown.classList.toggle("active");
});
document.addEventListener("click", (e) => {
  if (!widgetText.contains(e.target) && !widgetDropdown.contains(e.target)) {
    widgetDropdown.classList.remove("active");
  }
});
renderWidgets();
function renderWidgets() {
  const widgetInputs = widgetDropdown.querySelectorAll("input");
  const trendWrapper = document.querySelector(".trend-chart-wrapper");
  const accuracyWrapper = document.querySelector(".accuracy-chart-wrapper");
  const transactionWrapper = document.querySelector(".transaction-wrapper");

  widgetInputs.forEach((inp) => {
    inp.addEventListener("change", () => {
      if (inp.id == "select-all") {
        if (inp.checked) {
          widgetInputs.forEach((inp) => (inp.checked = true));
          dashBoardBodyWrapper.classList.remove("not-active");
        } else {
          widgetInputs.forEach((inp) => (inp.checked = false));
          dashBoardBodyWrapper.classList.add("not-active");
        }
      } else if (inp.id == "recent") {
        quotesContainer.classList.toggle("not-active");
        trendWrapper.classList.toggle("minimize");
        accuracyWrapper.classList.toggle("minimize");
        transactionWrapper.classList.toggle("maximize");
      } else if (inp.id == "trend") {
        trendWrapper.classList.toggle("not-active");
      } else if (inp.id == "accuracy") {
        accuracyWrapper.classList.toggle("not-active");
      } else {
        transactionWrapper.classList.toggle("not-active");
      }
    });
  });
}

//expand function
const overlay = document.querySelector(".expand-overlay");
const modalBox = document.querySelector(".expand-modal");
const modalContent = document.querySelector(".expand-modal-content");
const modalTrendChartWrapper = modalContent.querySelector(
  ".trend-chart-wrapper",
);
const modalaccurChartWrapper = modalContent.querySelector(
  ".accuracy-chart-wrapper",
);
const expandBtns = document.querySelectorAll(".expand-btn");
const closeBtn = document.querySelector(".close-modal-btn");

expandBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    const target = btn.dataset.target;
    const modalData = btn.dataset.modal;
    const source = document.querySelector(target);
    if (!source) return;
    modalBox.className =
      "expand-modal " + type + " " + modalData + " " + "active";

    if (type === "table") {
      const modalTransactionWrapper = modalContent.querySelector(
        ".transaction-wrapper",
      );
      const modalQuoteContainer =
        modalContent.querySelector(".quotes-container");
      modalQuoteContainer?.classList.remove("active");
      modalTransactionWrapper?.classList.remove("active");
      const clone = source.cloneNode(true);

      if (target == ".quotes-container") {
        modalContent.appendChild(source);
        const modQuoteContainer =
          modalContent.querySelector(".quotes-container");
        modQuoteContainer.classList.add("active");
        dashBoardBodyWrapper.insertBefore(
          clone,
          dashBoardBodyWrapper.firstChild,
        );
      } else if (target == ".transaction-wrapper") {
        const modalTransactionWrapper = modalContent.querySelector(
          ".transaction-wrapper",
        );
        if (!modalTransactionWrapper) {
          modalContent.appendChild(clone);
        }
        const modTransactionWrapper = modalContent.querySelector(
          ".transaction-wrapper",
        );
        modTransactionWrapper?.classList.add("active");
      } else if (target == ".suggest-product-popup") {
        modalContent.appendChild(source);
        closeBtn.classList.add("not-active");
        closeSuggestExpandModal();
      }
    }

    if (type === "chart") {
      const modalTransactionWrapper = modalContent.querySelector(
        ".transaction-wrapper",
      );
      modalTrendChartWrapper?.classList.remove("active");
      modalaccurChartWrapper?.classList.remove("active");
      modalTransactionWrapper?.classList.remove("active");
      if (target == ".trend-chart-wrapper") {
        modalTrendChartWrapper.classList.add("active");
      } else if (target === ".accuracy-chart-wrapper") {
        modalAccurChart.reflow();
        modalaccurChartWrapper.classList.add("active");
      }
    }
    overlay.classList.add("active");
  });
});

function closeModal() {
  overlay.classList.remove("active");
  modalBox.classList.remove("active");
  const quoteContainer = document.querySelector(".quotes-container");
  const originalSource = modalContent.querySelector(".quotes-container");
  const suggestSource = modalContent.querySelector(".suggest-product-popup");
  if (originalSource) {
    quoteContainer.remove();
    dashBoardBodyWrapper.insertBefore(
      originalSource,
      dashBoardBodyWrapper.firstChild,
    );
  }
  if (suggestSource) {
    disTableBodyWrapper.appendChild(suggestSource);
  }
}
// close button
closeBtn.addEventListener("click", () => {
  closeModal();
});
function closeSuggestExpandModal() {
  const closeSuggestExpandBtn = modalContent.querySelector(
    ".close-suggest-popup-btn",
  );
  closeSuggestExpandBtn.addEventListener("click", () => {
    closeModal();
    closeBtn.classList.remove("not-active");
  });
}

// close on overlay click
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});

//table
const quoteTable = document.querySelector(".quote-table");

function getPrice(price) {
  return parseFloat(price.replace(/[^\d.]/g, "").replace(/\.(?=.*\.)/g, ""));
}
function renderQuoteTable(data) {
  const tBody = quoteTable.querySelector("tbody");

  tBody.innerHTML = "";
  let tabHtml = "";
  if (data.length != 0) {
    data.forEach((d) => {
      tabHtml += `<tr data-id="${d.id}">
        <td><img src="./assets/images/dashboard/${d.mode}_icon.png" alt="${d.img}"></td>
        <td><a href="./recent-quote.html" class="quote-id-btn">#${d.id}</a></td>
        <td>${d.number ? ` ${d.name} /${d.number}` : `${d.name}`}</td>
        <td>${d.received_date}</td>
        <td>${d.approved_date}</td>
        <td class=${d.status === "approved" ? "approved" : d.status === "pending" ? "pending" : ""} }>${d.status}</td>
        <td>${d.total_line_no}</td>
        <td>$${d.total_price}</td>
        <td>${
          d.status === "deleted"
            ? `<span class="undo-btn">Undo</span>`
            : `<a href="./create-quote.html" class="create-quote-link" onclick="gotoCreateQuote(event)">
          <img src="./assets/images/dashboard/add_icon.png" alt="add"> </a>`
        }
      </td>
    </tr>
      `;
    });

    tBody.innerHTML = tabHtml;
    const quoteTable = document.querySelector(".quote-table");
    tableClickHandler(quoteTable);
  } else {
    tBody.innerHTML = "<p class='not-found'>Data Not Found</p>";
  }
}

function gotoCreateQuote(event) {
  event.preventDefault();
  let newId = "";
  newId = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
  let isExists = quotes.some((q) => q.id === newId);
  while (isExists) {
    newId = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
    isExists = quotes.some((q) => q.id === newId);
  }
  sessionStorage.setItem("newId", newId);
  window.location.href = "./create-quote.html";
}

//handle undo
const undoModal = document.querySelector(".undo-modal");
const undoYesBtn = undoModal.querySelector(".yes-btn");
const undoNoBtn = undoModal.querySelector(".no-btn");

const undoText = undoModal.querySelector(".text");
function tableClickHandler(quoteTable) {
  const idBtns = quoteTable.querySelectorAll(".quote-id-btn");
  idBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.closest("tr").dataset.id;
      quotes.forEach((q) => {
        if (q.id == id) {
          sessionStorage.setItem("selectedQuote", JSON.stringify(q));
          window.location.href = "./recent-quote.html";
        }
      });
    });
  });
  const undoBtns = quoteTable.querySelectorAll(".undo-btn");
  undoBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      closeModal();
      const id = e.target.closest("tr").dataset.id;
      expandOverlay.classList.add("active");
      undoModal.classList.add("active");
      undoText.innerHTML = `Are you sure you want to undo this  <br> Quote ID #${id}</p>`;
      undoQuoteStatus(id);
    });
  });
}

//undo btn function
function undoQuoteStatus(id) {
  undoYesBtn.addEventListener("click", () => {
    quotes.forEach((q) => {
      if (q.id == id) {
        console.log(q);
        q.status = "pending";

        sessionStorage.setItem("quotes", JSON.stringify(quotes));
        initializeSearch();
        quotes = JSON.parse(sessionStorage.getItem("quotes"));
        filteredQuotes = JSON.parse(sessionStorage.getItem("quotes"));
        filterQuotesByDate(quotes, format(start), format(end));
        closeUndoModal();
      }
    });
  });
}

function closeUndoModal() {
  expandOverlay.classList.remove("active");
  undoModal.classList.remove("active");
}

undoNoBtn.addEventListener("click", () => {
  closeUndoModal();
});

//update counts form data
function renderQuoteCounts(data) {
  const approveCounts = document.querySelectorAll(".apprv-count");
  const pendCounts = document.querySelectorAll(".pend-count");
  const delCounts = document.querySelectorAll(".del-count");
  const allCount = document.querySelector(".all-count");
  const totalRev = document.querySelector(".total-revenue");
  const totalCounts = document.querySelectorAll(".total-count");
  let approve = 0;
  let pend = 0;
  let del = 0;
  let tot = 0;
  let totalPrice = 0;
  data.forEach((d) => {
    const status = d.status;
    switch (status) {
      case "approved":
        approve++;
        break;
      case "pending":
        pend++;
        break;
      case "deleted":
        del++;
        break;
    }
    const str = d.total_price;

    const num = getPrice(str);

    totalPrice += num;
  });

  approveCounts.forEach((c) => (c.textContent = approve));
  pendCounts.forEach((c) => (c.textContent = pend));
  delCounts.forEach((c) => (c.textContent = del));

  totalCounts.forEach((c) => (c.textContent = approve + pend));
  allCount.textContent = data.length;
  totalRev.textContent = "$" + totalPrice.toFixed(2);
}

//filter function

const quotesContainer = document.querySelector(".quotes-container");
const tableBtns = document.querySelectorAll(
  ".top-container .btn-container button",
);

tableBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tableBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    const filterItem = btn.dataset.filter;

    if (filterItem != "all")
      filteredQuotes = dateFilteredQuotes.filter((q) => q.status == filterItem);
    else filteredQuotes = [...dateFilteredQuotes];

    renderQuoteTable(filteredQuotes);
    getTrendChartData(dateFilteredQuotes, filterItem);
  });
});

//filter function
const filterBtn = quotesContainer.querySelector(".filter-text");

const filterDropdown = document.querySelector(".filter-dropdown");
const filterItems = filterDropdown.querySelectorAll("ul li");
filterBtn.addEventListener("click", () => {
  console.log(filterBtn)
  filterDropdown.classList.toggle("active");
});

filterItems.forEach((item) => {
  item.addEventListener("click", () => {
    const filteredCopy = [...filteredQuotes];
    filterItems.forEach((item) => item.classList.remove("active"));
    filterDropdown.classList.remove("active");
    const sortItem = item.dataset.sort;
    const ascend = item.dataset.ascending;
    item.classList.add("active");

    if (sortItem == "name") {
      if (ascend == "true") {
        sortedQuote = filteredCopy.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        sortedQuote = filteredCopy.sort((a, b) => b.name.localeCompare(a.name));
      }
    } else if (sortItem == "id") {
      if (ascend == "true") {
        sortedQuote = filteredCopy.sort((a, b) => a.id - b.id);
      } else {
        sortedQuote = filteredCopy.sort((a, b) => a.id - b.id);
      }
    } 
    renderQuoteTable(sortedQuote);
  });
});
document.addEventListener("click", (e) => {
  if (!e.target.contains(filterBtn)){
    if( filterDropdown.classList.contains("active")){
      filterDropdown.classList.remove("active");
    }
  } 
});

//sort

const tabHeaderSpans = quoteTable.querySelectorAll("th span");
let sortedQuote;
let isAscending = true;
function parseDate(dateStr) {
  const [day, month, year] = dateStr.split("-");

  return new Date(year, month - 1, day);
}

tabHeaderSpans.forEach((sp) => {
  sp.addEventListener("click", () => {
    const filteredCopy = [...filteredQuotes];
    const sortItem = sp.dataset.sort;
    if (isAscending) {
      if (sortItem == "id") {
        sortedQuote = filteredCopy.sort((a, b) => a.id - b.id);
      } else if (sortItem == "name") {
        sortedQuote = filteredCopy.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortItem == "received_date") {
        sortedQuote = filteredCopy.sort(
          (a, b) => parseDate(a.received_date) - parseDate(b.received_date),
        );
      } else if (sortItem == "approved_date") {
        sortedQuote = filteredCopy.sort(
          (a, b) => parseDate(a.approved_date) - parseDate(b.approved_date),
        );
      } else if (sortItem == "status") {
        sortedQuote = filteredCopy.sort((a, b) =>
          a.status.localeCompare(b.status),
        );
      } else if (sortItem == "total_line_no") {
        sortedQuote = filteredCopy.sort(
          (a, b) => a.total_line_no - b.total_line_no,
        );
      } else if (sortItem == "total_line_no") {
        sortedQuote = filteredCopy.sort(
          (a, b) => a.total_line_no - b.total_line_no,
        );
      } else if (sortItem == "total_price") {
        sortedQuote = filteredCopy.sort(
          (a, b) => getPrice(a.total_price) - getPrice(b.total_price),
        );
      }
    } else if (!isAscending) {
      if (sortItem == "id") {
        sortedQuote = filteredCopy.sort((a, b) => b.id - a.id);
      } else if (sortItem == "name") {
        sortedQuote = filteredCopy.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortItem == "received_date") {
        sortedQuote = filteredCopy.sort(
          (a, b) => parseDate(b.received_date) - parseDate(a.received_date),
        );
      } else if (sortItem == "approved_date") {
        sortedQuote = filteredCopy.sort(
          (a, b) => parseDate(b.approved_date) - parseDate(a.approved_date),
        );
      } else if (sortItem == "status") {
        sortedQuote = filteredCopy.sort((a, b) =>
          b.status.localeCompare(a.status),
        );
      } else if (sortItem == "total_line_no") {
        sortedQuote = filteredCopy.sort(
          (a, b) => b.total_line_no - a.total_line_no,
        );
      } else if (sortItem == "total_price") {
        sortedQuote = filteredCopy.sort(
          (a, b) => getPrice(b.total_price) - getPrice(a.total_price),
        );
      }
    }

    renderQuoteTable(sortedQuote);
    isAscending = !isAscending;
  });
});

//search function

const searchInput = document.querySelector(".search-table-quote-input");
const searchBtn = document.querySelector(".search-table-quote-btn");

function searchQuotes() {
  const value = searchInput.value.trim().toLowerCase();
  const filteredCopy = [...filteredQuotes];
  if (value != "") {
    sortedQuote = filteredCopy.filter((q) => {
      return (
        q.id.toString().toLowerCase().includes(value) ||
        q.name.toLowerCase().includes(value) ||
        q.number.toString().toLowerCase().includes(value) ||
        q.status.toLowerCase().includes(value)
      );
    });
  } else {
    sortedQuote = filteredCopy;
  }

  renderQuoteTable(sortedQuote);
}

// button click
searchBtn.addEventListener("click", searchQuotes);

// enter key
searchInput.addEventListener('input', () => searchQuotes());


//charts
let trendChart;
const trendChartContainer = document.getElementById("trend-chart");

function renderTrendChart(totalQuotes, filterQuotes, filterItem) {
  trendChart = Highcharts.chart("trend-chart", {
    chart: {
      type: "area",
      animation: true,
    },
    xAxis: {
      lineColor: "#e6e6e6",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      title: {
        text: "",
      },
      labels: {
        useHTML: true,
        format: '<div class="trend-x-label">{value}</div>',
      },
    },
    title: {
      text: "",
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        useHTML: true,
        format: '<div class="trend-y-label">{value}</div>',
      },
    },
    tooltip: {
      outside: true,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        animation: {
          duration: 500,
        },
      },
      area: {
        fillOpacity: 0.5,
      },
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
    series: [
      {
        name: "Total",
        color: "rgb(255, 9, 181)",
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgb(212, 40, 161)"],
            [0.5, "rgba(184, 71, 199, 0.64)"],
            [1, "rgba(231, 105, 248, 0.05)"],
          ],
        },
        data: totalQuotes,
        marker: {
          symbol: "circle",
          fillColor: "#ffffff",
          lineColor: "rgb(255, 9, 181)",
          lineWidth: 1,
          radius: window.innerWidth <= 1400 ? 2 : 3,
          states: {
            hover: { enabled: false, lineWidth: 0, borderWidth: 0 },
            inactive: { opacity: 1 },
          },
        },
      },
      {
        name: filterItem,
        color: "#49b4ff",
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgb(103, 199, 255)"],
            [0.5, "rgba(65, 183, 238, 0.64)"],
            [1, "rgba(71, 175, 223, 0.05)"],
          ],
        },
        data: filterQuotes,
        marker: {
          symbol: "circle",
          fillColor: "#ffffff",
          lineColor: "#49b4ff",
          lineWidth: 1,
          radius: window.innerWidth <= 1400 ? 2 : 3,
          states: {
            hover: { enabled: false, lineWidth: 0, borderWidth: 0 },
            inactive: { opacity: 1 },
          },
        },
      },
    ],
  });
}

// function enableTrendLegend(){
//   if(trendChart){
//     const trendWrapper=document.querySelector(".trend-chart-wrapper");
//     const legends = trendWrapper.querySelectorAll('.legend');
//     legends.forEach((legend, index) => {
//       legend.addEventListener('click', () => {
//       legend.classList.toggle('inactive');
//       const series=trendChart.series[index] ;
//       series.setVisible(!series.visible,false);
//       trendChart.redraw();
//       });
//     });
//   }
// }
function enableTrendLegend() {
  // if (!trendChart) return;

  const trendWrapper = document.querySelector(".trend-chart-wrapper");

  const legends = trendWrapper.querySelectorAll(".legend");

  legends.forEach((legend, index) => {
    legend.onclick = () => {
      legend.classList.toggle("inactive");

      const series = trendChart.series[index];

      series.setVisible(!series.visible, false);

      trendChart.redraw();
    };
  });
}

enableTrendLegend();

//gauge chart
let sizes = getAccurSizes();

function getAccurSizes() {
  const w = window.innerWidth;

  let baseWidth = 10;
  if (w <= 1200) baseWidth = 6;
  else if (w <= 1400) baseWidth = 7;
  else if (w <= 1600) baseWidth = 8;

  return {
    baseWidth: baseWidth,
    pivotRadius: w <= 1600 ? 3 : 4,
  };
}

function enableModalTrendLegend() {
  const modalContent = document.querySelector(".expand-modal-content");
  const modalTrendWrapper = modalContent.querySelector(".trend-chart-wrapper");
  const legends = modalTrendWrapper.querySelectorAll(".legend");

  legends.forEach((legend, index) => {
    legend.addEventListener("click", () => {
      legend.classList.toggle("inactive");
      const series = modalTrendChart.series[index];
      series.setVisible(!series.visible, false);
      modalTrendChart.redraw();
    });
  });
}

enableModalTrendLegend();

let accurChart;
setTimeout(()=>{
  accurChart  = Highcharts.chart("accuracy-chart", {
    chart: {
      type: "gauge",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: "80%",
      spacingBottom: 20,
      // useHTML:true,
      styledMode: true,
      reflow: true,

      events: {
        load: function () {
          drawCustomArc(this);
        },
        redraw: function () {
          drawCustomArc(this);
        },
      },
    },

    title: {
      text: "",
    },

    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "75%"],
      size: "110%",
    },

    // the value axis
    yAxis: {
      min: 0,
      max: 100,

      tickWidth: 0,
      minorTickWidth: 0,
      lineWidth: 0,
      labels: {
        enabled: false,
      },
    },

    series: [
      {
        name: "Accuracy",
        data: [96.6],
        dataLabels: {
          useHTML: true,
          format: '<div class="accur-label">{y}</div>',
          borderWidth: 0,
          y: 25,
          x: -20,
          verticalAlign: "bottom",
        },
        dial: {
          radius: "110%",
          backgroundColor: "#000000",
          borderColor: "white",
          borderWidth: 0,
          // topWidth: 3,
          baseWidth: sizes.baseWidth,
          baseLength: "2%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "white",
          borderColor: "#000000",
          borderWidth: 2,
          radius: sizes.pivotRadius,
        },
      },
    ],

    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
  });
},400)

function drawCustomArc(chart) {
  if (chart.customGaugeGroup) {
    chart.customGaugeGroup.destroy();
    chart.customGaugeGroup = null;
  }

  if (chart.customLabels) {
    chart.customLabels.forEach((label) => label.destroy());
  }
  chart.customLabels = [];

  // create new group
  const group = chart.renderer.g("custom-gauge").add();
  chart.customGaugeGroup = group;

  const centerX = chart.plotLeft + chart.plotWidth * 0.5;
  const centerY = chart.plotTop + chart.plotHeight * 0.75;

  const startAngle = -Math.PI;
  const endAngle = 0;

  const steps = 12;

  const colors = [
    "#ef1c23",
    "#ed531d",
    "#ff7b19",
    "#fec900",
    "#fee600",
    "#d7df23",
    "#b9c036",
    "#8dc63f",
    "#51b64c",
    "#52b44d",
    "#33ac45",
    "#2daa70",
  ];

  const baseOuter = chart.plotWidth / 2 - 20;

  for (let i = 0; i < steps; i++) {
    const gap = 0.02;

    const angleStart = startAngle + (i * (endAngle - startAngle)) / steps + gap;
    const angleEnd =
      startAngle + ((i + 1) * (endAngle - startAngle)) / steps - gap;

    const thickness = 10 + i * 2;

    chart.renderer
      .arc(centerX, centerY, baseOuter, baseOuter, angleStart, angleEnd)
      .attr({
        stroke: colors[i],
        "stroke-width": thickness,
        fill: "none",
        "stroke-linecap": "round",
      })
      .add(group);
  }

  const labelRadius = baseOuter + 25;

  const x0 = centerX + labelRadius * Math.cos(startAngle);
  const y0 = centerY + labelRadius * Math.sin(startAngle);

  const x100 = centerX + labelRadius * Math.cos(endAngle);
  const y100 = centerY + labelRadius * Math.sin(endAngle);

  const label0 = chart.renderer
    .text('<span class="gauge-label">0</span>', x0 + 20, y0 + 15, true)
    .add();

  const label100 = chart.renderer
    .text('<span class="gauge-label">100</span>', x100 - 35, y100 + 15, true)
    .add();

  chart.customLabels.push(label0, label100);
}

function renderAccurChart(Data) {
  accurChart.update({
    series: [
      {
        data: [Data],
      },
    ],
  });
}

let lastSmall = window.innerWidth < 1600;

//modal chart

let modalTrendChart;
const modalTrendChartContainer = document.getElementById("trend-modal-chart");
function renderModalTrendChart(totalQuotes, filterQuotes, filterItem) {
  modalTrendChart = Highcharts.chart("trend-modal-chart", {
    chart: {
      type: "area",
      animation: true,
    },
    xAxis: {
      // lineWidth: 0,
      lineColor: "#e6e6e6",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      title: {
        text: "",
      },
      labels: {
        useHTML: true,
        format: '<div class="trend-x-label">{value}</div>',
      },
    },
    title: {
      text: "",
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        useHTML: true,
        format: '<div class="trend-y-label">{value}</div>',
      },
    },
    tooltip: {
      outside: true,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        animation: {
          duration: 500,
        },
      },
      area: {
        fillOpacity: 0.5,
      },
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
    series: [
      {
        name: "Total",
        color: "#ff09b5",
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgb(212, 40, 161)"],
            [0.5, "rgba(184, 71, 199, 0.64)"],
            [1, "rgba(231, 105, 248, 0.05)"],
          ],
        },
        data: totalQuotes,
        marker: {
          symbol: "circle",
          fillColor: "#ffffff",
          lineColor: "rgb(255, 9, 181)",
          lineWidth: 1,
          radius: window.innerWidth <= 1400 ? 3 : 4,
          states: {
            hover: { enabled: false, lineWidth: 0, borderWidth: 0 },
            inactive: { opacity: 1 },
          },
        },
      },
      {
        name: filterItem,
        color: "#49b4ff",
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgb(103, 199, 255)"],
            [0.5, "rgba(65, 183, 238, 0.64)"],
            [1, "rgba(71, 175, 223, 0.05)"],
          ],
        },
        data: filterQuotes,
        marker: {
          symbol: "circle",
          fillColor: "#ffffff",
          lineColor: "#49b4ff",
          lineWidth: 1,
          radius: window.innerWidth <= 1400 ? 3 : 4,
          states: {
            hover: { enabled: false, lineWidth: 0, borderWidth: 0 },
            inactive: { opacity: 1 },
          },
        },
      },
    ],
  });
}

//modal gauge chart

let modalSizes = getmodalAccurSizes();

function getmodalAccurSizes() {
  const w = window.innerWidth;

  let baseWidth = 15;
  if (w <= 1200) baseWidth = 10;
  else if (w <= 1400) baseWidth = 11;
  else if (w <= 1600) baseWidth = 12;

  return {
    baseWidth: baseWidth,
    pivotRadius: w <= 1600 ? 6 : 7,
  };
}

const modalAccurChart = Highcharts.chart("accuracy-modal-chart", {
  chart: {
    type: "gauge",
    plotBackgroundColor: null,
    plotBackgroundImage: null,
    plotBorderWidth: 0,
    plotShadow: false,
    height: "68%",
    spacingBottom: 20,
    // useHTML:true,
    styledMode: true,
    reflow: true,

    events: {
      load: function () {
        drawModalCustomArc(this);
      },
      redraw: function () {
        drawModalCustomArc(this);
      },
    },
  },

  title: {
    text: "",
  },

  pane: {
    startAngle: -90,
    endAngle: 89.9,
    background: null,
    center: ["50%", "75%"],
    size: "100%",
  },

  // the value axis
  yAxis: {
    min: 0,
    max: 100,

    tickWidth: 0,
    minorTickWidth: 0,
    lineWidth: 0,
    labels: {
      enabled: false,
    },
  },

  series: [
    {
      name: "Accuracy",
      data: [96.6],
      dataLabels: {
        useHTML: true,
        format: '<div class="accur-label">{y}</div>',
        borderWidth: 0,
        y: 55,
        // x:-25,
        verticalAlign: "bottom",
      },
      dial: {
        radius: "140%",
        backgroundColor: "#000000",
        borderColor: "white",
        borderWidth: 0,
        // topWidth: 3,
        baseWidth: modalSizes.baseWidth,
        baseLength: "7%",
        rearLength: "0%",
      },
      pivot: {
        backgroundColor: "white",
        borderColor: "#000000",
        borderWidth: 2,
        radius: modalSizes.pivotRadius,
      },
    },
  ],

  credits: {
    enabled: false,
  },
  accessibility: {
    enabled: false,
  },
});

function drawModalCustomArc(chart) {
  if (chart.customGaugeGroup) {
    chart.customGaugeGroup.destroy();
    chart.customGaugeGroup = null;
  }

  if (chart.customLabels) {
    chart.customLabels.forEach((label) => label.destroy());
  }
  chart.customLabels = [];

  // create new group
  const group = chart.renderer.g("custom-gauge").add();
  chart.customGaugeGroup = group;

  const centerX = chart.plotLeft + chart.plotWidth * 0.5;
  const centerY = chart.plotTop + chart.plotHeight * 0.75;

  const startAngle = -Math.PI;
  const endAngle = 0;

  const steps = 12;

  const colors = [
    "#ef1c23",
    "#ed531d",
    "#ff7b19",
    "#fec900",
    "#fee600",
    "#d7df23",
    "#b9c036",
    "#8dc63f",
    "#51b64c",
    "#52b44d",
    "#33ac45",
    "#2daa70",
  ];

  const baseOuter = chart.plotWidth / 2 - 20;

  for (let i = 0; i < steps; i++) {
    const gap = 0.02;

    const angleStart = startAngle + (i * (endAngle - startAngle)) / steps + gap;
    const angleEnd =
      startAngle + ((i + 1) * (endAngle - startAngle)) / steps - gap;

    const thickness = 23 + i * 2;

    chart.renderer
      .arc(centerX, centerY, baseOuter, baseOuter, angleStart, angleEnd)
      .attr({
        stroke: colors[i],
        "stroke-width": thickness,
        fill: "none",
        "stroke-linecap": "round",
      })
      .add(group);
  }

  const labelRadius = baseOuter + 25;

  const x0 = centerX + labelRadius * Math.cos(startAngle);
  const y0 = centerY + labelRadius * Math.sin(startAngle);

  const x100 = centerX + labelRadius * Math.cos(endAngle);
  const y100 = centerY + labelRadius * Math.sin(endAngle);

  const label0 = chart.renderer
    .text('<span class="gauge-label">0</span>', x0 + 20, y0 + 15, true)
    .add();

  const label100 = chart.renderer
    .text('<span class="gauge-label">100</span>', x100 - 35, y100 + 15, true)
    .add();

  chart.customLabels.push(label0, label100);
}

function renderModalAccurChart(Data) {
  modalAccurChart.update({
    series: [
      {
        data: [Data],
      },
    ],
  });
}

//resize listener
window.addEventListener("resize", () => {
  const nowSmall = window.innerWidth < 1600;
  if (nowSmall !== lastSmall) {
    lastSmall = nowSmall;

    const s = getAccurSizes();

    accurChart.update(
      {
        series: [
          {
            dial: { baseWidth: s.baseWidth },
            pivot: { radius: s.pivotRadius },
          },
        ],
      },
      true,
    );
    const ms = getmodalAccurSizes();
    modalAccurChart.update(
      {
        series: [
          {
            dial: { baseWidth: ms.baseWidth },
            pivot: { radius: ms.pivotRadius },
          },
        ],
      },
      true,
    );
  } else {
    accurChart.reflow();
    modalAccurChart.reflow();
  }

  if (trendChart) {
    trendChart.reflow();
  }
  if (modalTrendChart) {
    modalTrendChart.reflow();
  }
});

function getTrendChartData(dateFilteredQuotes, filterItem) {
  const filterCopy = [...dateFilteredQuotes];
  const allQuotes = filterQuoteByStatus(
    filterCopy.filter((f) => f.status == "pending" || f.status == "approved"));
  const totalQuotes = filterQuoteByRevenue(filterCopy.filter((f) => f.status == "pending" || f.status == "approved"));
  let filterQuotes;
  if (filterItem != "all") {
    filterQuotes = filterQuoteByStatus(
      filterCopy.filter((f) => f.status == filterItem),
    );
  } else {
    filterQuotes = allQuotes;
  }

  const filterLegendtexts = document.querySelectorAll(".approved-legend");
  filterLegendtexts.forEach(
    (text) => (text.innerHTML = `<span></span>${filterItem}`),
  );

  renderTrendChart(totalQuotes, filterQuotes, filterItem);

  renderModalTrendChart(totalQuotes, filterQuotes, filterItem);
}

function filterQuoteByStatus(filteredQuote) {
  const monthData = new Array(12).fill(0);
  filteredQuote.forEach((q) => {
    const date = parseDate(q.received_date);

    const monthIndex = date.getMonth();

    monthData[monthIndex]++;
  });
  return monthData;
}

function filterQuoteByRevenue(filteredQuote) {
  const monthData = new Array(12).fill(0);
  filteredQuote.forEach((q) => {
    const date = parseDate(q.received_date);
    const monthIndex = date.getMonth();
    monthData[monthIndex]+=Math.round(parseFloat(q.total_price));
  });
  return monthData;
}

//export function
const exportBtn = document.querySelector(".export-btn");
exportBtn.addEventListener("click", () => {
  window.print();
});

//loader function
window.addEventListener('load', () => {
  
   initializeQuotes();

});

