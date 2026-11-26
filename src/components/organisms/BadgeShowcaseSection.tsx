import React from "react";
import { Avatar, Badge, Card, Separator } from "@heroui/react";
import { Bell } from "lucide-react";

const GREEN_AVATAR_URL =
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg";
const ORANGE_AVATAR_URL =
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg";
const BLUE_AVATAR_URL =
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg";

/**
 * Organism: BadgeShowcaseSection
 * Implementasi lengkap seluruh contoh Badge dari dokumentasi HeroUI v3:
 * Usage, Variants, Sizes, Colors, Placements, Dot Badge, dan With Content.
 */
export function BadgeShowcaseSection() {
  const variants = ["primary", "secondary", "soft"] as const;
  const allColors = ["accent", "default", "success", "warning", "danger"] as const;
  const sizes = ["sm", "md", "lg"] as const;
  const placements = ["top-right", "top-left", "bottom-right", "bottom-left"] as const;
  const dotColors = ["accent", "success", "warning", "danger"] as const;

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Badge</h2>
        <p className="mt-1 text-sm text-muted">
          Menampilkan indikator kecil relatif terhadap elemen lain menggunakan{" "}
          <code>Badge.Anchor</code> dan <code>Badge</code> sesuai dokumentasi HeroUI v3.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Usage</h3>
          <div className="flex flex-wrap items-center gap-6">
            <Badge.Anchor>
              <Avatar>
                <Avatar.Image src={GREEN_AVATAR_URL} alt="JD" />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
              <Badge color="danger" size="sm">
                5
              </Badge>
            </Badge.Anchor>

            <Badge.Anchor>
              <Avatar>
                <Avatar.Image src={ORANGE_AVATAR_URL} alt="AB" />
                <Avatar.Fallback>AB</Avatar.Fallback>
              </Avatar>
              <Badge color="accent" size="sm">
                New
              </Badge>
            </Badge.Anchor>

            <Badge.Anchor>
              <Avatar>
                <Avatar.Image src={BLUE_AVATAR_URL} alt="CD" />
                <Avatar.Fallback>CD</Avatar.Fallback>
              </Avatar>
              <Badge color="success" placement="bottom-right" size="sm" />
            </Badge.Anchor>
          </div>
        </Card>

        {/* 2. With Content */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Content
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            <Badge.Anchor>
              <Avatar>
                <Avatar.Image src={GREEN_AVATAR_URL} alt="JD" />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
              <Badge color="danger" size="sm">
                5
              </Badge>
            </Badge.Anchor>

            <Badge.Anchor>
              <Avatar>
                <Avatar.Image src={GREEN_AVATAR_URL} alt="JD" />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
              <Badge color="danger" size="sm">
                New
              </Badge>
            </Badge.Anchor>

            <Badge.Anchor>
              <Avatar>
                <Avatar.Image src={GREEN_AVATAR_URL} alt="JD" />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
              <Badge color="danger" size="sm">
                99+
              </Badge>
            </Badge.Anchor>

            <Badge.Anchor>
              <Avatar>
                <Avatar.Image src={GREEN_AVATAR_URL} alt="JD" />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
              <Badge color="accent" size="sm">
                <Bell className="size-2.5" />
              </Badge>
            </Badge.Anchor>
          </div>
        </Card>

        {/* 3. Variants */}
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">Variants</h3>
          <div className="flex flex-col gap-6">
            {variants.map((variant, index) => (
              <React.Fragment key={variant}>
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-semibold capitalize text-muted">
                    {variant}
                  </h4>
                  <div className="flex flex-wrap items-center gap-6">
                    {allColors.map((color) => (
                      <Badge.Anchor key={color}>
                        <Avatar>
                          <Avatar.Image src={GREEN_AVATAR_URL} alt="JD" />
                          <Avatar.Fallback>JD</Avatar.Fallback>
                        </Avatar>
                        <Badge color={color} size="sm" variant={variant}>
                          5
                        </Badge>
                      </Badge.Anchor>
                    ))}
                  </div>
                </div>
                {index < variants.length - 1 ? <Separator /> : null}
              </React.Fragment>
            ))}
          </div>
        </Card>

        {/* 4. Sizes */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Sizes</h3>
          <div className="flex flex-wrap items-center gap-6">
            {sizes.map((size) => (
              <Badge.Anchor key={size}>
                <Avatar size={size}>
                  <Avatar.Image src={GREEN_AVATAR_URL} alt="JD" />
                  <Avatar.Fallback>JD</Avatar.Fallback>
                </Avatar>
                <Badge color="danger" size={size}>
                  5
                </Badge>
              </Badge.Anchor>
            ))}
          </div>
        </Card>

        {/* 5. Colors */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Colors</h3>
          <div className="flex flex-wrap items-center gap-6">
            {(["default", "accent", "success", "warning", "danger"] as const).map(
              (color) => (
                <Badge.Anchor key={color}>
                  <Avatar>
                    <Avatar.Image src={GREEN_AVATAR_URL} alt="JD" />
                    <Avatar.Fallback>JD</Avatar.Fallback>
                  </Avatar>
                  <Badge color={color} size="sm" />
                </Badge.Anchor>
              )
            )}
          </div>
        </Card>

        {/* 6. Placements */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Placements
          </h3>
          <div className="flex flex-wrap items-center gap-8">
            {placements.map((placement) => (
              <div key={placement} className="flex flex-col items-center gap-2">
                <Badge.Anchor>
                  <Avatar>
                    <Avatar.Image src={GREEN_AVATAR_URL} alt="JD" />
                    <Avatar.Fallback>JD</Avatar.Fallback>
                  </Avatar>
                  <Badge color="accent" placement={placement} size="sm" />
                </Badge.Anchor>
                <span className="text-xs text-muted">{placement}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 7. Dot Badge */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Dot Badge
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            {dotColors.map((color) => (
              <Badge.Anchor key={color}>
                <Avatar>
                  <Avatar.Image src={GREEN_AVATAR_URL} alt="JD" />
                  <Avatar.Fallback>JD</Avatar.Fallback>
                </Avatar>
                <Badge color={color} placement="bottom-right" size="sm" />
              </Badge.Anchor>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
