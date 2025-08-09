// ==== 1. Firebase Configuration ====
// Replace with your Firebase project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ74jXz_YAgmzc0p4bvJDm2Te0jWqnhuo",
  authDomain: "trial-2-d1f22.firebaseapp.com",
  projectId: "trial-2-d1f22",
  storageBucket: "trial-2-d1f22.firebasestorage.app",
  messagingSenderId: "900061609335",
  appId: "1:900061609335:web:788250474d50eca3047572",
  measurementId: "G-X0MDL7HEBP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ==== 2. Cloud Function URL ====
const CLOUD_FUNCTION_URL = "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/sendApprovalEmail";

// ==== 3. Form Submission Handler ====
document.getElementById("purchaseForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const requesterName = document.getElementById("requesterName").value;
    const item = document.getElementById("item").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);

    try {
        // 3.1 Save request to Firestore
        const docRef = await db.collection("requests").add({
            requesterName,
            item,
            quantity,
            price,
            step: 1, // First approval step
            status: "Pending",
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log("Document written with ID: ", docRef.id);

        // 3.2 Call Cloud Function to send approval email
        const response = await fetch(CLOUD_FUNCTION_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ requestId: docRef.id })
        });

        if (response.ok) {
            alert("Request submitted and email sent to approver.");
        } else {
            alert("Request saved but failed to send email.");
        }

    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error submitting request.");
    }
});
