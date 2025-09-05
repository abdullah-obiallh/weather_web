import CloudIcon from "@mui/icons-material/Cloud";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ar";

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
          background: "#0d47a1",
          padding: "10px",
        }}
      >
        <div className="inside" style={{ margin: "10px 7px" }}>
          {/* City + Time */}
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              fontSize: "23px",
            }}
          >
            <h1 style={{ margin: "0px 0px" }}>{weather.name}</h1>
            <h3 style={{ margin: "0px 0px" }}>{date}</h3>
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
            }}
          >
            {weather.temp}°
            <img style={{ margin: "-60px" }} src={iconUrl} alt="Img_Doc" />
            <CloudIcon style={{ fontSize: "250px" }} />
          </div>
          {/*== Tempreture and icon== */}
          {/* additional details */}
          <div>
            {weather.desc}
            <br />
            {language ? "Min" : "الدرجة الأقل"}: {weather.temp_min} |{" "}
            {language ? "Max" : "الدرجة القصوى"}:{weather.temp_max}
          </div>
          {/* ==additional details== */}
        </div>
      </div>
    );
  }
}
