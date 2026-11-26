import { useState } from "react";
import { Calendar, Card, DateField, DatePicker, Label } from "@heroui/react";
import { getLocalTimeZone, today, type DateValue } from "@internationalized/date";

/**
 * Organism: DatePickerShowcaseSection
 * Showcase komponen DatePicker dari @heroui/react.
 */
export function DatePickerShowcaseSection() {
  const [value, setValue] = useState<DateValue | null>(today(getLocalTimeZone()));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          DatePicker
        </h2>
        <p className="mt-1 text-sm text-muted">
          Menggabungkan <code>DateField</code> dan <code>Calendar</code> menggunakan{" "}
          <code>DatePicker</code>, <code>DatePicker.Trigger</code>,{" "}
          <code>DatePicker.TriggerIndicator</code>, dan <code>DatePicker.Popover</code>.
        </p>
      </div>

      <Card className="max-w-md p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Controlled DatePicker
        </h3>
        <DatePicker value={value} onChange={setValue}>
          <Label>Tanggal Jatuh Tempo</Label>
          <DateField.Group fullWidth>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DatePicker.Popover>
            <Calendar aria-label="Pilih tanggal">
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
          </DatePicker.Popover>
        </DatePicker>
      </Card>
    </section>
  );
}
