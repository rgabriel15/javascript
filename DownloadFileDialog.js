/*
<button type="button"
		onclick="Button_OnClick()">
	<i class="fas fa-download"></i>
</button>
*/

<script type="text/javascript">
    function Button_OnClick() {
        var model = $.parseJSON($("#model").val());
        window.open("@Url.Action("ControllerFunctionname", "ControllerClassName")?filePath=" + model.filePath);
    }
</script>


--MVC Controller
public FileResult DownloadFile(string filePath)
{
	try
	{
		var fileContent = System.IO.File.ReadAllBytes(filePath);
		string contentType = null;
		
		switch (Path.GetExtension(filePath).ToLower())
		{
		case ".csv":
			contentType = "text/csv";
				break;
		case ".pdf":
			contentType = "application/pdf";
			break;
		case ".xls":
			contentType = "application/vnd.ms-excel";
			break;
		case ".xlsx":
			contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
			break;
		default:
			throw new ArgumentException("Invalid file type.", "filePath");
		}
		return File(fileContent, contentType, Path.GetFileName(filePath));
	}
	catch (Exception ex)
	{
		throw ex;
	}
}
