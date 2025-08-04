const API_URL = "https://small-small-be.onrender.com";

export async function getQuestion() {
  const res = await fetch(`${API_URL}/survey`);

  if (!res.ok) throw Error("Failed getting questions");

  const data = await res.json();
  return data;
}
