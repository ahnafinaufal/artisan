import { useState } from "react";
import { Card, RangeCalendar } from "@heroui/react";
import { getLocalTimeZone, today, type DateValue } from "@internationalized/date";

/**
 * Organism: RangeCalendarShowcaseSection
 * Showcase komponen RangeCalendar dari @heroui/react.
 */
export function RangeCalendarShowcaseSection() {
  const start = today(getLocalTimeZone());
  const [range, setRange] = useState<{ start: DateValue; end: DateValue }>({
    start,
    end: start.add({ days: 7 }),
  });

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          RangeCalendar
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kalender pemilihan rentang tanggal menggunakan <code>RangeCalendar</code>,{" "}
          <code>RangeCalendar.Header</code>, <code>RangeCalendar.Grid</code>, dan{" "}
          <code>RangeCalendar.Cell</code>.
        </p>
      </div>

      <Card className="inline-block p-5">
        <RangeCalendar aria-label="Pilih rentang" value={range} onChange={setRange}>
          <RangeCalendar.Header>
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendar.Heading />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(d) => <RangeCalendar.Cell date={d} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </RangeCalendar>
      </Card>
    </section>
  );
}
