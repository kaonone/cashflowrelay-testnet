import { storageKeys } from './keys';

class LocalStorage {
  public static checkAvailability() {
    const testKey = '__test__';

    try {
      localStorage.setItem(testKey, '__test-value__');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('Local storage is not available! Some features will be disabled!');
      return false;
    }
  }

  private isLocalStorageAvailable: boolean | null = null;

  constructor(version: string) {
    this.isLocalStorageAvailable = LocalStorage.checkAvailability();
    this.checkVersion(version);
  }

  public set<T>(key: string, item: T): void {
    if (!this.isLocalStorageAvailable) { return; }

    localStorage.setItem(key, JSON.stringify(item));
  }

  public get<T>(key: string) {
    if (!this.isLocalStorageAvailable) { return null; }

    const data = localStorage.getItem(key);

    try {
      return data ? JSON.parse(data) as T : null;
    } catch (e) {
      console.error(
        `Error while parsing data from localstorage for key: ${key}.
        Error is: ${e.message}, stack is: ${e.stack}`,
      );
      return null;
    }
  }

  public reset() {
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem(storageKeys.signedMessage);
    }
  }

  private checkVersion(version: string) {
    const currentVersion = this.getVersion();
    if (currentVersion !== version) {
      this.reset();
      this.saveVersion(version);
    }
  }

  private getVersion() {
    return this.get<string | null>('version');
  }

  private saveVersion(version: string) {
    this.set('version', version);
  }
}

export default LocalStorage;
