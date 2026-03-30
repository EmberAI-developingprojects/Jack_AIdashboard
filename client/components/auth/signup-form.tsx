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

export function SignupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/login");
  }

  return (
    <Card className="w-full max-w-sm shadow-lg rounded-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Бүртгүүлэх</CardTitle>
        <CardDescription>Эхлэхийн тулд бүртгэлээ үүсгэнэ үү</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Хэрэглэгчийн нэр</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Хэрэглэгчийн нэр оруулна уу"
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
              placeholder="Нууц үг сонгоно уу"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Бүртгэл үүсгэх
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Бүртгэлтэй юу?{" "}
            <Link href="/login" className="text-primary underline underline-offset-2">
              Нэвтрэх
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
