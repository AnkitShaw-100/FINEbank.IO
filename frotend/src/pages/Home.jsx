import React from "react";
import Dashboard from "../components/Dashboard";

const Home = ({ loans, transactions, onPay, onSettle }) => {
  return (
    <div>
      <Dashboard
        loans={loans}
        transactions={transactions}
        onPay={onPay}
        onSettle={onSettle}
      />
    </div>
  );
};

export default Home;
