import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Профайл</h2>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Таны профайл</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Хэрэглэгчийн профайлын мэдээлэл энд харагдана.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
