import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";


const SeatLayout: React.FC = () => {
  const [twoDArray, setTwoDArray] = useState<number[][]>([]);
  const [flatArray, setFlatArray] = useState<number[]>([]);

  useEffect(() => {
    // Create a 2D array
    const rows = 3;
    const columns = 3;
    const oneDArray = Array.from({ length: rows * columns }, (_, i) => i + 1);
    
    // Convert to 2D array
    const twoD = [];
    for (let i = 0; i < rows; i++) {
      twoD.push(oneDArray.slice(i * columns, i * columns + columns));
    }
    
    setTwoDArray(twoD);
    setFlatArray(twoD.flat()); // Flatten the 2D array
  }, []);

  return (
    <div>
      <h3>2D Array:</h3>
      {twoDArray.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", gap: "10px" }}>
          {row.map((num, colIndex) => (
            <div key={colIndex} style={{ padding: "10px", border: "1px solid black" }}>
              {num}
            </div>
          ))}
        </div>
      ))}

      <h3>Flattened Array:</h3>
      <p>{flatArray.join(", ")}</p>
    </div>
  );
};

export default SeatLayout;
