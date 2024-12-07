import './App.css';
import './styles.css';
import Allocation from './Allocation';
import BudgetTracker from './BudgetTracker'; // Import your component

function App() {
  return (
    <>
      <h1>Handsome Dan's Budget Tracker</h1>

      <div className="container">
        <div className="row">
          <div className="column1">
            <Allocation />
            <img src="/images/handsomedan.png" alt="Handsome Dan" />
          </div>
        </div>
        <div className="row">
          <BudgetTracker />
        </div>
      </div>
    </>
  );
}

export default App;
