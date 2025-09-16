import * as fs from "node:fs";
import { join } from "node:path";

export function fetchFirstFileSize(path, callback) {
    fs.readdir(path, (err, files) => {
        if (err) {
            callback(err);
            return;
        }
        if (files.length === 0) {
            callback(null, null);
            return;
        }

        fs.stat(join(path, files[0]), (err, stats) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, stats.size);
        });
    });
}

export function fetchSumOfFileSizes(path, callback) {
    fs.readdir(path, (err, files) => {
        if (err) {
            callback(err);
            return;
        }

        let total = 0;
        const rest = [...files];

        function iter() {
            if (rest.length === 0) {
                callback(null, total);
                return;
            }

            const next = rest.pop();
            fs.stat(join(path, next), (err, stats) => {
                if (err) {
                    callback(err);
                    return;
                }
                total += stats.size;
                iter();
            });
        }
        iter();
    });
}
