# Eligible Addresses CSV Generator

This script compares wallet addresses from `wallets.txt` with those in `gtd.json` and `fcfs.json`. It generates an `eligible.csv` file listing the matching addresses along with their sources.

## Project Files

Ensure the following files are in the same directory:

-   `checker.js` (the main script file)
-   `checkerPK.js` (the main script file for PK)
-   `wallets.txt`
-   `gtd.json`
-   `fcfs.json`

## Usage

1. **Initialize an npm project:**
    ```bash
    npm install
    ```
2. **Create wallets.txt with list of addresses or PrivateKeys**

3. **Launch script**
   a) If addresses:
    ```bash
    node checker.js
    ```
    b) If PKs:
    ```bash
    node checkerPK.js
    ```
