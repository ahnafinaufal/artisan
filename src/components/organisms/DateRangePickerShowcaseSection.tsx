import { useState } from "react";
import {
  Card,
  DateField,
  DateRangePicker,
  Label,
  RangeCalendar,
} from "@heroui/react";
import { getLocalTimeZone, today, type DateValue } from "@internationalized/date";

/**
 * Organism: DateRangePickerShowcaseSection
 * Showcase komponen DateRangePicker dari @heroui/react.
 */
export function DateRangePickerShowcaseSection() {
  const start = today(getLocalTimeZone());
  const [range, setRange] = useState<{ start: DateValue; end: DateValue } | null>({
    start,
    end: start.add({ days: 5 }),
  });

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          DateRangePicker
        </h2>
        <p className="mt-1 text-sm text-muted">
          Pemilih rentang tanggal menggunakan <code>DateRangePicker</code>,{" "}
          <code>DateField.Group</code>, <code>DateRangePicker.RangeSeparator</code>,{" "}
          <code>DateRangePicker.Trigger</code>, dan <code>RangeCalendar</code>.
        </p>
      </div>

      <Card className="max-w-md p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Controlled DateRangePicker
        </h3>
        <DateRangePicker value={range} onChange={setRange}>
          <Label>Periode Sprint</Label>
          <DateField.Group fullWidth>
            <DateField.Input slot="start">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateRangePicker.RangeSeparator />
            <DateField.Input slot="end">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DateRangePicker.Trigger>
                <DateRangePicker.TriggerIndicator />
              </DateRangePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DateRangePicker.Popover>
            <RangeCalendar aria-label="Rentang tanggal">
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
          </DateRangePicker.Popover>
        </DateRangePicker>
      </Card>
    </section>
  );
}
