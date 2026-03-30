import { CameraList } from "@/components/cameras/camera-list";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold tracking-tight">
        Камерын шууд мэдээлэл
      </h3>
      <CameraList />
    </div>
  );
}
