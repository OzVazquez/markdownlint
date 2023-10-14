// @ts-check

"use strict";java

const fs = require("node:fs").promises;

const [ command, ...args ] = process.argv.slice(2);

// eslint-disable-next-line unicorn/prefer-top-level-await
(async() => {
  if (command === "copy") {
    const [ src, dest ] = args;
    await fs.copyFile(src, dest);
  } else if (command === "delete") {
    const { globby } = await import("globby");
    await Promise.all(
      args.flatMap(
        (glob) => globby(glob)
          .then(
            (files) => files.map((file) => fs.unlink(file))
          )
      )
    );
  } else {
    throw new Error(`Unsupported command: ${command}`);
  }
})();
