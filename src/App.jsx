import React, { useState } from "react";
import "./assets/App.css";

const App = () => {
  // State variables for user inputs
  const [deposit, setDeposit] = useState("");
  const [days, setDays] = useState("");
  const [dailyProfit, setDailyProfit] = useState("");
  const [commission, setCommission] = useState("");

  // State variables for results
  const [finalBalance, setFinalBalance] = useState(null);
  const [totalProfit, setTotalProfit] = useState(null);
  const [profitPercentage, setProfitPercentage] = useState(null);
  const [commissionAmount, setCommissionAmount] = useState(null);

  // Handle the calculation when the user submits the form
  const calculateProfit = () => {
    const P = parseFloat(deposit);
    const r = parseFloat(dailyProfit) / 100;
    const n = parseInt(days);
    const commissionRate = parseFloat(commission) / 100;

    if (isNaN(P) || isNaN(r) || isNaN(n) || isNaN(commissionRate)) {
      alert("Please enter valid values.");
      return;
    }

    // Compound interest formula to calculate the final balance
    let finalAmount = P * Math.pow(1 + r, n);

    // Calculate the profit
    const profit = finalAmount - P;

    // Calculate the commission on profit
    const commissionAmount = profit * commissionRate;

    // Final balance after commission
    finalAmount -= commissionAmount;

    // Calculate profit percentage
    const profitPercentage = (profit / P) * 100;

    // Set the results in state
    setFinalBalance(finalAmount.toFixed(2));
    setTotalProfit((finalAmount - P).toFixed(2));
    setProfitPercentage(profitPercentage.toFixed(2));
    setCommissionAmount(commissionAmount.toFixed(2));
  };

  return (
    <div className="app">
      <h1>Compound Interest Calculator</h1>
      <div className="input-container">
        <label>
          Deposit Amount:
          <input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            placeholder="Enter deposit"
          />
        </label>
        <label>
          Days:
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Enter days"
          />
        </label>
        <label>
          Daily Profit (%):
          <input
            type="number"
            value={dailyProfit}
            onChange={(e) => setDailyProfit(e.target.value)}
            placeholder="Enter daily profit percentage"
          />
        </label>
        <label>
          Commission on Profit (%):
          <input
            type="number"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            placeholder="Enter commission percentage"
          />
        </label>
        <button onClick={calculateProfit}>Calculate</button>
      </div>

      {finalBalance !== null && (
        <div className="results">
          <h3>Results:</h3>
          <p>
            <strong>Final Balance:</strong> ${finalBalance}
          </p>
          <p>
            <strong>Total Profit:</strong> ${totalProfit}
          </p>
          <p>
            <strong>Profit Percentage:</strong> {profitPercentage}%
          </p>
          <p>
            <strong>Commission Amount:</strong> ${commissionAmount}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
