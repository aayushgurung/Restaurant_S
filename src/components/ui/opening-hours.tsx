import { site } from "@/config/site";
import { Clock3 } from "lucide-react";
export function OpeningHours() {
  return (
    <div className="opening-hours">
      <p className="eyebrow">
        <Clock3 size={15} />
        MAKE TIME FOR GOOD FOOD
      </p>
      <h3>Our opening hours</h3>
      {site.hours.map((h) => (
        <div key={h.days}>
          <span>{h.days}</span>
          <span>{h.time}</span>
        </div>
      ))}
      <p className="hours-note">
        Sample hours · kitchen closes 30 minutes before closing.
      </p>
    </div>
  );
}
