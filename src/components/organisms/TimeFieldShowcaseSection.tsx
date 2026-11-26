import { useState } from "react";
import { Card, Description, Label, TimeField } from "@heroui/react";
import type { TimeValue } from "@heroui/react";
import { Time } from "@internationalized/date";

/**
 * Organism: TimeFieldShowcaseSection
 * Showcase komponen TimeField dari @heroui/react.
 */
export function TimeFieldShowcaseSection() {
  const [time, setTime] = useState<TimeValue | null>(new Time(10, 30));

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          TimeField
        </h2>
        <p className="mt-1 text-sm text-muted">
          Kolom input waktu tersegmentasi menggunakan <code>TimeField</code>,{" "}
          <code>TimeField.Group</code>, <code>TimeField.Input</code>, dan{" "}
          <code>TimeField.Segment</code>.
        </p>
      </div>

      <Card className="max-w-md p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Controlled TimeField
        </h3>
        <TimeField value={time} onChange={setTime}>
          <Label>Waktu Pertemuan</Label>
          <TimeField.Group>
            <TimeField.Input>
              {(segment) => <TimeField.Segment segment={segment} />}
            </TimeField.Input>
          </TimeField.Group>
          <Description>
            Waktu terpilih: {time ? time.toString() : "—"}
          </Description>
        </TimeField>
      </Card>
    </section>
  );
}
