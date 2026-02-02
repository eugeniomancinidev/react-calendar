import Cell from "./Cell";
import "./App.css";
import Button from "./Button";
import { useMemo, useState } from "react";
import { WEEK_DAYS, MONTHS } from "./constants/calendar";

function App() {
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const [curMonth, setMonth] = useState(currentMonth);
  const [curYear, setYear] = useState(currentYear);

  const jsDay = new Date(curYear, curMonth, 1).getDay();
  const firstDayOfMonth = (jsDay + 6) % 7;
  const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (curMonth === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (curMonth === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  return (
    <div className="calendar-wrapper">
      <div className="grid month-section">
        <Button name="<" onClick={prevMonth} className="nav-btn" />
        <h1>{MONTHS[curMonth]} {curYear}</h1>
        <Button name=">" onClick={nextMonth} className="nav-btn" />
      </div>

      {/* HEADER GIORNI */}
      <div className="grid">
        {WEEK_DAYS.map(day => (
          <Cell key={day} number={day} style="grid-header" />
        ))}
      </div>

      {/* GIORNI DEL MESE */}
      <div className="grid">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <Cell key={`empty-${index}`} style="cell empty" />
        ))}

        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;

          const isToday =
            day === currentDay &&
            curMonth === currentMonth &&
            curYear === currentYear;

          return (
            <Cell
              key={day}
              number={day}
              isToday={isToday}
              style={`cell ${isToday ? "today" : ""}`            
            }
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
