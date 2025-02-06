const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");

function readFile(filePath) {
    return fs.readFileSync(path.resolve(filePath), "utf-8");
}

const privateKeys = readFile("wallets.txt")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

const gtdData = JSON.parse(readFile("gtd.json"));
const gtdAddresses = new Set(
    gtdData
        .filter((item) => item.address)
        .map((item) => item.address.toLowerCase())
);

const fcfsData = JSON.parse(readFile("fcfs.json"));
const fcfsAddresses = new Set(
    fcfsData
        .filter((item) => item.address)
        .map((item) => item.address.toLowerCase())
);

const eligible = [];

privateKeys.forEach((privateKey) => {
    try {
        const wallet = new ethers.Wallet(privateKey);
        const address = wallet.address.toLowerCase();
        const sources = [];
        if (fcfsAddresses.has(address)) {
            sources.push("fcfs");
        }
        if (gtdAddresses.has(address)) {
            sources.push("gtd");
        }
        if (sources.length > 0) {
            eligible.push([address, sources.join(", ")]);
        }
    } catch (error) {
        console.error(`Error ${privateKey}: ${error}`);
    }
});

const header = "address,source";
const csvLines = [header];
eligible.forEach(([address, source]) => {
    csvLines.push(`${address},${source}`);
});

fs.writeFileSync("eligible.csv", csvLines.join("\n"), "utf-8");

console.log(
    `Найдено ${eligible.length} совпадающих адресов. Результаты сохранены в eligible.csv`
);
