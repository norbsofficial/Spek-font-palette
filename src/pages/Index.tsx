import { useEffect, useRef, useState } from "react";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PaletteSwatch from "@/components/PaletteSwatch";
import { toast } from "sonner";

const Index = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const handleMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      node.style.setProperty("--spot-x", `${x}%`);
      node.style.setProperty("--spot-y", `${y}%`);
    };
    node.addEventListener("mousemove", handleMove);
    return () => node.removeEventListener("mousemove", handleMove);
  }, []);

  const handleFile = async (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    try {
      const { Vibrant } = await import("node-vibrant/browser");
      const paletteResult = await Vibrant.from(url).maxColorCount(8).getPalette();
      const swatches = Object.values(paletteResult).filter(Boolean) as any[];
      const hexes = swatches.map((s: any) => (typeof s.getHex === "function" ? s.getHex() : s.hex)).filter(Boolean);
      // De-duplicate and keep top 6
      const unique = Array.from(new Set(hexes)).slice(0, 6);
      setPalette(unique);
    } catch (e) {
      console.error(e);
      toast.error("Could not extract colors from this image.");
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const copyAll = async () => {
    if (!palette.length) return;
    const text = palette.join(", ");
    await navigator.clipboard.writeText(text);
    toast.success("Copied palette");
  };

  const clearAll = () => {
    setImageUrl(null);
    setPalette([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const gradientSuggestion = palette.length >= 2 ? `linear-gradient(135deg, ${palette[0]}, ${palette[1]})` : undefined;

  return (
    <main ref={containerRef} className="min-h-screen relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-hero opacity-60" aria-hidden="true" />

      <section className="relative container mx-auto py-16 md:py-24">
        <header className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Image to Color Palette Generator</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload an image and get a polished color scheme with copy-ready HEX codes, instantly.
          </p>
        </header>

        <Card className="bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Upload your image</CardTitle>
            <CardDescription>JPG, PNG up to 10MB. Drag & drop or choose a file.</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="border border-dashed rounded-lg p-6 md:p-8 text-center smooth hover:border-ring cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              role="button"
              aria-label="Upload image"
            >
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onInputChange}
                className="hidden"
                aria-hidden
              />
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full h-12 w-12 bg-accent flex items-center justify-center">
                  <span className="text-2xl" aria-hidden>📷</span>
                </div>
                <div>
                  <p className="font-medium">Drag & drop an image, or click to browse</p>
                  <p className="text-sm text-muted-foreground">We process locally in your browser.</p>
                </div>
              </div>
            </div>

            {imageUrl && (
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden border bg-muted/20">
                  <img
                    src={imageUrl}
                    alt="Uploaded image for color palette extraction"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Button onClick={copyAll} variant="secondary">Copy all HEX</Button>
                    <Button onClick={clearAll} variant="ghost">Clear</Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {palette.map((hex) => (
                      <PaletteSwatch key={hex} hex={hex} />
                    ))}
                  </div>
                  {gradientSuggestion && (
                    <div className="mt-6">
                      <p className="text-sm text-muted-foreground mb-2">Gradient suggestion (first two colors)</p>
                      <div
                        className="rounded-md h-16 border"
                        style={{ backgroundImage: gradientSuggestion }}
                        aria-label="Gradient suggestion"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Index;
