// ==== REPLACE WITH YOUR FIREBASE CONFIG ====
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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
