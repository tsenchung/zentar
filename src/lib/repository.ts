interface Identifiable {
	id: string;
}

interface Repository<T extends Identifiable> {
	collection: () => T[];
	find: (id: string) => T | undefined;
	save: (item: T) => void;
	delete: (id: string) => void;
}

function loadIndex(namespace: string) {
	return <string[]>JSON.parse(localStorage.getItem(namespace) || '[]');
}

export const LocalStorageRepository = <T extends Identifiable>(
	namespace: string
): Repository<T> => {
	let index: string[] | undefined;
	let collection: T[] | undefined;
	const cache = new Map<string, T>();
	return {
		collection: () => {
			if (!collection || !index) {
				index = loadIndex(namespace);
				collection = [];
				index.forEach((id) => {
					const item = JSON.parse(window.localStorage.getItem(id)!);
					collection?.push(item);
					cache.set(item.id, item);
				});
			}
			return collection;
		},
		find: (id: string) => {
			let item = cache.get(id);
			if (item) {
				return item;
			}
			const loadedItem = window.localStorage.getItem(id);
			if (loadedItem) {
				item = <T>JSON.parse(loadedItem);
				cache.set(id, item);
			}
			return item;
		},
		save: (item: T) => {
			window.localStorage.setItem(item.id, JSON.stringify(item));
			if (index) {
				index.push(item.id);
			}
			window.localStorage.setItem(namespace, JSON.stringify(index));
			if (collection) {
				collection.push(item);
			}
			cache.set(item.id, item);
		},
		delete: (id: string) => {
			window.localStorage.removeItem(id);
			if (!index) {
				index = loadIndex(namespace);
			}
			index = index.filter((i) => i != id);
			window.localStorage.setItem(namespace, JSON.stringify(index));
			collection = collection?.filter((item) => item.id != id);
			
			cache.delete(id);
		}
	};
};
