import './Allocation.css';
import React, { useState } from 'react';

function Allocation() {
  const [budget, setBudget]= useState(0);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryPercentage, setCategoryPercentage] = useState(0);

  function changeBudget(e, changeVar) {
    changeVar(e.target.value);
  }

  function addCategory(categories, setCategories, categoryName, setCategoryName, categoryPercentage, setCategoryPercentage) {
    let totalPercentage = 0;
    for (let i = 0; i < categories.length; i++){
      totalPercentage += categories[i].percentage;
    }

    totalPercentage += parseFloat(categoryPercentage); /* For new category */

    if (totalPercentage <= 100) {
      setCategories([...categories, { name: categoryName, percentage: parseFloat(categoryPercentage) }]); /* Add new category to array */
      /* Reset for new category */
      setCategoryName('');
      setCategoryPercentage(0);
    }
    
    else {
      alert('Total percentage exceeds 100%');
    }
  
  };
  
  function calculateAllocation(budget, percentage) {
    return (budget * percentage) / 100;
  }
  
  return ( <div>
    <h2>Budget Allocation</h2>
    <div>
      <label>Budget: </label>
      <input type="number" value={budget} onChange={(e) => changeBudget(e, setBudget)} />
    </div>
  <div>
    <label>Category Name: </label>
    <input type="text" value={categoryName} onChange={(e) => changeBudget(e, setCategoryName)} />
    <label>   Category Percentage: </label>
    <input type="number" value={categoryPercentage} onChange={(e) => changeBudget(e, setCategoryPercentage)} />
    <button onClick={() => addCategory(categories, setCategories, categoryName, setCategoryName, categoryPercentage, setCategoryPercentage)}>Add Category</button>
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
      {categories.map((category, index) => (
        <tr key={index}>
          <td>{category.name}</td>
          <td>{category.percentage}%</td>
          <td>${calculateAllocation(budget, category.percentage).toFixed(2)}</td>
        </tr> ))}
      </tbody>
    </table>
  </div> );
}
export default Allocation;
