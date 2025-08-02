import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Chart.css";

const Chart = (props) => {
  const { expenses, budgets } = props;

  // set the total spent amount on expenses
  const spentAmount = (budgetName) => {
    let sum = 0;
    const expAmount = [];
    expenses.forEach((item) => {
      if (item.budget === budgetName) {
        expAmount.push(item.amount);
      }
    });

    for (const amt of expAmount) {
      sum += parseInt(amt);
    }
    return sum;
  };

  // set the data to be displayed in chart
  const data = budgets.map((budget) => ({
    name: budget.name,
    TotalSpent: spentAmount(budget.name),
    TotalAmount: budget.amount,
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
      className="overflow-x-scroll"
    >
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="TotalSpent" stackId="a" fill="#3131a5" />
        <Bar dataKey="TotalAmount" stackId="a" fill="#9898fc" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
