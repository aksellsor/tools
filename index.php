<?php
$randNr = rand();
$url = "http://localhost:5500?token=" . $randNr;
$html = file_get_contents($url);
echo $html;
?> 