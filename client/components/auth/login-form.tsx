"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "1234") {
      router.push("/dashboard");
    } else {
      setError("Хэрэглэгчийн нэр эсвэл нууц үг буруу байна");
    }
  }

  return (
    <Card className="w-full max-w-sm shadow-lg rounded-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Нэвтрэх</CardTitle>
        <CardDescription>Үргэлжлүүлэхийн тулд нэвтрэх мэдээллээ оруулна уу</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Хэрэглэгчийн нэр</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Нууц үг</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="1234"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}
          <Button type="submit" className="w-full">
            Нэвтрэх
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Бүртгэл байхгүй юу?{" "}
            <Link href="/signup" className="text-primary underline underline-offset-2">
              Бүртгүүлэх
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
