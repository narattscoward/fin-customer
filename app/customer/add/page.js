"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper,
} from "@mui/material";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// ✅ Get today in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

export default function AddCustomer() {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: today,   // ✅ prefill with today
    memberNumber: "",
    interests: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.dateOfBirth || !form.memberNumber) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Something went wrong");
        return;
      }

      setError("");
      router.push("/customer"); // ✅ back to list
    } catch {
      setError("Network error, please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          ➕ Add New Customer
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <TextField
            label="Full Name"
            name="name"
            required
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
          />

          {/* Date of Birth (defaults to today) */}
          <TextField
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.dateOfBirth}
            onChange={handleChange}
          />

          {/* Member Number */}
          <TextField
            label="Member Number"
            name="memberNumber"
            type="number"
            required
            fullWidth
            margin="normal"
            value={form.memberNumber}
            onChange={handleChange}
          />

          {/* Interests */}
          <TextField
            label="Interests"
            name="interests"
            fullWidth
            margin="normal"
            value={form.interests}
            onChange={handleChange}
          />

          {/* Buttons */}
          <Box mt={3} display="flex" gap={2}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Save
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => router.push("/customer")}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}