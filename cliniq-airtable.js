const AIRTABLE_TOKEN = "patPhE2Kdp9SiBL7L.54d9df1fb6f7866ba22a5b13c0577f589177bd52540312aa0e1f9f144509a538";
const BASE_ID        = "app2rp90JggQkKuSs";
const API_URL        = `https://api.airtable.com/v0/${BASE_ID}`;

const headers = {
  "Authorization": `Bearer ${AIRTABLE_TOKEN}`,
  "Content-Type": "application/json"
};

async function getRecords(table) {
  const res = await fetch(`${API_URL}/${encodeURIComponent(table)}`, { headers });
  const data = await res.json();
  return data.records || [];
}

async function getRecord(table, recordId) {
  const res = await fetch(`${API_URL}/${encodeURIComponent(table)}/${recordId}`, { headers });
  return await res.json();
}

async function createRecord(table, fields) {
  const res = await fetch(`${API_URL}/${encodeURIComponent(table)}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ fields })
  });
  return await res.json();
}

async function updateRecord(table, recordId, fields) {
  const res = await fetch(`${API_URL}/${encodeURIComponent(table)}/${recordId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ fields })
  });
  return await res.json();
}

async function deleteRecord(table, recordId) {
  const res = await fetch(`${API_URL}/${encodeURIComponent(table)}/${recordId}`, {
    method: "DELETE",
    headers
  });
  return await res.json();
}

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

const Finance = {
  getAll: () => getRecords("Finance"),
  getOne: (id) => getRecord("Finance", id),
  create: (data) => createRecord("Finance", {
    "Date":       data.date,
    "Type":       data.type,
    "Amount":     data.amount,
    "Staff name": data.staffName,
    "Notes":      data.notes
  }),
  update: (id, data) => updateRecord("Finance", id, data),
  delete: (id)       => deleteRecord("Finance", id)
};
