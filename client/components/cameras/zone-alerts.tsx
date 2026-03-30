"use client";

import { useEffect, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { ShieldAlert, ShieldCheck } from "lucide-react";

const CAMERA_ID = "camera_1";

export function ZoneAlerts() {
  const seen = useRef(new Set<string>());
  const appStartMs = useRef(Date.now());

  useEffect(() => {
    const alertsQ = query(
      collection(db, "zone_alerts"),
      orderBy("created_at_unix_ms", "desc"),
      limit(30)
    );

    const unsubscribe = onSnapshot(
      alertsQ,
      (snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type !== "added") return;

          const id = change.doc.id;
          if (seen.current.has(id)) return;
          seen.current.add(id);

          const ev = change.doc.data();
          if ((ev.created_at_unix_ms || 0) < appStartMs.current - 3000) return;
          if (ev.camera_id !== CAMERA_ID) return;

          if (
            ev.event_type === "barista_absent" &&
            ev.zone_name === "BARISTA_ZONE"
          ) {
            toast.error("Бариста бүсэд бариста алга байна!", {
              description: `Камер: ${ev.camera_id}`,
              duration: 8000,
              icon: <ShieldAlert className="size-5 text-destructive" />,
            });
          }

          if (
            ev.event_type === "barista_returned" &&
            ev.zone_name === "BARISTA_ZONE"
          ) {
            toast.success("Бариста бүсэд бариста буцаж ирлээ", {
              description: `Камер: ${ev.camera_id}`,
              duration: 5000,
              icon: <ShieldCheck className="size-5 text-emerald-500" />,
            });
          }
        });
      },
      (err) => {
        console.error("Zone alerts listener error:", err.message);
      }
    );

    return () => unsubscribe();
  }, []);

  return null;
}
