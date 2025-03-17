import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Tooltip,
  Avatar,
  Grid,
  Box,
  Button,
  TextField,
  Modal,
} from "@mui/material";

interface Employee {
  id: number;
  name: string;
  photo: string;
  role: string;
  department: string;
}

interface SeatProps {
    employee: Employee;
    onRender: () => void; // Accept the function as a prop
  }

const Seat: React.FC<SeatProps> = ({ employee, onRender }) => {

  const [open, setOpen] = useState(false);
  const [break1, setBreak1] = useState(false);
  const [login, setLogin] = useState(false);
//const [break, break] = useState(false);
   const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
  });
  // Open & Close Modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
     
    // console.log("employee")
    const defaultEmployee = {
        id: employee.id ,// Generate a unique ID
        photo: "https://via.placeholder.com/150", // Default placeholder image
      };

    e.preventDefault();
    console.log("Form Data:", formData);
    employees[employee.id-1] =  { ...defaultEmployee, ...formData };
    console.log("EMp2 ",employees);
    onRender();
    handleClose(); // Close modal after submit
  };

  return (
    <>
      <Tooltip
        title={
         employee.id === 1 ? (
            <Card sx={{ minWidth: 200, p: 1, boxShadow: 4, borderRadius: 2 }}>
        <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Employee Actions
               </Typography>

        <Box display="flex" justifyContent="center" gap={2} mb={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor:  break1 ? "#4CAF50" : "#FFD700", // Yellow
              color: "black",
              "&:hover": { backgroundColor: "#FFC107" },
            }}
            onClick={() => setBreak1(!break1)}
          >
            {break1  ? "Back" : "Break" }
          </Button>

          {/* <Button
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50", // Green
              color: "white",
              "&:hover": { backgroundColor: "#388E3C" },
            }}
          >
            Back
          </Button> */}
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: login ? "#D32F2F" : "4CAF50", // Red
            color: "white",
            "&:hover": { backgroundColor: "#B71C1C" },
          }}
          onClick  = {() => setLogin(!login)}
          fullWidth
        >
          { login ? "Logoff" : "Login" }
        </Button>
      </CardContent>
          </Card>
          ) :
          employee.name !== "Unassigned" ? (
            <Card sx={{ minWidth: 200, p: 1, boxShadow: 4, borderRadius: 2 }}>
              <CardContent>
                <Avatar
                  src={employee.photo}
                  alt={employee.name}
                  sx={{ width: 50, height: 50, mb: 1 }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {employee.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Role:</strong> {employee.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Department:</strong> {employee.department}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ minWidth: 200, p: 1, boxShadow: 4, borderRadius: 2 }}>
              <CardContent>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#4CAF50", // Green color
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "none", // Prevents all caps
                    borderRadius: "8px",
                    padding: "8px 16px",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "#388E3C", // Darker green on hover
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  onClick={handleOpen}  
                >
                  Assign
                </Button>
              </CardContent>
            </Card>
          )
        
        }
        arrow
      >
        <Card
          sx={{
            width: 150,
            height: 60,
            borderRadius: 3,
            display: "flex",
            flexDirection: "left",
            alignItems: "left",
            justifyContent: "left",
            boxShadow: 3,
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <div className="d-flex">
            <Avatar
              src={employee.photo}
              alt={employee.name}
              sx={{ width: 30, height: 30, mb: 1 }}
            />
            <CardContent sx={{ textAlign: "center", padding: "10px" }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: employee.name === "Unassigned" ? "red" : "black",
                }}
              >
                {employee.name}
              </Typography>
            </CardContent>
          </div>
          <Box
            sx={{
              width: 10, // Slightly larger for visibility
              height: 10,
              borderRadius: "50%", // Ensures circular shape
              backgroundColor: employee.name !== "Unassigned" ? !login ? "red" : break1 ? "yellow" : "green" : "red",
              position: "absolute",
              border: "2px solid white", // Adds contrast if the card has a background
              boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)", // Gives a soft glow effect
            }}
          />
        </Card>
      </Tooltip>

      <Modal open={open} onClose={handleClose} aria-labelledby="form-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" id="form-modal" gutterBottom>
            Employee Form
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              margin="normal"
            />

            <Box
              mt={2}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

// Example Employee Data
// const employees: Employee[] = [
//   { id: 1, name: "John Doe", photo: "https://randomuser.me/api/portraits/men/1.jpg", role: "Software Engineer", department: "IT" },
//   { id: 2, name: "Jane Smith", photo: "https://randomuser.me/api/portraits/women/2.jpg", role: "Product Manager", department: "Management" },
//   { id: 3, name: "Alex Brown", photo: "https://randomuser.me/api/portraits/men/3.jpg", role: "Designer", department: "UX/UI" },
//   { id: 4, name: "John Doe", photo: "https://randomuser.me/api/portraits/men/1.jpg", role: "Software Engineer", department: "IT" },
//   { id: 5, name: "Jane Smith", photo: "https://randomuser.me/api/portraits/women/2.jpg", role: "Product Manager", department: "Management" },
//   { id: 6, name: "Alex Brown", photo: "https://randomuser.me/api/portraits/men/3.jpg", role: "Designer", department: "UX/UI" },
//   { id: 7, name: "John Doe", photo: "https://randomuser.me/api/portraits/men/1.jpg", role: "Software Engineer", department: "IT" },
//   { id: 8, name: "Jane Smith", photo: "https://randomuser.me/api/portraits/women/2.jpg", role: "Product Manager", department: "Management" },
//   { id: 9, name: "Alex Brown", photo: "https://randomuser.me/api/portraits/men/3.jpg", role: "Designer", department: "UX/UI" },
//   { id: 10, name: "John Doe", photo: "https://randomuser.me/api/portraits/men/1.jpg", role: "Software Engineer", department: "IT" },
//   { id: 11, name: "Jane Smith", photo: "https://randomuser.me/api/portraits/women/2.jpg", role: "Product Manager", department: "Management" },
//   { id: 12, name: "Alex Brown", photo: "https://randomuser.me/api/portraits/men/3.jpg", role: "Designer", department: "UX/UI" },
//   { id: 13, name: "John Doe", photo: "https://randomuser.me/api/portraits/men/1.jpg", role: "Software Engineer", department: "IT" },
//   { id: 14, name: "Jane Smith", photo: "https://randomuser.me/api/portraits/women/2.jpg", role: "Product Manager", department: "Management" },
//   { id: 15, name: "Alex Brown", photo: "https://randomuser.me/api/portraits/men/3.jpg", role: "Designer", department: "UX/UI" },
// ];

const rows = 4;
const cols = 5;
const totalSeats = rows * cols;

const createEmptyEmployees = (size: number) => {
  return Array.from({ length: size }, (_, index) => ({
    id: index + 1,
    name: "Unassigned",
    photo: "",
    role: "",
    department: "",
  }));
};

// Example Usage:
const employees = createEmptyEmployees(20);

employees[0] = {
  id: 1,
  name: "John Doe",
  photo: "https://randomuser.me/api/portraits/men/1.jpg",
  role: "Software Engineer",
  department: "IT",
};
employees[3] = {
  id: 2,
  name: "Jane Smith",
  photo: "https://randomuser.me/api/portraits/women/2.jpg",
  role: "Product Manager",
  department: "Management",
};
employees[7] = {
  id: 3,
  name: "Alex Brown",
  photo: "https://randomuser.me/api/portraits/men/3.jpg",
  role: "Designer",
  department: "UX/UI",
};

const SeatGrid: React.FC = () => {

  const [render,setRender] = useState(0);
  function render1(){
         setRender(render+1);
  }
  return (
    <>
      <Box
        sx={{
          width: "800px",
          height: "200px",
          backgroundColor: "#f5f5f5",
          border: "4px solid black",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
          marginLeft: "100px",
        }}
      >
        {/* Room Title */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Conference Room
        </Typography>

        {/* Seats Grid */}
        <Grid container spacing={2} justifyContent="center">
          {Array.from({ length: totalSeats }, (_, index) => (
            <Grid item key={index}></Grid>
          ))}
        </Grid>
      </Box>

      <div
        className="container"
        style={{
          display: "flex",
          minWidth: "3000px",
          gap: "100px",
          overflowX: "auto",
          flexWrap: "nowrap",
          marginTop: "100px",
          marginLeft: "100px",
        }}
      >
        {/* Left-Aligned Box */}
        <Box
          sx={{ width: "950px", display: "flex", justifyContent: "flex-start" }}
        >
          <Grid container spacing={2} alignItems="flex-start">
            {employees.map((employee) => (
              <Grid item key={employee.id}>
                 <Seat key={employee.id} employee={employee} onRender={render1}  />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{ width: "950px", display: "flex", justifyContent: "flex-start" }}
        >
          <Grid container spacing={2} alignItems="flex-start">
            {employees.map((employee) => (
              <Grid item key={employee.id}>
                <Seat key={employee.id} employee={employee} onRender={render1} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default SeatGrid;
