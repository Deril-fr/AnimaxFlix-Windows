const pkg = require('./package.json');
const { execSync } = require('child_process');

let version = increment(pkg.version);
execSync('git add .');
execSync('git commit -m "' + version + '"');
execSync('git push --tags');

//  increment version

function increment(version) {
	var terms = version.split('.').map(function (e) {
		return parseInt(e);
	});
	if (terms.length != 3) {
		return version;
	}
	if (++terms[2] > 9) {
		++terms[1];
		terms[2] = 0;
	}
	return terms.join('.');
}

function incrementMajor(version) {
	return [parseInt(version.split('.')[0]) + 1, 0, 0].join('.');
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		increment: increment,
		incrementMajor: incrementMajor,
	};
} else {
	window.VersionIncrementer = {
		increment: increment,
		incrementMajor: incrementMajor,
	};
}
