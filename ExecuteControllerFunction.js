<script type="text/javascript">
	function ExecuteControllerFunction(controllerName, functionName, inputData, inputDataType, onSuccessFunction, onErrorFunction, isPostFunction) {
		if (typeof controllerName != 'string')
            throw 'ArgumentException: controllerName.';
		if (typeof functionName != 'string')
            throw 'ArgumentException: functionName.';

		var inputDataTypeErrorMessage = ' inputDataType must be \'xml\', \'json\', \'script\', \'html\' or null.'
		if (inputDataType != null) {
			if (typeof inputDataType != 'string') {
				throw 'ArgumentException: inputDataType.' + inputDataTypeErrorMessage';
			} else {
				inputDataType = inputDataType.toLower();
				if (inputDataType != 'xml'
					&& inputDataType != 'json'
					&& inputDataType != 'script'
					&& inputDataType != 'html') {
					throw 'ArgumentException: inputDataType.' + inputDataTypeErrorMessage;
				}
			}

		if (typeof onSuccessFunction != 'function' && onSuccessFunction != null)
            throw 'ArgumentException: onSuccessFunction.';

		if (typeof onErrorFunction != 'function')
			if (onErrorFunction != null) {
				throw 'ArgumentException: onErrorFunction.';
			} else {
				onErrorFunction = function (xhr, ajaxOptions, thrownError) {
					var msg = JSON.parse(xhr.responseText);
					alert(msg.ExceptionMessage);
				}
			}
		
		isPostFunction = typeof isPostFunction == 'boolean' ? isPostFunction : false;
		var functionType = isPostFunction ? 'POST' : 'GET';
		
		$.ajax({
			url: '/' + controllerName + '/' + controllerFunctionName,
            type: functionType,
            data: inputData,
			dataType: inputDataType,
            cache: false,
            contentType: false,
            processData: false,
            progress: function () {
                var ajaxSettingsXhr = $.ajaxSettings.xhr();
                if (ajaxSettingsXhr.upload) 
                    ajaxSettingsXhr.upload.addEventListener('progress', function () { }, false);
                return ajaxSettingsXhr;
            }
			success: onSuccessFunction,
			error: onErrorFunction
        });
	}
</script>
