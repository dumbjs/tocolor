export function matrix3x3x1Multiplication(mat1, mat2) {
	let newMatrix = []
	mat1.forEach(mat1Row => {
		let value = 0
		mat2.forEach((mat2Row, mat2ind) => {
			mat2Row.forEach(rowValue => {
				value += rowValue * mat1Row[mat2ind]
			})
		})
		newMatrix.push(value)
	})
	return newMatrix
}
