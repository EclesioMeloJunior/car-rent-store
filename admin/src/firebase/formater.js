function fromSnapshotToArray(querySnapshot) {
	const normalArray = querySnapshot.docs.map(doc => {
		console.log(doc);
		return { ...doc.data(), id: doc.id };
	});

	return normalArray;
}

export { fromSnapshotToArray };
