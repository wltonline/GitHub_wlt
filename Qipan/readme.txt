目录结构说明：
jsc ：外部项目使用的目录，默认不含主题
    jquery
    xr ：xr的所有整合后的文件
base ：工具类
ui ：ui类
    themes ：ui的主题
ut ：单元测试
    ui ：ui的单元测试
demo ：演示
    ui ：ui的演示
tool ：辅助工具（合成文件，项目使用）


合成目录jsc/xr内的文件(Generate.cmd)：
1. ui目录下的所有js文件合并成xr-ui.js
2. themes目录下的每个特定主题目录下所有css文件合并成xr-ui.css
3. jsc/jquery/jquery.namespace.js+base目录下的所有js文件合并成xr-base.js


项目使用(Use.cmd)：注意项目本身的js目录名称是"js"，通用js放在jsc
1. 拷贝jsc目录到项目根目录
2. 拷贝themes目录到项目jsc/xr目录，每个特定主题只需要拷贝images目录和xr-ui.css