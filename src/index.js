const fs = require('fs');
const replaceString = require('replace-string');

module.exports = exports = function (specsPath) {
	// Validate if path has been given:
	if (specsPath === undefined) {
		console.error('ERROR: No specifications path defined.');
		return;
	}

	// Get document, or throw exception on error
	try {
	    let indexDocStr = fs.readFileSync(specsPath + '/template.yaml', 'utf8');

	    let paths = '';
	    let definitions = '';

	    const directories = fs.readdirSync(specsPath);

	    directories.forEach((directory) => {
	        if (!directory.includes('.yaml')) {
	            const files = fs.readdirSync(specsPath + '/' + directory);
	            files.forEach((file) => {
	                if (file.includes('paths')) {
	                    paths += '  $ref: ./' + directory + '/' + file + '\n';
	                } else {
	                    definitions += '  $ref: ./' + directory + '/' + file + '\n';
	                }
	            });
	        }
	    });

	    let replacedString = replaceString(replaceString(indexDocStr, '%paths%', paths), '%definitions%', definitions);

	    fs.writeFileSync(specsPath + '/index.yaml', replacedString, {encoding: 'utf8'});

	} catch (e) {
	    console.error(e);
	}

}
