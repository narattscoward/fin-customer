"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import {
  Container, Typography, Button, List, ListItem,
  ListItemText, IconButton, Box, Divider, Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const res = await fetch(`${API_BASE}/customer`);
    const data = await res.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/customer/${id}`, { method: "DELETE" });
    fetchCustomers();
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Customer Management
        </Typography>
        <Button
          component={NextLink}
          href="/customer/add"
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
        >
          ➕ Add Customer
        </Button>
        <Paper>
          <List>
            {customers.length === 0 && (
              <Typography variant="body1" sx={{ p: 2 }}>
                No customers found. Add one to get started.
              </Typography>
            )}
            {customers.map((c, idx) => (
              <Box key={c._id}>
                <ListItem
                  component={NextLink}
                  href={`/customer/${c._id}`}
                  sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                >
                  <ListItemText
                    primary={c.name}
                    secondary={`Member #${c.memberNumber}`}
                  />
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(c._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                {idx < customers.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}