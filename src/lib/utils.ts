export function min(...params: number[]) {
	let res = params[0] || 0
	params.forEach(item => {
		if (item > res) {
			return
		}
		res = item
	})
	return res
}

export function max(...params: number[]) {
	let res = params[0] || 0
	params.forEach(item => {
		if (item < res) {
			return
		}
		res = item
	})
	return res
}

export function normalizeHex(hex: string): string {
	let _hex = hex
	const removedHash = String(hex).trim().replace(/^#/, '')
	if (removedHash.length === 3) {
		_hex = `${removedHash[0]}${removedHash[0]}${removedHash[1]}${removedHash[1]}${removedHash[2]}${removedHash[2]}`
	} else {
		_hex = removedHash
	}
	return _hex.toLowerCase()
}
