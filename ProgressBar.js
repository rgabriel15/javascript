<div id="modal-upload-arquivos" class="modal-sucesso modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">UPLOAD DE ARQUIVOS</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <i class="far fa-check-circle"></i>
                    <p class="text-center" id="TextModal">
                        @*Sincronização realizada!*@
                        <br><br><br><br>
                        @*Resposta Web Service*@
                    </p>
                    @*<a class="btn btn-primary center-block" href="#">Download</a>*@
                </div>
            </div>
        </div>
    </div>
</div>

<div id="modal-upload-arquivos-error" class="modal-sucesso modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">UPLOAD DE ARQUIVOS</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <i class="far fa-exclamation-circle"></i>
                    <p class="text-center" id="TextModalError">
                        <br><br><br><br>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="ProgressSuccess_0" class="progress classProgress" style="display:none; margin-left: 43px !important;width: 120px;top: 12px !important;">
	<div id="progSuccess_0" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100"
		aria-valuemin="0" aria-valuemax="100" style="width:50%">
		<span class="sr-only">100% Complete</span>
	</div>
</div>

<span class="status-success anxs0" style="display: none;"></span>

<div id="ProgressDanger_0" class="progress classProgress" style="display:none; margin-left: 43px !important;width: 120px;top: 12px !important;">
	<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="100"
		aria-valuemin="0" aria-valuemax="100" style="width:100%">
		<span class="sr-only">100% Complete</span>
	</div>
</div>

<span class="status-danger anxd0" style="display: none;"></span>


function InputAnexarResultadoPedidoHabilitacao_OnChange(sender) {
	var onSuccessFunction = function (data) {
		var modalClass = "modal-upload-arquivos-error";
		var textBox = "TextModalError";
		
		if (data.IsException) {
			$('#ProgressSuccess_0').css('display', 'none');
			$('#ProgressDanger_0').css('display', 'block');
			$('. anxs0').css('display', 'none');
			$('.anxd0').css('display', 'block').html(data.Message);
		} else {
			var modalClass = "modal-upload-arquivos";
			var textBox = "TextModal";
			
			var fileName = data.Data.NomeArquivo;
			if (fileName.length > 10) {
				fileName = data.Data.NomeArquivo.substring(0, 10) + "...";
			}

			$('#ProgressDanger_0').css('display', 'none');
			$('#ProgressSuccess_0').css('display', 'block');
			$('.anxs0').css('display', 'block').attr('title', data.Data.NomeArquivo).html(fileName);
			$('.anxd0').css('display', 'none');
		}

		$("#resultadoPedidoHabilitacao").val(JSON.stringify(data.Data));
		$("#ButtonVisualizarResultadoPedidoHabilitacao").removeAttr("disabled");
		$("#ButtonExcluirResultadoPedidoHabilitacao").removeAttr("disabled");
            
		$("#" + textBox).text(data.Message);
		$("#" + modalClass).modal();
	};

	var xhrFunction = function () {
		var ajaxSettingsXhr = $.ajaxSettings.xhr();
		if (ajaxSettingsXhr.upload)
			ajaxSettingsXhr.upload.addEventListener("progress", function () {
				$('#ProgressSuccess_0').css('display', 'block');
				$('.anx0').text('')
				$('#progSuccess_0').css('width', '50%');
			}, false);
		return ajaxSettingsXhr;
	};

	UploadFile(sender, "UploadFile", onSuccessFunction, xhrFunction);
}
