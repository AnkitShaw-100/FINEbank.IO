import React, { useEffect, useState } from "react";

const STORAGE_KEY = "finebank_settings_v1";

const emailIsValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const SettingsPage = () => {
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    language: "en",
    theme: "light",
    notifications: {
      email: true,
      sms: false,
      app: true,
    },
  });
  const [original, setOriginal] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setForm(parsed);
        setOriginal(parsed);
      } else {
        setOriginal(form);
      }
    } catch {
      setOriginal(form);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateField(path, value) {
    setForm((prev) => {
      const next = { ...prev };
      if (path.includes(".")) {
        const [a, b] = path.split(".");
        next[a] = { ...next[a], [b]: value };
      } else {
        next[path] = value;
      }
      return next;
    });
  }

  function save(e) {
    e.preventDefault();
    if (!emailIsValid(form.email)) {
      setError("Please enter a valid email");
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      setOriginal(form);
      setSaved(true);
      setError("");
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("save error", err);
      setError("Unable to save settings");
    }
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    const def = {
      displayName: "",
      email: "",
      language: "en",
      theme: "light",
      notifications: { email: true, sms: false, app: true },
    };
    setForm(def);
    setOriginal(def);
  }

  const isDirty = original
    ? JSON.stringify(original) !== JSON.stringify(form)
    : false;

  const initials = (() => {
    const name = form.displayName || form.email || "";
    return (
      name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0].toUpperCase())
        .slice(0, 2)
        .join("") || "FB"
    );
  })();

  return (
    <div className="page settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>

      <form className="card settings-card improved" onSubmit={save}>
        {saved && <div className="save-toast">Settings saved</div>}
        <div className="settings-grid">
          <aside className="settings-left card profile-card">
            <div className="avatar-large">{initials}</div>
            <h3 className="profile-name">{form.displayName || "Your name"}</h3>
            <div className="profile-email muted">
              {form.email || "your@email.com"}
            </div>
            <p className="profile-note muted">
              Manage your personal details and account preferences here.
            </p>
          </aside>

          <div className="settings-right">
            <section className="settings-section card">
              <h3>Profile</h3>
              <label>Display name</label>
              <input
                value={form.displayName}
                onChange={(e) => updateField("displayName", e.target.value)}
                placeholder="Your name"
              />

              <label>Email</label>
              <input
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@email.com"
              />
              {!emailIsValid(form.email) && form.email && (
                <div className="field-error">Invalid email format</div>
              )}

              {/* Language selection removed as requested */}
            </section>

            <section className="settings-section card">
              <h3>Preferences</h3>
              <label>Theme</label>
              <div className="theme-options">
                <button
                  type="button"
                  className={`theme-pill ${
                    form.theme === "light" ? "active" : ""
                  }`}
                  onClick={() => updateField("theme", "light")}
                >
                  Light
                </button>
                <button
                  type="button"
                  className={`theme-pill ${
                    form.theme === "dark" ? "active" : ""
                  }`}
                  onClick={() => updateField("theme", "dark")}
                >
                  Dark
                </button>
              </div>

              <h4 style={{ marginTop: 12 }}>Notifications</h4>
              <label className="toggle">
                {" "}
                <input
                  type="checkbox"
                  checked={!!form.notifications.email}
                  onChange={(e) =>
                    updateField("notifications.email", e.target.checked)
                  }
                />{" "}
                Email notifications
              </label>
              <label className="toggle">
                {" "}
                <input
                  type="checkbox"
                  checked={!!form.notifications.sms}
                  onChange={(e) =>
                    updateField("notifications.sms", e.target.checked)
                  }
                />{" "}
                SMS notifications
              </label>
              <label className="toggle">
                {" "}
                <input
                  type="checkbox"
                  checked={!!form.notifications.app}
                  onChange={(e) =>
                    updateField("notifications.app", e.target.checked)
                  }
                />{" "}
                In-app notifications
              </label>
            </section>
          </div>
        </div>

        <div className="settings-actions">
          <button type="button" className="btn ghost" onClick={reset}>
            Reset
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {error && <div className="field-error">{error}</div>}
            <button className="btn primary" type="submit" disabled={!isDirty}>
              Save settings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
