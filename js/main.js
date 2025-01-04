var main = (function (window, undefined) {
    var acciones = function() {
        $('#btnenviar').on('click', function(e) {
            e.preventDefault();
            var continuar = true;
            $('.inputerror').removeClass('inputerror');
            $('[required="true"]').each(function() {
                if($(this).attr('required') != undefined && $(this).prop('disabled') == false) {
                    if(!validar($(this).val(), $(this).attr('data-tipo'))) {
                        continuar = false;
                        $(this).addClass('inputerror');    
                        if($(this).hasClass('select2')) {
                            $(this).parent().find('.select2').find('.select2-selection--multiple').addClass('inputerror');
                        }
                    }
                }
            });

            if(continuar) {
                $('.cargando').removeClass('ccoculto');
                var parametros = $('#contact-form').serializeArray();
                var datos = {};
                parametros.forEach(function(value) {
                    datos[value.name] = value.value;
                });

                var settings = { async       : true,
                                 crossDomain : true,
                                 url         : 'form.php',
                                 type        : 'POST',
                                 headers     : { 'cache-control' : 'no-cache', },
                                 dataType    : 'json',
                                 data        : datos
                            };

                $.ajax(settings).done(function(data) {
                    $('.cargando').addClass('ccoculto');
                    if(data.res) {
                        $('#contact-form')[0].reset();
                        var mensaje = {'tipo'    : 'success',
                                       'mensaje' : 'Nos pondremos en contacto a la brevedad.'};
                    } else {   
                        var mensaje = {'tipo'    : 'warning',
                                       'mensaje' : 'No fue posible enviar el correo.'};
                    }

                    alerta(mensaje);
                }).fail(function(data) {
                    $('.cargando').addClass('ccoculto');
                    var mensaje = {'tipo'    : 'error',
                                   'mensaje' : 'Experimentamos problemas, trata mas tarde.'};
                    alerta(mensaje);
                });
            } else {
                $('.cargando').addClass('ccoculto');
                var mensaje = {'tipo'    : 'warning',
                               'mensaje' : 'Completa los campos marcados como obligatorios.'};
                alerta(mensaje);
            }
        });
    };

    var validar = function(valor, tipo) {
        var res = true;

        switch(tipo) {
            case 'crc':
                var re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
                
                if(!re.exec(valor)){
                    res = false;
                } 
            break;

            case 'txt':
                if(valor.length == 0) {
                    res = false;
                }
            break;

            case 'mcero':
                if(valor.length == 0 || parseInt(valor) <= 0) {
                    res = false;
                }
            break;
        }

        return res;
    };

    var alerta = function(alerta) {
        let timerInterval
        Swal.fire({ title              : alerta.mensaje,
                    html               : '',
                    icon               : alerta.tipo,
                    timer              : 5000,
                    timerProgressBar   : true,
                    confirmButtonColor : '#343a40',
                    didOpen            : () => {},
                    willClose          : () => { clearInterval(timerInterval); }
                  });
    };

    return {
        init : function() {
            acciones();
        }
    };

})(window, undefined);