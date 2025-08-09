// ==== REPLACE WITH YOUR FIREBASE CONFIG ====
const firebaseConfig = {
  apiKey: "AIzaSyAJ74jXz_YAgmzc0p4bvJDm2Te0jWqnhuo",
  authDomain: "trial-2-d1f22.firebaseapp.com",
  projectId: "trial-2-d1f22",
  storageBucket: "trial-2-d1f22.firebasestorage.app",
  messagingSenderId: "900061609335",
  appId: "1:900061609335:web:788250474d50eca3047572",
  measurementId: "G-X0MDL7HEBP"
};
// ============================================

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Handle form submit
document.getElementById("purchaseForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const requesterName = document.getElementById("requesterName").value.trim();
  const requesterEmail = document.getElementById("requesterEmail").value.trim();
  const item = document.getElementById("item").value.trim();
  const quantity = parseInt(document.getElementById("quantity").value.trim());
  const price = parseFloat(document.getElementById("price").value.trim());

  if (!requesterName || !requesterEmail || !item || isNaN(quantity) || isNaN(price)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  try {
    // Add request to Firestore
    const docRef = await db.collection("requests").add({
      requesterName,
      requesterEmail,
      item,
      quantity,
      price,
      status: "Pending",
      step: 1,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Call backend function to send first approval email
    // (We'll set this up later in Firebase Functions)
    await fetch(`https://us-central1-${firebaseConfig.projectId}.cloudfunctions.net/sendApprovalEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: docRef.id })
    });

    alert("Purchase request submitted successfully!");
    document.getElementById("purchaseForm").reset();
  } catch (error) {
    console.error("Error submitting request:", error);
    alert("Error submitting request. Please try again.");
  }
});
