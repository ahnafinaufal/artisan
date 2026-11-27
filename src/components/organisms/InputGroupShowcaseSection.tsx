import { useState } from "react";
import {
  Button,
  Card,
  Chip,
  Description,
  FieldError,
  InputGroup,
  Kbd,
  Label,
  Spinner,
  Surface,
  TextField,
} from "@heroui/react";
import { Copy, Eye, EyeOff, Globe, Mail } from "lucide-react";

/**
 * Organism: InputGroupShowcaseSection
 * Showcase komponen InputGroup dari @heroui/react berdasarkan dokumentasi v3.
 *
 * Anatomy: TextField > Label > InputGroup > Prefix / Input | TextArea / Suffix.
 * InputGroup juga menghormati state dari TextField (required, disabled, invalid).
 */
export function InputGroupShowcaseSection() {
  const [feedback, setFeedback] = useState("");
  const [password, setPassword] = useState("heroui123");
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          InputGroup
        </h2>
        <p className="mt-1 text-sm text-muted">
          Mengelompokkan input dengan prefix dan suffix menggunakan{" "}
          <code>InputGroup</code>, <code>InputGroup.Input</code>,{" "}
          <code>InputGroup.TextArea</code>, <code>InputGroup.Prefix</code>, dan{" "}
          <code>InputGroup.Suffix</code> di dalam <code>TextField</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Default
          </h3>
          <div className="space-y-4">
            <TextField className="w-full max-w-[280px]" name="website">
              <Label>Website</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Globe className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input className="w-full max-w-[280px]" placeholder="heroui.com" />
                <InputGroup.Suffix>.dev</InputGroup.Suffix>
              </InputGroup>
            </TextField>

            <TextField className="w-full max-w-[280px]" name="email">
              <Label>Email</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Mail className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  className="w-full max-w-[280px]"
                  placeholder="tim@heroui.com"
                />
              </InputGroup>
            </TextField>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Variants
          </h3>
          <div className="space-y-4">
            <TextField className="w-full max-w-[280px]" name="primary">
              <Label>Primary variant</Label>
              <InputGroup variant="primary">
                <InputGroup.Prefix>
                  <Mail className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input placeholder="name@email.com" />
              </InputGroup>
            </TextField>
            <TextField className="w-full max-w-[280px]" name="secondary">
              <Label>Secondary variant</Label>
              <InputGroup variant="secondary">
                <InputGroup.Prefix>
                  <Mail className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input placeholder="name@email.com" />
              </InputGroup>
            </TextField>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Text Prefix &amp; Suffix
          </h3>
          <div className="space-y-4">
            <TextField
              className="w-full max-w-[280px]"
              defaultValue="heroui"
              name="protocol"
            >
              <Label>Website</Label>
              <InputGroup>
                <InputGroup.Prefix>https://</InputGroup.Prefix>
                <InputGroup.Input className="w-full max-w-[280px]" />
              </InputGroup>
            </TextField>
            <TextField
              className="w-full max-w-[280px]"
              defaultValue="heroui"
              name="domain"
            >
              <Label>Domain</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Globe className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input className="w-full max-w-[280px]" />
                <InputGroup.Suffix>.com</InputGroup.Suffix>
              </InputGroup>
            </TextField>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Full Width
          </h3>
          <div className="space-y-4">
            <TextField fullWidth name="full-email">
              <Label>Email address</Label>
              <InputGroup fullWidth>
                <InputGroup.Prefix>
                  <Mail className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input placeholder="name@email.com" />
              </InputGroup>
            </TextField>
            <TextField fullWidth name="full-password">
              <Label>Password</Label>
              <InputGroup fullWidth>
                <InputGroup.Input placeholder="Enter password" type="password" />
                <InputGroup.Suffix>
                  <Eye className="size-4 text-muted" />
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Required Field
          </h3>
          <div className="space-y-4">
            <TextField isRequired className="w-full max-w-[280px]" name="req-email">
              <Label>Email address</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Mail className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  className="w-full max-w-[280px]"
                  placeholder="name@email.com"
                />
              </InputGroup>
            </TextField>
            <TextField isRequired className="w-full max-w-[280px]" name="price">
              <Label>Set a price</Label>
              <InputGroup>
                <InputGroup.Prefix>$</InputGroup.Prefix>
                <InputGroup.Input
                  className="w-full max-w-[200px]"
                  placeholder="0"
                  type="number"
                />
                <InputGroup.Suffix>USD</InputGroup.Suffix>
              </InputGroup>
              <Description>What customers would pay</Description>
            </TextField>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Disabled &amp; Loading
          </h3>
          <div className="space-y-4">
            <TextField
              isDisabled
              className="w-full max-w-[280px]"
              defaultValue="name@email.com"
              name="disabled-email"
            >
              <Label>Email address</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Mail className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input className="w-full max-w-[280px]" />
              </InputGroup>
            </TextField>
            <TextField
              className="w-full max-w-[280px]"
              defaultValue="Sending..."
              name="status"
            >
              <Label>Status</Label>
              <InputGroup>
                <InputGroup.Input className="w-full max-w-[280px]" />
                <InputGroup.Suffix>
                  <Spinner aria-label="Loading" className="size-4" />
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            In Surface
          </h3>
          <Surface className="rounded-2xl p-6">
            <TextField className="w-full max-w-[280px]" name="surface-email">
              <Label>Email address</Label>
              <InputGroup variant="secondary">
                <InputGroup.Prefix>
                  <Mail className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  className="w-full max-w-[280px]"
                  placeholder="name@email.com"
                />
              </InputGroup>
              <Description>
                We&apos;ll never share this with anyone else
              </Description>
            </TextField>
          </Surface>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Interactive Suffix
          </h3>
          <div className="space-y-4">
            <TextField
              className="w-full max-w-[280px]"
              defaultValue="heroui.com"
              name="copy-site"
            >
              <Label>Website</Label>
              <InputGroup>
                <InputGroup.Input className="w-full max-w-[280px]" />
                <InputGroup.Suffix className="pe-0">
                  <Button
                    isIconOnly
                    aria-label="Salin"
                    size="sm"
                    variant="ghost"
                  >
                    <Copy className="size-4" />
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>

            <TextField className="w-full max-w-[280px]" name="password">
              <Label>Password</Label>
              <InputGroup>
                <InputGroup.Input
                  className="w-full max-w-[280px]"
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <InputGroup.Suffix className="pe-0">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Sembunyikan password" : "Tampilkan password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible((prev) => !prev)}
                  >
                    {isVisible ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Shortcut &amp; Badge
          </h3>
          <div className="space-y-4">
            <TextField
              aria-label="Command"
              className="w-full max-w-[280px]"
              name="command"
            >
              <InputGroup>
                <InputGroup.Input
                  className="w-full max-w-[280px]"
                  placeholder="Command"
                />
                <InputGroup.Suffix className="pe-2">
                  <Kbd>
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Content>K</Kbd.Content>
                  </Kbd>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>

            <TextField
              aria-label="Email address"
              className="w-full max-w-[280px]"
              name="badge-email"
            >
              <InputGroup>
                <InputGroup.Input
                  className="w-full max-w-[280px]"
                  placeholder="Email address"
                />
                <InputGroup.Suffix className="pe-2">
                  <Chip color="accent" size="md" variant="soft">
                    Pro
                  </Chip>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Validation
          </h3>
          <div className="space-y-4">
            <TextField
              isInvalid
              isRequired
              className="w-full max-w-[280px]"
              name="invalid-email"
            >
              <Label>Email address</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Mail className="size-4 text-muted" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  className="w-full max-w-[280px]"
                  placeholder="name@email.com"
                />
              </InputGroup>
              <FieldError>Please enter a valid email address</FieldError>
            </TextField>
            <TextField
              isInvalid
              isRequired
              className="w-full max-w-[280px]"
              name="invalid-price"
            >
              <Label>Set a price</Label>
              <InputGroup>
                <InputGroup.Prefix>$</InputGroup.Prefix>
                <InputGroup.Input
                  className="w-full max-w-[200px]"
                  placeholder="0"
                  type="number"
                />
                <InputGroup.Suffix>USD</InputGroup.Suffix>
              </InputGroup>
              <FieldError>Price must be greater than 0</FieldError>
            </TextField>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With TextArea
          </h3>
          <TextField
            fullWidth
            isInvalid={feedback.length > 500}
            name="feedback"
          >
            <Label>Your Feedback</Label>
            <InputGroup fullWidth>
              <InputGroup.Prefix>
                <Mail className="size-4 text-muted" />
              </InputGroup.Prefix>
              <InputGroup.TextArea
                className="resize-none"
                placeholder="Share your thoughts, suggestions, or issues..."
                rows={5}
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
              />
            </InputGroup>
            <Description className="flex w-full items-center justify-between px-1">
              <span>Maksimal 500 karakter.</span>
              <span className="ml-auto">{feedback.length}/500</span>
            </Description>
            <FieldError>Feedback harus kurang dari 500 karakter</FieldError>
          </TextField>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Customization
          </h3>
          <TextField className="w-full max-w-xs" name="work-email">
            <Label>Work email</Label>
            <InputGroup className="rounded-xl border border-border/80 bg-default shadow-sm">
              <InputGroup.Prefix>
                <Mail className="size-4 text-muted" />
              </InputGroup.Prefix>
              <InputGroup.Input placeholder="you@company.com" />
            </InputGroup>
          </TextField>
          <p className="mt-3 text-xs text-muted">
            Gunakan token tema seperti <code>border-border</code>,{" "}
            <code>bg-default</code>, dan <code>text-muted</code> pada class
            Tailwind.
          </p>
        </Card>
      </div>
    </section>
  );
}
