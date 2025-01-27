import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbName = 'TodoDB';
  private dbVersion = 1;
  private storeName = 'TodoTable';
  private db!: IDBDatabase;

  constructor() {
    this.initDB();
  }
 
  private initDB(): void {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(this.storeName)) {
        const objectStore = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('title', 'title', { unique: false }); 
        objectStore.createIndex('dueDate', 'dueDate', { unique: false });  
        objectStore.createIndex('completed', 'completed', { unique: false });            
      }
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      console.log('db init success');
    };

    request.onerror = (event) => {
      console.error('Error initializing db', (event.target as IDBOpenDBRequest).error);
    };
  }

  
  addRecord(data: any): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);

      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Obtiene todos los registros del object store
   */
  getAllRecords(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);

      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Obtiene un registro por su clave
   * @param id Clave del registro
   */
  getRecordById(id: IDBValidKey): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);

      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Actualiza un registro en el object store
   * @param data Datos actualizados
   */
  updateRecord(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);

      const request = store.put(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Elimina un registro por su clave
   * @param id Clave del registro
   */
  deleteRecord(id: IDBValidKey): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);

      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}