说明：本修改方法基于Redux Framework v3.6.7.13

## 去除顶部导航条

redux-config.php中：

'admin_bar' => false

## 关闭开发者模式

redux-config.php中：

'dev_mode' => false

## 去除Redux引入的google字体

在ReduxFramework目录搜索 'ajax.googleapis.com/ajax/libs/webfont/1.5.0/webfont.js'，在找到的php文件中注释掉该字体脚本所在的函数 wp_enqueue_script() 即可。

## 彻底去除Redux广告banner

在ReduxFramework目录搜索下面这行代码：

$localize['rAds'] = Redux_Helpers::rURL_fix( $base, $redux->args['opt_name'] );

在找到的文件中注释掉即可。

## 去除Redux在仪表盘添加的metabox

在ReduxFramework目录搜索下面这行代码：

add_meta_box('redux_dashboard_widget', 'Redux Framework News', array($this,'redux_dashboard_widget'), 'dashboard', 'side', 'high');

在找到的文件中注释掉即可。
