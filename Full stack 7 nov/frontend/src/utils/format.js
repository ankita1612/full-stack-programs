// src/utils/format.js
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};
export const formatDateYMD = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-CA"); // YYYY-MM-DD
};