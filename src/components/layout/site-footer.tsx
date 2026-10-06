import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{profile.role}</p>
      </div>
    </footer>
  );
}
