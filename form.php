<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	  
	require 'vendor/autoload.php';
	  
	$mail = new PHPMailer(true);

	try {              
		$mail->isSMTP();                      
    	$mail->Host   = 'mail.kuzhina.com.mx';          
		$mail->SMTPAuth = true;              
		$mail->Username = 'contacto@kuzhina.com.mx';        
		$mail->Password = 'cs$+-LF$d4,~';            
		$mail->SMTPSecure = 'ssl';                              
    	$mail->Port       = 465; 

		$mail->setFrom('contacto@kuzhina.com.mx', 'Kuzhina');    
		$mail->addAddress('fernanda@kuzhina.com.mx');

		$mail->isHTML(true);                
		$mail->Subject = 'Kuzhina Contacto';
		$mensaje = '';
		foreach ($_POST as $key => $value) {
			$mensaje .= "$key: $value<br />";
		}
		$mail->Body = $mensaje;
		// $mail->AltBody = 'texto plano';
		$mail->send();
		$resultado = ['res' => true];
	} catch (Exception $e) {
		$resultado = ['res'     => false,
					  'mensaje' => $mail->ErrorInfo];
	}

	header('Content-Type: application/json');
    echo json_encode($resultado);
    die();
?>