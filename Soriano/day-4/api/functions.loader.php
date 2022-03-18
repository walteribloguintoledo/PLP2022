<?php
foreach (glob("functions/*.php") as $filename)
{
    include $filename;
}