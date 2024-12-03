import './App.css';
import './styles.css';
import Allocation from './Allocation';
import BudgetTracker from './BudgetTracker'; // Import your component

function App() {
  return (
    <>
      <h1>Handsome Dan's Budget Tracker</h1>

      <div className="container">
        {/* Friend's Part */}
        <div className="row">
          <div className="column1">
            <Allocation />
            <img src="/images/handsomedan.png" alt="Handsome Dan" />
          </div>
        </div>

        {/* Your Part */}
        <div className="row">
          <BudgetTracker /> {/* Render your Budget Tracker here */}
        </div>
      </div>
    </>
  );
}

export default App;
