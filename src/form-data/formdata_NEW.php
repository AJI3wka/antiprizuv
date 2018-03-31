<?php
if (isset($_POST) && sizeof($_POST) > 0) {
   
   // тут указываем на какой ящик присылать письма из формы
   $to =  "nc84@yandex.ru";
   
   if (isset($_POST['formtype'])) {
       unset($_POST['formtype']);
   }
   if (isset($_POST['to'])) {
       unset($_POST['to']);
   }
   
   // тут можно сменить стандартный текст письма на великий и могучий
   $email_address = $_POST['email']['val'];
   $email_subject = "Form submitted by: ".$_POST['name']['val'];
   $email_body    = "Вы получили новое сообщение. <br/>".
                      "Ниже указаны детали: <br/><br/>";
                      foreach ($_POST as $key => $value) {
                         $email_body .= "<strong>" . $value['label'] . ": </strong> " . $value['val'] . "<br/><br/>";
                      }
   if($email_address != "") {
       require_once('php_wrappers/swiftmaile/lib/swift_required.php');


/**
* $transport = Swift_SmtpTransport::newInstance('smtp.yandex.ru', 465, 'ssl')
* ->setUsername('email@yandex.ru')
* ->setPassword('password');
* Можно создать любой емайл на яндексе и использовать в качестве отправки сообщений
*/

$transport = Swift_SmtpTransport::newInstance('smtp.yandex.ru', 465, 'ssl')
   ->setUsername('antiprizyvnik@yandex.ru')
   ->setPassword('stoparmy335');

$mailer = Swift_Mailer::newInstance($transport);

$messages = Swift_Message::newInstance($subject)
   ->setFrom($email_address)
   ->setTo($to)
   ->setSubject($email_subject)
   ->setContentType("text/html; charset=UTF-8")
   ->setBody($email_body, 'text/html');

$result = $mailer->send($messages);
       return true;
   }
}
?>
