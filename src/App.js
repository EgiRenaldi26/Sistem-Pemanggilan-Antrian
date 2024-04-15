import { useState } from "react";
import "./App.css";

function App() {
  const [queueNumber, setQueueNumber] = useState("");
  const [totalWaktu, setTotalWaktu] = useState(0);

  const schedulePlay = (audioFile, delay) => {
    setTimeout(() => {
      playAudio(audioFile);
    }, delay);
  };

  const panggil_nomor = (nomor) => {
    let waktu = totalWaktu;

    const hundreds = Math.floor(nomor / 100);
    const remaining = nomor % 100;

    if (hundreds > 0) {
      schedulePlay(hundreds + "00", waktu + 1200);
      waktu += 1200;
    }

    if (remaining < 21 || (remaining % 100 < 21 && hundreds > 0)) {
      if (remaining > 0) {
        schedulePlay(remaining, waktu + 1000);
        waktu += 1000;
      } else {
        const tens = Math.floor(remaining / 10);
        const units = remaining % 10;

        if (tens > 1) {
          schedulePlay(tens + "0", waktu + 1000);
          waktu += 1000;
        }

        if (units > 0) {
          schedulePlay(units, waktu + 1000);
          waktu += 1000;
        }
      }
    }

    setTotalWaktu(waktu);
  };

  const handleQueueNumberChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value <= 999) {
      setQueueNumber(value);
    }
  };

  const playAudio = (audioFile) => {
    const audioUrl = process.env.PUBLIC_URL + `/audio/${audioFile}.wav`;
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const playQueueAudio = () => {
    if (!queueNumber) {
      alert("Please enter a queue number");
      return;
    }

    panggil_nomor(parseInt(queueNumber));
  };

  return (
    <div>
      <div className="Antrian">
        <label>Masukkan No Antrian:</label>
        <br />
        <input
          type="text"
          className="input-text"
          placeholder="Masukkan No Antrian"
          value={queueNumber}
          onChange={handleQueueNumberChange}
        />
        <br />
        <button className="btn-primary" onClick={playQueueAudio}>
          Dengarkan
        </button>
      </div>
    </div>
  );
}

export default App;
