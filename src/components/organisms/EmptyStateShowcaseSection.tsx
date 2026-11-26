import { Avatar, AvatarGroup, Button, Card } from "@heroui/react";
import { FolderOpen, Inbox, Plus, SearchX, Users } from "lucide-react";

/**
 * Organism: EmptyStateShowcaseSection
 * Implementasi lengkap pola Empty State dari dokumentasi HeroUI Pro:
 * Usage, Outline, Sizes (sm, md, lg), Minimal, With Avatar, With Avatar Group,
 * With Background, dan Full Height.
 */
export function EmptyStateShowcaseSection() {
  return (
    <section className="space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Empty State
          </h2>
          <span className="rounded bg-surface-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted">
            PRO
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">
          Komponen empty state dengan ikon/avatar, judul, deskripsi, dan aksi untuk
          memandu pengguna saat data kosong.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Usage */}
        <Card className="p-6">
          <h3 className="mb-4 text-base font-semibold text-foreground">Usage</h3>
          <div className="flex flex-col items-center justify-center gap-4 py-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-11 items-center justify-center rounded-full bg-surface-secondary text-muted">
                <Inbox className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                No projects yet
              </h3>
              <p className="max-w-xs text-sm text-muted">
                Create your first project to start organizing tasks and collaborating.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm">
                <Plus className="size-4" />
                New Project
              </Button>
              <Button size="sm" variant="tertiary">
                Learn more
              </Button>
            </div>
          </div>
        </Card>

        {/* 2. Outline */}
        <Card className="p-6">
          <h3 className="mb-4 text-base font-semibold text-foreground">Outline</h3>
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-11 items-center justify-center rounded-full bg-surface-secondary text-muted">
                <FolderOpen className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                No files uploaded
              </h3>
              <p className="max-w-xs text-sm text-muted">
                Drag and drop files here, or click below to browse.
              </p>
            </div>
            <Button size="sm" variant="outline">
              Upload File
            </Button>
          </div>
        </Card>

        {/* 3. Sizes */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">Sizes</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border/70 p-4 text-center">
              <div className="flex size-8 items-center justify-center rounded-full bg-surface-secondary text-muted">
                <SearchX className="size-4" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Small (sm)</h3>
              <p className="text-xs text-muted">Compact padding and spacing.</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/70 p-6 text-center">
              <div className="flex size-10 items-center justify-center rounded-full bg-surface-secondary text-muted">
                <SearchX className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Medium (md)</h3>
              <p className="text-sm text-muted">Default size for standard views.</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border/70 p-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-surface-secondary text-muted">
                <SearchX className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Large (lg)</h3>
              <p className="text-sm text-muted">Generous spacing for full sections.</p>
            </div>
          </div>
        </Card>

        {/* 4. Minimal */}
        <Card className="p-6">
          <h3 className="mb-4 text-base font-semibold text-foreground">Minimal</h3>
          <div className="flex flex-col items-center justify-center gap-1.5 py-6 text-center">
            <h3 className="text-base font-semibold text-foreground">
              No notifications
            </h3>
            <p className="text-sm text-muted">You&apos;re all caught up.</p>
          </div>
        </Card>

        {/* 5. With Avatar */}
        <Card className="p-6">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Avatar
          </h3>
          <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg">
                <Avatar.Image
                  alt="Kate Moore"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
                />
                <Avatar.Fallback>KM</Avatar.Fallback>
              </Avatar>
              <h3 className="text-base font-semibold text-foreground">
                Start a conversation
              </h3>
              <p className="max-w-xs text-sm text-muted">
                Send a message to Kate Moore to kick off your collaboration.
              </p>
            </div>
            <Button size="sm">Send Message</Button>
          </div>
        </Card>

        {/* 6. With Avatar Group */}
        <Card className="p-6">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Avatar Group
          </h3>
          <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <AvatarGroup max={3}>
                <Avatar>
                  <Avatar.Image
                    alt="John Doe"
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                  />
                  <Avatar.Fallback>JD</Avatar.Fallback>
                </Avatar>
                <Avatar>
                  <Avatar.Image
                    alt="Kate Wilson"
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
                  />
                  <Avatar.Fallback>KW</Avatar.Fallback>
                </Avatar>
                <Avatar>
                  <Avatar.Image
                    alt="Emily Chen"
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
                  />
                  <Avatar.Fallback>EC</Avatar.Fallback>
                </Avatar>
                <Avatar>
                  <Avatar.Image
                    alt="Michael Brown"
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                  />
                  <Avatar.Fallback>MB</Avatar.Fallback>
                </Avatar>
              </AvatarGroup>
              <h3 className="text-base font-semibold text-foreground">
                No team members assigned
              </h3>
              <p className="max-w-xs text-sm text-muted">
                Invite teammates to collaborate on this workspace.
              </p>
            </div>
            <Button size="sm" variant="secondary">
              <Users className="size-4" />
              Invite Members
            </Button>
          </div>
        </Card>

        {/* 7. With Background */}
        <Card className="p-6">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Background
          </h3>
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-surface-secondary/60 p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-11 items-center justify-center rounded-full bg-surface text-muted shadow-sm">
                <Inbox className="size-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                Archive is empty
              </h3>
              <p className="max-w-xs text-sm text-muted">
                Archived items will appear here for 30 days before deletion.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
