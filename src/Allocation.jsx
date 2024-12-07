import './Allocation.css';
import React, { useState } from 'react';

let categories = [];
let budget = 0

function Allocation() {
  const [lbudget, setlBudget]= useState(budget);
  const [lcategories, setlCategories] = useState(categories);
  const [categoryName, setCategoryName] = useState('');
  const [categoryPercentage, setCategoryPercentage] = useState(0);

  function changeBudget(e, changeVar) {
    changeVar(e.target.value);
  }

  function addCategory(lcategories, setlCategories, categoryName, setCategoryName, categoryPercentage, setCategoryPercentage) {
    let totalPercentage = 0;
    for (let i = 0; i < lcategories.length; i++){
      totalPercentage += lcategories[i].percentage;
    }
    categories = lcategories
    totalPercentage += parseFloat(categoryPercentage); /* For new category */

    if (totalPercentage <= 100) {
      setlCategories([...lcategories, { name: categoryName, percentage: parseFloat(categoryPercentage) }]); /* Add new category to array */
      /* Reset for new category */
      setCategoryName('');
      setCategoryPercentage(0);
    }
    
    else {
      alert('Total percentage exceeds 100%');
    }
  
  };
  
  function calculateAllocation(lbudget, percentage) {
    return (lbudget * percentage) / 100;
  }
  
  return ( <div>
    <h2>Budget Allocation</h2>
    <div>
      <label>Budget: </label>
      <input type="number" value={lbudget} onChange={(e) => changeBudget(e, setlBudget)} />
    </div>
  <div>
    <label>Category Name: </label>
    <input type="text" value={categoryName} onChange={(e) => changeBudget(e, setCategoryName)} />
    <label>   Category Percentage: </label>
    <input type="number" value={categoryPercentage} onChange={(e) => changeBudget(e, setCategoryPercentage)} />
    <button onClick={() => addCategory(lcategories, setlCategories, categoryName, setCategoryName, categoryPercentage, setCategoryPercentage)}>Add Category</button>
  </div>
  <h3>Categories</h3>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Percentage</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {lcategories.map((category, index) => (
        <tr key={index}>
          <td>{category.name}</td>
          <td>{category.percentage}%</td>
          <td>${calculateAllocation(lbudget, category.percentage).toFixed(2)}</td>
        </tr> ))}
      </tbody>
    </table>
  </div> );
}
export default Allocation;
export { categories, budget };
