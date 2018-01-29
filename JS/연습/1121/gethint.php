<?php

// Array with names

$a[] = "Amanda";
$a[] = "Anna";
$a[] = "Annastasia";
$a[] = "Brittany";
$a[] = "Cinderella";
$a[] = "Cindy";
$a[] = "Diana";
$a[] = "Doris";
$a[] = "Elizabeth";
$a[] = "Ellen";
$a[] = "Eva";
$a[] = "Eve";
$a[] = "Evita";
$a[] = "Fiona";
$a[] = "Gunda";
$a[] = "Hege";
$a[] = "Inga";
$a[] = "Johanna";
$a[] = "Kitty";
$a[] = "Linda";
$a[] = "Liza";
$a[] = "Morgana";
$a[] = "Nina";
$a[] = "Ophelia";
$a[] = "Petunia";
$a[] = "Rachel";
$a[] = "Sunniva";
$a[] = "Tonya";
$a[] = "Tove";
$a[] = "Unni";
$a[] = "Vicky";
$a[] = "Violet";
$a[] = "Wednesday";
$a[] = "Wenche";

// get the q parameter from URL
$q = $_REQUEST["q"];
$hint = "";

// lookup all hints from array if $q is different from ""

if ($q !== "") {

    $q = strtolower($q);

    $len=strlen($q);

    foreach($a as $name) {

        if (stristr($q, substr($name, 0, $len))) {

            if ($hint === "") {

                $hint = $name;

            } else {

                $hint .= ", $name";

            }

        }

    }

}


// Output "no suggestion" if no hint was found or output correct values

echo $hint === "" ? "no suggestion" : $hint;

?> 