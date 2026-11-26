import { useState } from "react";
import { Card, InputOTP, Label } from "@heroui/react";

/**
 * Organism: InputOTPShowcaseSection
 * Showcase komponen InputOTP dari @heroui/react:
 * 6-digit OTP dengan Separator dan Controlled value.
 */
export function InputOTPShowcaseSection() {
  const [otp, setOtp] = useState("");

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          InputOTP
        </h2>
        <p className="mt-1 text-sm text-muted">
          Input kode verifikasi satu kali menggunakan <code>InputOTP</code>,{" "}
          <code>InputOTP.Group</code>, <code>InputOTP.Slot</code>, dan{" "}
          <code>InputOTP.Separator</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            6-Digit Code with Separator
          </h3>
          <div className="space-y-3">
            <Label>Kode Verifikasi</Label>
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTP.Group>
                <InputOTP.Slot index={0} />
                <InputOTP.Slot index={1} />
                <InputOTP.Slot index={2} />
              </InputOTP.Group>
              <InputOTP.Separator />
              <InputOTP.Group>
                <InputOTP.Slot index={3} />
                <InputOTP.Slot index={4} />
                <InputOTP.Slot index={5} />
              </InputOTP.Group>
            </InputOTP>
            <p className="text-xs text-muted">
              Value: <span className="font-mono text-foreground">{otp || "—"}</span>
            </p>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            4-Digit PIN (Disabled)
          </h3>
          <InputOTP maxLength={4} isDisabled defaultValue="1234">
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
          </InputOTP>
        </Card>
      </div>
    </section>
  );
}
