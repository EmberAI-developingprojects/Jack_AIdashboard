"use client";

import { useEffect, useState, useRef } from "react";
import { doc, onSnapshot, type FirestoreError } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera, Users, Coffee, Clock, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraData {
  camera_id: string;
  updated_at_unix_ms: number;
  zone_counts: {
    BARISTA_ZONE: number;
    CUSTOMER_ZONE: number;
  };
}

function formatTimestamp(unixMs: number): string {
  return new Date(unixMs).toLocaleString("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function CameraList() {
  const [data, setData] = useState<CameraData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState(false);
  const prevTimestamp = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "zone_counts", "live"),
      (snapshot) => {
        if (!snapshot.exists()) {
          setData(null);
          setLoading(false);
          return;
        }

        const docData = snapshot.data() as CameraData;

        if (
          prevTimestamp.current !== null &&
          prevTimestamp.current !== docData.updated_at_unix_ms
        ) {
          setHighlighted(true);
          setTimeout(() => setHighlighted(false), 1500);
        }
        prevTimestamp.current = docData.updated_at_unix_ms;

        setData(docData);
        setLoading(false);
        setError(null);
      },
      (err: FirestoreError) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="mr-2 animate-spin" size={20} />
        <span>Камерын мэдээлэл ачааллаж байна...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="rounded-2xl border-destructive/50 shadow-sm">
        <CardContent className="flex items-center gap-3 py-6">
          <AlertCircle className="text-destructive" size={20} />
          <p className="text-sm text-destructive">Алдаа: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="py-10 text-center text-muted-foreground">
          Камерын мэдээлэл олдсонгүй.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "rounded-2xl shadow-sm transition-all duration-500",
        highlighted && "ring-2 ring-primary/50 shadow-md scale-[1.01]"
      )}
    >
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Camera size={18} className="text-muted-foreground" />
        <CardTitle className="text-base font-semibold">
          {data.camera_id}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={14} />
          <span>{formatTimestamp(data.updated_at_unix_ms)}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-muted/50 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Coffee size={13} />
              <span>Бариста бүс</span>
            </div>
            <p className="text-2xl font-bold">
              {data.zone_counts.BARISTA_ZONE}
            </p>
          </div>
          <div className="rounded-xl bg-muted/50 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Users size={13} />
              <span>Үйлчлүүлэгч бүс</span>
            </div>
            <p className="text-2xl font-bold">
              {data.zone_counts.CUSTOMER_ZONE}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
