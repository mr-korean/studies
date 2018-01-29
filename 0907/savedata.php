<?php
$now = 'form_' .date('Ymd_ahi'); /* $now=파일 이름, .date=날짜 입력 방법 */
$file = fopen($now.".txt","w") or die("오류가 발생했습니다."); /* $file = fopen => 파일 만들어서 열기, 에러나면 메시지 출력  */
fwrite($file, $now."\r\n"); /* fwrite = 내가 가지고 있는 내용을 작성. \r\n = 줄바꿈 문자 */
fwrite($file,
"===========================\r\n");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>데이터 수집용 PHP</title>
</head>
<body>
    <section>
        <h1><?php echo $now.".txt" ?></h1>
        <ul>
            <?php
            foreach ($_POST as $key => $value) {
                fwrite($file, $key."=".$value."\r\n");
                echo "<li>";
                echo $key;
                echo " = ";
                echo $value;
                echo "</li>\r\n";
            }
            fclose($file);
            ?>
        </ul>
    </section>
</body>
</html>