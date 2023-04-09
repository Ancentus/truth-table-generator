import React, { useState } from "react";

const TruthTableGenerator = () => {
  const [expression, setExpression] = useState("");
  const [truthTable, setTruthTable] = useState([]);

  const evaluateExpression = (expr, values) => {
  const result = eval(
    expr
      .replace(/[A-Z]/g, (match) => (values[match] ? "true" : "false"))
      .replace(/\./g, (match) => "&")
      .replace(/\+/g, (match) => "|")
      .replace(/!/g, (match) => "!")
  );

  return result;
};

const generateTruthTable = () => {
  const variables = Array.from(new Set(expression.match(/[A-Z]/g))) || [];
  const numVars = variables.length;
  const numCombinations = 2 ** numVars;
  const truthTable = [];

  for (let i = 0; i < numCombinations; i++) {
    const values = {};
    const binaryString = i.toString(2).padStart(numVars, "0");

    for (let j = 0; j < numVars; j++) {
      const varName = variables[j];
      values[varName] = binaryString.charAt(j) === "1";
    }

    const result = evaluateExpression(expression, values);

    const row = {
      values: values,
      result: result,
    };
    truthTable.push(row);
  }

  setTruthTable(truthTable);
};


  return (
    <div>
      <h2>Truth Table Generator</h2>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter a digital logic expression"
      />
      <button onClick={generateTruthTable}>Generate Truth Table</button>
      {truthTable.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(truthTable[0].values).map((variable) => (
                <th key={variable}>{variable}</th>
              ))}
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            {truthTable.map((row, index) => (
              <tr key={index}>
                {Object.values(row.values).map((value, i) => (
                  <td key={i}>{value ? "1" : "0"}</td>
                ))}
                <td>{row.result ? "1" : "0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TruthTableGenerator;

