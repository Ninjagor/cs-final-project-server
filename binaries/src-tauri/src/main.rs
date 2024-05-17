// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn start_server() {
    use std::process::{Command, Stdio};

    use std::env;

    let path = env::current_dir().expect("hi");
    println!("The current directory is {}", path.display());

    if cfg!(target_os = "windows") {

    } else {
        Command::new("./macos-runner")
            .stdin(Stdio::piped()) // Or `Stdio::inherit()` or use `Stdio::from_raw_fd` to construct it
            .spawn()
            .expect("Failed to run the binary");
    };
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, start_server])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
