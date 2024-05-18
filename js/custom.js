var length = document.getElementsByClassName("length");
var width = document.getElementsByClassName("width");
var height = document.getElementsByClassName("height");
var qty = document.getElementsByClassName("qty");
var cbm = document.querySelectorAll(".cbm");
var table = document.querySelectorAll("table.count tbody");
var table_row = document.querySelectorAll("table.count tr");
var table_input = document.querySelectorAll(
  "table.count tr input[type='number']"
);
const sm_no = document.getElementById("sm-no");
const generate = document.getElementById("generate");

window.onload = function () {
  sm_no.value = localStorage.getItem("sm-no");
};
var i = 2;
var row;

generate.addEventListener("click", () => {
  // row = `<tr>
  // <th>${i++}</th>
  // <td><input type="number" class="form-control length" /></td>
  // <td><input type="number" class="form-control width" /></td>
  // <td><input type="number" class="form-control height" /></td>
  // <td><input type="number" class="form-control qty" /></td>
  // <td>
  //     <input type="number" class="form-control cbm" readonly tabindex="-1" />
  // </td>
  // </tr>`;

  row = createRow();

  table[0].children[table[0].childElementCount - 2].insertAdjacentElement(
    "afterend",
    row
  );
  // calculate each row
table_input.forEach((input, index) => {
  input.addEventListener("keyup", () => {

   let tr = input.parentElement.parentElement;

    // Get the index of the <tr> element
    const rows = Array.from(tr.parentNode.children);
    const index = rows.indexOf(tr);

    // Log the index
    console.log("Row index:", index);

    cbm[index].value =
      length[index].value *
      width[index].value *
      height[index].value *
      qty[index].value;
  });
});

  console.log(i);
});

sm_no.addEventListener("keyup", () => {
  localStorage.setItem("sm-no", sm_no.value);
});

// document.body.addEventListener("focusin", () => {
//  // calculate each row
//     table_input.forEach((input, i) => {
//       input.addEventListener("keyup", () => {
//         let index =
//           Array.from(table_row).findIndex((row) => row.contains(input)) - 1;
//         cbm[index].value =
//           length[index].value *
//           width[index].value *
//           height[index].value *
//           qty[index].value;
//       });
//     });
// });

function createRow() {
  let th = document.createElement("th");
  let length_td = document.createElement("td");
  let width_td = document.createElement("td");
  let height_td = document.createElement("td");
  let qty_td = document.createElement("td");
  let cbm_td = document.createElement("td");
  let tr = document.createElement("tr");

  th.append(i++);
  length_td.appendChild(createInput("number", "length"));
  width_td.appendChild(createInput("number", "width"));
  height_td.appendChild(createInput("number", "height"));
  qty_td.appendChild(createInput("number", "qty"));
  cbm_td.appendChild(createInput("number", "cbm"));
  tr.appendChild(th);
  tr.appendChild(length_td);
  tr.appendChild(width_td);
  tr.appendChild(height_td);
  tr.appendChild(qty_td);
  tr.appendChild(cbm_td);
  return tr;
}

function createInput(type, ...classes) {
  let input = document.createElement("input");
  input.setAttribute("type", type);
  input.classList.add("form-control");
  input.classList.add(classes);
  return input;
}
