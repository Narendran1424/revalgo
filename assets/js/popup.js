const suggestPopup = document.querySelector(".suggest-product-popup");
const supplierPopup = document.querySelector(".supplier-popup");
const sourcingPopup = document.querySelector(".sourcing-popup");
const closeSupplierBtn = document.querySelector(".close-supplier-popup-btn");
const closeSourcingBtn = document.querySelector(".close-source-popup-btn");
const stockPopup = document.querySelector(".stock-popup");
const stockText = stockPopup.querySelector(".text");
const stockYesBtn = stockPopup.querySelector(".yes-btn");
const stockNoBtn = stockPopup.querySelector(".no-btn");
const addLineNotePopup = document.querySelector(".add-line-note-popup");
const addLineNoteBtn = addLineNotePopup.querySelector(".add-btn");
const addLineNoteInput = addLineNotePopup.querySelector(".add-line-note-input");
const addQuoteNotePopup = document.querySelector(".add-quote-note-popup");
const addQuoteNoteInput = addQuoteNotePopup.querySelector(
  ".add-quote-note-input",
);
const addQuoteNoteBtn = addQuoteNotePopup.querySelector(".add-btn");
const imgUpdateBtn = imgPopup.querySelector(".update-btn");
const selectAllWrapInput = imgPopup.querySelector(".select-all-input");
const imgPopCount = imgPopup.querySelector(".title span");
const selectImgInputs = imgPopup.querySelectorAll(".select-input");
const acronymPopup = document.querySelector(".add-acronym-popup");
const acronymText = document.querySelector(".acronym-text");
const acronymInput = acronymPopup.querySelector(".add-acronym-input");
const acronymChipContainer = acronymPopup.querySelector(
  ".acronym-chip-container",
);
const addAcronymBtn = acronymPopup.querySelector(".add-btn");

//suggest popup
function renderSuggestPopup(products) {
  const productsContainer = suggestPopup.querySelector(".products");
  let html = "";
  if (products.length !== 0) {
    products.forEach((p) => {
      html += `<div class="product" data-delid="${p.delId}">
        <div class="detail-container">                                                 
          <p class="product-id"><span class="label id">${p.requested_id}</span>
          <span class="value"> - $${p.selling_price}</span></p>
          <p class="avil-qty"><span class="label">Avaliable Qty</span>
          <span class="value">${p.available_qty}</span></p>

          <p class="score"><span class="label">Score</span><span class="value">${p.score}%</span></p>
        </div>
      <p class="desc">${p.desc}</p>
        </div>`;
    });
  } else {
    html = "<p class='not-found'>Data Not Found</p>";
  }

  productsContainer.innerHTML = html;

  SuggestProductClick(productsContainer.querySelectorAll(".product"));
}

function searchSuggestPopup() {

  const searchSuggestInput = suggestPopup.querySelector(".search-suggest-product");

  searchSuggestInput.addEventListener("input", () => {

    const searchValue = searchSuggestInput.value.toLowerCase().trim();

    let filteredProducts = products;

    if (currentRow) {

      const reqId =
        currentRow.querySelector(".requested-id").textContent;

      filteredProducts = filteredProducts.filter(
        (p) => p.requested_id != reqId
      );
    }

    filteredProducts = filteredProducts.filter((p) => {

      return (
        p.requested_id.toLowerCase().includes(searchValue) ||
        p.desc.toLowerCase().includes(searchValue)
      );

    });

    renderSuggestPopup(filteredProducts);

  });

}

//close modal
function closeModal() {
  if (formPopup.classList.contains("active")) {
    // updateForm.reset();
    errs.forEach((err) => err.classList.remove("active"));
    formPopup.classList.remove("active");
  }

  if (addPopup.classList.contains("active")) {
    const rows = addPopup.querySelectorAll(".body-wrapper .table-row");
    rows.forEach((row, index) => {
      if (index !== 0) {
        row.remove();
      }
    });
  }
  if (expandModal.classList.contains("active")) {
    const suggestSource = modalContent.querySelector(".suggest-product-popup");

    if (suggestSource) {
      document.body.appendChild(suggestSource);
    }
  }
  popupOverlay.classList.remove("active");
  popups.forEach((pop) => pop.classList.remove("active"));
}

//expand  btn function
expandBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    const target = btn.dataset.target;
    const modalData = btn.dataset.modal;
    const source = document.querySelector(target);
    if (target == ".suggest-product-popup") {
      suggestPopup.classList.remove("active");
      popupOverlay.classList.add("active");
      modalContent.appendChild(source);
      expandModal.classList.add("active");
    }
  });
});

//supplier popup function
function renderSupplierPopup(products) {
  const productsContainer = supplierPopup.querySelector(".products");
  productsContainer.innerHTML = "";
  if (products.length != 0) {
    products.forEach((p) => {
      productsContainer.innerHTML += `<div class="product" data-delid="${p.delId}">                       
        <p class="supplier text-uppercase">${p.supplier}</p>
        <div class="detail-container">
          <p class="qty"> <span class="label">${p.requested_id}</span> <span class="value">${p.available_qty}</span></p>
          <p class="unit-cost"> <span class="label">Unit Cost</span> <span class="value"> ${p.unit_cost}</span></p>
          <p class="location"> <span class="label">Location</span> <span class="value">${p.location}</span></p>
          <p class="lead-time"> <span class="label">Lead Time</span> <span class="value">${p.lead_time} days</span></p>
          <p class="updated-date"> <span class="label">Last Updated Date </span> <span class="value">${p.updated_date}</span></p>
          </div>                          
      </div>`;
    });
  } else
    productsContainer.innerHTML = "<p class='not-found'>Data Not Found</p>";

  SupplierProductClick(productsContainer.querySelectorAll(".product"));
}

//sourcing popup function
function renderSourcingPopup(products) {

  const productsContainer =sourcingPopup.querySelector(".products");
  let html = "";
  if (products.length !== 0) {
    products.forEach((p) => {
      html += `<div class="product" data-delid="${p.delId}">
        <div class="detail-container">
          <p class="product-id"><span class="label id">${p.requested_id}</span>
            <span class="${p.stock === "Ns"? "value stock-value red": "value stock-value not-active"}">
              ${p.stock}</span>
          </p>
          <p class="score"><span class="label">Score</span><span class="value">${p.score}%</span></p>
        </div>
        <p class="desc">${p.desc}</p>
      </div>`;
    });
  } else {
    html = "<p class='not-found'>Data Not Found</p>";
  }

  productsContainer.innerHTML = html;

  SourceProductClick(productsContainer.querySelectorAll(".product"));

}

function searchSourcingPopup() {
  const searchSourcingInput =sourcingPopup.querySelector(".search-sourcing-product");

  searchSourcingInput.addEventListener("input", () => {

    const searchValue =searchSourcingInput.value.toLowerCase().trim();

    let filteredProducts = products;

    if (currentRow) {
      const reqId =currentRow.querySelector(".requested-id").textContent;
      filteredProducts = filteredProducts.filter(p => p.requested_id != reqId);
    }

    filteredProducts = filteredProducts.filter((p) => {
      return (
        p.requested_id.toLowerCase().includes(searchValue) ||
        p.desc.toLowerCase().includes(searchValue)
      );

    });

    renderSourcingPopup(filteredProducts);

  });

}

//open suggest popup
let imgRect = "";
let currentRow = "";
function openSuggestPopup(event) {
  const reqId=event.target.parentElement.querySelector(".requested-id").textContent;
  event.stopPropagation();
  const img = event.target.closest(".down-arrow-img");
  const rect = img.getBoundingClientRect();
  updatePopupPosition(rect, suggestPopup);
  imgRect = rect;
  currentRow = img.closest(".table-row");
  sourcingPopup.classList.remove("active");
  supplierPopup.classList.remove("active");
  suggestPopup.classList.toggle("active");
  const filP=products.filter(p=>p.requested_id != reqId)
  renderSuggestPopup(filP)
}

//update popup position
function updatePopupPosition(rect, container) {
  const popupHeight = container.offsetHeight || 200;

  const spaceBelow = window.innerHeight - rect.bottom;

  const spaceAbove = rect.top;

  if (spaceBelow > popupHeight) {
    container.style.top = `${rect.bottom + window.scrollY + 4}px`;
    container.style.maxHeight = `${spaceBelow - 20}px`;
  }

  // show above
  else if (spaceAbove > popupHeight) {
    container.style.top = `${rect.top - 23 + window.scrollY - popupHeight - 4}px`;
  } else {
    container.style.top = `${rect.bottom + window.scrollY + 4}px`;

    container.style.maxHeight = `${spaceBelow - 20}px`;
  }

  container.style.left = `${rect.left - 50 + window.scrollX}px`;
}

window.addEventListener("resize", updatePopupPosition(imgRect, suggestPopup));

//open supplier popup
function openSupplierPopup(event) {
  event.stopPropagation();
  const supplierText = event.target.closest(".supplier-text");
  const dropDownText=event.target.parentElement.parentElement;
  const reqId= dropDownText.closest(".table-row").querySelector(".requested-id").textContent;
  const rect = supplierText.getBoundingClientRect();
  updatePopupPosition(rect, supplierPopup);
  currentRow = supplierText.closest(".table-row");
  suggestPopup.classList.remove("active");
  sourcingPopup.classList.remove("active");
  supplierPopup.classList.toggle("active");
  const filP = products.filter(p => p.requested_id != String(reqId));
  renderSupplierPopup(filP)
}

//suggest popup expand btn

// const closeBtn = document.querySelector(".close-modal-btn");
function closeSuggestPopup() {
  suggestPopup.classList.remove("active");
}

document.addEventListener("click", (e) => {
  if (
    suggestPopup.classList.contains("active") &&
    !suggestPopup.contains(e.target)
  ) {
    suggestPopup.classList.remove("active");
  }

  if (
    supplierPopup.classList.contains("active") &&
    !supplierPopup.contains(e.target)
  ) {
    supplierPopup.classList.remove("active");
  }

  if (
    sourcingPopup.classList.contains("active") &&
    !sourcingPopup.contains(e.target)
  ) {
    sourcingPopup.classList.remove("active");
  }
});

function closeExpandPopup() {
  const suggestSource = modalContent.querySelector(".suggest-product-popup");
  const body = document.body;
  if (suggestSource) {
    body.appendChild(suggestSource);
  }
  closeModal();
}
const minSuggestBtn = modalContent.querySelector(".min-suggest-btn");
function retrieveSuggestPopup() {
  const suggestSource = modalContent.querySelector(".suggest-product-popup");
  const body = document.body;
  if (suggestSource) {
    body.appendChild(suggestSource);
  }
  closeModal();
  const suggestPopup = document.querySelector(".suggest-product-popup");
  updatePopupPosition(imgRect, suggestPopup);
  suggestPopup.classList.add("active");
}

function SuggestProductClick(suggestProducts) {
  suggestProducts.forEach((p) => {
    p.addEventListener("click", () => {
      const id = p.dataset.delid;

      const selectedProduct = products.find((p) => p.delId == id);

      updateRow(selectedProduct);

      suggestPopup.classList.remove("active");
      updateQuoteTotals();
      storeQuote();
    });
  });
}

function updateRow(product) {
  if (!currentRow) return;
  const delId = currentRow.querySelector(".del-id").textContent;

  const newQuotP = newQuote.products.find((p) => String(p.delId) === delId);

  currentRow.querySelector('[name="qty-requested"]').value =product.qty_requested;
  newQuotP.qty_requested = product.qty_requested;

  currentRow.querySelector(".requested-id").textContent = product.requested_id;
  newQuotP.requested_id = product.requested_id;

  currentRow.querySelector(".available-qty").textContent =
    product.available_qty;
  newQuotP.available_qty = product.available_qty;

  currentRow.querySelector(".text").textContent = product.desc;
  newQuotP.desc = product.desc;

  currentRow.querySelector('[name="cost"]').value = product.unit_cost;
  newQuotP.unit_cost = product.unit_cost;

  currentRow.querySelector('[name="margin"]').value = product.margin;
  newQuotP.margin = product.margin;

  currentRow.querySelector(".selling-price").textContent =
    `$${product.selling_price.toFixed(2)}`;
  newQuotP.selling_price = product.selling_price;

  currentRow.querySelector(".total-cost").textContent =
    `${product.total_cost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  newQuotP.total_cost = product.total_cost;

  const stockText = currentRow.querySelector(".stock-text");
  stockText.innerHTML = `${product.stock}<span class="tooltiptext">${product.stock == "S" ? "Stock" : "Non Stock"}</span>`;
  if (product.stock == "Ns") {
    stockText.classList.remove("green");
    stockText.classList.add("red");
  } else {
    stockText.classList.remove("red");
    stockText.classList.add("green");
  }
  newQuotP.stock = product.stock;

  currentRow.querySelector(".supplier-text").textContent = product.supplier;
  newQuotP.supplier = product.supplier;
}

//source popup function
function SourceProductClick(sourcingProducts) {
  sourcingProducts.forEach((p) => {
    p.addEventListener("click", () => {
      const id = p.dataset.delid;

      const selectedProduct = products.find((p) => p.delId  == id);
      sourcingPopup.classList.remove("active");
      popupOverlay.classList.add("active");
      stockPopup.classList.add("active");

      stockText.innerHTML = `Do you want to confirm with this <br> <span class="id">${selectedProduct.requested_id}</span> ${selectedProduct.stock == "S" ? "Stock" : "Non Stock"} item?`;
      stockYesBtn.addEventListener("click", () => {
        updateRow(selectedProduct);
        currentRow.querySelector(".sourcing").classList.remove("active");
        currentRow.querySelector(".stock-wrapper").classList.add("active");
        const delId = currentRow.querySelector(".del-id").textContent;
        const newQuotP = newQuote.products.find(
          (p) => String(p.delId) === delId,
        );
        newQuotP.isStock = currentRow
          .querySelector(".stock-wrapper")
          .classList.contains("active");
        newQuotP.isSource = false;
        closeModal();
        updateQuoteTotals();
        storeQuote();
      });
    });
  });
}

stockNoBtn.addEventListener("click", () => {
  closeModal();
});

function enableSourceText(event) {
  const row = event.target.closest(".table-row");
  const sourceText = row.querySelector(".sourcing");
  sourceText.classList.toggle("active");
  const delId = row.querySelector(".del-id").textContent;
  const newQuotP = newQuote.products.find((p) => String(p.delId) === delId);
  newQuotP.isSource = sourceText.classList.contains("active");
}

closeSourcingBtn.addEventListener("click", () =>
  sourcingPopup.classList.remove("active"),
);

//supplier product click
function openSourcingPopup(event) {
  event.stopPropagation();
  const sourcing = event.target.closest(".sourcing");
  const reqId=event.target.parentElement.querySelector(".requested-id").textContent;
  const rect = sourcing.getBoundingClientRect();
  updatePopupPosition(rect, sourcingPopup);
  currentRow = sourcing.closest(".table-row");
  suggestPopup.classList.remove("active");
  supplierPopup.classList.remove("active");
  sourcingPopup.classList.toggle("active");

  const filP = products.filter(p => p.requested_id != String(reqId));
  renderSourcingPopup(filP)

}

function SupplierProductClick(supplierProducts) {
  supplierProducts.forEach((p) => {
    p.addEventListener("click", () => {
      const id = p.dataset.delid;

      const selectedProduct = products.find((p) => p.delId == id)
      supplierPopup.classList.remove("active");

      updateRow(selectedProduct);

      currentRow.querySelector(".stock-wrapper").classList.add("active");

      supplierPopup.classList.remove("active");
      updateQuoteTotals();
      storeQuote();
    });
  });
}

closeSupplierBtn.addEventListener("click", () =>
  supplierPopup.classList.remove("active"),
);

//approve btn click function
approveQuoteBtn.addEventListener("click", () => {
  if (newQuote.products.length != 0) {
    updateQuickInfoData();
    updateNewQuoteData();
    updateQuoteTotals();
    addPopup.classList.remove("active");
    popupOverlay.classList.add("active");
    successPopup.classList.add("active");
    successidText.textContent = ` #${newQuote.id}`;
  }
});

function updateQuickInfoData() {
  const fields = ["po_no", "job_no", "buyer", "deleivery_date"];

  fields.forEach((key) => {
    const el = document.querySelector(`.${key}_text`);
    if (el) {
      newQuote[key] = el.textContent.trim();
    }
  });

  ["bill_to", "ship_to"].forEach((key) => {
    const wrap = document.querySelector(`.${key}_text`);

    if (!wrap) return;

    const name = wrap.querySelector(".name")?.textContent.trim() || "";

    const address =
      wrap
        .querySelector(".address")
        ?.innerHTML.replace(/<br\s*\/?>/gi, "\n")
        .trim() || "";
    newQuote[key] = `${name}\n${address}`;
  });
}

function updateNewQuoteData() {
  const displayTable = document.querySelector(".display-table");
  const tableRows = displayTable.querySelectorAll(".body-wrapper .table-row");

  tableRows.forEach((row) => {
    if (row.classList.contains("not-active")) {
      const delId = Number(row.querySelector(".del-id").textContent);

      newQuote.products = newQuote.products.filter((p) => p.delId !== delId);
    }
  });
}

confirmSuccessBtn.addEventListener("click", () => {
  saveQuotes();
  const bodyWrap = displayTable.querySelector(".body-wrapper");
  bodyWrap.innerHTML = "";
  bodyWrap.innerHTML = `<div class="add-btn-container ">
    <button type="button"><img src="./assets/images/create_quote/add_item_icon.png" alt="add"></button>
    <p class="text">Click here to Add Item</p>
    </div>`;
  window.location.href = "./dashboard.html";
});


function saveQuotes(){
  let found = false;
  const quotes = JSON.parse(sessionStorage.getItem("quotes"));
  quotes.forEach((q, i) => {
    if (q.id === newQuote.id) {
      newQuote.status="approved";
      if (newQuote.approved_date=="-") {
        newQuote.approved_date= `${padZero(new Date().getDate())}-${padZero(new Date().getMonth())}-${padZero(new Date().getFullYear())}`;
      }
      quotes[i] = newQuote;
      
      found = true;
    }
  });

  if (!found) {
    newQuote.status = "approved";
    newQuote.approved_date= `${padZero(new Date().getDate())}-${padZero(new Date().getMonth())}-${padZero(new Date().getFullYear())}`,
    quotes.push(newQuote);
  }
  sessionStorage.setItem("quotes", JSON.stringify(quotes));
}

//add line note function
let clickedRow = "";
function openLineNotePopup(event) {
  addLineNotePopup.classList.add("active");
  popupOverlay.classList.add("active");
  clickedRow = event.target.closest(".table-row");
  const delId = clickedRow.querySelector(".del-id").textContent;
  const product = newQuote.products.find((p) => String(p.delId) === delId);
  if (product) {
    if (product.lineNote) addLineNoteInput.value = product.lineNote;
  }
}

addLineNoteInput.addEventListener("input", () => {
  if (addLineNoteInput.value.trim() !== "")
    addLineNoteBtn.classList.add("active");
  else addLineNoteBtn.classList.remove("active");
});

addLineNoteBtn.addEventListener("click", () => {
  const addNoteVal = addLineNoteInput.value.trim();
  if (clickedRow) {
    const delId = clickedRow.querySelector(".del-id").textContent;
    const product = newQuote.products.find((p) => String(p.delId) === delId);
    const greyAddImg = clickedRow.querySelector(".add-line-note-btn .img-grey");
    const blueAddImg = clickedRow.querySelector(".add-line-note-btn .img-blue");
    if (product) {
      product.lineNote = addNoteVal;
      greyAddImg.classList.remove("active");
      blueAddImg.classList.add("active");
      closeModal();
    }
  }
});

//quote note function
function openQuoteNotPopup() {
  popupOverlay.classList.add("active");
  addQuoteNotePopup.classList.add("active");
}

const addNoteVal = addLineNoteInput.value.trim();
addQuoteNoteInput.addEventListener("input", () => {
  if (addQuoteNoteInput.value.trim() != "")
    addQuoteNoteBtn.classList.add("active");
  else addQuoteNoteBtn.classList.remove("active");
});

//select img-popup
selectAllWrapInput.addEventListener("change", () => {
  if (selectAllWrapInput.checked) {
    selectImgInputs.forEach((inp, index) => {
      inp.checked = index < 8;

      if (index > 8) {
        const textWrapper = inp.parentElement.querySelector(".text-wrapper");
        const field = textWrapper.querySelector("input, textarea");

        if (field) {
          field.disabled = true;
        }
      }
    });

    imgUpdateBtn.classList.remove("not-active");
    imgPopCount.textContent = `8/12`;
  } else {
    selectImgInputs.forEach((inp) => {
      inp.checked = false;
      const textWrapper = inp.parentElement.querySelector(".text-wrapper");
      const field = textWrapper.querySelector("input, textarea");

      if (field) {
        field.disabled = false;
      }
    });

    imgUpdateBtn.classList.add("not-active");
    imgPopCount.textContent = `0/12`;
  }
});

selectImgInputs.forEach((inp) => {
  inp.addEventListener("input", () => {
    const checkedInputs = [...selectImgInputs].filter((inp) => inp.checked);

    imgPopCount.textContent = `${checkedInputs.length}/12`;

    if (checkedInputs.length >= 8) {
      imgUpdateBtn.classList.remove("not-active");

      selectImgInputs.forEach((input) => {
        if (!input.checked) {
          input.disabled = true;
          const textWrapper =
            input.parentElement.querySelector(".text-wrapper");
          const field = textWrapper.querySelector("input, textarea");

          if (field) {
            field.disabled = true;
          }
        }
      });
    } else {
      imgUpdateBtn.classList.add("not-active");

      selectImgInputs.forEach((inp) => {
        inp.disabled = false;
        const textWrapper = inp.parentElement.querySelector(".text-wrapper");
        const field = textWrapper.querySelector("input, textarea");

        if (field) {
          field.disabled = false;
        }
      });
    }
  });
});

//update img popup data
imgUpdateBtn.addEventListener("click", () => {
  const delDateText = quickInfoWrapper.querySelector(".deleivery_date_text");

  const billContainer = quickInfoWrapper.querySelector(".bill_to_text");

  const shipContainer = quickInfoWrapper.querySelector(".ship_to_text");

  const buyertext = quickInfoWrapper.querySelector(".buyer_text");

  const checkedInputs = [];

  [...imgPopup.querySelectorAll(".select-input")].forEach((inp) => {
    if (inp.checked) {
      const textWrapper = inp.parentElement.querySelector(".text-wrapper");

      const input = textWrapper.querySelector("input");

      const textarea = textWrapper.querySelector("textarea");

      if (input) checkedInputs.push(input);

      if (textarea) checkedInputs.push(textarea);
    }
    closeModal();
  });

  checkedInputs.forEach((inp) => {
    if (inp.value !== "") {
      if (inp.name === "buyer") {
        buyertext.textContent = inp.value;
      }

      if (inp.name === "ship-via") {
        let shipData = inp.value
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item !== "");

        shipContainer.querySelector(".name").textContent = shipData[0] || "";

        shipContainer.querySelector(".address").innerHTML =
          `${shipData[1] || ""}<br>${shipData[2] || ""}`;
      }

      if (inp.name === "bill_to_job") {
        let billData = inp.value
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item !== "");

        billContainer.querySelector(".name").textContent = billData[0] || "";

        billContainer.querySelector(".address").innerHTML =
          `${billData[1] || ""}<br>${billData[2] || ""}`;
      }

      if (inp.name === "deleivery-date") {
        const minDate = new Date(2025, 3, 1);
        const maxDate = new Date(2026, 3, 30);

        const [day, month, year] = inp.value.split("/");

        const selectedDate = new Date(year, month - 1, day);
        if (selectedDate >= minDate && selectedDate <= maxDate) {
          delDateText.textContent = inp.value.replaceAll("/", "-");
        }
      }
    }
  });

  editQuoteInfo(document.querySelector(".quick-info-wrapper"))
});

//acronym function
const acronymData = {};

let currentAcronymItem = null;

const acronymItems = document.querySelectorAll(".acronym-item");
const acronymDropdown=document.querySelector(".acronym-dropdown");
acronymItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    acronymItems.forEach(item => item.classList.remove("active"))
    e.stopPropagation();
    activeItem = item;
    const itemText = item.textContent.trim();
    acronymText.textContent = itemText;
    item.classList.add("active")
    const isActive = acronymDropdown.classList.contains("active");
    acronymDropdown.classList.remove("active");
    if (!isActive || activeItem !== item) {
      acronymDropdown.classList.add("active");
      const rect = item.getBoundingClientRect();
      acronymDropdown.style.top =`${rect.top + window.scrollY - acronymDropdown.offsetHeight}px`;
      acronymDropdown.style.left = `${rect.left + rect.width+ window.scrollX}px`;
    }
  });
});

document.addEventListener("click", () => {
  acronymDropdown.classList.remove("active");
});
function openAcronymPopup(el) {
  popupOverlay.classList.add("active");
  acronymPopup.classList.add("active");
  console.log(acronymItems)
  currentAcronymItem = [...acronymItems].find(ac=>ac.classList.contains("active"));
console.log(currentAcronymItem)
  const key = getAcronymKey(currentAcronymItem);
  acronymChipContainer.innerHTML = "";

  if (acronymData[key]) {
    acronymData[key].forEach((chip) => {
      renderAcronymChip(chip, false);
    });
  }
}

function getAcronymKey(item) {
  return item.dataset.id;
}

function removeAcronymChip(event) {
  const chip = event.target.closest(".chip");

  const value = chip.childNodes[0].textContent.trim();

  const key = getAcronymKey(currentAcronymItem);

  acronymData[key] = acronymData[key].filter((v) => v !== value);

  chip.remove();
}

acronymInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const value = acronymInput.value.trim().toLowerCase();

    if (value !== "") {
      renderAcronymChip(value);
    }
  }
});

addAcronymBtn.addEventListener("click", () => {
  const value = acronymInput.value.trim().toLowerCase();

  if (value !== "") {
    renderAcronymChip(value);
  }
});

//render acronym chip
function renderAcronymChip(value, save = true) {
  const key = getAcronymKey(currentAcronymItem);

  if (save) {
    if (!acronymData[key]) {
      acronymData[key] = [];
    }

    if (acronymData[key].includes(value)) {
      acronymInput.value = "";
      return;
    }

    acronymData[key].push(value);
  }

  acronymChipContainer.innerHTML += `
    <span class="chip">
      ${value}
      <span class="close-chip" onclick="removeAcronymChip(event)">
        <img src="./assets/images/global/close_modal.webp" alt="close">
      </span>
    </span>
  `;

  acronymInput.value = "";
}
