// Read the submitted GET parameters and display them safely as text.
const submittedParams = new URLSearchParams(window.location.search);

const submittedFields = {
  "submitted-first-name": "firstName",
  "submitted-last-name": "lastName",
  "submitted-email": "email",
  "submitted-phone": "phone",
  "submitted-organization": "organization",
  "submitted-timestamp": "timestamp"
};

Object.entries(submittedFields).forEach(([elementId, parameterName]) => {
  const output = document.getElementById(elementId);
  const value = submittedParams.get(parameterName);
  if (output && value) {
    output.textContent = value;
  }
});

// Format the ISO timestamp for easier reading.
const timestampOutput = document.querySelector("#submitted-timestamp");
const rawTimestamp = submittedParams.get("timestamp");
if (timestampOutput && rawTimestamp) {
  const submittedDate = new Date(rawTimestamp);
  timestampOutput.textContent = Number.isNaN(submittedDate.getTime())
    ? rawTimestamp
    : submittedDate.toLocaleString();
}
