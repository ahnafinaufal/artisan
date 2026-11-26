import { useState } from "react";
import { Calendar, Card } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";

/**
 * Organism: CalendarShowcaseSection
 * Showcase komponen Calendar dari @heroui/react.
 */
export function CalendarShowcaseSection() {
  const [date, setDate] = useState(today(getLocalTimeZone()));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Calendar
        </h2>
        <p className="mt-1 text-sm text-muted">
          Pemilih tanggal berbasis grid bulan menggunakan <code>Calendar</code>,{" "}
          <code>Calendar.Header</code>, <code>Calendar.NavButton</code>,{" "}
          <code>Calendar.Heading</code>, <code>Calendar.Grid</code>, dan{" "}
          <code>Calendar.Cell</code>.
        </p>
      </div>

      <Card className="inline-block p-5">
        <Calendar aria-label="Pilih tanggal" value={date} onChange={setDate}>
          <Calendar.Header>
            <Calendar.NavButton slot="previous" />
            <Calendar.Heading />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(d) => <Calendar.Cell date={d} />}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>
      </Card>
    </section>
  );
}
