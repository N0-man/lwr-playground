import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    greeting = 'Bello';

    handleChange(event) {
        this.greeting = event.target.value;
    }
}
