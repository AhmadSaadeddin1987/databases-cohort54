import { setup } from "./setup.js";
import { transferAmount } from "./transfer.js";

async function main() {
await setup();
await transferAmount(101, 102, 1000);
}

main();
