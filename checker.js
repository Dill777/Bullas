const fs = require("fs");
const path = require("path");

function readFile(filePath) {
    return fs.readFileSync(path.resolve(filePath), "utf-8");
}

const walletsData = readFile("wallets.txt")
    .split("\n")
    .map((line) => line.trim().toLowerCase())
    .filter((line) => line.length > 0);

const wallets = new Set(walletsData);

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

wallets.forEach((wallet) => {
    const sources = [];
    if (fcfsAddresses.has(wallet)) {
        sources.push("fcfs");
    }
    if (gtdAddresses.has(wallet)) {
        sources.push("gtd");
    }
    if (sources.length > 0) {
        eligible.push([wallet, sources.join(", ")]);
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
