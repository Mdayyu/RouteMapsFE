import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Divider,
  Button,
  Stack,
  Checkbox,
  TextField,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";




interface SidebarProps {
  open: boolean;
  onClose: () => void;
}





export function Sidebar({ open, onClose }: SidebarProps){
  const API = import.meta.env.VITE_API_URL;
  const [parameters, setParameters] = useState({
  ALPHA: 3,
  BETA: 4,
  EVAPORATION: 0.5,
  QA: 100,
  NUM_ANTS: 10,
  NUM_ITERATIONS: 100,
});
  const [vehicle, setVehicle] = useState<"mobil" | "sepeda">("mobil");
  const [openCampus, setOpenCampus] = useState(false);
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);
  const [returnToStart, setReturnToStart] = useState(false);
  const navigate = useNavigate();
  const [campuses, setCampuses] = useState<{ key: string; lat: number; lon: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));  
  const [openParameterDialog, setOpenParameterDialog] = useState(false);
  const [tempParams, setTempParams] = useState(parameters);
  

useEffect(() => {
  fetch(`${API}/campuses`)
    .then((res) => res.json())
    .then((data) => setCampuses(data))
    .catch((err) => console.error(err));
}, [API]);

const handleCariRute = async () => {
  if (selectedCampuses.length === 0) {
    alert("Pilih minimal satu kampus tujuan");
    return;
  }

  setLoading(true);

  setTimeout(() => {
    const payload = {
      campuses: selectedCampuses,
      vehicle,
      returnToStart,
      ...parameters, //  parameter terbaru
    };

    console.log("🚀 DATA DIKIRIM:", payload); // DEBUG

    navigate("/route", {
      state: payload,
    });

    setLoading(false);
  }, 800);
};

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const showSnackbar = (message: string) => {
    setSnackbar({ open: true, message });
  };

  const toggleCampus = (campus: string) => {
    if (selectedCampuses.includes(campus)) {
      setSelectedCampuses(
        selectedCampuses.filter((c) => c !== campus)
      );
    } else {
      setSelectedCampuses([...selectedCampuses, campus]);
    }
  };

  const isChanged =
  JSON.stringify(tempParams) !== JSON.stringify(parameters);

  const removeCampus = (campus: string) => {
  setSelectedCampuses(
    selectedCampuses.filter((c) => c !== campus)
  );

  showSnackbar(`${campus} berhasil dihapus`);
};

 const handleReset = () => {
  setLoading(true);

  setTimeout(() => {
    setSelectedCampuses([]);
    setVehicle("mobil");
    setReturnToStart(false);
    setOpenCampus(false);
    setLoading(false);

    showSnackbar("Data berhasil direset");
  }, 800);
};



  return (
    <>

    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="success" variant="filled">
        {snackbar.message}
      </Alert>
    </Snackbar>
        <Drawer
          variant={isTablet ? "temporary" : isMobile ? "temporary": "persistent"}
          anchor="left"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: isMobile ? "100%" : 400,
              height: "100%",
              bgcolor: "#cfe8e8",
              overflowY: "auto",
            },
          }}
        >

      

        {/* LOGO */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent={isMobile ? "space-between" : "center"}
          px={2}
          mb={2}
          mt={2}
        >
          {isMobile && (
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}

          <Box
            component="img"
            src="/nameWeb.png"
            alt="Logo"
            sx={{ height: 60 }}
          />

          {/* Spacer agar logo tetap tengah saat mobile */}
          {isMobile && <Box sx={{ width: 40 }} />}
        </Box>


        <Box sx={{ p: 2 }}>
          {/* Header */}
         <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography fontWeight="bold">
              Daftar Tujuan Kunjungan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pilih kampus yang akan dikunjungi
            </Typography>
          </Box>
            <Tooltip title="Pengaturan Parameter">
                <IconButton
                  onClick={() => {
                    setTempParams(parameters); 
                    setOpenParameterDialog(true)}
                  }
                  sx={{
                    bgcolor: "white",
                    boxShadow: 2,
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                    },
                  }}
                >
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
        </Stack>

          <Divider sx={{ my: 2 }} />

        {/* TUJUAN KAMPUS */}
        <Typography fontWeight="bold" mb={1}>
          Tujuan Kampus
        </Typography>

        <Box sx={{ position: "relative" }}>
          {/* Button dropdown */}
          <Button
            variant="outlined"
            fullWidth
            size="small"
            onClick={() => setOpenCampus(!openCampus)}
            endIcon={openCampus ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{
              justifyContent: "space-between",
              outline: "none",
              "&:focus": {
                outline: "none",
              },
            }}
          >
            Pilih Tujuan Kampus
          </Button>

          {/* Popup dropdown */}
        {openCampus && (
          <ClickAwayListener onClickAway={() => setOpenCampus(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "110%",
                left: 0,
                width: "100%",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 3,
                zIndex: 10,
                p: 1,

                /* ukuran & scroll */
                maxHeight: 200,
                overflowY: "auto",

                /* scroll styling */
                "&::-webkit-scrollbar": {
                  width: 6,
                },
                "&::-webkit-scrollbar-thumb": {
                  bgcolor: "#c1c1c1",
                  borderRadius: 3,
                },
              }}
            >
              {campuses.map((campus) => (
          <Stack
            key={campus.key}
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              px: 1,
              py: 0.5,
              cursor: "pointer",
              borderRadius: 1,
              transition: "0.2s",
              "&:hover": {
                bgcolor: "#f5f5f5",
              },
            }}
            onClick={() => toggleCampus(campus.key)}
          >
            <Checkbox size="small" checked={selectedCampuses.includes(campus.key)} />
            <Typography variant="body2">{campus.key}</Typography>
          </Stack>
        ))}

            </Box>
          </ClickAwayListener>
        )}

        </Box>

        {/* Selected campus */}
        <Stack spacing={1} mt={2}>
          {selectedCampuses.map((campus) => (
            <Stack
              key={campus}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <TextField
                size="small"
                fullWidth
                value={campus}
                disabled
              />
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={() => removeCampus(campus)}
                sx={{
                    outline: "none",
                    "&:focus": {
                      outline: "none",
                    },
                  }}
              >
                Hapus
              </Button>
            </Stack>
          ))}
        </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Kendaraan */}
          <Typography fontWeight="bold" mb={1}>
            Jenis Kendaraan
          </Typography>

          <Stack direction="row" spacing={2} mb={2}>
            <IconButton
              onClick={() => setVehicle("mobil")}
              sx={{
                bgcolor: vehicle === "mobil" ? "primary.main" : "white",
                color: vehicle === "mobil" ? "white" : "black",
                 outline: "none",
                "&:focus": {
                  outline: "none",
                },
              }}
            >
              <DirectionsCarIcon />
            </IconButton>

            <IconButton
              onClick={() => setVehicle("sepeda")}
              sx={{
                bgcolor: vehicle === "sepeda" ? "primary.main" : "white",
                color: vehicle === "sepeda" ? "white" : "black",
                outline: "none",
                "&:focus": { outline: "none" },
              }}
            >
              <DirectionsBikeIcon />
            </IconButton>
          </Stack>

        <Stack direction="row" alignItems="center" sx={{ mt: 5 }} >
          <Checkbox
            size="small"
            checked={returnToStart}
            onChange={(e) => setReturnToStart(e.target.checked)}
          />
          <Typography variant="body2">
            Sertakan rute kembali ke titik awal
          </Typography>
        </Stack>

          <Divider sx={{ my: 2 }} />
        <Dialog
          open={openParameterDialog}
          onClose={() => setOpenParameterDialog(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: 4,
              p: 1,
            },
          }}
        >
    <DialogTitle
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    pr: 1,
  }}
>
  {/* KIRI: Title + Deskripsi */}
  <Box>
    <Typography
      sx={{
        fontWeight: "bold",
        fontSize: "1.3rem",
      }}
    >
      Pengaturan Optimasi
    </Typography>

    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: "block", mt: 0.5 }}
    >
      Ubah parameter untuk optimasi rute (default sudah optimal)
    </Typography>
  </Box>

  {/* KANAN: Tombol Close */}
  <IconButton
    onClick={() => setOpenParameterDialog(false)}
    sx={{
      color: "grey.600",
      "&:hover": {
        color: "black",
      },
    }}
  >
    <CloseIcon />
  </IconButton>
</DialogTitle>

          {/* CONTENT */}
          <DialogContent
            dividers
            sx={{
              maxHeight: "60vh",
              overflowY: "auto",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
           

            {/* ALPHA */}
            <Box sx={{ p: 2, borderRadius: 3, bgcolor: "#f9f9f9", mb: 2 }}>
              <Typography fontWeight={600}>Pengaruh Jejak Semut</Typography>
              <TextField
                type="number"
                value={tempParams.ALPHA}
                onChange={(e) =>
                  setTempParams({
                    ...tempParams,
                    ALPHA: parseFloat(e.target.value),
                  })
                }
                fullWidth
                size="small"
                sx={{ mt: 1 }}
                inputProps={{ inputMode: "decimal" }}
              />
            </Box>

            {/* BETA */}
            <Box sx={{ p: 2, borderRadius: 3, bgcolor: "#f9f9f9", mb: 2 }}>
              <Typography fontWeight={600}>Pengaruh Jarak</Typography>
              <TextField
                type="number"
                value={tempParams.BETA}
                onChange={(e) =>
                  setTempParams({
                    ...tempParams,
                    BETA: parseFloat(e.target.value) || 0,
                  })
                }
                fullWidth
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>

            {/* EVAPORATION */}
            <Box sx={{ p: 2, borderRadius: 3, bgcolor: "#f9f9f9", mb: 2 }}>
              <Typography fontWeight={600}>Penguapan Jejak</Typography>
              <TextField
                type="number"
                value={tempParams.EVAPORATION}
                onChange={(e) =>
                  setTempParams({
                    ...tempParams,
                    EVAPORATION: parseFloat(e.target.value) || 0,
                  })
                }
                fullWidth
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>

            {/* Q */}
            <Box sx={{ p: 2, borderRadius: 3, bgcolor: "#f9f9f9", mb: 2 }}>
              <Typography fontWeight={600}>Intensitas Jejak (Q)</Typography>
              <TextField
                type="number"
                value={tempParams.QA}
                onChange={(e) =>
                  setTempParams({
                    ...tempParams,
                    QA: parseFloat(e.target.value) || 0,
                  })
                }
                fullWidth
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>

            {/* NUM ANTS */}
            <Box sx={{ p: 2, borderRadius: 3, bgcolor: "#f9f9f9", mb: 2 }}>
              <Typography fontWeight={600}>Jumlah Semut</Typography>
              <TextField
                type="number"
                value={tempParams.NUM_ANTS}
                onChange={(e) =>
                  setTempParams({
                    ...tempParams,
                    NUM_ANTS: parseInt(e.target.value) || 0,
                  })
                }
                fullWidth
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>

            {/* ITERATIONS */}
            <Box sx={{ p: 2, borderRadius: 3, bgcolor: "#f9f9f9", mb: 2 }}>
              <Typography fontWeight={600}>Jumlah Iterasi</Typography>
              <TextField
                type="number"
                value={tempParams.NUM_ITERATIONS}
                onChange={(e) =>
                  setTempParams({
                    ...tempParams,
                    NUM_ITERATIONS: parseInt(e.target.value) || 0,
                  })
                }
                fullWidth
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>

          
          </DialogContent>

          {/* FOOTER */}
          <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
            <Button
              variant="outlined"
              fullWidth
              disabled={!isChanged}
              onClick={() => {
                setTempParams({
                  ALPHA: 3,
                  BETA: 4,
                  EVAPORATION: 0.5,
                  QA: 100,
                  NUM_ANTS: 10,
                  NUM_ITERATIONS: 100,
                });

                setOpenParameterDialog(false); // optional (kalau mau langsung tutup)
                showSnackbar("Parameter berhasil direset");
              }}
            >
              Batal
            </Button>

           <Button
              variant="contained"
              fullWidth
              disabled={!isChanged}
              onClick={() => {
                if (
                  tempParams.ALPHA <= 0 ||
                  tempParams.BETA <= 0 ||
                  tempParams.NUM_ANTS <= 0 ||
                  tempParams.NUM_ITERATIONS <= 0
                ) {
                  showSnackbar("Parameter tidak valid");
                  return;
                }

                setParameters(tempParams);
                setOpenParameterDialog(false);

                showSnackbar("Parameter berhasil disimpan");
              }}
              sx={{
                bgcolor: "#68a9cf", // bebas warna kamu
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#3a7181",
                },
              }}
            >
              Simpan
            </Button>
          </DialogActions>
        </Dialog>

        

          {/* Action */}
          <Stack direction="row" spacing={1}>
            <LoadingButton
                fullWidth
                variant="contained"
                onClick={handleCariRute}
                loading={loading}
                disabled={selectedCampuses.length === 0}
                sx={{
                  outline: "none",
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                Cari Rute
              </LoadingButton>
            <Button 
            fullWidth 
            variant="contained" 
            color="error" 
            onClick={handleReset} 
            disabled={selectedCampuses.length === 0}
            sx={{
                outline: "none",
                "&:focus": {
                  outline: "none",
                },
              }}
              >
              Reset
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}