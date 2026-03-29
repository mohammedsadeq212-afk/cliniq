// ============================================
//  Cliniq — Airtable Connection Layer
//  Include this file in ALL your HTML pages:
//  <script src="cliniq-airtable.js"></script>
// ============================================

const AIRTABLE_TOKEN = "pat2klguBScivH86y.c04fe50a63132f9b025f85dffe9db229b211ffd0fd29443eafabc9ca2c81903b";
const BASE_ID        = "app2rp90JggQkKuSs";
const API_URL        = `https://api.airtable.com/v0/${BASE_ID}`;

const headers = {
  "Authorization": `Bearer ${AIRTABLE_TOKEN}`,
  "Content-Type": "application/json"
};

// ──────────────────────────────────────────
//  GENERIC HELPERS
// ──────────────────────────────────────────

/** Fetch all records from a table */
async function getRecords(table) {
  const res = await fetch(`${API_URL}/${encodeURIComponent(table)}`, { headers });
  const data = await res.json();
  return data.records || [];
}

/** Fetch a single record by ID */
async function getRecord(table, recordId) {
  const res = await fetch(`${API_URL}/${encodeURIComponent(table)}/${recordId}`, { headers });
  return await res.json();
}

/** Create a new record */
async function createRecord(table, fields) {
  const res = await fetch(`${API_URL}/${encodeURIComponent(table)}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ fields })
  });
  return await res.json();
}

/** Update an existing record */
async function updateRecord(table, recordId, fields) {
  const res = await fetch(`${API_URL}/${encodeURIComponent(table)}/${recordId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ fields })
  });
  return await res.json();
}

/** Delete a record */
async function deleteRecord(table, recordId) {
  const res = await fetch(`${API_URL}/${encodeURIComponent(table)}/${recordId}`, {
    method: "DELETE",
    headers
  });
  return await res.json();
}

// ──────────────────────────────────────────
//  PATIENTS
// ──────────────────────────────────────────

const Patients = {
  getAll: () => getRecords("Patients"),
  getOne: (id) => getRecord("Patients", id),

  create: (data) => createRecord("Patients", {
    "Name":            data.name,
    "Phone":           data.phone,
    "Age":             data.age,
    "Medical history": data.medicalHistory,
    "Medications":     data.medications,
    "Last visit":      data.lastVisit,
    "Photo URLs":      data.photoUrls,
    "Notes":           data.notes
  }),

  update: (id, data) => updateRecord("Patients", id, data),
  delete: (id)       => deleteRecord("Patients", id)
};

// ──────────────────────────────────────────
//  STOCK
// ──────────────────────────────────────────

const Stock = {
  getAll: () => getRecords("Stock"),
  getOne: (id) => getRecord("Stock", id),

  create: (data) => createRecord("Stock", {
    "Item name":         data.itemName,
    "Quantity":          data.quantity,
    "Cost":              data.cost,
    "Expiry date":       data.expiryDate,
    "Reorder threshold": data.reorderThreshold
  }),

  update: (id, data) => updateRecord("Stock", id, data),
  delete: (id)       => deleteRecord("Stock", id)
};

// ──────────────────────────────────────────
//  FINANCE
// ──────────────────────────────────────────

const Finance = {
  getAll: () => getRecords("Finance"),
  getOne: (id) => getRecord("Finance", id),

  create: (data) => createRecord("Finance", {
    "Date":       data.date,
    "Type":       data.type,       // "Salary" | "Expense" | "Income"
    "Amount":     data.amount,
    "Staff name": data.staffName,
    "Notes":      data.notes
  }),

  update: (id, data) => updateRecord("Finance", id, data),
  delete: (id)       => deleteRecord("Finance", id)
};

// ──────────────────────────────────────────
//  USAGE EXAMPLES (remove in production)
// ──────────────────────────────────────────
//
//  Load all patients:
//    const patients = await Patients.getAll();
//    console.log(patients);
//
//  Add a new patient:
//    await Patients.create({
//      name: "Ahmed Ali",
//      phone: "+905001234567",
//      age: 34,
//      medicalHistory: "Diabetes type 2",
//      medications: "Metformin 500mg - started 2024-01-10",
//      lastVisit: "2025-03-01",
//      photoUrls: "",
//      notes: "Follow up in 3 months"
//    });
//
//  Add a stock item:
//    await Stock.create({
//      itemName: "Gloves (box)",
//      quantity: 50,
//      cost: 12.5,
//      expiryDate: "2026-12-01",
//      reorderThreshold: 10
//    });
//
//  Add a finance record:
//    await Finance.create({
//      date: "2025-03-29",
//      type: "Salary",
//      amount: 3000,
//      staffName: "Dr. Sara",
//      notes: "March salary"
//    });
