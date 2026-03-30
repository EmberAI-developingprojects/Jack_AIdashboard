import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Тохиргоо</h2>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Ерөнхий</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Програмын тохиргоо болон сонголтууд энд харагдана.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
