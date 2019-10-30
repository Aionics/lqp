ko.validation.init({
    insertMessages: false
}, true);
ko.validation.locale('ru-RU');

ko.bindingHandlers.inputmask =
    {
        init: function (element, valueAccessor) {
            var mask = valueAccessor();
            var observable = mask.value;
            if (ko.isObservable(observable)) {
                $(element).on('focusout change', function () {
                    if ($(element).inputmask('isComplete')) {
                        observable($(element).val());
                    } else {
                        observable(null);
                    }
                });
            }
            $(element).inputmask(mask);
        },
        update: function (element, valueAccessor) {
            var mask = valueAccessor();
            var observable = mask.value;
            if (ko.isObservable(observable)) {
                var valuetoWrite = observable();
                $(element).val(valuetoWrite);
            }
        }

    };

var myViewModel = {
    personName: 'Bob',
    personAge: 123
};

function toObservable(observableOrValue) {
    if (ko.isObservable(observableOrValue)) {
        return observableOrValue
    }
    return ko.observable(observableOrValue)
}

ko.components.register('lqp-button', {
    viewModel: function(params) {
        this.type = toObservable(params.type || 'button')
        this.disabled = toObservable(params.disabled)
    },
    template: {element: 'lqp-button'}
});

ko.components.register('lqp-input', {
    viewModel: function(params) {
        this.value = toObservable(params.value)
    },
    template: {element: 'lqp-input'}
});

ko.components.register('lqp-popup', {
    viewModel: function(params) {
        this.popup = getPopupViewProps(params)
    },
    template: {element: 'lqp-popup'}
});

ko.components.register('lqp-popup-with-input', {
    viewModel: function(params) {
        var self = this
        self.popup = getPopupViewProps(Object.assign({}, params, {onButtonClick: null}))
        self.inputMask = params.inputMask || ''
        self.input = {
            value: toObservable(params.inputValue || '').extend({
                required: false,
                validation: {
                    required: true,
                    validator: function (val, mask) {
                        if (!mask) {
                            return true
                        }
                        return Inputmask.isValid(val, mask);
                    },
                    message: 'Введите валидный код',
                    params: self.inputMask
                }
            })
        }
        self.inputValidationObservable = ko.validatedObservable(self.input)
        self.onSubmit = function() {
            if (self.inputValidationObservable.isValid()) {
                params.onSubmit({value: ko.unwrap(self.input.value)})
            } else {
                self.inputValidationObservable.errors.showAllMessages()
            }
        }
    },
    template: {element: 'lqp-popup-with-input'}
});

function getPopupViewProps(params) {
    return {
        isShown: toObservable(params.isShown || false),
        title: toObservable(params.title || null),
        onButtonClick: toObservable(params.onButtonClick || null),
        buttonText: toObservable(params.buttonText || null)
    }
}


ko.applyBindings(myViewModel);
