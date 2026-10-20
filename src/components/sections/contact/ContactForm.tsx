"use client";

import { useState } from "react";
import styles from "./Contact.module.css";

interface FormData {
  name: string;
  email: string;
  company: string;
  serviceType: string;
  message: string;
  timeline: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  company: "",
  serviceType: "Extended Reality (AR/VR/MR)",
  message: "",
  timeline: "1–3 Months",
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialForm);

  return (
    <form className={styles.inquiryForm} noValidate onSubmit={(e) => e.preventDefault()}>
      {/* Honest Backend Integration Status Notice */}
      <div
        role="region"
        aria-label="Submission Channel Status"
        style={{
          backgroundColor: "rgba(5, 13, 36, 0.04)",
          border: "1px solid rgba(5, 13, 36, 0.12)",
          borderRadius: "0.75rem",
          padding: "1.25rem",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#EAB308",
              display: "inline-block",
            }}
            aria-hidden="true"
          />
          <strong style={{ fontSize: "0.85rem", color: "var(--color-brand-navy, #050D24)" }}>
            Online Dispatch Pending Integration
          </strong>
        </div>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#606676", lineHeight: 1.5 }}>
          Direct online submission is temporarily paused while production delivery infrastructure is being verified.
          Draft your brief below for reference when connecting with our Cairo technical team.
        </p>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="contact-name" className={styles.label}>
            Your Name <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            aria-required="true"
            className={styles.input}
            placeholder="e.g. Sarah Jenkins"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contact-email" className={styles.label}>
            Work Email <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            aria-required="true"
            className={styles.input}
            placeholder="sarah@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="contact-company" className={styles.label}>
            Company / Organization
          </label>
          <input
            id="contact-company"
            type="text"
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
          Project Brief & Objectives <span className={styles.requiredMark}>*</span>
        </label>
        <textarea
          id="contact-message"
          required
          aria-required="true"
          rows={4}
          className={styles.textarea}
          placeholder="Describe your project goals, operational requirements, hardware target, or spatial concept..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button
        type="button"
        disabled
        className={styles.submitBtn}
        style={{
          opacity: 0.65,
          cursor: "not-allowed",
          backgroundColor: "#4B5563",
        }}
        aria-disabled="true"
      >
        Online Submission Disabled (Awaiting Verified Delivery Channel)
      </button>

      <p className={styles.privacyCopy}>
        AFAQO treats all technical requirements, facility schematics, and project specifications with professional confidentiality.
      </p>
    </form>
  );
}
