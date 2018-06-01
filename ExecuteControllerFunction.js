<script type="text/javascript">
	function ExecuteControllerFunction(controllerClassName, controllerFunctionName, inputData, inputDataType, onSuccessFunction, onErrorFunction, isPostFunction) {
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
		var functionType = isPostFunction ? "POST" : "GET";
		
		$.ajax({
			url: "/" + controllerClassName + "/" + controllerFunctionName,
            type: functionType,
            data: inputData,
			dataType: inputDataType,
            cache: false,
            contentType: false,
            processData: false,
            progress: function () {
                var ajaxSettingsXhr = $.ajaxSettings.xhr();
                if (ajaxSettingsXhr.upload) 
                    ajaxSettingsXhr.upload.addEventListener("progress", function () { }, false);
                return ajaxSettingsXhr;
            },
			success: onSuccessFunction,
			error: onErrorFunction
        });
	}
</script>
