export class Cache {
    constructor(service_name, version = 1) {
        this.service_name = service_name;
        this.version = version;
        this.db = null;

        this.request = indexedDB.open("agriculture", this.version);

        this.request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(this.service_name)) {
                db.createObjectStore(this.service_name, { keyPath: "id" });
            }
        };

        this.request.onsuccess = (event) => {
            this.db = event.target.result;
        };
    }

    async setData(action) {
        return new Promise((resolve, reject) => {

            const transaction = this.db.transaction(this.service_name, "readwrite");
            const objectStore = transaction.objectStore(this.service_name);

            objectStore.put(action);
        });
    }

    async getData() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject("Database not initialized yet.");
                return;
            }

            const transaction = this.db.transaction(this.service_name, "readonly");
            const objectStore = transaction.objectStore(this.service_name);

            const data = [];
            const request = objectStore.openCursor();

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    data.push(cursor.value);
                    cursor.continue();
                } else {
                    console.log("All data fetched:", data);
                    resolve(data);
                }
            };

            request.onerror = (event) => {
                console.error("Error fetching data:", event.target.error);
                reject(event.target.error);
            };
        });
    }
}

