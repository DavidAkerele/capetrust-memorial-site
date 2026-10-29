import { useState, type FormEvent } from "react";
import type { Obituary, ServiceEvent } from "@/lib/obituaries-data";
import { CMSImagePicker } from "./CMSImagePicker";

interface MemorialEditorProps {
  memorial: Obituary | null;
  onSave: (memorial: Obituary) => Promise<void>;
  onCancel: () => void;
}

const emptyService: ServiceEvent = { title: "", date: "", time: "", location: "", address: "" };

export function MemorialEditor({ memorial, onSave, onCancel }: MemorialEditorProps) {
  const [draft, setDraft] = useState<Obituary>(
    () =>
      memorial ?? {
        id: crypto.randomUUID(),
        slug: "",
        fullName: "",
        title: "",
        dateOfBirth: "",
        dateOfDeath: "",
        age: 0,
        featuredImage: "",
        galleryImages: [],
        lifeStory: "",
        summaryQuote: "",
        familyNote: "",
        services: [],
        candlesCount: 0,
        condolences: [],
        createdAt: new Date().toISOString(),
      },
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [familyApproved, setFamilyApproved] = useState(false);

  const update = <K extends keyof Obituary>(key: K, value: Obituary[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const updateService = (index: number, key: keyof ServiceEvent, value: string) =>
    setDraft((current) => ({
      ...current,
      services: current.services.map((event, eventIndex) =>
        eventIndex === index ? { ...event, [key]: value } : event,
      ),
    }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const slug =
      draft.slug ||
      `${draft.fullName
        .trim()
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}-${draft.id.slice(0, 8)}`;
    try {
      await onSave({
        ...draft,
        slug,
        featuredImage: draft.featuredImage || "/images/og-capetrust.png",
      });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save this memorial.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/15 bg-[#0c172d] px-3 py-2.5 text-sm text-white focus:border-[#e0bd65] focus:outline-hidden";
  const labelClass = "space-y-1.5 text-xs font-semibold text-slate-200";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-[#d8bd75]/30 bg-[#101d38] p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl font-semibold text-white">
            {memorial ? "Edit memorial" : "New memorial"}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Review family details before publishing them publicly.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-slate-300 hover:text-white"
        >
          Cancel
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Full name *
          <input
            className={inputClass}
            value={draft.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            maxLength={160}
            required
          />
        </label>
        <label className={labelClass}>
          Title or honorific
          <input
            className={inputClass}
            value={draft.title || ""}
            onChange={(e) => update("title", e.target.value)}
            maxLength={160}
          />
        </label>
        <label className={labelClass}>
          Date of birth *
          <input
            className={inputClass}
            value={draft.dateOfBirth}
            onChange={(e) => update("dateOfBirth", e.target.value)}
            placeholder="e.g. 14 March 1944"
            required
          />
        </label>
        <label className={labelClass}>
          Date of death *
          <input
            className={inputClass}
            value={draft.dateOfDeath}
            onChange={(e) => update("dateOfDeath", e.target.value)}
            placeholder="e.g. 18 January 2026"
            required
          />
        </label>
        <label className={labelClass}>
          Age
          <input
            className={inputClass}
            type="number"
            min="0"
            max="130"
            value={draft.age || ""}
            onChange={(e) => update("age", Number(e.target.value))}
          />
        </label>
      </div>
      <CMSImagePicker
        label="Portrait image"
        value={draft.featuredImage}
        onChange={(url) => update("featuredImage", url)}
        description="Upload an approved family portrait or paste an image URL."
      />
      <label className={`block ${labelClass}`}>
        Short remembrance
        <input
          className={inputClass}
          value={draft.summaryQuote}
          onChange={(e) => update("summaryQuote", e.target.value)}
          maxLength={300}
        />
      </label>
      <label className={`block ${labelClass}`}>
        Life story *
        <textarea
          className={inputClass}
          rows={8}
          value={draft.lifeStory}
          onChange={(e) => update("lifeStory", e.target.value)}
          required
        />
      </label>
      <label className={`block ${labelClass}`}>
        Family note
        <textarea
          className={inputClass}
          rows={3}
          value={draft.familyNote || ""}
          onChange={(e) => update("familyNote", e.target.value)}
        />
      </label>
      <label className={`block ${labelClass}`}>
        Gallery image URLs, one per line
        <textarea
          className={inputClass}
          rows={3}
          value={draft.galleryImages.join("\n")}
          onChange={(e) =>
            update(
              "galleryImages",
              e.target.value
                .split("\n")
                .map((url) => url.trim())
                .filter(Boolean),
            )
          }
        />
      </label>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">Service events</h4>
          <button
            type="button"
            onClick={() => update("services", [...draft.services, { ...emptyService }])}
            className="text-xs font-semibold text-[#e0bd65]"
          >
            Add event
          </button>
        </div>
        {draft.services.map((service, index) => (
          <div
            key={index}
            className="grid gap-3 rounded-lg border border-white/10 p-3 sm:grid-cols-2"
          >
            {(["title", "date", "time", "location", "address"] as const).map((key) => (
              <label key={key} className={labelClass}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
                <input
                  className={inputClass}
                  value={service[key]}
                  onChange={(e) => updateService(index, key, e.target.value)}
                />
              </label>
            ))}
            <button
              type="button"
              onClick={() =>
                update(
                  "services",
                  draft.services.filter((_, i) => i !== index),
                )
              }
              className="self-end text-left text-xs text-rose-300"
            >
              Remove event
            </button>
          </div>
        ))}
      </div>
      {error && (
        <p role="alert" className="text-xs text-rose-300">
          {error}
        </p>
      )}
      <label className="flex items-start gap-2 text-xs leading-5 text-slate-200">
        <input
          type="checkbox"
          checked={familyApproved}
          onChange={(event) => setFamilyApproved(event.target.checked)}
          required
        />
        I confirm the family has approved these memorial details and images for public display.
      </label>
      <button
        type="submit"
        disabled={saving || !familyApproved}
        className="rounded-lg bg-[#e0bd65] px-5 py-2.5 text-sm font-bold text-[#102044] disabled:opacity-50"
      >
        {saving ? "Publishing…" : memorial ? "Save memorial" : "Publish memorial"}
      </button>
    </form>
  );
}
