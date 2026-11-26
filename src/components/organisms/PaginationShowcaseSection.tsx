import { useState } from "react";
import { Card, Pagination } from "@heroui/react";

/**
 * Organism: PaginationShowcaseSection
 * Showcase komponen Pagination dari @heroui/react:
 * Controlled pagination dengan Summary, Previous/Next, Ellipsis, dan Sizes.
 */
export function PaginationShowcaseSection() {
  const [page, setPage] = useState(2);
  const totalPages = 5;

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Pagination
        </h2>
        <p className="mt-1 text-sm text-muted">
          Navigasi halaman menggunakan <code>Pagination</code>,{" "}
          <code>Pagination.Summary</code>, <code>Pagination.Content</code>,{" "}
          <code>Pagination.Item</code>, <code>Pagination.Previous</code>,{" "}
          <code>Pagination.Link</code>, <code>Pagination.Ellipsis</code>, dan{" "}
          <code>Pagination.Next</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Interactive Pagination
          </h3>
          <Pagination>
            <Pagination.Summary>
              Halaman {page} dari {totalPages}
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page <= 1}
                  onPress={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Pagination.Previous>
              </Pagination.Item>
              {[1, 2, 3, 4, 5].map((num) => (
                <Pagination.Item key={num}>
                  <Pagination.Link
                    isActive={page === num}
                    onPress={() => setPage(num)}
                  >
                    {num}
                  </Pagination.Link>
                </Pagination.Item>
              ))}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page >= totalPages}
                  onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            With Ellipsis &amp; Small Size
          </h3>
          <Pagination size="sm">
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous>
                  <Pagination.PreviousIcon />
                </Pagination.Previous>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link isActive>1</Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link>2</Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Ellipsis />
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Link>12</Pagination.Link>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Next>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Card>
      </div>
    </section>
  );
}
