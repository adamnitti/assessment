const handleInput = students.map((record) => {
    if (record.id === id) {
        if (e.key === 'Enter' && tagInput) {
            if (
                record.tags.find(
                    (tag) => tagInput.toLowerCase() === tag.toLowerCase()
                )
            ) {
                console.log('duplicate tag', tagInput);
                alert('Duplicate tag name!');

                return null;
            }
            e.preventDefault();
            e.currentTarget.value = '';
            const newStudentList = students.map((student) => {
                if (student.id === id) {
                    student = {
                        ...student,
                        tags: [...student.tags, tagInput],
                    };
                }
                return newStudentList;
            });
        }
    }
    return handleInput;
});
setStudents(handleInput);
