import './App.css';
import Allocation from './Allocation';

function App() {
  return (
    <>
      <h1>Handsome Dan's Budget Tracker</h1>

      <div class="row">
          <div class="column1">
            <Allocation/>
            <img src="/images/handsomedan.png" alt="Handsome Dan"/>
          </div>
          <div class="column2"></div>
          <p>Expense Tracker can go here?</p>
      </div>
    </>
  );
}

export default App;
