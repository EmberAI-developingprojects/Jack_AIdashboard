import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Аналитик</h2>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Ерөнхий харагдац</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Аналитик өгөгдөл болон графикууд энд харагдана.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
