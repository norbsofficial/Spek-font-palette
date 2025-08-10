import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { sanitizeHex } from "@/lib/colors";

interface PaletteSwatchProps {
  hex: string;
  label?: string;
}

const PaletteSwatch = ({ hex, label }: PaletteSwatchProps) => {
  const safeHex = sanitizeHex(hex) ?? "#000000";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(safeHex);
      toast.success(`Copied ${safeHex}`);
    } catch (e) {
      toast.error("Copy failed");
    }
  };

  return (
    <Card className="group overflow-hidden border bg-card elevated smooth hover:translate-y-[-2px]">
      <div
        className="w-full aspect-[4/3]"
        style={{ backgroundColor: safeHex }}
        aria-label={`Color swatch ${safeHex}`}
      />
      <div className="flex items-center justify-between px-3 py-2 text-sm">
        <div className="flex flex-col">
          <span className="font-medium" aria-label="Hex code">{safeHex}</span>
          {label ? (
            <span className="text-muted-foreground text-xs">{label}</span>
          ) : null}
        </div>
        <Button variant="secondary" size="sm" onClick={copy} aria-label={`Copy ${hex}`}>
          Copy
        </Button>
      </div>
    </Card>
  );
};

export default PaletteSwatch;
