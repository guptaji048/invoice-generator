import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import InvoiceDetails from "./components/InvoiceDetails";
import InvoiceForm from "./components/InvoiceForm";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={InvoiceForm} />
        <Route path="/invoice/:invoiceId" component={InvoiceDetails} />
      </Switch>
    </Router>
  );
}
