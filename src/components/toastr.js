import toastr from 'toastr';

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "500",
    "timeOut": "2000",
    "extendedTimeOut": "200",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export function exibeMensagem(titulo, mensagem, tipo) {
    toastr[tipo](mensagem, titulo);
}

export function mensagemErro(mensagem) {
    exibeMensagem('Erro', mensagem, 'error');
}

export function mensagemSucesso(mensagem) {
    exibeMensagem('Sucesso', mensagem, 'success');
}

export function mensagemAlerta(mensagem) {
    exibeMensagem('Alerta', mensagem, 'alert');
}