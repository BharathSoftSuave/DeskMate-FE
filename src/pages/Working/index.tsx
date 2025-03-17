import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import { Modal, Box, Typography, Button } from "@mui/material";

// Seat Grid Configuration
const rows = 13;
const cols = 5;
const boxWidth = 105;
const boxHeight = 50;
const xOffset = 20;
const yOffset = 160;
const xGap = 140;
const yGap = 60;

const extraRows = 9;
const extraCols = 5;
const extraXOffset = 800;
const extraYOffset = 400;

const bigBoxX = 100;
const bigBoxY = 100;
const bigBoxWidth = 1000;
const bigBoxHeight = 800;


// Sample Employee Data
const employees = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
  { id: 5, name: "Eve" },
  { id: 6, name: "Frank" },
  { id: 7, name: "Grace" },
  { id: 8, name: "Hank" },
  { id: 9, name: "Ivy" },
  { id: 10, name: "Jack" },
  { id: 21, name: "Alice" },
  { id: 22, name: "Bob" },
  { id: 23, name: "Charlie" },
  { id: 24, name: "David" },
  { id: 25, name: "Eve" },
  { id: 26, name: "Frank" },
  { id: 27, name: "Grace" },
  { id:28, name: "Hank" },
  { id: 29, name: "Ivy" },
  { id: 30, name: "Jack" },
  { id: 31, name: "Alice" },
  { id: 32, name: "Bob" },
  { id: 33, name: "Charlie" },
  { id: 34, name: "David" },
  { id: 35, name: "Eve" },
  { id: 36, name: "Frank" },
  { id: 37, name: "Grace" },
  { id: 38, name: "Hank" },
  { id: 39, name: "Ivy" }
];

// Generate Main Grid
const grid = Array.from({ length: rows }, (_, row) =>
  Array.from({ length: cols }, (_, col) => {
    const employee = employees[row * cols + col];
    return {
      x: bigBoxX + xOffset + col * xGap,
      y: bigBoxY + yOffset + row * yGap,
      fill: "white",
      stroke: employee ? "#90EE90" : "#D3D3D3",
      employee: employee || null,
    };
  })
);

// Generate Extra Grid
const extraGrid = Array.from({ length: extraRows }, (_, row) =>
  Array.from({ length: extraCols }, (_, col) => {
    const employee = employees[rows * cols + row * extraCols + col];
    return {
      x: bigBoxX + extraXOffset + col * xGap,
      y: bigBoxY + extraYOffset + row * yGap,
      fill: employee ? "#90EE90" : "#D3D3D3",
      employee: employee || null,
    };
  })
);



const SeatSelection = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClick = (employee) => {
        console.log("Left employees = ",grid);
      if (employee) {
        setSelectedEmployee(employee);
        setOpen(true);
      }
    };

    
const [formData, setFormData] = useState({
  fromRow: "",
  fromColumn: "",
  toRow: "",
  toColumn: "",
}); 


    let [render,setRender] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
      useEffect(() => {
        console.log("inir",grid);
        const handleResize = () => {
          setDimensions({ 
            width: window.innerWidth, 
            height: window.innerHeight 
          });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      });
    
      const [openEdit, setEditOpen] = useState(false);
      const handleEdit = () => {
        setEditOpen(!openEdit);
        console.log("Edit button clicked!");
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      // Handle form submission
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
      
        console.log("gride =" ,grid);
        console.log("before",grid[2][1])
        console.log("employee1 =",Number(formData.fromRow),Number(formData.fromColumn),grid[Number(formData.fromRow)][Number(formData.fromColumn)])
        console.log("employee2 =", grid[Number(formData.toRow)][Number(formData.toColumn)])
        let temp = grid[Number(formData.fromRow)][Number(formData.fromColumn)] ;
        grid[Number(formData.fromRow)][Number(formData.fromColumn)] = grid[Number(formData.toRow)][Number(formData.toColumn)] ;
        grid[Number(formData.toRow)][Number(formData.toColumn)] = temp;
        setRender(render++);
        console.log("after gride =" ,grid);
      };
     
  return (
    <div 
    ref={containerRef} 
      style={{ 
        width: "100vw", 
        height: "100vh", 
        overflow: "auto", // Enable scrolling
        border: "2px solid black" 
      }}
    >

<button
      onClick={handleEdit}
      className="btn btn-primary"
    >
      Edit place
    </button>
      <Stage  width={2000} 
        height={1500} >
        <Layer>

                      <Rect x={bigBoxX + 1000} y={bigBoxY + 150} width={100} height={30} fill="grey" />
                      <Text
                        x={bigBoxX + 990} // Adjust X to center text
                        y={bigBoxY + 160 } // Adjust Y to center text
                        text="Entrance"
                        fontSize={18}
                        fill="white"
                     
                     // Rotates text to match the rectangle
                      />
                     
                     <Rect x={bigBoxX + 10} y={bigBoxY + 0} width={650} height={120} fill="#ADD8E6" 
                      cornerRadius={30} 
                      shadowColor="black" // Shadow color
                      shadowBlur={10} // Blur effect
                      shadowOffset={{ x: 5, y: 5 }} // Shadow position
                      shadowOpacity={0.4} // Shadow transparency
                      stroke="light green" // Border color
                      strokeWidth={2} // Border thickness
                     />
                    <Text
                      x={bigBoxX + 100} 
                      y={bigBoxY + 25 } 
                      text="Conference Room"
                      fontSize={18}
                      fill="black"
                    />

                    
                   <Rect x={bigBoxX + 685} y={bigBoxY + 0} width={115} height={60} fill="#FFFFE0"
                   shadowColor="black" // Shadow color
                   shadowBlur={10} // Blur effect
                   shadowOffset={{ x: 5, y: 5 }} // Shadow position
                   shadowOpacity={0.4} // Shadow transparency
                   stroke="light green" // Border color
                   strokeWidth={2} // Border thickness
                    />
                   <Text
                      x={bigBoxX + 700} 
                      y={bigBoxY + 10 } 
                      text="manager"
                      fontSize={18}
                      fill="black"
                    />
                     <Text
                      x={bigBoxX + 700} 
                      y={bigBoxY + 30 } 
                      text="Room2"
                      fontSize={18}
                      fill="black"
                    />
                    
                    
                    <Rect x={bigBoxX + 800} y={bigBoxY + 0} width={685} height={60} fill="#FFA07A"
                     shadowColor="black" // Shadow color
                     shadowBlur={10} // Blur effect
                     shadowOffset={{ x: 5, y: 5 }} // Shadow position
                     shadowOpacity={0.4} // Shadow transparency
                     stroke="light green" // Border color
                     strokeWidth={2} // Border thickness
                    />     
                      <Text
                      x={bigBoxX + 920} // Adjust X to center text
                      y={bigBoxY + 10 } // Adjust Y to center text
                      text="Manager"
                      fontSize={18}
                      fill="white"
                     // Rotates text to match the rectangle
                     />
                      <Text
                      x={bigBoxX + 920} // Adjust X to center text
                      y={bigBoxY + 30 } // Adjust Y to center text
                      text="Room 1"
                      fontSize={18}
                      fill="white"
                       // Rotates text to match the rectangle
                    />

                    <Rect x={bigBoxX + 800} y={bigBoxY + 60} width={685} height={60} fill="#ADD8E6" 
                    shadowColor="black" // Shadow color
                    shadowBlur={10} // Blur effect
                    shadowOffset={{ x: 5, y: 5 }} // Shadow position
                    shadowOpacity={0.4} // Shadow transparency
                    stroke="light green" // Border color
                    strokeWidth={2} // Border thickness
                    />
                    <Text
                      x={bigBoxX + 920} // Adjust X to center text
                      y={bigBoxY + 80 } // Adjust Y to center text
                      text="Meeting Room"
                      fontSize={18}
                      fill="black"
                     // Rotates text to match the rectangle
                    />
              
            
                    <Rect x={bigBoxX + 800} y={bigBoxY + 120} width={685} height={60} fill="#FFFFE0" 
                     shadowColor="black" // Shadow color
                     shadowBlur={10} // Blur effect
                     shadowOffset={{ x: 5, y: 5 }} // Shadow position
                     shadowOpacity={0.4} // Shadow transparency
                     stroke="light green" // Border color
                     strokeWidth={2} // Border thickness
                    />
                    <Text
                      x={bigBoxX + 920} // Adjust X to center text
                      y={bigBoxY + 130 } // Adjust Y to center text
                      text="Pantry"
                      fontSize={18}
                      fill="black"
                     // Rotates text to match the rectangle
                    />

                    <Rect x={bigBoxX + 800} y={bigBoxY + 180} width={685} height={60} fill="#FFFFE0"  
                     shadowColor="black" // Shadow color
                     shadowBlur={10} // Blur effect
                     shadowOffset={{ x: 5, y: 5 }} // Shadow position
                     shadowOpacity={0.4} // Shadow transparency
                     stroke="light green" // Border color
                     strokeWidth={2} // Border thickness
                    />
                    <Text
                      x={bigBoxX + 920} // Adjust X to center text
                      y={bigBoxY + 200 } // Adjust Y to center text
                      text="server"
                      fontSize={18}
                      fill="black"
                     // Rotates text to match the rectangle
                    />
            
                
            
                

          {grid.flat().map((seat, index) => (
            <React.Fragment key={index}>
              <Rect
                {...seat}
                width={boxWidth}
                height={boxHeight}
                cornerRadius={10} // Rounded corners
                shadowColor="black" // Shadow color
                shadowBlur={10} // Blur effect
                shadowOffset={{ x: 3, y: 3 }} // Shadow position
                shadowOpacity={0.2} // Shadow transparency
                stroke="light green" // Border color
                strokeWidth={2} // Border thickness
                onClick={() => handleClick(seat.employee)}
              />
              {seat.employee && (
                <Text
                  x={seat.x + 10}
                  y={seat.y + 15}
                  text={seat.employee.name}
                  fontSize={14}
                  fill="black"
                 
                />
              )}
            </React.Fragment>
          ))}
          {extraGrid.flat().map((seat, index) => (
            <React.Fragment key={`extra-${index}`}>
              <Rect
                {...seat}
                width={boxWidth}
                height={boxHeight}
                fill ="white"
                cornerRadius={10} // Rounded corners
                shadowColor="black" // Shadow color
                shadowBlur={10} // Blur effect
                shadowOffset={{ x: 5, y: 5 }} // Shadow position
                shadowOpacity={0.4} // Shadow transparency
                stroke="light green" // Border color
                strokeWidth={2} // Border thickness
              
                onClick={() => setSelectedEmployee(seat.employee)}
              />
              {seat.employee && (
                <Text
                  x={seat.x + 10}
                  y={seat.y + 15}
                  text={seat.employee.name}
                  fontSize={14}
                  fill="black"
                />
              )}
            </React.Fragment>
          ))}


          <Rect
            x = {790}
            y = {980}
            width = {105}
            height = {50}
            fill = "blue"
            cornerRadius={10} // Rounded corners
            shadowColor="black" // Shadow color
            shadowBlur={10} // Blur effect
            shadowOffset={{ x: 5, y: 5 }} // Shadow position
            shadowOpacity={0.4} // Shadow transparency
            stroke="light green" // Border color
            strokeWidth={4} // Border thickness
          />
        </Layer>
      </Stage>
       
        {/* Material UI Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Employee Details</Typography>
          {selectedEmployee ? (
            <div>
              <Typography><strong>Name:</strong> {selectedEmployee.name}</Typography>
              <Typography><strong>Role:</strong> {selectedEmployee.role}</Typography>
            </div>
          ) : (
            <Typography>No employee assigned to this seat.</Typography>
          )}
          <Button 
            onClick={() => setOpen(false)} 
            variant="contained" 
            sx={{ mt: 2, display: "block", mx: "auto" }}
          >
            Close
          </Button>
        </Box>
      </Modal>


      <Modal open={openEdit} onClose={() => setEditOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <div style={{ width: "450px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>Seat Selection</h3>
      <form onSubmit={handleSubmit}>
        {/* From Inputs */}
        <label>From:</label>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="number"
            name="fromRow"
            placeholder="Row"
            value={formData.fromRow}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="fromColumn"
            placeholder="Column"
            value={formData.fromColumn}
            onChange={handleChange}
            required
          />
        </div>

        {/* To Inputs */}
        <label>To:</label>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="number"
            name="toRow"
            placeholder="Row"
            value={formData.toRow}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="toColumn"
            placeholder="Column"
            value={formData.toColumn}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" style={{ width: "100%", padding: "8px", background: "blue", color: "white", border: "none", borderRadius: "5px" }}>
          Submit
        </button>
      </form>
    </div>
          <Button 
            onClick={() => setEditOpen(false)} 
            variant="contained" 
            sx={{ mt: 2, display: "block", mx: "auto" }}
          >
            Close
          </Button>
        </Box>
      </Modal>


      {/* {selectedEmployee && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Employee</h3>
          <p>Name: {selectedEmployee.name}</p>
        </div>
      )} */}
    </div>
  );
};

export default SeatSelection;
