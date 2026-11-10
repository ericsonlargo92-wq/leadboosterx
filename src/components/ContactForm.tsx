import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { CONTACT } from "~/lib/config";
import { submitContact } from "~/lib/contact";
import { BUDGET_OPTIONS, HELP_OPTIONS, contactSchema, type ContactInput } from "~/lib/contact-schema";
import { btnPrimary, cx, focusRing } from "~/lib/ui";

type Status = "idle" | "sending" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMPTY: Required<ContactInput> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  business: "",
  website: "",
  help: [],
  budget: "",
  message: "",
  company_website: "",
};

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30 aria-[invalid=true]:border-destructive";

export function ContactForm() {
  const [values, setValues] = useState<Required<ContactInput>>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = <K extends keyof ContactInput>(key: K, value: Required<ContactInput>[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleHelp = (opt: (typeof HELP_OPTIONS)[number]) =>
    set("help", values.help.includes(opt) ? values.help.filter((h) => h !== opt) : [...values.help, opt]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await submitContact({ data: values });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[28rem] flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center" role="status">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-success/12 text-success">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-2xl font-bold">Message sent</h3>
        <p className="mt-2">Thanks — I'll reply within one business day.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cx("mt-6 rounded text-sm font-semibold text-primary hover:underline", focusRing)}
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-2xl border border-border bg-surface p-6 md:p-8" aria-labelledby="cf-title">
      <h3 id="cf-title" className="text-xl font-bold">
        Discovery form
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">Fields marked * are required.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="firstName" label="First name" required error={errors.firstName}>
          {(p) => <input {...p} autoComplete="given-name" value={values.firstName} onChange={(e) => set("firstName", e.target.value)} />}
        </Field>
        <Field id="lastName" label="Last name" required error={errors.lastName}>
          {(p) => <input {...p} autoComplete="family-name" value={values.lastName} onChange={(e) => set("lastName", e.target.value)} />}
        </Field>
        <Field id="email" label="Email" required error={errors.email} className="sm:col-span-2">
          {(p) => <input {...p} type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} />}
        </Field>
        <Field id="phone" label="Phone" hint="optional" error={errors.phone}>
          {(p) => <input {...p} type="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} />}
        </Field>
        <Field id="business" label="Business name" hint="optional" error={errors.business}>
          {(p) => <input {...p} autoComplete="organization" value={values.business} onChange={(e) => set("business", e.target.value)} />}
        </Field>
        <Field id="website" label="Website or Facebook page" hint="optional" error={errors.website} className="sm:col-span-2">
          {(p) => <input {...p} type="text" inputMode="url" placeholder="https://" value={values.website} onChange={(e) => set("website", e.target.value)} />}
        </Field>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-foreground">What do you need help with?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {HELP_OPTIONS.map((opt) => {
            const on = values.help.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={on}
                onClick={() => toggleHelp(opt)}
                className={cx(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  on ? "border-primary bg-soft text-primary" : "border-border bg-background text-body hover:bg-hover",
                  focusRing,
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5">
        <Field id="budget" label="Monthly ad budget" error={errors.budget}>
          {(p) => (
            <select {...p} value={values.budget} onChange={(e) => set("budget", e.target.value as Required<ContactInput>["budget"])}>
              <option value="">Select one…</option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <div className="mt-4">
        <Field id="message" label="Tell me about your business and where leads get stuck" required error={errors.message}>
          {(p) => <textarea {...p} rows={5} value={values.message} onChange={(e) => set("message", e.target.value)} />}
        </Field>
      </div>

      {/* Honeypot: hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="cf-company_website">Company website</label>
        <input
          id="cf-company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company_website}
          onChange={(e) => set("company_website", e.target.value)}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/8 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            Something went wrong. Email me directly at{" "}
            <a href={`mailto:${CONTACT.email}`} className="font-semibold underline">
              {CONTACT.email}
            </a>
            .
          </span>
        </p>
      )}

      <button type="submit" disabled={sending} className={cx(btnPrimary, "mt-6 w-full sm:w-auto")}>
        {sending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
        {sending ? "Sending…" : "Send Message"}
      </button>
      <p className="mt-3 text-xs text-muted-foreground">
        Your details are only used to reply to you. See the{" "}
        <Link to="/privacy" className={cx("rounded underline hover:text-primary", focusRing)}>
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

type FieldProps = {
  id: keyof ContactInput;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (p: {
    id: string;
    name: string;
    className: string;
    required?: boolean;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
  }) => ReactNode;
};

function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  const uid = useId();
  const inputId = `cf-${id}`;
  const errId = `${uid}-err`;
  return (
    <div className={className}>
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
        {hint && <span className="ml-1 font-normal text-muted-foreground">({hint})</span>}
      </label>
      {children({
        id: inputId,
        name: id,
        className: inputClass,
        required,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errId : undefined,
      })}
      {error && (
        <p id={errId} className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
