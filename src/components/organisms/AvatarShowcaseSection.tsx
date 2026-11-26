import { Avatar, Card, Separator } from "@heroui/react";
import { User } from "lucide-react";

/**
 * Organism: AvatarShowcaseSection
 * Implementasi lengkap seluruh contoh Avatar dari dokumentasi HeroUI v3:
 * Usage, Sizes, Colors, Variants, Fallback Content, dan Custom Styles.
 */
export function AvatarShowcaseSection() {
  const colors = ["accent", "default", "success", "warning", "danger"] as const;
  const variantRows = [
    { content: "AG", label: "letter", type: "letter" },
    { content: "AG", label: "letter soft", type: "letter-soft" },
    { content: <User className="size-4" />, label: "icon", type: "icon" },
    { content: <User className="size-4" />, label: "icon soft", type: "icon-soft" },
    {
      content: [
        "https://img.heroui.chat/image/avatar?w=400&h=400&u=3",
        "https://img.heroui.chat/image/avatar?w=400&h=400&u=4",
        "https://img.heroui.chat/image/avatar?w=400&h=400&u=5",
        "https://img.heroui.chat/image/avatar?w=400&h=400&u=8",
        "https://img.heroui.chat/image/avatar?w=400&h=400&u=16",
      ],
      label: "img",
      type: "img",
    },
  ] as const;

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Avatar</h2>
        <p className="mt-1 text-sm text-muted">
          Menampilkan gambar profil pengguna dengan konten fallback yang dapat dikustomisasi
          menggunakan <code>Avatar</code>, <code>Avatar.Image</code>, dan{" "}
          <code>Avatar.Fallback</code> sesuai dokumentasi HeroUI v3.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Usage</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar>
              <Avatar.Image
                alt="John Doe"
                src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
              />
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            <Avatar>
              <Avatar.Image
                alt="Blue"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
              />
              <Avatar.Fallback>B</Avatar.Fallback>
            </Avatar>
            <Avatar>
              <Avatar.Fallback>JR</Avatar.Fallback>
            </Avatar>
          </div>
        </Card>

        {/* 2. Sizes */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar size="sm">
              <Avatar.Image
                alt="Small Avatar"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
              />
              <Avatar.Fallback>SM</Avatar.Fallback>
            </Avatar>
            <Avatar size="md">
              <Avatar.Image
                alt="Medium Avatar"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
              />
              <Avatar.Fallback>MD</Avatar.Fallback>
            </Avatar>
            <Avatar size="lg">
              <Avatar.Image
                alt="Large Avatar"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
              />
              <Avatar.Fallback>LG</Avatar.Fallback>
            </Avatar>
          </div>
        </Card>

        {/* 3. Colors */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">Colors</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar color="default">
              <Avatar.Fallback>DF</Avatar.Fallback>
            </Avatar>
            <Avatar color="accent">
              <Avatar.Fallback>AC</Avatar.Fallback>
            </Avatar>
            <Avatar color="success">
              <Avatar.Fallback>SC</Avatar.Fallback>
            </Avatar>
            <Avatar color="warning">
              <Avatar.Fallback>WR</Avatar.Fallback>
            </Avatar>
            <Avatar color="danger">
              <Avatar.Fallback>DG</Avatar.Fallback>
            </Avatar>
          </div>
        </Card>

        {/* 4. Fallback Content */}
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Fallback Content
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar>
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>

            <Avatar>
              <Avatar.Fallback>
                <User className="size-4" />
              </Avatar.Fallback>
            </Avatar>

            <Avatar>
              <Avatar.Image
                alt="Delayed Avatar"
                src="https://invalid-url-to-show-fallback.com/image.jpg"
              />
              <Avatar.Fallback delayMs={600}>NA</Avatar.Fallback>
            </Avatar>

            <Avatar>
              <Avatar.Fallback className="border-none bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                GB
              </Avatar.Fallback>
            </Avatar>
          </div>
        </Card>

        {/* 5. Variants */}
        <Card className="overflow-x-auto p-5 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">Variants</h3>
          <div className="flex min-w-[520px] flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-24 shrink-0" />
              {colors.map((color) => (
                <div
                  key={color}
                  className="flex w-20 shrink-0 items-center justify-center"
                >
                  <span className="text-xs capitalize text-muted">{color}</span>
                </div>
              ))}
            </div>

            <Separator />

            {variantRows.map((variant) => (
              <div key={variant.label} className="flex items-center gap-3">
                <div className="w-24 shrink-0 text-sm text-muted">{variant.label}</div>
                {colors.map((color, colorIndex) => (
                  <div
                    key={color}
                    className="flex w-20 shrink-0 items-center justify-center"
                  >
                    <Avatar
                      color={color}
                      variant={variant.type.includes("soft") ? "soft" : undefined}
                    >
                      {variant.type === "img" ? (
                        <>
                          <Avatar.Image
                            alt={`Avatar ${color}`}
                            src={
                              Array.isArray(variant.content)
                                ? variant.content[colorIndex]
                                : ""
                            }
                          />
                          <Avatar.Fallback>
                            {color.charAt(0).toUpperCase()}
                          </Avatar.Fallback>
                        </>
                      ) : (
                        <Avatar.Fallback>{variant.content}</Avatar.Fallback>
                      )}
                    </Avatar>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>

        {/* 6. Custom Styles */}
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Custom Styles (Tailwind CSS)
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            <Avatar className="rounded-lg">
              <Avatar.Image
                alt="John Doe"
                src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
              />
              <Avatar.Fallback className="rounded-lg">JD</Avatar.Fallback>
            </Avatar>
            <Avatar className="size-16 border-2 border-accent">
              <Avatar.Fallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                HR
              </Avatar.Fallback>
            </Avatar>
          </div>
        </Card>
      </div>
    </section>
  );
}
