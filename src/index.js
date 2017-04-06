export default function (specsPath) {
	if (specsPath === undefined) return console.error('ERROR: No specifications path defined.');
	// Get document, or throw exception on error
	try {
	    // let indexDoc = jsyaml.safeLoad(fs.readFileSync(this.specsPath + '/index.yaml', 'utf8'));
	    let indexDocStr = fs.readFileSync(specsPath + '/template.yaml', 'utf8');

	    let paths = '';
	    let definitions = '';

	    const directories = fs.readdirSync(specsPath);

	    directories.forEach((directory: any) => {
	        if (!directory.includes('.yaml')) {
	            const files = fs.readdirSync(specsPath + '/' + directory);
	            files.forEach((file: any) => {
	                if (file.includes('paths')) {
	                    paths += '  $ref: ./' + directory + '/' + file + '\n';
	                } else {
	                    definitions += '  $ref: ./' + directory + '/' + file + '\n';
	                }
	            });
	        }
	    });

	    let replacedString = replaceString(replaceString(indexDocStr, '%paths%', paths), '%definitions%', definitions);

	    fs.writeFileSync(this.specsPath + '/index.yaml', replacedString, {encoding: 'utf8'});

	} catch (e) {
	    console.error(e);
	}

}
