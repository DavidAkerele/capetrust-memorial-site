export interface CondolenceMessage {
  id: string;
  name: string;
  relationship: string;
  message: string;
  date: string;
}

export interface ServiceEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
}

export interface Obituary {
  id: string;
  slug: string;
  fullName: string;
  title?: string;
  dateOfBirth: string;
  dateOfDeath: string;
  age: number;
  featuredImage: string;
  galleryImages: string[];
  lifeStory: string;
  summaryQuote: string;
  familyNote?: string;
  services: ServiceEvent[];
  candlesCount: number;
  condolences: CondolenceMessage[];
  createdAt: string;
}

export interface MemorialSubmission {
  id: string;
  submitter_name: string;
  submitter_relationship: string;
  submitter_email: string;
  submitter_phone: string;
  full_name: string;
  title: string;
  date_of_birth: string;
  date_of_death: string;
  age: number | null;
  summary_quote: string;
  life_story: string;
  family_note: string;
  services: ServiceEvent[];
  status: "pending" | "published" | "declined";
  published_slug: string | null;
  created_at: string;
  reviewed_at: string | null;
}

export type NewMemorialSubmission = Pick<
  MemorialSubmission,
  | "submitter_name"
  | "submitter_relationship"
  | "submitter_email"
  | "submitter_phone"
  | "full_name"
  | "title"
  | "date_of_birth"
  | "date_of_death"
  | "age"
  | "summary_quote"
  | "life_story"
  | "family_note"
  | "services"
>;

import { getSupabaseClient } from "@/lib/supabase";

export async function submitMemorialForReview(submission: NewMemorialSubmission): Promise<void> {
  const client = getSupabaseClient();
  if (!client)
    throw new Error("Memorial submissions are temporarily unavailable. Please try again later.");
  const { error } = await client.from("memorial_submissions").insert(submission);
  if (error) throw error;
}

export async function getPendingMemorialSubmissions(): Promise<MemorialSubmission[]> {
  const client = getSupabaseClient();
  if (!client) throw new Error("The shared database is not configured.");
  const { data, error } = await client
    .from("memorial_submissions")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []) as MemorialSubmission[];
}

export function submissionToObituary(submission: MemorialSubmission): Obituary {
  return {
    id: submission.id,
    slug: `${submission.full_name
      .trim()
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}-${submission.id.slice(0, 8)}`,
    fullName: submission.full_name,
    title: submission.title,
    dateOfBirth: submission.date_of_birth,
    dateOfDeath: submission.date_of_death,
    age: submission.age ?? 0,
    featuredImage: "",
    galleryImages: [],
    lifeStory: submission.life_story,
    summaryQuote: submission.summary_quote,
    familyNote: submission.family_note,
    services: submission.services,
    candlesCount: 0,
    condolences: [],
    createdAt: submission.created_at,
  };
}

export async function publishMemorialSubmission(
  submission: MemorialSubmission,
  memorial: Obituary,
): Promise<void> {
  const client = getSupabaseClient();
  if (!client) throw new Error("The shared database is not configured.");
  await saveObituary(memorial);
  const { data, error } = await client
    .from("memorial_submissions")
    .update({
      status: "published",
      published_slug: memorial.slug,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", submission.id)
    .eq("status", "pending")
    .select("id")
    .single();
  if (error || !data)
    throw (
      error ||
      new Error(
        "The memorial was saved, but its submission status could not be updated. Please retry.",
      )
    );
}

export async function declineMemorialSubmission(id: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client) throw new Error("The shared database is not configured.");
  const { data, error } = await client
    .from("memorial_submissions")
    .update({ status: "declined", reviewed_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "pending")
    .select("id")
    .single();
  if (error || !data) throw error || new Error("Could not decline this submission.");
}

export async function getStoredObituaries(): Promise<Obituary[]> {
  const client = getSupabaseClient();
  if (!client) return [];
  const [memorials, tributes] = await Promise.all([
    client
      .from("memorials")
      .select("slug, content, candles_count")
      .order("created_at", { ascending: false }),
    client
      .from("condolences")
      .select("id, slug, name, relationship, message, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false }),
  ]);
  if (memorials.error) throw memorials.error;
  if (tributes.error) throw tributes.error;
  return (memorials.data || []).map((row) => ({
    ...(row.content as Obituary),
    slug: row.slug,
    candlesCount: row.candles_count,
    condolences: (tributes.data || [])
      .filter((item) => item.slug === row.slug)
      .map((item) => ({
        id: item.id,
        name: item.name,
        relationship: item.relationship,
        message: item.message,
        date: new Date(item.created_at).toLocaleDateString("en-NG", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      })),
  }));
}

export async function saveObituary(obituary: Obituary): Promise<void> {
  const client = getSupabaseClient();
  if (!client) throw new Error("The shared database is not configured.");
  const { condolences: _condolences, candlesCount: _candlesCount, ...content } = obituary;
  const { error } = await client.from("memorials").upsert({ slug: obituary.slug, content });
  if (error) throw error;
}

export async function deleteObituary(slug: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client) throw new Error("The shared database is not configured.");
  const { error } = await client.from("memorials").delete().eq("slug", slug);
  if (error) throw error;
}

export async function getObituaryBySlug(slug: string): Promise<Obituary | undefined> {
  const client = getSupabaseClient();
  if (!client) return undefined;
  const [memorial, tributes] = await Promise.all([
    client.from("memorials").select("slug, content, candles_count").eq("slug", slug).maybeSingle(),
    client
      .from("condolences")
      .select("id, name, relationship, message, created_at")
      .eq("slug", slug)
      .eq("approved", true)
      .order("created_at", { ascending: false }),
  ]);
  if (memorial.error) throw memorial.error;
  if (tributes.error) throw tributes.error;
  if (!memorial.data) return undefined;
  return {
    ...(memorial.data.content as Obituary),
    slug: memorial.data.slug,
    candlesCount: memorial.data.candles_count,
    condolences: (tributes.data || []).map((item) => ({
      id: item.id,
      name: item.name,
      relationship: item.relationship,
      message: item.message,
      date: new Date(item.created_at).toLocaleDateString("en-NG", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    })),
  };
}

export async function addCondolence(
  slug: string,
  condolence: Omit<CondolenceMessage, "id" | "date">,
): Promise<void> {
  const client = getSupabaseClient();
  if (!client)
    throw new Error("Tribute submissions are unavailable until the shared database is connected.");
  const { error } = await client.from("condolences").insert({
    slug,
    name: condolence.name,
    relationship: condolence.relationship,
    message: condolence.message,
  });
  if (error) throw error;
}

export async function incrementCandle(slug: string): Promise<number> {
  const client = getSupabaseClient();
  if (!client)
    throw new Error("Candle lighting is unavailable until the shared database is connected.");
  let visitorId = localStorage.getItem("capetrust_visitor_id");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("capetrust_visitor_id", visitorId);
  }
  const { data, error } = await client.rpc("light_memorial_candle", {
    memorial_slug: slug,
    visitor_id: visitorId,
  });
  if (error) throw error;
  return Number(data);
}

export interface PendingCondolence {
  id: string;
  slug: string;
  name: string;
  relationship: string;
  message: string;
  created_at: string;
}

export async function getPendingCondolences(): Promise<PendingCondolence[]> {
  const client = getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("condolences")
    .select("id, slug, name, relationship, message, created_at")
    .eq("approved", false)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function approveCondolence(id: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client) throw new Error("The shared database is not configured.");
  const { error } = await client.from("condolences").update({ approved: true }).eq("id", id);
  if (error) throw error;
}

export async function deleteCondolence(id: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client) throw new Error("The shared database is not configured.");
  const { error } = await client.from("condolences").delete().eq("id", id);
  if (error) throw error;
}
