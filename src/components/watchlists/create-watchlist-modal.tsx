"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Folder, Sparkles, Star, Heart, Bookmark, Target, Zap, Trophy, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateWatchlist } from "@/hooks/use-watchlists";

const createWatchlistSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  color: z.string(),
  icon: z.string(),
});

type CreateWatchlistFormData = z.infer<typeof createWatchlistSchema>;

interface CreateWatchlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Preset colors
const PRESET_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#A855F7" },
  { name: "Pink", value: "#EC4899" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Green", value: "#10B981" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Gray", value: "#6B7280" },
];

// Icon options
const ICON_OPTIONS = [
  { name: "Folder", icon: Folder, value: "folder" },
  { name: "Sparkles", icon: Sparkles, value: "sparkles" },
  { name: "Star", icon: Star, value: "star" },
  { name: "Heart", icon: Heart, value: "heart" },
  { name: "Bookmark", icon: Bookmark, value: "bookmark" },
  { name: "Target", icon: Target, value: "target" },
  { name: "Zap", icon: Zap, value: "zap" },
  { name: "Trophy", icon: Trophy, value: "trophy" },
];

export function CreateWatchlistModal({ open, onOpenChange }: CreateWatchlistModalProps) {
  const createWatchlist = useCreateWatchlist();
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0].value);
  const [selectedIcon, setSelectedIcon] = useState(ICON_OPTIONS[0].value);

  const form = useForm<CreateWatchlistFormData>({
    resolver: zodResolver(createWatchlistSchema),
    defaultValues: {
      name: "",
      description: "",
      color: PRESET_COLORS[0].value,
      icon: ICON_OPTIONS[0].value,
    },
  });

  const onSubmit = async (data: CreateWatchlistFormData) => {
    try {
      await createWatchlist.mutateAsync({
        name: data.name,
        description: data.description || undefined,
        color: selectedColor,
        icon: selectedIcon,
      });

      // Reset form and close modal
      form.reset();
      setSelectedColor(PRESET_COLORS[0].value);
      setSelectedIcon(ICON_OPTIONS[0].value);
      onOpenChange(false);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  // Get the icon component for preview
  const SelectedIconComponent = ICON_OPTIONS.find(opt => opt.value === selectedIcon)?.icon || Folder;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Watchlist</DialogTitle>
          <DialogDescription>
            Organize your channels into collections for better tracking and analysis.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Preview Card */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: selectedColor }}
                >
                  <SelectedIconComponent className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {form.watch("name") || "Watchlist Name"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {form.watch("description") || "No description"}
                  </p>
                </div>
              </div>
            </div>

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Science Channels, Top Creators..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What kind of content does this watchlist track?"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Color Picker */}
            <div className="space-y-2">
              <FormLabel>Color</FormLabel>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => {
                      setSelectedColor(color.value);
                      form.setValue("color", color.value);
                    }}
                    className="group relative h-8 w-8 rounded-md transition-transform hover:scale-110"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {selectedColor === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Selector */}
            <div className="space-y-2">
              <FormLabel>Icon</FormLabel>
              <div className="grid grid-cols-4 gap-2">
                {ICON_OPTIONS.map((iconOption) => {
                  const IconComponent = iconOption.icon;
                  return (
                    <button
                      key={iconOption.value}
                      type="button"
                      onClick={() => {
                        setSelectedIcon(iconOption.value);
                        form.setValue("icon", iconOption.value);
                      }}
                      className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition-colors hover:border-primary ${
                        selectedIcon === iconOption.value
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                      title={iconOption.name}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="text-xs text-muted-foreground">
                        {iconOption.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={createWatchlist.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createWatchlist.isPending}>
                {createWatchlist.isPending ? (
                  <>
                    <Plus className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Watchlist
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
