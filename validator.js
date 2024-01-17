function Validator(options) {
  var selectorRules = {};

  function getParent(element, parent) {
    return element.closest(parent);
  }

  // validate
  function validate(inputElement, rule) {
    var errorMessage;

    var messageElement = getParent(
      inputElement,
      options.formGroupSelector
    ).querySelector(".form-message");

    var rules = selectorRules[rule.selector];
    for (rul of rules) {
      switch (inputElement.type) {
        case "checkbox":
        case "radio":
          errorMessage = rul(
            formElement.querySelector(rule.selector + ":checked")
          );
          break;

        default:
          errorMessage = rul(inputElement.value);
      }
      if (errorMessage) break;
    }

    if (errorMessage) {
      messageElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add(
        "invalid"
      );
    } else {
      messageElement.innerText = "";
      getParent(inputElement, options.formGroupSelector).classList.remove(
        "invalid"
      );
    }
    return !!errorMessage;
  }
  var formElement = document.querySelector(options.form);

  // Xử lý khi ấn submit
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();

    var isFormValid = true;
    options.rules.forEach((rule) => {
      var inputElement = formElement.querySelector(rule.selector);
      var isValid = validate(inputElement, rule);

      if (isValid) {
        isFormValid = false;
      }
    });
    if (isFormValid) {
      if (typeof options.onSubmit === "function") {
        var inputs = Array.from(
          formElement.querySelectorAll("[name]:not([disabled])")
        );
        var dataInput = inputs.reduce((prevValue, currentValue) => {
          switch (currentValue.type) {
            case "checkbox":
              if (currentValue.checked) {
                if (!Array.isArray(prevValue[currentValue.name])) {
                  prevValue[currentValue.name] = [];
                }
                prevValue[currentValue.name].push(currentValue.value);
              }
              break;
            case "radio":
              if (currentValue.checked) {
                prevValue[currentValue.name] = currentValue.value;
              }
              break;
            case "file":
              prevValue[currentValue.name] = currentValue.files;
              break;

            default:
              prevValue[currentValue.name] = currentValue.value;
          }
          return prevValue;
        }, {});
        options.onSubmit(dataInput);
      }
    }
  });
  if (formElement) {
    options.rules.forEach((rule) => {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElements = formElement.querySelectorAll(rule.selector);

      Array.from(inputElements).forEach((inputElement) => {
        if (inputElement) {
          inputElement.addEventListener("blur", () => {
            validate(inputElement, rule);
          });
          inputElement.addEventListener("input", () => {
            var messageElement = getParent(
              inputElement,
              options.formGroupSelector
            ).querySelector(".form-message");
            messageElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove(
              "invalid"
            );
          });
        }
      });
    });
  }
}

Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || "Vui lòng nhập trường này!";
    },
  };
};
Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? false
        : message || "Vui lòng nhập email hợp lệ!";
    },
  };
};
Validator.isConfirmed = function (selector, getPass, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getPass()
        ? undefined
        : message || "Giá trị không chính xác";
    },
  };
};

Validator({
  form: "#form-1",
  formGroupSelector: ".form-group",
  rules: [
    Validator.isRequired("#fullname"),
    Validator.isRequired("#email"),
    Validator.isEmail("#email"),
    Validator.isEmail("#email"),
    Validator.isRequired("#avatar"),
    Validator.isRequired("#password"),
    Validator.isRequired("#town"),
    Validator.isRequired('input[name="gender"]'),
    Validator.isRequired("#password_confirmation"),
    Validator.isConfirmed(
      "#password_confirmation",
      () => document.querySelector("#form-1 #password").value,
      "Mật khẩu không khớp!"
    ),
  ],
  onSubmit: function (data) {
    console.log(data);
  },
});
