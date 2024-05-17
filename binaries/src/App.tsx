import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { useState } from "react";
import { appWindow } from '@tauri-apps/api/window';
await appWindow.setResizable(false);

function App() {

  async function test() {
    await invoke("start_server");
  }

  const [startText, setStartText] = useState<string>("Start Server")
  const [running, setRunning] = useState<boolean>(false)

  return (
    <>
      <h1>BlobsIO Server Runner</h1>
      <p style={{ opacity: "80%" }}>Interested in hosting you own BlobsIO server? Customize your server and click start.</p>

      {running && 
            <p>{startText=="Starting Server..." && <p style={{ opacity: "60%" }}>Server running at http://localhost:3000</p>}</p>
      }

      <div className="container" style={{ position: "absolute", bottom: "0", left: "0", marginLeft: "20px", marginBottom: "20px", opacity: "80%" }}>
        <p className="linear-wipe">
        Programmed by Rohit K. Supercharged with Rust.
        </p>
      </div>


      <button onClick={() => {
        test();
        setStartText(() => "Starting Server...")
        setTimeout(() => {
          setRunning(() => true)
        }, 3000)
      }} disabled={startText=="Starting Server..."}>{running ? "Running" : startText}</button>
    </>
  );
}


export default App;
