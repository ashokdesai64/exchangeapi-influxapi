
var fs = require('fs');

fs.readFile('./history.json', 'utf-8', function(err, data) {
    if (err) throw err

	var arrayOfObjects = JSON.parse(data)
		arrayOfObjects.users.push({
			name: "Mikhail",
			age: 25
		})
    console.log(arrayOfObjects)
	fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
		if (err) throw err
		console.log('Done!')
	})
})
