import './App.css';
import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialList = [
  {
    id: uuidv4(),
    value: '',
    status: 'Disable',
    sign:'+'
  }
]

function App() {
  const [list, setList] = useState(initialList)
  const [result, setResult] = useState(0)

  function updateResult() {
    let sum = 0;
    let number = 0;
    let data = [...list]
    for (let i of data){
      if (i.status === 'Disable'){
        number = parseInt(i.value)
        if (i.sign === '-')
          number *= -1
        sum += isNaN(number) ? 0 : number;
        }
      }
    setResult(sum)
  }

  function handleChange(index, e) {
    let data = [...list]
    data[index].value = e.target.value
    setList(data)
    updateResult()
  }

  function assignSign(event, index) {
    const data = [...list]
    data[index].sign = event.target.value
    setList(data)
    updateResult()
  }

  function addRow() {
    const newList = list.concat({ id: uuidv4(), status: 'Disable', sign:'+'})
    setList(newList)
  }
  
  function removeRow(id) {
    const newList = list.filter((item) => item.id !== id)
    setResult(()=>{
      let sum = 0
      for(let i of newList){
        if (i.status === 'Disable'){
          sum += isNaN(parseInt(i.value)) ? 0 : parseInt(i.value);
          }
      }
      return sum
    })
    setList(newList)
  }

  function statusChange(index) {
    let data = [...list]
    
    const setEnable = () => {
      data[index].status = 'Enable'
      updateResult()
      setList(data)
    }

    const setDisable = () => {
      data[index].status = 'Disable'
      updateResult()
      setList(data)
    }

    data[index].status === 'Disable' ? setEnable() : setDisable()
    
  }

  return (
    <div className="App container">
      <button className='btn btn-secondary add-btn' type='button' onClick={addRow } >Add Row</button>
      {/* <button type='button' onClick={showList}>Show List</button> */}
      <ul>
        {list.map((item, index) => (
          <div key={index}>
            <li key={item.id}>
              <select className='form-select-sm select-form' onChange={e => assignSign(e, index)}>
                  <option value='+'>+</option>
                  <option value='-'>-</option>
              </select>
              <input
              className='form-control-sm form-in' 
                type={ "number" } 
                id={item.id}
                value={isNaN(item.value) ? '' : item.value}
                onChange={e => handleChange(index, e)}>
              </input>
              <button className='btn btn-outline-primary change-btn' onClick={() => removeRow(item.id)}>Delete</button>
              <button className='btn btn-outline-secondary change-btn' onClick={() => statusChange(index) }>{item.status}</button>
            </li>
          </div>
        ))}
      </ul>
      <p className='result-tab'>Result - {result}</p>
    </div>
  );
}

export default App;
