"use client";

import { useState, Suspense, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./Contact.module.css";

interface FormData {
  name: string;
  email: string;
  company: string;
  serviceType: string;
  message: string;
  timeline: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  company: "",
  serviceType: "Extended Reality (AR/VR/MR)",
  message: "",
  timeline: "1–3 Months",
};

function getInitialFormData(searchParams: ReturnType<typeof useSearchParams>): FormData {
  const rawService = searchParams.get("service");
  const rawCapability = searchParams.get("capability");

  let matchedService = initialForm.serviceType;
  if (rawService) {
    const s = rawService.toLowerCase();
    if (s.includes("extended reality") || s.includes("xr") || s.includes("vr") || s.includes("ar")) {
      matchedService = "Extended Reality (AR/VR/MR)";
    } else if (s.includes("interactive 3d") && !s.includes("replica")) {
      matchedService = "Interactive 3D Solutions";
    } else if (s.includes("digital environment") || s.includes("replica")) {
      matchedService = "Digital Environments & Replicas";
    } else if (s.includes("simulation") || s.includes("simulxr") || s.includes("training")) {
      matchedService = "SIMULXR Industrial Simulation & Training";
    } else if (s.includes("production") || s.includes("optimization")) {
      matchedService = "3D Content Production & Optimization";
    }
  }

  let initialMsg = initialForm.message;
  if (rawCapability) {
    initialMsg = `Inquiry context: ${rawCapability}${rawService ? ` — ${rawService}` : ""}\n\n`;
  }

  return {
    ...initialForm,
    serviceType: matchedService,
    message: initialMsg,
  };
}

function buildBriefText(data: FormData): string {
  return [
    `Name: ${data.name.trim()}`,
    `Work Email: ${data.email.trim()}`,
    `Company / Organization: ${data.company.trim() || "Not specified"}`,
    `Capability / Focus Area: ${data.serviceType}`,
    `Target Timeline: ${data.timeline}`,
    "",
    "Project Brief & Objectives:",
    data.message.trim(),
  ].join("\n");
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>(() => getInitialFormData(searchParams));
  const [errors, setErrors] = useState<FormErrors>({});
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }
    const email = formData.email.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid work email address.";
    }
    if (!formData.message.trim()) {
      nextErrors.message = "Please provide a brief overview of your project objectives.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(`Project Inquiry: ${formData.serviceType} — ${formData.name.trim()}`);
    const body = encodeURIComponent(buildBriefText(formData));
    window.location.href = `mailto:info@afaqo.tech?subject=${subject}&body=${body}`;
  };

  const handleCopyBrief = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(buildBriefText(formData));
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <form className={styles.inquiryForm} noValidate onSubmit={handleSubmit}>
      {/* Honest Backend Integration Status Notice */}
      <div
        role="region"
        aria-label="Submission Channel Status"
        className={styles.statusNotice}
      >
        <div className={styles.statusNoticeHeader}>
          <span className={styles.statusNoticeDot} aria-hidden="true" />
          <strong className={styles.statusNoticeTitle}>
            Direct Email Dispatch Active
          </strong>
        </div>
        <p className={styles.statusNoticeText}>
          Automated server-side form submission is pending backend configuration. Complete your brief below to open a prefilled email to{" "}
          <a href="mailto:info@afaqo.tech" className={styles.infoValueLink}>
            info@afaqo.tech
          </a>{" "}
          or copy your formatted project brief directly.
        </p>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="contact-name" className={styles.label}>
            Your Name <span className={styles.requiredMark} aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={styles.input}
            placeholder="e.g. Sarah Jenkins"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
          />
          {errors.name && (
            <span id="contact-name-error" role="alert" className={styles.fieldError}>
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contact-email" className={styles.label}>
            Work Email <span className={styles.requiredMark} aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={styles.input}
            placeholder="sarah@company.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
          />
          {errors.email && (
            <span id="contact-email-error" role="alert" className={styles.fieldError}>
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="contact-company" className={styles.label}>
            Company / Organization
          </label>
          <input
            id="contact-company"
            name="organization"
            type="text"
            autoComplete="organization"
            className={styles.input}
            placeholder="e.g. Industrial Automation Corp"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contact-service" className={styles.label}>
            Capability or Focus Area
          </label>
          <select
            id="contact-service"
            name="serviceType"
            className={styles.select}
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
          >
            <option value="Extended Reality (AR/VR/MR)">Extended Reality (AR/VR/MR)</option>
            <option value="Interactive 3D Solutions">Interactive 3D Solutions</option>
            <option value="Digital Environments & Replicas">Digital Environments & Replicas</option>
            <option value="SIMULXR Industrial Simulation & Training">SIMULXR Industrial Simulation & Training</option>
            <option value="3D Content Production & Optimization">3D Content Production & Optimization</option>
            <option value="General Inquiry / Technical Consultation">General Inquiry / Technical Consultation</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contact-timeline" className={styles.label}>
          Target Timeline
        </label>
        <select
          id="contact-timeline"
          name="timeline"
          className={styles.select}
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
        >
          <option value="Immediate / Under 1 Month">Immediate / Under 1 Month</option>
          <option value="1–3 Months">1–3 Months</option>
          <option value="3–6 Months">3–6 Months</option>
          <option value="Exploratory / Planning Stage">Exploratory / Planning Stage</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contact-message" className={styles.label}>
          Project Brief & Objectives <span className={styles.requiredMark} aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          rows={4}
          className={styles.textarea}
          placeholder="Describe your project goals, operational requirements, hardware target, or spatial concept..."
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
        />
        {errors.message && (
          <span id="contact-message-error" role="alert" className={styles.fieldError}>
            {errors.message}
          </span>
        )}
      </div>

      <div className={styles.actionRow}>
        <button type="submit" className={styles.submitBtn}>
          Open Brief in Email Client
        </button>
        <button type="button" onClick={handleCopyBrief} className={styles.secondaryBtn}>
          {copied ? "Brief Copied to Clipboard" : "Copy Formatted Brief"}
        </button>
      </div>

      <p className={styles.privacyCopy}>
        AFAQO treats all technical requirements, facility schematics, and project specifications with professional confidentiality.
      </p>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className={styles.inquiryForm}>Loading inquiry form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
