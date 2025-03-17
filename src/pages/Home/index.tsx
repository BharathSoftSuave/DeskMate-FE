// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Button, Modal, Box, Typography } from "@mui/material";
// // import AppBar from "@mui/material/AppBar";
// // import Toolbar from "@mui/material/Toolbar";
// // import IconButton from "@mui/material/IconButton";
// // import Menu from "@mui/material/Menu";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import Container from "@mui/material/Container";
// // import Avatar from "@mui/material/Avatar";
// // import Tooltip from "@mui/material/Tooltip";
// // import MenuItem from "@mui/material/MenuItem";
// // import AdbIcon from "@mui/icons-material/Adb";
// // import { Stage, Layer, Rect, Text, Path ,Circle } from "react-konva";

// // interface SeatProps {
// //   x: number;
// //   y: number;
// //   isSelected: boolean;
// //   seatStatus: string;
// //   onClick: () => void;
// //   onHover: (e: any) => void;
// // }

// // interface Employee {
// //   x: number;
// //   y: number;
// //   id: number;
// //   name: string;
// //   designation: string;
// //   department: string;
// //   seatseatStatus: string;
// // }

// // const Seat: React.FC<SeatProps> = ({
// //   x,
// //   y,
// //   isSelected,
// //   onClick,
// //   seatStatus,
// //   onHover,
// // }) => {
// //   const getSeatColor = () => {
// //     if (seatStatus === "empty") return "#FFFFFF"; // Red for booked
// //     if (seatStatus === "filled") return "#e24c4c"; // Yellow for reserved
// //     // return "#4CAF50"; // Green for available
// //   };

// //   return (
// //     <Rect
// //       x={x}
// //       y={y}
// //       width={60}
// //       height={60}
// //       fill={getSeatColor()} // Selected: Bootstrap Primary, Unselected: Grey
// //       stroke="black"
// //       strokeWidth={2}
// //       cornerRadius={5}
// //       onClick={onClick}
// //       shadowColor="black" // Color of the shadow
// //       shadowBlur={5} // Blur radius of the shadow
// //       shadowOffsetX={2} // Horizontal offset of the shadow
// //       shadowOffsetY={2} // Vertical offset of the shadow
// //       // onMouseEnter={onHover}
// //       // onMouseLeave={onHover}
// //     />
// //   );
// // };

// // const SeatLayout: React.FC = () => {
// //   const pages = [ "Features", "Table"];
// // const settings = ["Profile", "Account", "Dashboard", "Logout"];
// //   const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
// //   const [selectedSeats1, setSelectedSeats1] = useState<number[]>([]);
// //   const [selectedSeats2, setSelectedSeats2] = useState<number[]>([]);

// //   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
// //     null
// //   );
// //   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
// //     null
// //   );

// //   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
// //     setAnchorElNav(event.currentTarget);
// //   };
// //   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
// //     setAnchorElUser(event.currentTarget);
// //   };

// //   const handleCloseNavMenu = () => {
// //     setAnchorElNav(null);
// //   };

// //   const handleCloseUserMenu = () => {
// //     setAnchorElUser(null);
// //   };

// //   const [selectedEmployees, setSelectedEmployee] = useState<Employee[]>();
// //   const [open, setOpen] = useState(false);

// //   const handleOpen = () => setOpen(true);
// //   const handleClose = () => setOpen(false);

// //   const toggleSeat = (index: number) => {
// //     setSelectedSeats((prev) =>
// //       prev.includes(index) ? prev.filter((s) => s !== index) : [...prev, index]
// //     );
// //   };

// //   const toggleSeat1 = (index: number) => {
// //     setSelectedSeats1((prev) =>
// //       prev.includes(index) ? prev.filter((s) => s !== index) : [...prev, index]
// //     );
// //   };

// //   const toggleSeat2 = (index: number) => {
// //     setSelectedSeats2((prev) =>
// //       prev.includes(index) ? prev.filter((s) => s !== index) : [...prev, index]
// //     );
// //   };

// //   const employees1 = [
// //     {
// //       id: 0,
// //       name: "John Doe",
// //       designation: "Manager",
// //       department: "HR",
// //       seatStatus: "filled",
// //     },
// //     { id: 1, name: "", designation: "", department: "", seatStatus: "empty" },
// //     {
// //       id: 2,
// //       name: "",
// //       designation: "",
// //       department: "",
// //       seatStatus: "",
// //     },
// //     {
// //       id: 3,
// //       name: "Bob Brown",
// //       designation: "Analyst",
// //       department: "Finance",
// //       seatStatus: "filled",
// //     },
// //     {
// //       id: 4,
// //       name: "Charlie White",
// //       designation: "Engineer",
// //       department: "Operations",
// //       seatStatus: "filled",
// //     },
// //   ];

// //   const employees2 = [
// //     {
// //       id: 5,
// //       name: "Diana Green",
// //       designation: "Support",
// //       department: "Customer Service",
// //       seatStatus: "filled",
// //     },
// //     {
// //       id: 6,
// //       name: "",
// //       designation: "",
// //       department: "",
// //       seatStatus: "empty",
// //     },
// //     {
// //       id: 7,
// //       name: "Frank Harris",
// //       designation: "Lead Developer",
// //       department: "IT",
// //       seatStatus: "filled",
// //     },
// //     {
// //       id: 8,
// //       name: "",
// //       designation: "",
// //       department: "",
// //       seatStatus: "",
// //     },
// //     {
// //       id: 9,
// //       name: "Henry Adams",
// //       designation: "Accountant",
// //       department: "Finance",
// //       seatStatus: "filled",
// //     },
// //   ];

// //   const employees3 = [
// //     {
// //       id: 20,
// //       name: "Lucas Martin",
// //       designation: "Technician",
// //       department: "Support",
// //       seatStatus: "filled",
// //     },
// //     { id: 21, name: "", designation: "", department: "", seatStatus: "empty" },
// //     {
// //       id: 22,
// //       name: "Ethan Moore",
// //       designation: "Consultant",
// //       department: "Business",
// //       seatStatus: "filled",
// //     },
// //     { id: 23, name: "", designation: "", department: "", seatStatus: "empty" },
// //     { id: 24, name: "", designation: "", department: "", seatStatus: "" },
// //   ];

// //   const employees4 = [
// //     { id: 28, name: "", designation: "", department: "", seatStatus: "empty" },
// //     {
// //       id: 26,
// //       name: "Bharath",
// //       designation: "Junior",
// //       department: "develop",
// //       seatStatus: "filled",
// //     },
// //     {
// //       id: 27,
// //       name: "Olivia Walker",
// //       designation: "Designer",
// //       department: "Marketing",
// //       seatStatus: "filled",
// //     },
// //     {
// //       id: 25,
// //       name: "Mason Lewis",
// //       designation: "Executive",
// //       department: "Sales",
// //       seatStatus: "filled",
// //     },
// //     {
// //       id: 29,
// //       name: "James Hall",
// //       designation: "Analyst",
// //       department: "Finance",
// //       seatStatus: "filled",
// //     },
// //   ];

// //   // Generate seats with employee details and positions dynamically
// //   const seats1 = employees1.map((employee, index) => ({
// //     ...employee, // Spread operator to include employee details
// //     x: (index % 10) * 120 + 10,
// //     y: Math.floor(index / 10) * 120 + 10,
// //   }));

// //   const seats2 = employees2.map((employee, index) => ({
// //     ...employee, // Spread operator to include employee details
// //     x: (index % 10) * 120 + 10,
// //     y: Math.floor(index / 10) * 120 + 10,
// //   }));

// //   const seats3 = employees3.map((employee, index) => ({
// //     ...employee, // Spread operator to include employee details
// //     x: (index % 10) * 120 + 10,
// //     y: Math.floor(index / 10) * 120 + 10,
// //   }));

// //   const seats4 = employees4.map((employee, index) => ({
// //     ...employee, // Spread operator to include employee details
// //     x: (index % 10) * 120 + 10,
// //     y: Math.floor(index / 10) * 120 + 10,
// //   }));

// //   const [anchorEl, setAnchorEl] = useState(null);

// //   const handleClick = (event: any) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const navigate = useNavigate();

// //   const handleClose2 = () => {
// //      navigate("/customize")
// //   };

// //   const seats = Array.from({ length: 100 }, (_, index) => ({
// //     id: index + 1,
// //     x: 100 + (index % 10) * 60, // 10 seats per row, spaced by 60px
// //     y: 50 + Math.floor(index / 10) * 60, // Move to the next row every 10 seats
// //   }));

// //   return (
// //     <>
// //       <AppBar position="fixed" sx={{ backgroundColor: "#e24c4c" }}>
// //         <Container maxWidth="xl">
// //           <Toolbar disableGutters>
// //             <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
// //             <Typography
// //               variant="h6"
// //               noWrap
// //               component="a"
// //               href="#app-bar-with-responsive-menu"
// //               sx={{
// //                 mr: 2,
// //                 display: { xs: "none", md: "flex" },
// //                 fontFamily: "monospace",
// //                 fontWeight: 700,
// //                 letterSpacing: ".3rem",
// //                 color: "inherit",
// //                 textDecoration: "none",
// //               }}
// //             >
// //               Mapping
// //             </Typography>
// //         {/* Dropdown Button */}
// //         <Button color="inherit" onClick={handleClick}>
// //           Admin
// //         </Button>

// //         {/* Dropdown Menu */}
// //         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose2}>
// //           <MenuItem onClick={handleClose2}>Add place</MenuItem>
// //           <MenuItem onClick={handleClose2}>Remove place</MenuItem>
// //           <MenuItem onClick={handleClose2}>Customize</MenuItem>
// //         </Menu>

// //             <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
// //             <Typography
// //               variant="h5"
// //               noWrap
// //               component="a"
// //               href="#app-bar-with-responsive-menu"
// //               sx={{
// //                 mr: 2,
// //                 display: { xs: "flex", md: "none" },
// //                 flexGrow: 1,
// //                 fontFamily: "monospace",
// //                 fontWeight: 700,
// //                 letterSpacing: ".3rem",
// //                 color: "inherit",
// //                 textDecoration: "none",
// //               }}
// //             >
// //               LOGO
// //             </Typography>
// //             <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
// //               {pages.map((page) => (
// //                 <Button
// //                   key={page}
// //                   onClick={handleCloseNavMenu}
// //                   sx={{ my: 2, color: "white", display: "block" }}
// //                 >
// //                   {page}
// //                 </Button>
// //               ))}
// //             </Box>
// //             <Box sx={{ flexGrow: 0 }}>
// //               <Tooltip title="Open settings">
// //                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
// //                   <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
// //                 </IconButton>
// //               </Tooltip>
// //               <Menu
// //                 sx={{ mt: "45px" }}
// //                 id="menu-appbar"
// //                 anchorEl={anchorElUser}
// //                 anchorOrigin={{
// //                   vertical: "top",
// //                   horizontal: "right",
// //                 }}
// //                 keepMounted
// //                 transformOrigin={{
// //                   vertical: "top",
// //                   horizontal: "right",
// //                 }}
// //                 open={Boolean(anchorElUser)}
// //                 onClose={handleCloseUserMenu}
// //               >
// //                 {settings.map((setting) => (
// //                   <MenuItem key={setting} onClick={handleCloseUserMenu}>
// //                     <Typography sx={{ textAlign: "center" }}>
// //                       {setting}
// //                     </Typography>
// //                   </MenuItem>
// //                 ))}
// //               </Menu>
// //             </Box>
// //           </Toolbar>
// //         </Container>
// //       </AppBar>

// //       <Stage width={window.innerWidth} height={window.innerHeight}>
// //       <Layer>
// //         {/* Draggable Rectangle */}
// //         <Rect
// //           x={100}
// //           y={100}
// //           width={100}
// //           height={100}
// //           fill="blue"
// //           draggable
// //         />

// //         {/* Draggable Circle */}
// //         <Circle
// //           x={300}
// //           y={200}
// //           radius={50}
// //           fill="red"
// //           draggable
// //         />
// //       </Layer>
// //     </Stage>
// //       <div
// //         style={{ margin: "20px", border: "2px solid black", padding: "20px" }}
// //       >
// //            <div className="d-flex justify-content-center" ><p style={{ fontSize: "50px" }}><b>Entrance</b></p></div>
// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             flexWrap: "wrap",
// //             gap: "20px",
// //           }}
// //         >

// //           <div
// //             style={{ display: "flex", flexDirection: "column", gap: "20px" }}
// //           >

// //             <Stage width={700} height={130}>
// //               <Layer>
// //                 {seats1.map((seat) => (
// //                   <Seat
// //                     key={seat.id}
// //                     x={seat.x}
// //                     y={seat.y}
// //                     isSelected={selectedSeats.includes(seat.id)}
// //                     seatStatus={seat.seatStatus}
// //                     onClick={() => {
// //                       toggleSeat(seat.id);
// //                       setOpen(true);
// //                       setSelectedEmployee(seat);
// //                     }}
// //                     onHover={(e) => e.target.stroke("red")}
// //                   />
// //                 ))}
// //               </Layer>
// //             </Stage>

// //             <Stage width={700} height={130}>
// //               <Layer>
// //                 {seats2.map((seat) => (
// //                   <Seat
// //                     key={seat.id}
// //                     x={seat.x}
// //                     y={seat.y}
// //                     isSelected={selectedSeats.includes(seat.id)}
// //                     seatStatus={seat.seatStatus}
// //                     onClick={() => {
// //                       toggleSeat(seat.id);
// //                       setOpen(true);
// //                       setSelectedEmployee(seat);
// //                     }}
// //                     onHover={(e) => e.target.stroke("red")}
// //                   />
// //                 ))}
// //               </Layer>
// //             </Stage>

// //             <Stage width={700} height={130}>
// //               <Layer>
// //                 {seats1.map((seat) => (
// //                   <Seat
// //                     key={seat.id}
// //                     x={seat.x}
// //                     y={seat.y}
// //                     isSelected={selectedSeats.includes(seat.id)}
// //                     seatStatus={seat.seatStatus}
// //                     onClick={() => {
// //                       toggleSeat(seat.id);
// //                       setOpen(true);
// //                       setSelectedEmployee(seat);
// //                     }}
// //                     onHover={(e) => e.target.stroke("red")}
// //                   />
// //                 ))}
// //               </Layer>
// //             </Stage>

// //           </div>

// //           <div
// //             style={{ display: "flex", flexDirection: "column", gap: "20px" }}
// //           >
// //             <Stage width={700} height={130}>
// //               <Layer>
// //                 {seats3.map((seat) => (
// //                   <Seat
// //                     key={seat.id}
// //                     x={seat.x}
// //                     y={seat.y}
// //                     isSelected={selectedSeats.includes(seat.id)}
// //                     seatStatus={seat.seatStatus}
// //                     onClick={() => {
// //                       toggleSeat(seat.id);
// //                       setOpen(true);
// //                       setSelectedEmployee(seat);
// //                     }}
// //                     onHover={(e) => e.target.stroke("red")}
// //                   />
// //                 ))}
// //               </Layer>
// //             </Stage>

// //             <Stage width={700} height={130}>
// //               <Layer>
// //                 {seats4.map((seat) => (
// //                   <Seat
// //                     key={seat.id}
// //                     x={seat.x}
// //                     y={seat.y}
// //                     isSelected={selectedSeats.includes(seat.id)}
// //                     seatStatus={seat.seatStatus}
// //                     onClick={() => {
// //                       toggleSeat(seat.id);
// //                       setOpen(true);
// //                       setSelectedEmployee(seat);
// //                     }}
// //                     onHover={(e) => e.target.stroke("red")}
// //                   />
// //                 ))}
// //               </Layer>
// //             </Stage>

// //             <Stage width={700} height={130}>
// //               <Layer>
// //                 {seats3.map((seat) => (
// //                   <Seat
// //                     key={seat.id}
// //                     x={seat.x}
// //                     y={seat.y}
// //                     isSelected={selectedSeats.includes(seat.id)}
// //                     seatStatus={seat.seatStatus}
// //                     onClick={() => {
// //                       toggleSeat(seat.id);
// //                       setOpen(true);
// //                       setSelectedEmployee(seat);
// //                     }}
// //                     onHover={(e) => e.target.stroke("red")}
// //                   />
// //                 ))}
// //               </Layer>
// //             </Stage>

// //           </div>
// //         </div>

// //         <Modal open={open} onClose={handleClose}>
// //           <Box
// //             sx={{
// //               position: "absolute",
// //               top: "50%",
// //               left: "50%",
// //               transform: "translate(-50%, -50%)",
// //               width: 400,
// //               bgcolor: "background.paper",
// //               boxShadow: 24,
// //               p: 4,
// //               borderRadius: 2,
// //             }}
// //           >
// //             <Typography variant="h6">Employee Details</Typography>
// //             <p> Employee name : {selectedEmployees?.name}</p>
// //             <p> designation   : {selectedEmployees?.designation}</p>
// //             <p> Department    : {selectedEmployees?.department}</p>

// //             <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
// //               Close
// //             </Button>
// //           </Box>
// //         </Modal>
// //       </div>
// //     </>
// //   );
// // };

// // export default SeatLayout;

// import React, { useState, useEffect, useRef } from "react";
// import { Stage, Layer, Rect, Text } from "react-konva";

// const OfficeLayout: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

//   // Resize the canvas when the window resizes
//   useEffect(() => {
//     const handleResize = () => {
//       setDimensions({ 
//         width: window.innerWidth, 
//         height: window.innerHeight 
//       });
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Big Box Dimensions
//   const bigBoxX = 100;
//   const bigBoxY = 100;
//   const bigBoxWidth = 1000;
//   const bigBoxHeight = 800;


//   const rows = 10;
// const cols = 5;
// const boxWidth = 85;
// const boxHeight = 50;
// const xOffset = 20;
// const yOffset = 80;
// const xGap = 90; // Horizontal spacing
// const yGap = 60; // Vertical spacing

// const extraRows = 6;
// const extraCols = 4;
// const extraXOffset = 600;
// const extraYOffset = 260;

// const grid = Array.from({ length: rows }, (_, row) =>
//   Array.from({ length: cols }, (_, col) => ({
//     x: bigBoxX + xOffset + col * xGap,
//     y: bigBoxY + yOffset + row * yGap,
//     fill: row === 0 && col === cols - 1 ? "#f57d7d" : "#90EE90",
//   }))
// );

// const extraGrid = Array.from({ length: extraRows }, (_, row) =>
//   Array.from({ length: extraCols }, (_, col) => ({
//     x: bigBoxX + extraXOffset + col * xGap,
//     y: bigBoxY + extraYOffset + row * yGap,
//     fill: "#90EE90",
//   }))
// );

//   return (
//     <div 
//       ref={containerRef} 
//       style={{ 
//         width: "100vw", 
//         height: "100vh", 
//         overflow: "auto", // Enable scrolling
//         border: "2px solid black" 
//       }}
//     >
//       <Stage 
//         width={dimensions.width} 
//         height={dimensions.height} 
//         draggable // Enable panning
//       >
//         <Layer>
//           {/* Big Box */}
//           <Rect
//             x={bigBoxX}
//             y={bigBoxY}
//             width={bigBoxWidth}
//             height={bigBoxHeight}
//             fill="#ddd"
//             stroke="black"
//             strokeWidth={2}
//           />
//           {/* <Text x={bigBoxX + 400} y={bigBoxY - 20} text="Big Box" fontSize={18} fill="black" /> */}
           

//           <Rect x={bigBoxX + 1000} y={bigBoxY + 150} width={100} height={30} fill="grey"    rotation ={90} />
//           <Text
//             x={bigBoxX + 990} // Adjust X to center text
//             y={bigBoxY + 160 } // Adjust Y to center text
//             text="Entrance"
//             fontSize={18}
//             fill="white"
//             rotation ={90}
//          // Rotates text to match the rectangle
//           />

//           <Rect x={bigBoxX + 1000} y={bigBoxY + 0} width={60} height={400} fill="#FFA07A"    rotation ={90} />     
//           <Text
//           x={bigBoxX + 920} // Adjust X to center text
//           y={bigBoxY + 10 } // Adjust Y to center text
//           text="Manager"
//           fontSize={18}
//           fill="white"
//          // Rotates text to match the rectangle
//          />
//           <Text
//           x={bigBoxX + 920} // Adjust X to center text
//           y={bigBoxY + 30 } // Adjust Y to center text
//           text="Room 1"
//           fontSize={18}
//           fill="white"
//            // Rotates text to match the rectangle
//         />
        

//         <Rect x={bigBoxX + 1000} y={bigBoxY + 60} width={60} height={400} fill="#ADD8E6"    rotation ={90} />
//         <Text
//           x={bigBoxX + 920} // Adjust X to center text
//           y={bigBoxY + 80 } // Adjust Y to center text
//           text="pantry"
//           fontSize={18}
//           fill="black"
//          // Rotates text to match the rectangle
//         />
  

//         <Rect x={bigBoxX + 1000} y={bigBoxY + 120} width={30} height={400} fill="#FFFFE0"   rotation ={90} />
//         <Text
//           x={bigBoxX + 920} // Adjust X to center text
//           y={bigBoxY + 130 } // Adjust Y to center text
//           text="server"
//           fontSize={18}
//           fill="black"
//          // Rotates text to match the rectangle
//         />

//        <Rect x={bigBoxX + 500} y={bigBoxY + 0} width={100} height={60} fill="#FFFFE0" />
//        <Text
//           x={bigBoxX + 520} // Adjust X to center text
//           y={bigBoxY + 10 } // Adjust Y to center text
//           text="manager"
//           fontSize={18}
//           fill="black"
//          // Rotates text to match the rectangle
//         />
//          <Text
//           x={bigBoxX + 520} // Adjust X to center text
//           y={bigBoxY + 30 } // Adjust Y to center text
//           text="Room2"
//           fontSize={18}
//           fill="black"
//          // Rotates text to match the rectangle
//         />

//         <Rect x={bigBoxX + 0} y={bigBoxY + 0} width={500} height={60} fill="#ADD8E6"  />
//         <Text
//           x={bigBoxX + 100} // Adjust X to center text
//           y={bigBoxY + 25 } // Adjust Y to center text
//           text="Conference Room"
//           fontSize={18}
//           fill="black"
//          // Rotates text to match the rectangle
//         />
        
//           <>
//     {grid.flat().map((rect, index) => (
//       <Rect key={index} {...rect} width={boxWidth} height={boxHeight} draggable />
//     ))}

//     {extraGrid.flat().map((rect, index) => (
//       <Rect key={`extra-${index}`} {...rect} width={boxWidth} height={boxHeight} draggable />
//     ))}
//   </>
//           {/* Example Small Rectangles Inside */}
//           {/* <Rect x={bigBoxX + 20} y={bigBoxY + 80} width={85} height={50} fill="white" stroke="#90EE90" draggable />
//           <Rect x={bigBoxX + 110} y={bigBoxY + 80} width={85} height={50} fill="white" stroke="#90EE90" draggable />
//           <Rect x={bigBoxX + 200} y={bigBoxY + 80} width={85} height={50} fill="white" stroke="#90EE90" draggable />
//           <Rect x={bigBoxX + 290} y={bigBoxY + 80} width={85} height={50} fill="white" stroke="#90EE90" draggable />
//           <Rect x={bigBoxX + 380} y={bigBoxY + 80} width={85} height={50} fill="white" stroke="#f57d7d" draggable />

//           <Rect x={bigBoxX + 20} y={bigBoxY + 140} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 110} y={bigBoxY + 140} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 200} y={bigBoxY + 140} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 290} y={bigBoxY + 140} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 380} y={bigBoxY + 140} width={85} height={50} fill="#90EE90" draggable />


//           <Rect x={bigBoxX + 20} y={bigBoxY + 200} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 110} y={bigBoxY + 200} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 200} y={bigBoxY + 200} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 290} y={bigBoxY + 200} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 380} y={bigBoxY + 200} width={85} height={50} fill="#90EE90" draggable />

//           <Rect x={bigBoxX + 20} y={bigBoxY + 260} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 110} y={bigBoxY + 260} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 200} y={bigBoxY + 260} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 290} y={bigBoxY + 260} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 380} y={bigBoxY + 260} width={85} height={50} fill="#90EE90" draggable />


//           <Rect x={bigBoxX + 20} y={bigBoxY + 320} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 110} y={bigBoxY + 320} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 200} y={bigBoxY + 320} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 290} y={bigBoxY + 320} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 380} y={bigBoxY + 320} width={85} height={50} fill="#90EE90" draggable />


//           <Rect x={bigBoxX + 20} y={bigBoxY + 380} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 110} y={bigBoxY + 380} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 200} y={bigBoxY + 380} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 290} y={bigBoxY + 380} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 380} y={bigBoxY + 380} width={85} height={50} fill="#90EE90" draggable />


//           <Rect x={bigBoxX + 20} y={bigBoxY + 440} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 110} y={bigBoxY + 440} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 200} y={bigBoxY + 440} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 290} y={bigBoxY + 440} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 380} y={bigBoxY + 440} width={85} height={50} fill="#90EE90" draggable />

//           <Rect x={bigBoxX + 20} y={bigBoxY + 500} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 110} y={bigBoxY + 500} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 200} y={bigBoxY + 500} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 290} y={bigBoxY + 500} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 380} y={bigBoxY + 500} width={85} height={50} fill="#90EE90" draggable />

//           <Rect x={bigBoxX + 20} y={bigBoxY + 560} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 110} y={bigBoxY + 560} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 200} y={bigBoxY + 560} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 290} y={bigBoxY + 560} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 380} y={bigBoxY + 560} width={85} height={50} fill="#90EE90" draggable />

//           <Rect x={bigBoxX + 600} y={bigBoxY + 260} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 690} y={bigBoxY + 260} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 780} y={bigBoxY + 260} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 870} y={bigBoxY + 260} width={85} height={50} fill="#90EE90" draggable />

//           <Rect x={bigBoxX + 600} y={bigBoxY + 320} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 690} y={bigBoxY + 320} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 780} y={bigBoxY + 320} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 870} y={bigBoxY + 320} width={85} height={50} fill="#90EE90" draggable />

//           <Rect x={bigBoxX + 600} y={bigBoxY + 380} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 690} y={bigBoxY + 380} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 780} y={bigBoxY + 380} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 870} y={bigBoxY + 380} width={85} height={50} fill="#90EE90" draggable />

//           <Rect x={bigBoxX + 600} y={bigBoxY + 440} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 690} y={bigBoxY + 440} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 780} y={bigBoxY + 440} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 870} y={bigBoxY + 440} width={85} height={50} fill="#90EE90" draggable />

//           <Rect x={bigBoxX + 600} y={bigBoxY + 500} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 690} y={bigBoxY + 500} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 780} y={bigBoxY + 500} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 870} y={bigBoxY + 500} width={85} height={50} fill="#90EE90" draggable />

//           <Rect x={bigBoxX + 600} y={bigBoxY + 560} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 690} y={bigBoxY + 560} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 780} y={bigBoxY + 560} width={85} height={50} fill="#90EE90" draggable />
//           <Rect x={bigBoxX + 870} y={bigBoxY + 560} width={85} height={50} fill="#90EE90" draggable /> */}


//         </Layer>
//       </Stage>
//     </div>
//   );
// };

// export default OfficeLayout;



import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

// Define type for rectangle shape
interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

const DrawRectangles: React.FC = () => {
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [newRect, setNewRect] = useState<Rectangle | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const handleMouseDown = (e: any) => {
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();

    if (!pointer) return;

    setNewRect({
      x: pointer.x,
      y: pointer.y,
      width: 0,
      height: 0,
    });

    setIsDrawing(true);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing || !newRect) return;

    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();

    if (!pointer) return;

    setNewRect((prev) =>
      prev
        ? {
            ...prev,
            width: pointer.x - prev.x,
            height: pointer.y - prev.y,
          }
        : null
    );
  };

  const handleMouseUp = () => {
    if (!isDrawing || !newRect) return;

    setRectangles((prev) => [...prev, newRect]);
    setNewRect(null);
    setIsDrawing(false);
  };

  return (
    <Stage
      width={800}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {rectangles.map((rect, i) => (
          <Rect key={i} {...rect} fill="gray" stroke="black" strokeWidth={2} 
           onClick = {() => alert("we won")}/>
        ))}

        {newRect && <Rect {...newRect} fill="gray" opacity={0.5} />}
      </Layer>
    </Stage>
  );
};

export default DrawRectangles;
