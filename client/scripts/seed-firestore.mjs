import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWfveE8g0wD3l2dMyAYBGSyinXu2owdvk",
  authDomain: "ai-camera-adf32.firebaseapp.com",
  projectId: "ai-camera-adf32",
  storageBucket: "ai-camera-adf32.firebasestorage.app",
  messagingSenderId: "681212988158",
  appId: "G-TNHH7MV05V",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const testDocs = [
  {
    camera_id: "CAM-001",
    updated_at_unix_ms: Date.now(),
    zone_counts: { BARISTA_ZONE: 3, CUSTOMER_ZONE: 7 },
  },
  {
    camera_id: "CAM-002",
    updated_at_unix_ms: Date.now() - 60000,
    zone_counts: { BARISTA_ZONE: 1, CUSTOMER_ZONE: 4 },
  },
  {
    camera_id: "CAM-003",
    updated_at_unix_ms: Date.now() - 120000,
    zone_counts: { BARISTA_ZONE: 2, CUSTOMER_ZONE: 9 },
  },
];

for (const doc of testDocs) {
  const ref = await addDoc(collection(db, "cameras"), doc);
  console.log(`Added ${doc.camera_id} -> ${ref.id}`);
}

console.log("Done seeding.");
process.exit(0);
