<?php

    /*** 工具函数 ***/

    // 截取字符串中指定特征的子串的第一条
        // $str 待处理的字符串
        // $str_find_start 需获取的子串的前面的特征字符
        // $str_find_end 需获取的子串的后面的特征字符
    function get_substr_first($str,$str_find_start,$str_find_end) {
        $str_find_start_pos = strpos($str,$str_find_start);
        $str_find_end_pos = strpos($str,$str_find_end);
        $str_find_start_length = strlen($str_find_start);
        $substr_first_start_pos = $str_find_start_pos+$str_find_start_length;
        $substr_first_length = $str_find_end_pos-$str_find_start_pos-$str_find_start_length;
        $substr_first = substr($str,$substr_first_start_pos,$substr_first_length);
        return $substr_first;
    }
    // 截取字符串中指定特征的子串的第二条
    function get_substr_second($str,$str_find_start,$str_find_end) {
        $str_find_end_pos = strpos($str,$str_find_end);
        $str_find_end_length = strlen($str_find_end);
        $str_slice_pos = $str_find_end_pos+$str_find_end_length;
        $str_sliced = substr($str,$str_slice_pos);
        $substr_2 = get_substr_first($str_sliced,$str_find_start,$str_find_end);
        return $substr_2;
    }
    // 截取字符串中指定特征的子串的第N条
        // $str 待处理的字符串
        // $str_find_start 需获取的子串的前面的特征字符
        // $str_find_end 需获取的子串的后面的特征字符
        // $substr_index 需要获取第几个符合条件的子串
    function get_substr_n($str,$str_find_start,$str_find_end,$substr_index) {
        for ($i=0; $i < ($substr_index-1); $i++) {
            $str_find_end_pos = strpos($str,$str_find_end);
            $str_find_end_length = strlen($str_find_end);
            $str_slice_pos = $str_find_end_pos+$str_find_end_length;
            $str_sliced = substr($str,$str_slice_pos);
            $str = $str_sliced;
            // print_r($str_sliced.' ');
        }
        $substr_n = get_substr_first($str_sliced,$str_find_start,$str_find_end);
        return $substr_n;
    }


?>
