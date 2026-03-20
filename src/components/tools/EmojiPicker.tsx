"use client";

import { useState, useCallback, useEffect } from "react";

/* ── Emoji data ─────────────────────────────────────────────────── */

interface EmojiItem {
  emoji: string;
  name: string;
}

const CATEGORIES: Record<string, EmojiItem[]> = {
  Smileys: [
    { emoji: "\u{1F600}", name: "Grinning Face" },
    { emoji: "\u{1F603}", name: "Smiley" },
    { emoji: "\u{1F604}", name: "Smile" },
    { emoji: "\u{1F601}", name: "Beaming Face" },
    { emoji: "\u{1F606}", name: "Laughing" },
    { emoji: "\u{1F605}", name: "Sweat Smile" },
    { emoji: "\u{1F602}", name: "Joy" },
    { emoji: "\u{1F923}", name: "ROFL" },
    { emoji: "\u{1F62D}", name: "Crying" },
    { emoji: "\u{1F609}", name: "Wink" },
    { emoji: "\u{1F60A}", name: "Blush" },
    { emoji: "\u{1F60E}", name: "Sunglasses" },
    { emoji: "\u{1F914}", name: "Thinking" },
    { emoji: "\u{1F60D}", name: "Heart Eyes" },
    { emoji: "\u{1F618}", name: "Kissing Heart" },
    { emoji: "\u{1F917}", name: "Hugging" },
    { emoji: "\u{1F644}", name: "Eye Roll" },
    { emoji: "\u{1F612}", name: "Unamused" },
    { emoji: "\u{1F624}", name: "Angry" },
    { emoji: "\u{1F621}", name: "Rage" },
    { emoji: "\u{1F622}", name: "Crying Face" },
    { emoji: "\u{1F62E}", name: "Open Mouth" },
    { emoji: "\u{1F631}", name: "Scream" },
    { emoji: "\u{1F634}", name: "Sleeping" },
    { emoji: "\u{1F637}", name: "Mask" },
    { emoji: "\u{1F92F}", name: "Mind Blown" },
    { emoji: "\u{1F973}", name: "Party Face" },
    { emoji: "\u{1F970}", name: "Smiling with Hearts" },
    { emoji: "\u{1F975}", name: "Hot Face" },
    { emoji: "\u{1F976}", name: "Cold Face" },
  ],
  People: [
    { emoji: "\u{1F44D}", name: "Thumbs Up" },
    { emoji: "\u{1F44E}", name: "Thumbs Down" },
    { emoji: "\u{1F44F}", name: "Clap" },
    { emoji: "\u{1F64F}", name: "Pray" },
    { emoji: "\u{1F4AA}", name: "Flexed Biceps" },
    { emoji: "\u{1F91D}", name: "Handshake" },
    { emoji: "\u270C\uFE0F", name: "Victory" },
    { emoji: "\u{1F918}", name: "Rock On" },
    { emoji: "\u{1F44B}", name: "Wave" },
    { emoji: "\u{1F91F}", name: "Love You" },
    { emoji: "\u261D\uFE0F", name: "Point Up" },
    { emoji: "\u{1F448}", name: "Point Left" },
    { emoji: "\u{1F449}", name: "Point Right" },
    { emoji: "\u{1F446}", name: "Point Up 2" },
    { emoji: "\u{1F447}", name: "Point Down" },
    { emoji: "\u{1F596}", name: "Vulcan" },
    { emoji: "\u{1F64B}", name: "Raising Hand" },
    { emoji: "\u{1F647}", name: "Bow" },
    { emoji: "\u{1F926}", name: "Facepalm" },
    { emoji: "\u{1F937}", name: "Shrug" },
  ],
  Animals: [
    { emoji: "\u{1F436}", name: "Dog" },
    { emoji: "\u{1F431}", name: "Cat" },
    { emoji: "\u{1F42D}", name: "Mouse" },
    { emoji: "\u{1F439}", name: "Hamster" },
    { emoji: "\u{1F430}", name: "Rabbit" },
    { emoji: "\u{1F43B}", name: "Bear" },
    { emoji: "\u{1F43C}", name: "Panda" },
    { emoji: "\u{1F428}", name: "Koala" },
    { emoji: "\u{1F42F}", name: "Tiger" },
    { emoji: "\u{1F981}", name: "Lion" },
    { emoji: "\u{1F984}", name: "Unicorn" },
    { emoji: "\u{1F40E}", name: "Horse" },
    { emoji: "\u{1F437}", name: "Pig" },
    { emoji: "\u{1F438}", name: "Frog" },
    { emoji: "\u{1F427}", name: "Penguin" },
    { emoji: "\u{1F426}", name: "Bird" },
    { emoji: "\u{1F985}", name: "Eagle" },
    { emoji: "\u{1F99C}", name: "Parrot" },
    { emoji: "\u{1F40B}", name: "Whale" },
    { emoji: "\u{1F422}", name: "Turtle" },
  ],
  Food: [
    { emoji: "\u{1F34E}", name: "Apple" },
    { emoji: "\u{1F34C}", name: "Banana" },
    { emoji: "\u{1F347}", name: "Grapes" },
    { emoji: "\u{1F353}", name: "Strawberry" },
    { emoji: "\u{1F349}", name: "Watermelon" },
    { emoji: "\u{1F354}", name: "Hamburger" },
    { emoji: "\u{1F355}", name: "Pizza" },
    { emoji: "\u{1F32E}", name: "Taco" },
    { emoji: "\u{1F35F}", name: "Fries" },
    { emoji: "\u{1F363}", name: "Sushi" },
    { emoji: "\u{1F370}", name: "Cake" },
    { emoji: "\u{1F369}", name: "Donut" },
    { emoji: "\u2615", name: "Coffee" },
    { emoji: "\u{1F37A}", name: "Beer" },
    { emoji: "\u{1F377}", name: "Wine" },
    { emoji: "\u{1F382}", name: "Birthday Cake" },
    { emoji: "\u{1F36B}", name: "Chocolate" },
    { emoji: "\u{1F950}", name: "Croissant" },
    { emoji: "\u{1F96A}", name: "Sandwich" },
    { emoji: "\u{1F35D}", name: "Spaghetti" },
  ],
  Travel: [
    { emoji: "\u{1F697}", name: "Car" },
    { emoji: "\u{1F68C}", name: "Bus" },
    { emoji: "\u{1F682}", name: "Train" },
    { emoji: "\u2708\uFE0F", name: "Airplane" },
    { emoji: "\u{1F680}", name: "Rocket" },
    { emoji: "\u{1F6F3}\uFE0F", name: "Ship" },
    { emoji: "\u{1F3D6}\uFE0F", name: "Beach" },
    { emoji: "\u{1F3D4}\uFE0F", name: "Mountain" },
    { emoji: "\u{1F3E0}", name: "House" },
    { emoji: "\u{1F3E2}", name: "Office" },
    { emoji: "\u{1F3EB}", name: "School" },
    { emoji: "\u{1F3E5}", name: "Hospital" },
    { emoji: "\u26FD", name: "Fuel Pump" },
    { emoji: "\u{1F5FC}", name: "Tokyo Tower" },
    { emoji: "\u{1F5FD}", name: "Statue of Liberty" },
    { emoji: "\u{1F30D}", name: "Globe" },
    { emoji: "\u{1F3DD}\uFE0F", name: "Island" },
    { emoji: "\u{1F3D5}\uFE0F", name: "Camping" },
    { emoji: "\u{1F6B2}", name: "Bicycle" },
    { emoji: "\u{1F3CE}\uFE0F", name: "Race Car" },
  ],
  Activities: [
    { emoji: "\u26BD", name: "Soccer" },
    { emoji: "\u{1F3C0}", name: "Basketball" },
    { emoji: "\u{1F3C8}", name: "Football" },
    { emoji: "\u26BE", name: "Baseball" },
    { emoji: "\u{1F3BE}", name: "Tennis" },
    { emoji: "\u{1F3D3}", name: "Ping Pong" },
    { emoji: "\u{1F3B3}", name: "Bowling" },
    { emoji: "\u{1F3AE}", name: "Video Game" },
    { emoji: "\u{1F3B2}", name: "Dice" },
    { emoji: "\u{1F3A8}", name: "Art" },
    { emoji: "\u{1F3B5}", name: "Music" },
    { emoji: "\u{1F3A4}", name: "Microphone" },
    { emoji: "\u{1F3AC}", name: "Clapper" },
    { emoji: "\u{1F3AD}", name: "Theater" },
    { emoji: "\u{1F3C6}", name: "Trophy" },
    { emoji: "\u{1F3C5}", name: "Medal" },
    { emoji: "\u{1F6B4}", name: "Cycling" },
    { emoji: "\u{1F3CA}", name: "Swimming" },
    { emoji: "\u{1F3CB}\uFE0F", name: "Weight Lifting" },
    { emoji: "\u{1F9D8}", name: "Yoga" },
  ],
  Objects: [
    { emoji: "\u{1F4F1}", name: "Phone" },
    { emoji: "\u{1F4BB}", name: "Laptop" },
    { emoji: "\u{1F5A5}\uFE0F", name: "Desktop" },
    { emoji: "\u2328\uFE0F", name: "Keyboard" },
    { emoji: "\u{1F4F7}", name: "Camera" },
    { emoji: "\u{1F4FA}", name: "TV" },
    { emoji: "\u{1F4A1}", name: "Light Bulb" },
    { emoji: "\u{1F50B}", name: "Battery" },
    { emoji: "\u{1F50C}", name: "Electric Plug" },
    { emoji: "\u{1F4E7}", name: "Email" },
    { emoji: "\u{1F4DA}", name: "Books" },
    { emoji: "\u{1F4DD}", name: "Memo" },
    { emoji: "\u{1F512}", name: "Lock" },
    { emoji: "\u{1F511}", name: "Key" },
    { emoji: "\u2699\uFE0F", name: "Gear" },
    { emoji: "\u{1F50D}", name: "Magnifier" },
    { emoji: "\u{1F4CE}", name: "Paperclip" },
    { emoji: "\u{1F4CB}", name: "Clipboard" },
    { emoji: "\u{1F4C5}", name: "Calendar" },
    { emoji: "\u{1F4B0}", name: "Money Bag" },
  ],
  Symbols: [
    { emoji: "\u2764\uFE0F", name: "Red Heart" },
    { emoji: "\u{1F49B}", name: "Yellow Heart" },
    { emoji: "\u{1F49A}", name: "Green Heart" },
    { emoji: "\u{1F499}", name: "Blue Heart" },
    { emoji: "\u{1F49C}", name: "Purple Heart" },
    { emoji: "\u2705", name: "Check Mark" },
    { emoji: "\u274C", name: "Cross Mark" },
    { emoji: "\u2B50", name: "Star" },
    { emoji: "\u{1F525}", name: "Fire" },
    { emoji: "\u{1F4AF}", name: "100" },
    { emoji: "\u26A0\uFE0F", name: "Warning" },
    { emoji: "\u267B\uFE0F", name: "Recycle" },
    { emoji: "\u{1F6AB}", name: "Prohibited" },
    { emoji: "\u2049\uFE0F", name: "Exclamation" },
    { emoji: "\u2753", name: "Question Mark" },
    { emoji: "\u{1F4A4}", name: "Zzz" },
    { emoji: "\u{1F4AC}", name: "Speech Bubble" },
    { emoji: "\u{1F4A5}", name: "Collision" },
    { emoji: "\u267E\uFE0F", name: "Infinity" },
    { emoji: "\u269B\uFE0F", name: "Atom" },
  ],
  Flags: [
    { emoji: "\u{1F1FA}\u{1F1F8}", name: "USA" },
    { emoji: "\u{1F1EC}\u{1F1E7}", name: "UK" },
    { emoji: "\u{1F1E8}\u{1F1E6}", name: "Canada" },
    { emoji: "\u{1F1E6}\u{1F1FA}", name: "Australia" },
    { emoji: "\u{1F1E9}\u{1F1EA}", name: "Germany" },
    { emoji: "\u{1F1EB}\u{1F1F7}", name: "France" },
    { emoji: "\u{1F1EF}\u{1F1F5}", name: "Japan" },
    { emoji: "\u{1F1F0}\u{1F1F7}", name: "Korea" },
    { emoji: "\u{1F1E7}\u{1F1F7}", name: "Brazil" },
    { emoji: "\u{1F1EE}\u{1F1F3}", name: "India" },
    { emoji: "\u{1F1EE}\u{1F1F9}", name: "Italy" },
    { emoji: "\u{1F1EA}\u{1F1F8}", name: "Spain" },
    { emoji: "\u{1F1F2}\u{1F1FD}", name: "Mexico" },
    { emoji: "\u{1F1F3}\u{1F1F1}", name: "Netherlands" },
    { emoji: "\u{1F1F8}\u{1F1EA}", name: "Sweden" },
    { emoji: "\u{1F1E8}\u{1F1ED}", name: "Switzerland" },
    { emoji: "\u{1F3F3}\uFE0F", name: "White Flag" },
    { emoji: "\u{1F3F4}", name: "Black Flag" },
    { emoji: "\u{1F3C1}", name: "Checkered Flag" },
    { emoji: "\u{1F6A9}", name: "Triangular Flag" },
  ],
};

const RECENT_KEY = "emoji-picker-recent";

export default function EmojiPicker() {
  const [activeCategory, setActiveCategory] = useState("Smileys");
  const [search, setSearch] = useState("");
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  const [recent, setRecent] = useState<EmojiItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) setRecent(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  const copyEmoji = useCallback(
    async (item: EmojiItem) => {
      await navigator.clipboard.writeText(item.emoji);
      setCopiedEmoji(item.emoji);
      setTimeout(() => setCopiedEmoji(null), 1000);

      // Update recent
      setRecent((prev) => {
        const filtered = prev.filter((e) => e.emoji !== item.emoji);
        const updated = [item, ...filtered].slice(0, 20);
        try {
          localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
        } catch {
          /* ignore */
        }
        return updated;
      });
    },
    []
  );

  // Build filtered list
  const allEmojis = Object.values(CATEGORIES).flat();
  const filtered = search.trim()
    ? allEmojis.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.emoji.includes(search)
      )
    : null;

  const displayEmojis = filtered || CATEGORIES[activeCategory] || [];

  const categoryNames = Object.keys(CATEGORIES);

  return (
    <div className="space-y-6">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search emojis..."
        className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />

      {/* Category tabs */}
      {!filtered && (
        <div className="flex flex-wrap gap-2">
          {categoryNames.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "border border-border bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Recently used */}
      {!filtered && recent.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Recently Used
          </p>
          <div className="grid grid-cols-8 gap-1 sm:grid-cols-10 md:grid-cols-12">
            {recent.map((item, i) => (
              <button
                key={`recent-${i}`}
                onClick={() => copyEmoji(item)}
                title={item.name}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-colors hover:bg-muted ${
                  copiedEmoji === item.emoji ? "bg-primary/10" : ""
                }`}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Emoji grid */}
      <div>
        {filtered && (
          <p className="mb-2 text-sm text-muted-foreground">
            {displayEmojis.length} result{displayEmojis.length !== 1 ? "s" : ""} for &quot;{search}&quot;
          </p>
        )}
        <div className="grid grid-cols-8 gap-1 sm:grid-cols-10 md:grid-cols-12">
          {displayEmojis.map((item, i) => (
            <button
              key={`${item.emoji}-${i}`}
              onClick={() => copyEmoji(item)}
              title={`${item.name} (click to copy)`}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-colors hover:bg-muted ${
                copiedEmoji === item.emoji ? "bg-primary/10" : ""
              }`}
            >
              {item.emoji}
            </button>
          ))}
        </div>
        {displayEmojis.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No emojis found.
          </p>
        )}
      </div>

      {copiedEmoji && (
        <p className="text-center text-sm text-primary">Copied to clipboard!</p>
      )}
    </div>
  );
}
