const sm_no = document.getElementById("sm-no");
const generate = document.getElementById("generate");
window.onload = function () {
  sm_no.value = localStorage.getItem("sm-no");
};

sm_no.addEventListener("keyup", () => {
  localStorage.setItem("sm-no", sm_no.value);
});

generate.addEventListener("click", () => {
  addRow();
});

function addRow() {
  var table_body = document.querySelector("#count-table tbody");

  const new_row = document.createElement("tr");
  new_row.innerHTML = `
  <th class="row-number"></th>
  <td><input type="number" class="form-control length"/></td>
  <td><input type="number" class="form-control width"  /></td>
  <td><input type="number" class="form-control height"/></td>
  <td><input type="number" class="form-control qty" /></td>
  <td>
      <input type="number" class="form-control cbm" readonly tabindex="-1" />
  </td>
  
  <td><button class="gh-btn del form-control rounded-0"><i class="fas fa-trash"></i></button></td>
  `;

  table_body.appendChild(new_row);
  table_body.appe;

  // calculate each row
  new_row.querySelectorAll("tbody input[type='number']").forEach((input, i) => {
    if (!input.classList.contains("cbm")) {
      input.addEventListener("keyup", calculateCbm);
    }
  });
  updateRowNumbers();

  new_row.querySelector(".del").addEventListener("click", function () {
    new_row.remove();
    updateRowNumbers();
    updateTotalCbm();
  });
}

function calculateCbm() {
  const row = this.closest("tr");
  const length = row.querySelector(".length");
  const width = row.querySelector(".width");
  const height = row.querySelector(".height");
  const qty = row.querySelector(".qty");
  const cbm = row.querySelector(".cbm");
  cbm.value = length.value * width.value * height.value * qty.value;
  updateTotalCbm();
}

function updateTotalCbm() {
  let total_cbm = 0;
  let table_cbm = document.querySelectorAll(".cbm");
  table_cbm.forEach((ele) => {
    total_cbm += parseFloat(ele.value) || 0;
  });
  document.getElementById("total").value = total_cbm;
}

function updateRowNumbers() {
  const rows = document.querySelectorAll("#count-table tbody tr");
  rows.forEach((row, index) => {
    row.querySelector(".row-number").textContent = index + 1;
  });
}

addRow();
