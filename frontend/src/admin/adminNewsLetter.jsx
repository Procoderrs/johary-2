// admin/AdminNewsletter.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSubscribers, sendNewsletterEmail } from "../api/newsletter";
import { RiMailSendLine, RiUserLine } from "@remixicon/react";

export default function AdminNewsletter() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { data: subscribers = [] } = useQuery({
    queryKey: ["subscribers"],
    queryFn: () => getSubscribers().then(r => r.data?.data || []),
  });

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) return;
    setSending(true);
    try {
      const res = await sendNewsletterEmail({ subject, message });
      setSuccessMsg(res.data.message);
      setSubject("");
      setMessage("");
    } catch (err) {
      setSuccessMsg("Something went wrong!");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <p className="text-xs uppercase tracking-[4px] text-primary-gold-accent font-medium mb-2">
          Jewelry Admin
        </p>
        <h1 className="text-4xl text-dark-text" style={{ fontFamily: "var(--font-heading)" }}>
          Newsletter
        </h1>
        <p className="text-text-light text-sm mt-2">
          Manage subscribers and send emails
        </p>
      </div>

      {/* STATS */}
      <div className="bg-card border border-border-1 rounded-[30px] p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-bg-4 border border-border-3 flex items-center justify-center text-text-3">
          <RiUserLine size={22} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[3px] text-text-5 mb-1">Total Subscribers</p>
          <p className="text-4xl text-dark-text" style={{ fontFamily: "var(--font-heading)" }}>
            {subscribers.length}
          </p>
        </div>
      </div>

      {/* SEND EMAIL */}
      <div className="bg-card border border-border-1 rounded-[30px] p-8">
        <h2 className="text-2xl text-dark-text mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Send Email to All Subscribers
        </h2>

        <div className="space-y-4">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email Subject"
            className="w-full bg-bg-1 border border-border-2 rounded-2xl px-5 py-3 outline-none focus:border-primary-gold-accent text-dark-text"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Email message... (HTML supported)"
            rows={6}
            className="w-full bg-bg-1 border border-border-2 rounded-2xl px-5 py-4 outline-none focus:border-primary-gold-accent text-dark-text resize-none"
          />

          {successMsg && (
            <p className="text-green-600 text-sm">{successMsg}</p>
          )}

          <button
            onClick={handleSend}
            disabled={sending}
            className="flex items-center gap-2 bg-primary-gold-accent hover:bg-hover-bg text-white px-8 py-3 rounded-full transition disabled:opacity-50"
          >
            <RiMailSendLine size={18} />
            {sending ? "Sending..." : `Send to ${subscribers.length} subscribers`}
          </button>
        </div>
      </div>

      {/* SUBSCRIBERS LIST */}
      <div className="bg-card border border-border-1 rounded-[30px] overflow-hidden">
        <div className="px-8 py-6 border-b border-border-1">
          <h2 className="text-2xl text-dark-text" style={{ fontFamily: "var(--font-heading)" }}>
            Subscribers
          </h2>
        </div>

        {subscribers.length === 0 ? (
          <div className="py-16 text-center text-text-light">
            No subscribers yet
          </div>
        ) : (
          <div className="divide-y divide-border-1">
            {subscribers.map((sub) => (
              <div key={sub._id} className="flex items-center justify-between px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-bg-4 border border-border-3 flex items-center justify-center text-text-3 text-sm font-medium">
                    {sub.email.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-sm text-dark-text">{sub.email}</p>
                </div>
                <p className="text-xs text-text-light">
                  {new Date(sub.createdAt).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric"
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}