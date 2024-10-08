/*import type { Identifiable, Repository } from "./repository";


function loadIndex(namespace: string) {
	return <number[]>JSON.parse(localStorage.getItem(namespace) || '[]');
}

export const LocalStorageRepository = <T extends Identifiable>(
	namespace: string
): Repository<T> => {
	let index: number[] | undefined;
	let collection: T[] | undefined;
	const cache = new Map<number, T>();
	const ensuringIndexIsLoaded = (action: (index: number[]) => void) => {
		if (!index) {
			index = loadIndex(namespace);
		}
		action(index);
	};
	return {
		collection: async () => {
			if (!collection) {
				collection = [];
				ensuringIndexIsLoaded((index) => {
					index.forEach((id) => {
						const item = JSON.parse(window.localStorage.getItem(id.toString())!);
						collection?.push(item);
						cache.set(item.id, item);
					});
				});
			}
			return collection;
		},
		find: async (id: number) => {
			let item = cache.get(id);
			if (item) {
				return item;
			}
			const loadedItem = window.localStorage.getItem(id.toString());
			if (loadedItem) {
				item = <T>JSON.parse(loadedItem);
				cache.set(id, item);
			}
			return item;
		},
		save: (item: T) => {
			ensuringIndexIsLoaded((index) => {
				window.localStorage.setItem(item.id?.toString(), JSON.stringify(item));
				index.push(item.id);
				window.localStorage.setItem(namespace, JSON.stringify(index));
				collection?.push(item);
				cache.set(item.id, item);
			});
		},
		delete: (id: string) => {
			ensuringIndexIsLoaded((index) => {
				index = index.filter((i) => i != id);
				window.localStorage.setItem(namespace, JSON.stringify(index));
				window.localStorage.removeItem(id);
				collection = collection?.filter((item) => item.id != id);
				cache.delete(id);
			});
		}
	};
};
*/
