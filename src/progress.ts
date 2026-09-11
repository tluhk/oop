export const progressKey = 'oop-cards-progress-v2';
export const legacyKey = 'oop-cards-progress-v1';
// Frozen historical mapping: never derive migration from current display order.
export const legacyLessonIds = [
  'classes-objects', 'properties-methods', 'encapsulation', 'inheritance', 'polymorphism',
  'typescript-basics', 'interfaces-unions', 'composition-contracts', 'api-layers',
  'async-errors', 'testable-services',
] as const;
export interface Progress { version: 2; lessons: string[]; activities: string[] }
export const emptyProgress = (): Progress => ({ version: 2, lessons: [], activities: [] });
type StorageAccess = Pick<Storage, 'getItem' | 'setItem'>;
const parse = (raw: string | null): unknown => {
  try { return raw === null ? null : JSON.parse(raw); } catch { return null; }
};
const validIds = (value: unknown, allowed: readonly string[]): string[] =>
  Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === 'string' && allowed.includes(id)))] : [];

export function loadProgress(storage: StorageAccess, lessonIds: readonly string[], activityIds: readonly string[]) {
  let progress = emptyProgress();
  try {
    const raw = storage.getItem(progressKey);
    if (raw !== null) {
      const value = parse(raw);
      if (value && typeof value === 'object' && 'version' in value && value.version === 2) {
        const saved = value as Partial<Progress>;
        progress = { version: 2, lessons: validIds(saved.lessons, lessonIds), activities: validIds(saved.activities, activityIds) };
      }
      // A v2 record is authoritative, including an empty/reset record.
      return { progress, storageAvailable: true };
    }
    const legacy = parse(storage.getItem(legacyKey));
    if (Array.isArray(legacy)) {
      progress.lessons = validIds(legacy.filter((index): index is number =>
        Number.isInteger(index) && index >= 0 && index < legacyLessonIds.length
      ).map(index => legacyLessonIds[index]), lessonIds);
    }
    storage.setItem(progressKey, JSON.stringify(progress));
    return { progress, storageAvailable: true };
  } catch {
    // Keep successfully read progress in memory if writing the migration fails.
    return { progress, storageAvailable: false };
  }
}
export function saveProgress(storage: StorageAccess, progress: Progress): boolean {
  try { storage.setItem(progressKey, JSON.stringify(progress)); return true; } catch { return false; }
}
