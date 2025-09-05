import "./App.css";
import Button from "@mui/material/Button";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import TextField from "@mui/material/TextField";
import SnackBar from "./Components/SnackBar";
import Grow from "@mui/material/Grow";

import Card from "./Components/Card";
import axios from "axios";
import { useEffect, useState } from "react";

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
  const [language, setlanguage] = useState(false);
  const [weather, setWeather] = useState(null);
  const [ShowMassage, setShowMassage] = useState("");
  const API_KEY = process.env.REACT_APP_OPENWEATHER_KEY;

  const [inputfield, setinputfield] = useState("");

  async function fetchWeather(cityName) {
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
            lang: language ? "en" : "ar",
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
      } else {
        HideShowToast("Something went wrong");
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
  function handelLanguageClick(e) {
    setlanguage(!language);
  }
  useEffect(() => {
    fetchWeather(inputfield);
  }, [language]);
  return (
    <div>
      <SnackBar State={Show} Massage={ShowMassage} />

      <div
        dir={language ? "ltr" : "rtl"}
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
            dir={language ? "ltr" : "rtl"}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <TravelExploreIcon
              style={{ fontSize: "35px", margin: "0px 3px" }}
            />
            <TextField
              value={inputfield}
              onChange={handelChangeSearchfield}
              onKeyDown={handelsendkey}
              placeholder="Enter City"
              style={{
                paddingrig: "10px",
                width: "90%",
                background: "#ffffff4f",

                borderRadius: "10px",
              }}
              InputProps={{
                style: {
                  fontSize: "27px",
                  color: "#ddd",
                  height: "60px",
                },
              }}
              sx={{
                width: "350px",
                background: "#ffffff30",
                borderRadius: "8px",
                "& .MuiInputBase-input::placeholder": {
                  color: "#ddd",
                  opacity: 1,
                },
              }}
              variant="filled"
            />
          </div>
          <Grow
            in={Boolean(weather)}
            key={[weather?.name, language]}
            timeout={800}
            unmountOnExit
          >
            <div>
              <Card weather={weather} language={language} />
              <Button
                style={{ marginTop: "13px", background: "white" }}
                variant="text"
                value={language}
                onClick={handelLanguageClick}
              >
                {!language ? "English" : "Arabic"}
              </Button>
            </div>
          </Grow>
        </div>
      </div>
    </div>
  );
}

export default App;
