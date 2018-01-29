import React from 'react';
import TestUtils from 'react-dom/test-utils';

/**
 * @param {ReactElement} fragment The React node to test.
 * @returns {Promise} A promise that is resolved once the test finishes, and rejected when the test fails.
 */
export default function a11yTestFragment(fragment) {
  const elem = TestUtils.renderIntoDocument(<div>{fragment}</div>);
  let mounted = elem.firstChild;
  const clean = () => {
    if (mounted && mounted.parentNode) {
      mounted.parentNode.removeChild(mounted);
      mounted = null;
    }
  };
  return new Promise(resolve => {
    document.getElementById('main-content').appendChild(mounted);
    AAT.getCompliance(mounted, fragment.type.name, resolve); // Assumes modern browser with `Function#name`
  })
    .then(results => {
      if (!results.reports) {
        throw results.details ||
          new Error('a11y test result is not available for unknown reason.');
      }
      const { messages } = results.issueMessages;
      const code = AAT.assertCompliance(results);
      if (code !== 0) {
        const issues = results.reports.reduce(
          (cumulated, report) => [...cumulated, ...report.issues],
          []
        );
        if (issues.length > 0) {
          const message = issues
            .map(issue => {
              const { messageCode, help, xpath, snippet } = issue;
              return [
                `${messageCode}: ${messages[messageCode]}`,
                `\tXPath of the violating node: ${xpath}`,
                `\tThe snippet of the violating node: ${snippet}`,
                `\tHelp link: ${help}`,
              ].join('\n');
            })
            .join('\n');
          throw new Error(
            `a11y compliance test failed. Code: ${code}, Details:\n${message}`
          );
        }
      }
    })
    .then(clean, err => {
      clean();
      throw err;
    });
}
