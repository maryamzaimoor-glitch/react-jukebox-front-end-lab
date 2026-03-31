import { useEffect, useState } from 'react';
import './App.css';
import {
  getAllTracks,
  addTrack,
  updateTrack,
  removeTrack,
} from './services/trackService';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import NowPlaying from './components/NowPlaying';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [editingTrack, setEditingTrack] = useState(null);

  useEffect(() => {
    const loadTracks = async () => {
      const data = await getAllTracks();
      setTracks(data);
    };

    loadTracks();
  }, []);

  const handleAddTrack = async (newTrackData) => {
    const newTrack = await addTrack(newTrackData);
    setTracks([...tracks, newTrack]);
  };

  const handleDeleteTrack = async (trackId) => {
    const deletedTrack = await removeTrack(trackId);

    setTracks(tracks.filter((track) => track._id !== deletedTrack._id));

    if (currentTrack && currentTrack._id === deletedTrack._id) {
      setCurrentTrack(null);
    }
  };

  const handleEditTrack = (track) => {
    setEditingTrack(track);
  };

  const handleUpdateTrack = async (trackId, updatedFormData) => {
    const updatedTrack = await updateTrack(trackId, updatedFormData);

    setTracks(
      tracks.map((track) =>
        track._id === updatedTrack._id ? updatedTrack : track
      )
    );

    if (currentTrack && currentTrack._id === updatedTrack._id) {
      setCurrentTrack(updatedTrack);
    }

    setEditingTrack(null);
  };

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
  };

  return (
    <div>
      <h1>Jukebox</h1>

      <TrackForm
        onAdd={handleAddTrack}
        onUpdate={handleUpdateTrack}
        editingTrack={editingTrack}
        setEditingTrack={setEditingTrack}
      />

      <TrackList
        tracks={tracks}
        onPlay={handlePlayTrack}
        onEdit={handleEditTrack}
        onDelete={handleDeleteTrack}
      />

      <NowPlaying track={currentTrack} />
    </div>
  );
};

export default App;