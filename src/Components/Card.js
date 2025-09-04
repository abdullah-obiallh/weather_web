import CloudIcon from "@mui/icons-material/Cloud";

export default function Card({ weather }) {
  const iconUrl = weather.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : null;
  if (!weather) {
    return;
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
            }}
          >
            <h1 style={{ margin: "0px 0px" }}>{weather.name}</h1>
            <h3 style={{ margin: "0px 0px" }}>2025</h3>
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
            الدرجة الأقل : {weather.temp_min} | الدرجة القصوى :
            {weather.temp_max}
          </div>
          {/* ==additional details== */}
        </div>
      </div>
    );
  }
}
