import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "12345";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
  if (!username || !password) {
    setError("Semua field harus diisi");
    return;
  }

  if (
    username.trim() === ADMIN_USERNAME &&
    password.trim() === ADMIN_PASSWORD
  ) {
    // RESET BIAR SNACKBAR PASTI MUNCUL LAGI
    sessionStorage.removeItem("adminWelcomed");

    // simpan role
    localStorage.setItem("role", "admin");

    // redirect
    navigate("/home");
  } else {
    setError("Username atau password salah");
  }
};

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", bgcolor: "#ffffff" }}>
      
      
      <Box
        sx={{
          flex: 1.2, 
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 4, md: 10, lg: 15 },
          zIndex: 1, 
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: "100%", maxWidth: "400px" }}
        >
         <Typography variant="h5" color="#D989A6" fontWeight="bold" mb={1}>
          Secure Access
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          Silakan masukkan kredensial admin Anda.
        </Typography>
        <Typography variant="h3" fontWeight="bold" mb={4}>
          Login Internal
        </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" fontWeight={600}>Username</Typography>
            <TextField
              fullWidth
              placeholder="Username admin"
              sx={{ 
                mb: 2, 
                "& .MuiOutlinedInput-root": { 
                  bgcolor: "#cfe8e8", 
                  borderRadius: 3, 
                  "& fieldset": { border: "none" } 
                } 
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Typography variant="body2" fontWeight={600}>Password</Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              fullWidth
              placeholder="••••••••"
              sx={{ 
                mb: 4, 
                "& .MuiOutlinedInput-root": { 
                  bgcolor: "#cfe8e8", 
                  borderRadius: 3, 
                  "& fieldset": { border: "none" } 
                } 
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variant="contained"
              sx={{
                py: 1.2,
                px: 5,
                borderRadius: "50px",
                fontWeight: "bold",
                background: "#D989A6",
                textTransform: "none",
                width: "fit-content",
                minWidth: "160px",
                alignSelf: "center",
                "&:hover": { background: "#dbabbd" },
              }}
              onClick={handleLogin}
            >
              LOGIN →
            </Button>

            <Button
              variant="text"
              sx={{ mt: 2, color: "text.secondary", textTransform: "none", alignSelf: "center" }}
              onClick={() => navigate("/")}
            >
              Kembali
            </Button>
          </Box>
        </motion.div>
      </Box>

      {/* --- SISI KANAN (BIRU DENGAN GAMBAR MENYEBERANG) --- */}
      <Box 
        sx={{ 
          flex: 1, 
          bgcolor: "#cfe8e8", 
          display: { xs: "none", md: "flex" },
          borderTopLeftRadius: "80px", 
          borderBottomLeftRadius: "80px",
          position: "relative", // Penting untuk posisi absolut gambar
          alignItems: "center",
          justifyContent: "center",
        }}
      >
    <motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  style={{ 
    position: "absolute", 
    left: "-90%", 
    width: "200%", 
    zIndex: 10, 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none" 
  }}
>
  <img
    src="/download (1)_transparent.png"
    alt="3D Illustration"
    style={{
      width: "100%",
      height: "auto",
      maxWidth: "none",
      filter: "drop-shadow(-30px 40px 50px rgba(0,0,0,0.2))",
    }}
  />
</motion.div>
      </Box>

    </Box>
  );
};

export default Login;