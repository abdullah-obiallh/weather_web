import CloudIcon from "@mui/icons-material/Cloud";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ar";
import AirIcon from "@mui/icons-material/Air";
import Grid from "@mui/material/Grid";

dayjs.extend(utc);
dayjs.extend(timezone);
export default function Card({ weather, language }) {
  !language ? dayjs.locale("ar") : dayjs.locale("en");
  const date = dayjs().tz("Asia/Riyadh").format("dddd, D MMMM YYYY");
  const iconUrl = weather.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : null;
  if (!weather) {
    return null;
  } else {
    return (
      <div
        className="Card"
        style={{
          borderRadius: "15px",
          boxShadow: "6px 7px 1px #3e3e3eb3",
          background: "#345b91ff",
          padding: "10px",
        }}
      >
        <Grid style={{ margin: "10px 7px" }}>
          {/* City + Time */}
          <Grid
            size={12}
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-around",
              fontSize: "23px",
            }}
          >
            <h1 style={{ margin: "0px 10px" }}>
              {weather.name}
              <span style={{ fontSize: "27px", margin: "0px 20px" }}>
                {weather.country}
              </span>
            </h1>
          </Grid>
          <hr />
          {/* == City + Time == */}
          {/* Tempreture and icon */}
          <Grid>
            <Grid container>
              <Grid size={{ md: 6, xs: 5 }}>
                <span
                  style={{
                    fontSize: "50px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {weather.temp}°
                  <img src={iconUrl} alt="Img_Doc" />
                </span>
              </Grid>
              <Grid size={{ md: 6, xs: 7 }}>
                <CloudIcon style={{ fontSize: "200px" }} />
              </Grid>
            </Grid>
          </Grid>
          {/*== Tempreture and icon== */}
          {/* additional details */}
          <Grid style={{ fontSize: "25px" }}>
            <span
              style={{
                display: "flex",
                gap: "7px",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "20px" }}>
                {weather.desc} |
                <span>
                  {(language ? " wind Speed  " : " سرعة الرياح  ") +
                    weather.wind}
                </span>
              </span>
              <AirIcon />
            </span>
            <span style={{ fontSize: "22px" }}>
              {language ? "  Min  " : " الدرجة الأقل "}: {weather.temp_min} |
              {language ? "  Max  " : " الدرجة القصوى "}: {weather.temp_max}
            </span>
          </Grid>
          {/* ==additional details== */}
          {/* Date */}
          {date}
          {/* ==Date== */}
        </Grid>
      </div>
    );
  }
}
