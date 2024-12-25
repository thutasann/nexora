let state: any;
let setter: (value: any) => void;

export function useState<T>(initialValue: T): [T, (newValue: T) => void] {
	state = state || initialValue;

	const setState = (newValue: T): void => {
		state = newValue;
		if (setter) setter(newValue);
	};

	return [state, setState];
}

export function setReRenderCallback(callback: (value: any) => void) {
	setter = callback;
}
