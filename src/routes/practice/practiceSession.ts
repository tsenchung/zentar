export interface PracticeSession {
	uuid: string;
	name: string;
	exercises: readonly Exercise[];
}

export interface Exercise {
	uuid: string;
	title: string;
}

export function practiceSession(): PracticeSession {
	return {
		uuid: crypto.randomUUID(),
		name: '',
		exercises: []
	};
}

const PracticeSessionClient = () => {
	const index: string[] = loadIndex();
	const practiceSessions = index.map(
		(uuid) => <PracticeSession>JSON.parse(window.localStorage.getItem(uuid) || '{}')
	);
	return {
		getPracticeSessions: () => {
			return practiceSessions;
		},
		add: (name: string) => {
			const practiceSession: PracticeSession = {
				uuid: crypto.randomUUID(),
				name,
				exercises: []
			};
			window.localStorage.setItem(practiceSession.uuid, JSON.stringify(practiceSession));
			window.localStorage.setItem('practice_sessions_index', JSON.stringify(index));
			index.push(practiceSession.uuid);
			practiceSessions.push(practiceSession);
		}
	};
};

export const client = PracticeSessionClient();

export function addPracticeSession(practiceSession: PracticeSession) {
	window.localStorage.setItem(practiceSession.uuid, JSON.stringify(practiceSession));
}

export function loadIndex() {
	return <string[]>JSON.parse(localStorage.getItem('practice_session_index') || '[]');
}

export function loadPracticeSessions() {
	const index = loadIndex();
	return {
		practiceSessions: <PracticeSession[]>(
			index.map((uuid) => JSON.parse(<string>localStorage.getItem(uuid)))
		)
	};
}
