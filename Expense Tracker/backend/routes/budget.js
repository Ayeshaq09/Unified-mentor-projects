const express = require("express");
const router = express.Router();
const db = require("../firebaseDb");
const fetchUser = require("../middleware/fetchUser");

// api to fetch all user budgets
router.get("/fetchbudget", fetchUser, async (req, res) => {
  let success = false;

  try {
    const budgetRef = db.ref("Budgets");
    let budget = await budgetRef.once("value");

    if (!budget.exists()) {
      success = false;
      return res.status(400).json({
        success,
        error: "Cannot fetch budgets!",
      });
    }

    const budgets = [];
    budget.forEach((childBudget) => {
      if (req.user.id === childBudget.val().user) {
        budgets.push({
          key: childBudget.key,
          name: childBudget.val().name,
          amount: childBudget.val().amount,
        });
      }
    });

    success = true;
    return res.json({
      success,
      budgets,
    });
  } catch (error) {
    success = false;
    return res.json({
      success,
      error: error.message,
    });
  }
});

// api to add budget
router.post("/addbudget", fetchUser, async (req, res) => {
  let success = false;

  const { name, amount } = req.body;

  try {
    const budgetRef = db.ref("Budgets");
    let budget = await budgetRef.once("value");

    if (budget.exists()) {
      for (const childBudget of Object.values(budget.val())) {
        if (childBudget.name === name && childBudget.user === req.user.id) {
          success = false;
          return res.json({
            success,
            error: "Budget already exists!",
          });
        }
      }
    }

    const newBudgetRef = await budgetRef.push();
    await newBudgetRef.set({
      name,
      amount,
      user: req.user.id,
    });

    success = true;
    return res.json({
      success,
      budget: {
        id: newBudgetRef.key,
        name,
        amount,
        user: req.user.id,
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

// api to update budget
router.put("/updatebudget/:id", fetchUser, async (req, res) => {
  let success = false;

  const { name, amount } = req.body;
  const id = req.params.id;

  try {
    const budgetRef = db.ref(`Budgets/${id}`);
    let budget = await budgetRef.once("value");

    if (!budget.exists()) {
      success = false;
      return res.json({
        success,
        error: "Budget not found",
      });
    }

    const oldBudgetName = budget.val().name;

    const expenseRef = db.ref(`Expense`);
    let expense = await expenseRef.once("value");

    const updates = [];
    if (expense.exists()) {
      expense.forEach((item) => {
        if (item.val().budget === oldBudgetName) {
          const itemId = item.key;
          updates.push(db.ref(`Expense/${itemId}/budget`).set(name));
        }
      });

      await Promise.all(updates);
    }

    await budgetRef.update({
      name,
      amount,
    });
    success = true;
    return res.json({
      success,
      updatedBudget: {
        id: budget.key,
        name,
        amount,
        user: req.user.id,
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

// api to delete budget
router.delete("/deletebudget/:id", fetchUser, async (req, res) => {
  let success = false;
  const id = req.params.id;

  try {
    const budgetRef = db.ref(`Budgets/${id}`);
    let budget = await budgetRef.once("value");

    if (!budget.exists()) {
      success = false;
      return res.json({
        success,
        error: `Budget not found`,
      });
    }

    const budgetName = budget.val().name;

    const expenseRef = db.ref(`Expense`);
    let expense = await expenseRef.once("value");

    const deleteItems = [];
    if (expense.exists()) {
      expense.forEach(item => {
        if (item.val().budget === budgetName && item.val().user === req.user.id){
          const itemId = item.key;
          deleteItems.push(db.ref(`Expense/${itemId}`).remove());
        }
      })
      await Promise.all(deleteItems);
    }
    await budgetRef.remove();
      success = true;
      return res.json({
        success,
        deletedBudget: `Budget ${id} is deleted`,
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
