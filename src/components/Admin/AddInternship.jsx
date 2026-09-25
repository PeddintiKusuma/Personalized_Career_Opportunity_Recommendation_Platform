import { useState } from "react";

export default function AddInternship({ onAdded }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/admin/internships", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        company,
        location,
        duration,
        description,
      }),
    });

    setTitle("");
    setCompany("");
    setLocation("");
    setDuration("");
    setDescription("");

    onAdded(); // refresh list
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Add Internship</h2>

      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
      <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <input placeholder="Duration" value={duration} onChange={e => setDuration(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />

      <button type="submit">Add Internship</button>
    </form>
  );
}
