import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const addItem = () => {
    if (newItem.trim() === "") return;
    const newItemObj = { id: Date.now(), name: newItem };
    setItems([...items, newItemObj]);
    setNewItem("");
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <Container maxWidth="xs">
      <Box 
        sx={{ 
          textAlign: "center", 
          p: 3, 
          borderRadius: 2, 
          boxShadow: 3, 
          backgroundColor: "#f9f9f9", 
          mt: 5 // Adds some margin at the top
        }}
      >
        <Typography variant="h4" sx={{ color: "#333", mb: 2 }}>
          Welcome {user}
        </Typography>
        <TextField
          label="New Item"
          fullWidth
          margin="normal"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          variant="outlined"
          sx={{ backgroundColor:  "white" }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={addItem}
          sx={{ mt: 2, borderRadius: "8px", textTransform: "none" }}
        >
          Add Item
        </Button>
        <List sx={{ mt: 2 }}>
          {items.map((item) => (
            <ListItem key={item.id} secondaryAction={
              <IconButton edge="end" color="error" onClick={() => deleteItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={item.name} sx={{ color: "black" }} />
            </ListItem>
          ))}
        </List>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth 
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            navigate("/login");
          }}
          sx={{ mt: 2, borderRadius: "10px", textTransform: "none" }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
