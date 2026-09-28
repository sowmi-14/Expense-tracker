// 1. Get the elements from the page
const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const list = document.getElementById("expense-list");
const totalEl = document.getElementById("total");
const summaryEl = document.getElementById("category-summary");

// 2. An array to store all expenses
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// 3. Run this when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const expense = {
    id: Date.now(),
    title: titleInput.value,
    amount: Number(amountInput.value),
    category: categoryInput.value
  };

  expenses.push(expense);
  form.reset();
  render();
});

// 4. Remove one expense by its id
function deleteExpense(id) {
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });
  render();
}

// 5. Draw the list, total and category summary
function render() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  list.innerHTML = "";
  let total = 0;
  const byCategory = {};

  expenses.forEach(function (expense) {
    total += expense.amount;
    byCategory[expense.category] =
      (byCategory[expense.category] || 0) + expense.amount;

    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent =
      expense.title + " (" + expense.category + ") - ₹" + expense.amount;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function () {
      deleteExpense(expense.id);
    });

    li.appendChild(text);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  totalEl.textContent = "₹" + total;

  summaryEl.innerHTML = "";
  for (const category in byCategory) {
    const p = document.createElement("p");
    p.textContent = category + ": ₹" + byCategory[category];
    summaryEl.appendChild(p);
  }
}
render();