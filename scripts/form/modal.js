import { ModalFormData } from "@minecraft/server-ui";
export class ModalFormBox {
    /** @private */ form = new ModalFormData();
    /** @private */ bodyText;
    /** @private */ canSetBody = true;
    /** @private */ callbacks = [];
    /** @private */ cancelCallback;
    body(bodyText) {
        if (!this.canSetBody)
            throw new Error("Cannot set body after adding elements");
        this.bodyText = bodyText;
        return this;
    }
    cancel(callback) {
        this.cancelCallback = callback;
        return this;
    }
    dropdown(label, options, defaultValueIndex, callback) {
        this.form.dropdown(this.formatLabel(label), options, defaultValueIndex);
        if (callback)
            this.callbacks.push(callback);
        return this;
    }
    async show(player) {
        const response = await this.form.show(player);
        if (response.canceled) {
            if (this.cancelCallback)
                this.cancelCallback(player, response.cancelationReason);
            return response;
        }
        for (const i in this.callbacks)
            if (response.formValues?.length)
                this.callbacks[i](player, response.formValues[i]);
        return response;
    }
    slider(label, minimumValue, maximumValue, valueStep, defaultValue, callback) {
        this.form.slider(this.formatLabel(label), minimumValue, maximumValue, valueStep, defaultValue);
        if (callback)
            this.callbacks.push(callback);
        return this;
    }
    submitButton(submitButtonText) {
        this.form.submitButton(submitButtonText);
        return this;
    }
    textField(label, placeholder, defaultValue, callback) {
        this.form.textField(this.formatLabel(label), placeholder ?? "", defaultValue);
        if (callback)
            this.callbacks.push(callback);
        return this;
    }
    title(titleText) {
        this.form.title(titleText);
        return this;
    }
    toggle(label, defaultValue, callback) {
        this.form.toggle(this.formatLabel(label), defaultValue);
        if (callback)
            this.callbacks.push(callback);
        return this;
    }
    /** @private */ formatLabel(label) {
        if (!this.canSetBody)
            return label;
        this.canSetBody = false;
        if (!this.bodyText)
            return label;
        if (typeof label === "string") {
            return `${this.bodyText}\n\n§r${label}`;
        }
        if (typeof label === "object") {
            label = { text: `${this.bodyText}\n\n§r`, ...label };
            return label;
        }
        throw new Error("Invalid label type");
    }
}
//# sourceMappingURL=modal.js.map