const baseUrl = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;


const getAllTracks = async () => {
  try {
    const res = await fetch(baseUrl);


    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const addTrack = async (trackData) => {
  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackData),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const updateTrack = async (trackId, trackData) => {
  try {
    const res = await fetch(`${baseUrl}/${trackId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackData),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const removeTrack = async (trackId) => {
  try {
    const res = await fetch(`${baseUrl}/${trackId}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { getAllTracks, addTrack, updateTrack, removeTrack };