import { useEffect, useState } from 'react';

const TrackForm = ({ onAdd, onUpdate, editingTrack, setEditingTrack }) => {
  const emptyForm = {
    title: '',
    artist: '',
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingTrack) {
      setForm({
        title: editingTrack.title,
        artist: editingTrack.artist,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingTrack]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTrack) {
      onUpdate(editingTrack._id, form);
    } else {
      onAdd(form);
    }

    setForm(emptyForm);
  };

  return (
    <div>
      <h2>{editingTrack ? 'Edit Track' : 'Add Track'}</h2>

      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <label>Artist: </label>
        <input
          type="text"
          name="artist"
          value={form.artist}
          onChange={handleChange}
        />

        <button type="submit">
          {editingTrack ? 'Save Changes' : 'Add Track'}
        </button>

        {editingTrack && (
          <button type="button" onClick={() => setEditingTrack(null)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default TrackForm;