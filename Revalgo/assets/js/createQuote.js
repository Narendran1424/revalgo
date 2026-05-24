const createQuoteWrapper = document.querySelector(".create-quote-wrapper");
const quickOrderWrapper = document.querySelector(".quick-order-wrapper");
const popupOverlay = document.querySelector(".popup-overlay");
const expandModal = popupOverlay.querySelector(".expand-modal");
const modalContent = document.querySelector(".expand-modal-content");
const expandBtns = document.querySelectorAll(".expand-btn");
const delPopup1 = document.querySelector(".del-popup-1");
const delPopup2 = document.querySelector(".del-popup-2");
const delPopup2Id = delPopup2.querySelector(".text .id");
const delQuoteText = delPopup2.querySelector(".del-quote-text");
const del1YesBtn = delPopup1.querySelector(".yes-btn");
const del2YesBtn = delPopup2.querySelector(".yes-btn");
const addPopup = document.querySelector(".add-popup");
const addTable = addPopup.querySelector(".add-table");
const addLineBtns = addTable.querySelectorAll(".add-line-btn");
const canceladdpopupBtn = addPopup.querySelector(".cancel-btn");
const approveQuoteBtn = document.querySelector(".approve-btn");
const successPopup = document.querySelector(".success-popup");
const successidText = successPopup.querySelector(".text .id");
const confirmSuccessBtn = successPopup.querySelector(".ok-btn");
const approveBtnContainer = document.querySelector(".approve-btn-container");
const createInpWrapper = document.querySelector(".create-input-wrapper");
const quoteOrderWrapper = document.querySelector(".quick-order-wrapper");
const delQuoteBtn = document.querySelector(".del-quote-btn");
const undoQuoteBtn = document.querySelector(".undo-quote-btn");
const loaderWrapper = document.querySelector(".loader-wrapper");
const quoteStat = createQuoteWrapper.querySelector(".quote-status");
const minimizeBtn=document.querySelector(".minimize-btn");

if (sessionStorage.getItem("selectedQuote")) {
  sessionStorage.removeItem("selectedQuote");
}
//modal
const quickContentWrapper = document.querySelector(".quick-content-wrapper");
const popups = document.querySelectorAll(".popup");
const formPopup = document.querySelector(".form-popup");
const formTitle = document.querySelector(".form-title");
const formContainers = document.querySelectorAll(".form-container");
const cancelFormPopupBtn = formPopup.querySelector(".cancel-btn");
const errs = formPopup.querySelectorAll(".error");
const closePopupBtns = document.querySelectorAll(".close-popup-btn");

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

//Datepicker

const formWrapper = formPopup.querySelector(".form-wrapper");
const dateText = formPopup.querySelector(".date-text");

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

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const minDate = new Date(2025, 4, 1);
const maxDate = new Date(2026, 3, 30);
let today = new Date();
let current = new Date(today);

let selectedDate = null;
if (current < minDate) {
  current = new Date(minDate);
}

if (current > maxDate) {
  current = new Date(maxDate);
}
//create datepicker

function createDatepicker(datePicker) {
  const monthNameEl = datePicker.querySelector(".month-name");
  const datesContainer = datePicker.querySelector(".dates");
  const prevBtn = datePicker.querySelector(".prev-month");
  const nextBtn = datePicker.querySelector(".next-month");
  const tags = datePicker.querySelectorAll(".tag");
  const yearEl = datePicker.querySelector(".year");
  // let today = new Date();
  // let current = new Date(today);
  // let selectedDate = null;

  function renderCalendar() {
    const year = current.getFullYear();
    const month = current.getMonth();

    monthNameEl.textContent = `${MONTHS[month]}`;
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

        getSelectedDate(datePicker);
        validDateInput(datePicker);

        datePicker.classList.remove("active");
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

  renderCalendar();
}

const datepicker = formPopup.querySelector(".datepicker");

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
  const MonthArr = monthNameEl.textContent.split(" ");
  selectedMonth = Number(MONTHS.findIndex((m) => m === MonthArr[0])) + 1;
  selectedMonth = padZero(selectedMonth);
  const dates = datePicker.querySelectorAll(".dates .date");
  dates.forEach((d) => {
    if (d.classList.contains("current-day")) {
      selectedDatee = padZero(Number(d.textContent));
    }
  });

  const parentEl = datePicker.parentElement;
  const dateInp = parentEl.querySelector(".date-input");
  dateInp.value = `${selectedYear}-${selectedMonth}-${selectedDatee}`;
  const dateText = parentEl.querySelector(".date-text");
  dateText.textContent = `${selectedDatee}-${selectedMonth}-${selectedYear}`;
  datePicker.classList.remove("active");
}

//validate dateinput

function validDateInput(datePicker) {
  const parentEl = datePicker.parentElement;
  const dateInp = parentEl.querySelector(".date-input");
  const formContainer = dateInp.parentElement.parentElement;
  console.log(formContainer);
  const errorElement = formContainer.querySelector(".error");
  if (dateInp.value == "") {
    formContainer.classList.add("error");
    errorElement.textContent = "";
  } else {
    formContainer.classList.remove("error");
    errorElement.textContent = "";
  }
}

//datepicker open and close funtcion

dateText.addEventListener("click", () => {
  const parentContainer = dateText.parentElement;
  const datePicker = parentContainer.querySelector(".datepicker");

  datePicker.classList.toggle("active");
  datePicker._trigger = dateText;
});

document.addEventListener("click", (e) => {
  const dp = document.querySelector(".datepicker.active");
  if (!dp) return;
  const trigger = dp._trigger;

  if (!trigger.contains(e.target) && !dp.contains(e.target)) {
    dp.classList.remove("active");
    dp.querySelector(".datepicker-calendar").classList.remove("not-active");
  }
});

//default newQuote Data
const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
const modes = ["Call", "Email", "ERP"];

function getRandomDate(minDate, maxDate) {
  const randomTime =
    minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
  return new Date(randomTime);
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
const receivedDate = getRandomDate(minDate, maxDate);

const approvedDate = getRandomDate(receivedDate, maxDate);

let newQuote = {
  mode: `${modes[Math.floor(Math.random() * modes.length)]}`,
  id: 9824404,
  name: `${loginDetails ? loginDetails.username : "ram"}`,
  number:
  Math.floor(Math.random() * (99999999999 - 10000000000 + 1)) + 10000000000,
  received_date: `${padZero(new Date().getDate())}-${padZero(new Date().getMonth())}-${padZero(new Date().getFullYear())}`,
  approved_date:"-",
  status: "pending",
  total_line_no: 0,
  total_price: "0",
  buyer: "Ondricka-Ankunding",
  bill_to: "Ondricka-Ankunding\n822, Cottonwood, \nSalon-de-Provence B8 019738",
  ship_to: "Realmix\n514, Golden Leaf, Salon-de-Provence\nB8 034922",
  po_no: "VI55518/553",
  job_no: "YM90987/934",
  deleivery_date: formatDate(getRandomDate(minDate, maxDate)),
  lines: 0,
  products: [],
};

const CreateBtn = createQuoteWrapper.querySelector(".back-create-btn");

const createBtns = createInpWrapper.querySelectorAll(".btn-container button");

const newBtn = createInpWrapper.querySelector(".new-btn");
const existBtn = createInpWrapper.querySelector(".exist-btn");

const createInputCon = createInpWrapper.querySelector(
  ".create-input-container",
);

const createInput = createInpWrapper.querySelector(".create-quote-input");
const existInput = createInpWrapper.querySelector(".exist-quote-input");
const existSearchBtn = createInpWrapper.querySelector(
  ".exist-search-quote-btn",
);

const inpContainer = createInpWrapper.querySelector(".input-container");

const createQuoteBtn = inpContainer.querySelector(".create-quote-btn");
const nextBtn = inpContainer.querySelector(".next-btn");

const quoteDropdown = document.querySelector(".quote-dropdown");

const quickInfoWrapper = quoteOrderWrapper.querySelector(".quick-info-wrapper");

createBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    createBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    if (newBtn.classList.contains("active")) {
      existInput.classList.remove("active");
      createInputCon.classList.add("active");
      existSearchBtn.classList.remove("active");
      nextBtn.classList.remove("active");
      createQuoteBtn.classList.add("active");
    } else {
      existInput.classList.add("active");
      createInputCon.classList.remove("active");
      existSearchBtn.classList.add("active");
      createQuoteBtn.classList.remove("active");
      handleExistSearch();
      nextBtn.classList.add("active");
    }
  });
});

const quoteNameWrapper = quoteDropdown.querySelector(".name-wrapper");
const quoteNameList = quoteDropdown.querySelector(".name-list");
const quoteIdWrapper = quoteDropdown.querySelector(".id-wrapper");
const quoteIdList = quoteDropdown.querySelector(".id-list");
const quotePoWrapper = quoteDropdown.querySelector(".po-wrapper");
const quotePoList = quoteDropdown.querySelector(".po-list");

function handleExistSearch() {
  const existInput = createInpWrapper.querySelector(".exist-quote-input");
  const value = existInput.value.trim().toLowerCase();

  quoteIdList.innerHTML = "";
  quoteNameList.innerHTML = "";
  quotePoList.innerHTML = "";

  if (value === "") {
    quoteDropdown.classList.remove("active");
    return;
  }

  quoteDropdown.classList.add("active");

  searchedQuotes = allQuotes.filter((q) => {
    const isIdMatch = q.id.toString().toLowerCase().includes(value);

    const isNameMatch = q.name.toLowerCase().includes(value);

    const isPoMatch =
      q.po_no && q.po_no.toString().toLowerCase().includes(value);

    // render lists
    if (isIdMatch) {
      quoteIdList.innerHTML += `
      <li 
        data-type="id"
        data-value="${q.id}">
        ${q.id}
      </li>
    `;
    }

    if (isNameMatch) {
      quoteNameList.innerHTML += `
      <li 
        data-type="name"
        data-value="${q.name}">
        ${q.name}
      </li>
    `;
    }

    if (isPoMatch) {
      quotePoList.innerHTML += `
      <li 
        data-type="po"
        data-value="${q.po_no}">
        ${q.po_no}
      </li>
    `;
    }

    // filter condition
    return isIdMatch || isNameMatch || isPoMatch;
  });

  // hide empty sections
  quoteIdWrapper.classList.toggle("not-active", !quoteIdList.children.length);

  quoteNameWrapper.classList.toggle(
    "not-active",
    !quoteNameList.children.length,
  );

  quotePoWrapper.classList.toggle("not-active", !quotePoList.children.length);

  if (
    !quoteIdList.children.length &&
    !quoteNameList.children.length &&
    !quotePoList.children.length
  ) {
    quoteDropdown.classList.remove("active");
  }
}

function handleExistSearchItemClick(e) {
  const li = e.target.closest("li");
  existInput.value = li.dataset.value;

  if (!li) return;

  const type = li.dataset.type;
  const value = li.dataset.value.toLowerCase();

  let filteredQuote = [];

  if (type === "id") {
    filteredQuote = allQuotes.filter((q) => q.id === Number(value));
  }

  if (type === "name") {
    filteredQuote = allQuotes.filter((q) => q.name.toLowerCase() === value);
  }

  if (type === "po") {
    filteredQuote = allQuotes.filter(
      (q) => q.po_no && q.po_no.toString().toLowerCase() === value,
    );
  }
  console;
  sessionStorage.setItem("searchedQuotes", JSON.stringify(filteredQuote));

  sessionStorage.setItem("searchedItem", JSON.stringify(value));

  quoteDropdown.classList.remove("active");
  window.location.href = "./existing-quote.html";
}
quoteDropdown.addEventListener("click", handleExistSearchItemClick);
initializeExistSearch();
function initializeExistSearch() {
  allQuotes = JSON.parse(sessionStorage.getItem("quotes"));
  existInput.addEventListener("input", () => {
    handleExistSearch();
  });

  existInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = existInput.value.trim().toLowerCase();
      handleExistSearch();

      if (value != "") {
        sessionStorage.setItem(
          "searchedQuotes",
          JSON.stringify(searchedQuotes),
        );
        sessionStorage.setItem("searchedItem", JSON.stringify(value));
        existInput.value = "";

        window.location.href = "./existing-quote.html";
      }
    }
  });

  existSearchBtn.addEventListener("click", () => {
    const value = existInput.value.trim().toLowerCase();
    if (value != "") {
      sessionStorage.setItem("searchedQuotes", JSON.stringify(searchedQuotes));
      sessionStorage.setItem("searchedItem", JSON.stringify(value));
      existInput.value = "";

      window.location.href = "./existing-quote.html";
    }
  });

  nextBtn.addEventListener("click", () => {
    const value = existInput.value.trim().toLowerCase();
    if (value != "") {
      sessionStorage.setItem("searchedQuotes", JSON.stringify(searchedQuotes));
      sessionStorage.setItem("searchedItem", JSON.stringify(value));
      existInput.value = "";

      window.location.href = "./existing-quote.html";
    }
  });
}

createInput.addEventListener("input", () => {
  const err = createInput.nextElementSibling;
  const val = createInput.value;
  createInput.value = createInput.value.replace(/\D/g, "");
  if (val.trim() === "") {
    err.textContent = "please enter the quote id";
  }
  if (val.length < 7) {
    err.textContent = "quote id must be 7 digits";
  } else if (val.length > 7) {
    createInput.value = val.slice(0, 7);
  } else if (allQuotes) {
    const isExists = allQuotes.some((q) => q.id === Number(val));
    if (isExists) {
      err.textContent = "Quote Id already exists";
    } else {
      err.textContent = "";
    }
  }
});

createQuoteBtn.addEventListener("click", () => {
  validateQuoteId(createInput);
});

function validateQuoteId(inp) {
  const val = inp.value;
  const err = createInput.nextElementSibling;
  console.log(val);
  if (val.trim() === "") {
    err.textContent = "please enter the quote id";
  } else if (val.length < 7) {
    err.textContent = "quote id must be 7 digits";
  } else if (val.length > 7) {
    createInput.value = val.slice(0, 7);
  } else if (allQuotes) {
    const isExists = allQuotes.some((q) => q.id === Number(val));
    if (isExists) {
      err.textContent = "Quote Id already exists";
    } else {
      newQuote.id = Number(createInput.value);
      createInput.value = "";
      err.textContent = "";
      quoteStat.classList.add("active")
      quoteStat.classList.add("pending");
      quoteStat.textContent ="Pending";
      createInpWrapper.classList.remove("active");
      quoteOrderWrapper.classList.add("active");
      approveBtnContainer.classList.add("active");
      delQuoteBtn.classList.add("active");
      minimizeBtn.classList.remove("not-active")
      renderQuickInfo(newQuote);
    }
  }
}

//
if (sessionStorage.getItem("newId")) {
  newQuote.id = sessionStorage.getItem("newId");
  createInpWrapper.classList.remove("active");
  quoteOrderWrapper.classList.add("active");
  approveBtnContainer.classList.add("active");
  delQuoteBtn.classList.add("active");
  renderQuickInfo(newQuote);
  sessionStorage.removeItem("newId");
}

undoQuoteBtn.addEventListener("click", () => {
  quickOrderWrapper.classList.remove("not-active");
  undoQuoteBtn.classList.remove("active");
  delQuoteBtn.classList.add("active");
  approveQuoteBtn.classList.remove("not-active");
  approveQuoteBtn.classList.add("active");
  newQuote.status = "pending";
  newQuote.received_date=`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
  quoteStat.classList.remove(`deleted`);
  quoteStat.classList.add(`${newQuote.status}`);
  quoteStat.textContent = `${newQuote.status}`;
  storeQuote();
});

delQuoteBtn.addEventListener("click", () => {
  quickOrderWrapper.classList.add("not-active");
  delQuoteBtn.classList.remove("active");
  undoQuoteBtn.classList.add("active");
  quoteStat.classList.remove("pending", "approved");
  newQuote.status = "deleted";
  quoteStat.classList.add(`${newQuote.status}`);
  quoteStat.textContent = `${newQuote.status}`;
  approveQuoteBtn.classList.remove("active");
  approveQuoteBtn.classList.add("not-active");
  updateQuoteTotals();
  updateNewQuoteData();
  storeQuote();
});
// renderQuickInfo(JSON.parse(sessionStorage.getItem("newQuote")));

function renderQuickInfo(newQuote) {
  CreateBtn.querySelector("span").textContent = `#${newQuote.id}`;

  const splittedBill = newQuote.bill_to.split("\n");
  const splittedShip = newQuote.ship_to.split("\n");
  quickInfoWrapper.innerHTML = "";
  quickInfoWrapper.innerHTML = `
    <div class="info">
      <p class="header">Bill To <button type="button" class="edit-btn" data-title="bill to" data-edit="bill_to"><img src="./assets/images/global/edit_icon.png" alt="Edit icon"></button></p>
      <div class="details bill_to_text" >
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
            <p class="lines_text">${newQuote.lines}</p>
          </div>
        </div>
      <div class="info">
        <p class="header">Total Price</p>
        <div class="details">
          <p class="total_price_text">$${newQuote.total_price}</p>
        </div>
      </div>
  `;
  editQuoteInfo(document.querySelector(".quick-info-wrapper"));
}

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
  });
  updateQuickInfoData();
  storeQuote();
}

formContainers.forEach((container) => {
  const inpFields = container.querySelectorAll("input, textarea");

  const errEl = container.querySelector(".error");

  inpFields.forEach((inp) => {
    inp.addEventListener("input", () => {
      if (inp.value.trim() !== "") {
        errEl.classList.remove("active");
      } else {
        errEl.classList.add("active");
        errEl.textContent = `Please enter the ${inp.placeholder}`;
      }
    });
  });
});

//mail img container
const leftWrapper = quickContentWrapper.querySelector(".left-wrapper");

const leftTableWrapper = leftWrapper.querySelector(".table-wrapper");
const uploadBtnContainer = leftWrapper.querySelector(".upload-btn-container");

const displayTable = document.querySelector(".display-table");

function renderDisplayTable(newQuote) {
  const bodyWrapper = displayTable.querySelector(".body-wrapper");
  bodyWrapper.innerHTML = "";

  const products = newQuote.products;

  products.forEach((p, i) => {
    bodyWrapper.innerHTML += `<div class="row-group" draggable="true">
    <div class="${p.isDeleted == true ? "table-row not-active" : "table-row"}">
      <p><img src="./assets/images/global/drag_menu.png" alt="drag menu" class="drag-handle"   data-index="${i}"  ></p>
      <p><input type="checkbox" class="check-line-input" onclick="enableDeleteAllBtn()"></p>
      <p><span class="line-no">${i + 1}</span>
      </p>
      <p><input type="text" value="${p.qty_requested}" name="qty-requested" autocomplete="off"></p>
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
            </span>&nbsp; - 
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
      <p><span class="selling-price">$${p.selling_price.toFixed(2)}</span></p>
      <p><span class="total-cost">$${p.total_cost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
      
      <p>
        <button type="button" class="delete-line-btn active" onclick=delRow(event)><img src="./assets/images/global/delete_icon.png" alt="delete"></button>
        <button type="button" class="undo-line-btn" onclick=undoRow(event)> <img src="./assets/images/dashboard/undo_icon.png" alt="undo"></button>
      </p>
      <button class="add-line-note-btn" onclick="openLineNotePopup(event)"><img src="./assets/images/create_quote/add_note_grey_bg.png" class="${p.lineNote ? "img-grey " : "img-grey active"}" alt="add note grey"> <img src="./assets/images/create_quote/add_note icon_blue.png" class="img-blue " alt="add note blue "></button>
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
    bodyWrapper.innerHTML += `
    <div class="add-btn-container left">
      <button type="button" class="add-btn" onclick="openAddPopup()"> <img src="./assets/images/create_quote/add_item_icon.png" alt="add"></button>
      <p class="text">Click here to Add Item</p>
    </div>
    `;
  });
  clickTable(displayTable.querySelector(".body-wrapper"));
  editTableData(displayTable.querySelector(".body-wrapper"));
  checkDeleted(displayTable.querySelector(".body-wrapper"));
  enableDrag(displayTable.querySelector(".body-wrapper"));
}

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

      // selling = cost + margin%
      const sellingPrice = cost + (cost * margin) / 100;

      // total = qty * selling
      const totalPrice = qty * sellingPrice;

      sellingPriceEl.textContent = `$${sellingPrice.toFixed(2)}`;

      totalPriceEl.textContent = `$${totalPrice.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;

      // UPDATE newQuote.products
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

//select all
const descInputs = leftTableWrapper.querySelectorAll(".desc-input");
const qtyInputs = leftTableWrapper.querySelectorAll(".qty-input");
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

CreateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateQuickInfoData();
  updateQuoteTotals();
  updateNewQuoteData();
  newQuote.status = "pending";
  storeQuote();
  window.location.href = "./dashboard.html";
});

