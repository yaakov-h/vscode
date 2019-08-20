/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as strings from './strings';

export function buildReplaceStringWithCasePreserved(matches: string[] | null, pattern: string): string {
	if (matches && (matches[0] !== '')) {
		if (matches[0].toUpperCase() === matches[0]) {
			return pattern.toUpperCase();
		} else if (matches[0].toLowerCase() === matches[0]) {
			return pattern.toLowerCase();
		} else if (strings.containsUppercaseCharacter(matches[0][0])) {
			if (validateHyphenPattern(matches, pattern)) {
				return buildReplaceStringForHyphenPatterns(matches, pattern);
			} else {
				return pattern[0].toUpperCase() + pattern.substr(1);
			}
		} else {
			// we don't understand its pattern yet.
			return pattern;
		}
	} else {
		return pattern;
	}
}

function validateHyphenPattern(matches: string[], pattern: string): boolean {
	const doesConatinHyphen = matches[0].indexOf('-') !== -1 && pattern.indexOf('-') !== -1;
	const doesConatinSameNumberOfHyphens = matches[0].split('-').length === pattern.split('-').length;
	return doesConatinHyphen && doesConatinSameNumberOfHyphens;
}

function buildReplaceStringForHyphenPatterns(matches: string[], pattern: string): string {
	const splitPatternAtHyphen = pattern.split('-');
	const splitMatchAtHyphen = matches[0].split('-');
	let replaceString: string = '';

	splitPatternAtHyphen.forEach((splitValues, index) => {
		replaceString += buildReplaceStringWithCasePreserved([splitMatchAtHyphen[index]], splitValues) + '-';
	});
	return replaceString.slice(0, -1);
}
