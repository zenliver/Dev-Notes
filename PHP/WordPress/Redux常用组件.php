<?php

/*Redux常用组件*/

// 一级section

Redux::setSection( $opt_name, array(
    'title'            => __( '全站设置', 'redux-framework-demo' ),
    'id'               => 'site',
    'desc'             => __( '全站设置', 'redux-framework-demo' ),
    'customizer_width' => '400px',
    'icon'             => 'el el-screen'
) );

// 二级section

Redux::setSection( $opt_name, array(
    'title'            => __( '网站Logo', 'redux-framework-demo' ),
    'desc'             => __( '网站Logo', 'redux-framework-demo' ),
    'id'               => 'example',
    'subsection'       => true,
    'customizer_width' => '700px',
    'fields'           => array(

    )
) );

// 图片上传

array(
    'id'       => 'example',
    'type'     => 'media',
    'url'      => true,
    'title'    => __( '头像图片', 'redux-framework-demo' ),
    'compiler' => 'true',
    //'mode'      => false, // Can be set to false to allow any media type, or can also be set to any mime type.
    'desc'     => __( '', 'redux-framework-demo' ),
    'subtitle' => __( '图片尺寸：不超过260x320px', 'redux-framework-demo' ),
    // 'default'  => array( 'url' => 'http://s.wordpress.org/style/images/codeispoetry.png' ),
    //'hint'      => array(
    //    'title'     => 'Hint Title',
    //    'content'   => 'This is a <b>hint</b> for the media field with a Title.',
    //)
)

// 幻灯片/焦点图

array(
    'id'          => 'example',
    'type'        => 'slides',
    'title'       => __( '上传首页banner大图', 'redux-framework-demo' ),
    'subtitle'    => __( '图片数量不限，可拖拽排序。', 'redux-framework-demo' ),
    'desc'        => __( '', 'redux-framework-demo' ),
    'placeholder' => array(
        'title'       => __( '图片标题，可不填', 'redux-framework-demo' ),
        'description' => __( '图片描述，可不填', 'redux-framework-demo' ),
        'url'         => __( '图片链接，可不填', 'redux-framework-demo' ),
    ),
)

// WP编辑器

array(
    'id'      => 'example',
    'type'    => 'editor',
    'title'   => __( '联系方式', 'redux-framework-demo' ),
    'default' => '',
    'args'    => array(
        'wpautop'       => false,
        'media_buttons' => false,
        'textarea_rows' => 8,
        //'tabindex' => 1,
        //'editor_css' => '',
        'teeny'         => false,
        //'tinymce' => array(),
        'quicktags'     => false,
    )
)

// 单行文本框

array(
    'id'       => 'example',
    'type'     => 'text',
    'title'    => __( '悬浮侧栏电话文字', 'redux-framework-demo' ),
    'subtitle' => __( '', 'redux-framework-demo' ),
    'desc'     => __( '', 'redux-framework-demo' ),
    'default'  => '',
)

// 多行文本域（不允许html）

array(
    'id'       => 'example',
    'type'     => 'textarea',
    'title'    => __( '多行文本域（不允许html）', 'redux-framework-demo' ),
    'subtitle' => __( '多行文本域（不允许html）', 'redux-framework-demo' ),
    'desc'     => __( '', 'redux-framework-demo' ),
    'validate' => 'no_html',
    'default'  => ''
)

// 多行文本域（允许js和html）

array(
    'id'       => 'example',
    'type'     => 'textarea',
    'title'    => __( '多行文本域（允许js和html）', 'redux-framework-demo' ),
    'subtitle' => __( '', 'redux-framework-demo' ),
    'desc'     => __( '', 'redux-framework-demo' ),
    'validate' => 'js'
)


?>
