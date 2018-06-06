    function UploadFile(sender, controllerFunctionName, onSuccessFunction, xhrFunction) {
        if (typeof sender != "object" || sender == null)
            throw "ArgumentException: sender.";
        if (typeof sender.files != "object" || sender.files == null)
            throw "ArgumentException: sender.files.";
        if (typeof controllerFunctionName != "string" || controllerFunctionName.length < 1)
            throw "ArgumentException: controllerFunctionName.";

        var file = sender.files[0];
        if (typeof file != "object" || file == null)
            throw "ArgumentException: sender.files[0].";

        var formData = new FormData();
        formData.append("file", file);

        ExecuteControllerFunction("ControllerClassName", controllerFunctionName, formData, null, onSuccessFunction, null, xhrFunction, null, true);
    }
