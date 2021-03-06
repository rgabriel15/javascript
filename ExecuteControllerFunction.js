<script type="text/javascript">
    function ExecuteControllerFunction(controllerClassName, controllerFunctionName, inputData, inputDataType, onSuccessFunction, onErrorFunction, xhrFunction, isPostFunction, isFile) {
        if (typeof controllerClassName != "string" || controllerClassName.length < 1)
            throw "ArgumentException: controllerClassName.";
        if (typeof controllerFunctionName != "string" || controllerFunctionName.length < 1)
            throw "ArgumentException: controllerFunctionName.";

        if (inputDataType != null) {
            var inputDataTypeErrorMessage = " inputDataType must be \"xml\", \"json\", \"script\", \"html\" or null."
            if (typeof inputDataType != "string") {
                throw "ArgumentException: inputDataType." + inputDataTypeErrorMessage;
            } else {
                inputDataType = inputDataType.toLowerCase();
                if (inputDataType != "xml"
					&& inputDataType != "json"
					&& inputDataType != "script"
					&& inputDataType != "html") {
                    throw "ArgumentException: inputDataType." + inputDataTypeErrorMessage;
                }
            }
        }

        if (typeof onSuccessFunction != "function")
            if (onSuccessFunction != null) {
                throw "ArgumentException: onSuccessFunction.";
            } else {
                onSuccessFunction = function (data) {
                    alert(data);
                }
            }

        if (typeof onErrorFunction != "function")
            if (onErrorFunction != null) {
                throw "ArgumentException: onErrorFunction.";
            } else {
                onErrorFunction = function (xhr, ajaxOptions, thrownError) {
                    alert(thrownError.toString());
                }
            }

        isPostFunction = typeof isPostFunction == "boolean" ? isPostFunction : true;
        isFile = typeof isFile == "boolean" ? isFile : false;

        var functionType = isPostFunction ? "POST" : "GET";
        var ajaxSettings = {
            url: "/" + controllerClassName + "/" + controllerFunctionName,
            type: functionType,
            data: inputData,
            dataType: inputDataType,
            success: onSuccessFunction,
            error: onErrorFunction
        }

		if (xhrFunction != null) {
			if (typeof xhrFunction != "function") {
				throw "ArgumentException: xhrFunction.";
			} else {
				ajaxSettings.xhr = xhrFunction;
			}
		}		
		
        if (isFile)
        {
            ajaxSettings.cache = false;
            ajaxSettings.contentType = false;
            ajaxSettings.processData = false;
        }

        $.ajax(ajaxSettings);
    }
</script>
