import { useState } from "react";
import { Button, Input, Label, Modal, Select, ListBox } from "@heroui/react";
import { AlertTriangle, Zap } from "lucide-react";
import { BRANDS } from "../mockData";
import type { ContentIdea } from "../types";
import { findSimilarTitleInBrand } from "../utils";

interface QuickAddModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  existingIdeas: ContentIdea[];
  onSave: (title: string, brand: string) => void;
}

export function QuickAddModal({
  isOpen,
  onOpenChange,
  existingIdeas,
  onSave,
}: QuickAddModalProps) {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState<string>(BRANDS[0]);
  const [error, setError] = useState("");

  const similar = findSimilarTitleInBrand(existingIdeas, title, brand);

  const handleSubmit = () => {
    if (!title.trim() || !brand.trim()) {
      setError("Judul dan Brand wajib diisi.");
      return;
    }
    onSave(title.trim(), brand);
    setTitle("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container size="md">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                Tambah Cepat Ide Konten
              </Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body className="space-y-4">
              <p className="text-xs text-muted">
                Catat ide dengan cepat hanya dengan Judul dan Brand. Ide akan disimpan sebagai{" "}
                <span className="font-semibold text-foreground">Draft</span>.
              </p>

              <div className="space-y-1.5">
                <Label htmlFor="quick-title">Judul Ide *</Label>
                <Input
                  id="quick-title"
                  placeholder="Contoh: 3 kesalahan saat pakai sunscreen"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (error) setError("");
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label>Brand *</Label>
                <Select
                  selectedKey={brand}
                  onSelectionChange={(key) => setBrand(String(key))}
                  aria-label="Pilih Brand"
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {BRANDS.map((b) => (
                        <ListBox.Item key={b} id={b} textValue={b}>
                          {b}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {similar ? (
                <div className="flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-2.5 text-xs text-warning">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Judul mirip sudah ada di brand <strong>{brand}</strong>:{" "}
                    &ldquo;{similar.title}&rdquo; ({similar.id}).
                  </span>
                </div>
              ) : null}

              {error ? (
                <p className="text-xs font-medium text-danger">{error}</p>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onPress={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button variant="primary" onPress={handleSubmit}>
                Simpan Draft
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
