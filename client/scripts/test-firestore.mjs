import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

// Try reading "cameras" collection
console.log('--- Testing "cameras" collection ---');
try {
  const snap = await getDocs(collection(db, "cameras"));
  console.log(`Found ${snap.size} documents in "cameras"`);
  snap.forEach((doc) => {
    console.log(`  doc.id: ${doc.id}`, JSON.stringify(doc.data(), null, 2));
  });
} catch (e) {
  console.error(`Error reading "cameras":`, e.message);
}

// Try some common collection names in case it's named differently
const guesses = ["camera", "Camera", "Cameras", "cams", "zones", "zone_counts"];
for (const name of guesses) {
  try {
    const snap = await getDocs(collection(db, name));
    if (snap.size > 0) {
      console.log(`\n--- Found ${snap.size} docs in "${name}" ---`);
      snap.docs.slice(0, 2).forEach((doc) => {
        console.log(`  doc.id: ${doc.id}`, JSON.stringify(doc.data(), null, 2));
      });
    }
  } catch (e) {
    // ignore permission errors on wrong collections
  }
}

console.log("\nDone.");
process.exit(0);
