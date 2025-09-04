import "./App.css";
import Button from "@mui/material/Button";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import TextField from "@mui/material/TextField";
import SnackBar from "./Components/SnackBar";
import Grow from "@mui/material/Grow";

import Card from "./Components/Card";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  function HideShowToast(Massage) {
    setShow(true);
    setShowMassage(Massage);
    setTimeout(() => {
      setShowMassage("");
      setShow(false);
    }, 2000);
  }
  const [Show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [ShowMassage, setShowMassage] = useState("");
  const API_KEY = process.env.REACT_APP_OPENWEATHER_KEY;

  const [inputfield, setinputfield] = useState("");

  async function fetchWeather(cityName) {
    // حماية: تأكد من وجود اسم
    if (!cityName || cityName.trim() === "") {
      HideShowToast("Please type the city name then click Enter");

      return;
    }

    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: cityName.trim(),
            appid: API_KEY,
            units: "metric",
            lang: "ar",
          },
        }
      );

      // هنا نحول شكل البيانات إلى كائن أبسط نستخدمه في العرض
      const data = response.data;
      const payload = {
        name: data.name,
        temp: Math.round(data.main?.temp),
        temp_min: Math.round(data.main?.temp_min),
        temp_max: Math.round(data.main?.temp_max),
        desc: data.weather?.[0]?.description,
        icon: data.weather?.[0]?.icon,
      };

      setWeather(payload);
    } catch (err) {
      if (err.response.status === 404) {
        HideShowToast("country is not found");
      }
    } finally {
    }
  }

  function handelChangeSearchfield(e) {
    setinputfield(e.target.value);
  }
  function handelsendkey(e) {
    if (e.key === "Enter") {
      fetchWeather(inputfield);
    }
  }
  useEffect(() => {
    fetchWeather("Hail");
  }, []);

  return (
    <div>
      <SnackBar State={Show} Massage={ShowMassage} />

      <div
        dir="rtl"
        style={{ fontFamily: "IBM", fontWeight: "300", color: "white" }}
        className="App"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <TextField
              value={inputfield}
              onChange={handelChangeSearchfield}
              onKeyDown={handelsendkey}
              placeholder="city"
              style={{
                width: "80%",
                background: "#ffffff2b",
              }}
              variant="filled"
            />
            <TravelExploreIcon style={{ fontSize: "35px" }} />
          </div>
          <Grow
            in={Boolean(weather)}
            key={weather?.name}
            timeout={800}
            unmountOnExit
          >
            <div>
              <Card weather={weather} />
              <Button
                style={{ marginTop: "13px", background: "white" }}
                variant="text"
              >
                English
              </Button>
            </div>
          </Grow>
        </div>
      </div>
    </div>
  );
}

export default App;
