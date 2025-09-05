import CloudIcon from "@mui/icons-material/Cloud";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ar";
import AirIcon from "@mui/icons-material/Air";

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
        <div className="inside" style={{ margin: "10px 7px" }}>
          {/* City + Time */}
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-around",
              fontSize: "23px",
            }}
          >
            <h1 style={{ margin: "0px 10px" }}>
              {weather.name}{" "}
              <span style={{ fontSize: "27px", margin: "0px 5px" }}>
                {weather.country}
              </span>
            </h1>
            <h3 style={{ margin: "0px 10px" }}>{date}</h3>
          </div>
          <hr />

          {/* == City + Time == */}
          {/* Tempreture and icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "50px",
              fontSize: "100px",
              justifyContent: "space-around",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {weather.temp}°
              <img src={iconUrl} alt="Img_Doc" />
            </div>
            <CloudIcon style={{ fontSize: "250px" }} />
          </div>
          {/*== Tempreture and icon== */}
          {/* additional details */}
          <div style={{ fontSize: "25px" }}>
            <span
              style={{
                display: "flex",
                gap: "7px",
                alignItems: "center",
              }}
            >
              {" "}
              <span>{weather.desc} </span>|
              <span>
                {(language ? "wind Speed  " : "سرعة الرياح  ") + weather.wind}
              </span>
              <AirIcon />
            </span>
            {language ? "  Min  " : " الدرجة الأقل "}: {weather.temp_min} |
            {language ? "  Max  " : " الدرجة القصوى "}: {weather.temp_max}
          </div>
          {/* ==additional details== */}
        </div>
      </div>
    );
  }
}
