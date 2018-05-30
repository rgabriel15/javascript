/*
<input id="InputOpenFileDialog"
	   onchange="Input_OnChange(this)"
	   type="file"
	   style="display: none;">
<!-- for excel file filter, incluide
accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
-->
                        
<button type="button" onclick="Button_OnClick()"/>
*/

<script type="text/javascript">
    function Button_OnClick() {
        $("#InputOpenFileDialog").click();
    }

    function Input_OnChange(sender) {
		if (typeof sender != 'object' || sender == null)
            throw 'ArgumentException: sender.';
        if (!Array.isArray(sender.files))
            throw 'ArgumentException: sender.files.';
		
		var file = sender.files[0];
		if (typeof file != 'object' || file == null)
            throw 'ArgumentException: sender.files.';
	
		var formData = new FormData();
        formData.append('file', file);
	
		var onSuccessFunction(){
			//TODO
		};
		ExecuteControllerFunction('ControllerClassName', 'ControllerFunctionName', formData, null, onSuccessFunction);
    }
</script>
