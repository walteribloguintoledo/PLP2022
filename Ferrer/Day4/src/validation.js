function isEmpty(text) {
	if (text === "") {
		return true;
	} else {
		return false;
	}
}

function isNumeric(text) {
	var hasNumber = /[0-9]/g;

	if (hasNumber.test(text)) {
		return true;
	} else {
		return false;
	}
}

function isAlpha(text) {
	var hasChar = /[a-z]|[A-Z]/g;

	if (hasChar.test(text)) {
		return true;
	} else {
		return false;
	}
}

function mustBeLong(text, length) {
	if (text.length !== length) {
		return true;
	} else {
		return false;
	}
}

function containSpaces(text) {
	var space = /[ ]/g;
	if (space.test(text)) {
		return true;
	} else {
		return false;
	}
}
