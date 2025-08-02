const express = require("express");
const router = express.Router();
const db = require("../firebaseDb");
const fetchUser = require("../middleware/fetchUser");

// api to fetch all user expenses
router.get("/fetchallexpenses", fetchUser, async (req, res) => {
  let success = false;

  try {
    const expenseRef = db.ref("Expense");
    let expense = await expenseRef.once("value");

    if (!expense.exists()) {
      success = false;
      return res.json({
        success,
        error: "Cannot fetch expenses!",
      });
    }

    const expenses = [];
    expense.forEach((childExpense) => {
      if (childExpense.val().user === req.user.id) {
        expenses.push({
          key: childExpense.key,
          amount: childExpense.val().amount,
          budget: childExpense.val().budget,
          name: childExpense.val().name,
          date: childExpense.val().date,
          user: childExpense.val().user,
        });
      }
    });

    success = true;
    return res.json({
      success,
      expenses,
    });
  } catch (error) {
    success = false;
    return res.json({
      success,
      error: error.message,
    });
  }
});

// api to fetch all user expense per budget
router.get("/fetchexpensebybudget/:budget", fetchUser, async (req, res) => {
  let success = false;
  const budget = req.params.budget;
  try {
    const expenseRef = db.ref("Expense");
    let expense = await expenseRef.once("value");

    if (!expense.exists()) {
      success = false;
      return res.json({
        success,
        error: "Expense not found",
      });
    }

    const expenses = [];
    expense.forEach((childExpense) => {
      if (
        childExpense.val().user === req.user.id &&
        childExpense.val().budget === budget
      ) {
        expenses.push({
          key: childExpense.key,
          amount: childExpense.val().amount,
          budget: childExpense.val().budget,
          name: childExpense.val().name,
          date: childExpense.val().date,
          user: childExpense.val().user,
        });
      }
    });

    success = true;
    return res.json({
      success,
      expenses,
    });
  } catch (error) {
    success = false;
    return res.json({
      success,
      error: error.message,
    });
  }
});

// api to add expense
router.post("/addexpense", fetchUser, async (req, res) => {
  let success = false;

  const { name, amount, budget } = req.body;

  try {
    const expenseRef = db.ref("Expense");
    let expense = await expenseRef.once("value");

    if (expense.exists()) {
      for (const childExpense of Object.values(expense.val())) {
        if (
          childExpense.name === name &&
          childExpense.user === req.user.id &&
          childExpense.budget === budget
        ) {
          success = false;
          return res.json({
            success,
            error: "Expense already exists!",
          });
        }
      }
    }

    const newExpenseRef = await expenseRef.push();
    await newExpenseRef.set({
      name,
      amount,
      budget,
      user: req.user.id,
      date: new Date().toISOString(),
    });

    success = true;
    return res.json({
      success,
      expense: {
        key: newExpenseRef.key,
        name,
        amount,
        budget,
        user: req.user.id,
        date: new Date().toISOString(),
      },
    });
  } catch (error) {
    success = false;
    return res.json({
      success,
      error: error.message,
    });
  }
});

// api to delete expense
router.delete("/deleteexpense/:id", fetchUser, async (req, res) => {
  let success = false;

  const id = req.params.id;

  try {
    const expenseRef = db.ref(`Expense/${id}`);
    let expense = await expenseRef.once("value");

    if (!expense.exists()) {
      success = false;
      return res.json({
        success,
        error: "Expense not found",
      });
    }

    await expenseRef.remove();

    success = true;
    return res.json({
      success,
      message: `Expense ${id} deleted`,
    });
  } catch (error) {
    success = false;
    return res.json({
      success,
      error: error.message,
    });
  }
});

module.exports = router;
