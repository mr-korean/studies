<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>연습용 PHP</title>
</head>
<body>
    <section>
        <h1>동물원</h1>
        <p>사육일기</p>
        <p>2017-09-07 밥 잘 먹고 건강함.</p>
        <p>
        <?php
        $eatnum = 5;
        $eatnum2 = 3;
        $total = $eatnum + $eatnum2;
        echo "바나나".$total."개, 멜론 2개";
        ?>
        사과 4개</p>
    </section>
</body>
</html>