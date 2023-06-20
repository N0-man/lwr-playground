import { createElement } from 'lwc';
import HelloWorld from 'components/helloWorld';

describe('components-hello-world', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays greeting specified by change event target', () => {
        const EXPECTED = 'Test';

        // Create element
        const element = createElement('components-hello-world', {
            is: HelloWorld
        });
        document.body.appendChild(element);

        // Verify default greeting
        let div = element.shadowRoot.querySelector('div');
        expect(div.textContent).not.toBe(`Ciao, ${EXPECTED}!`);

        // Trigger new greeting
        const inputEl = element.shadowRoot.querySelector('ui-input');
        inputEl.value = EXPECTED;
        inputEl.dispatchEvent(new CustomEvent('change'));

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Verify displayed greeting
            expect(div.textContent).toBe(`Ciao, ${EXPECTED}!`);
        });
    });

    it('is accessible', () => {
        const element = createElement('components-hello-world', {
            is: HelloWorld
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
