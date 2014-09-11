REM generate version
start D:\svncode\Toolbox\SVNVersion\GenerateAssemblyInfo.bat ..\ui\ uiInfo.tpl uiInfo.js
start D:\svncode\Toolbox\SVNVersion\GenerateAssemblyInfo.bat ..\base\ baseInfo.tpl baseInfo.js

REM sleep 4*3 seconds
ping localhost > nul
ping localhost > nul
ping localhost > nul


REM ui目录下的所有js文件合并成xr-ui.js
del ..\jsc\xr\xr-ui.js
del ..\jsc\xr\xr-ui.min.js
move ..\ui\xr.ui.DemoPlugin.js xr.ui.DemoPlugin.js
REM merge js files
copy uiInfo.js + ..\ui\*.js ..\jsc\xr\xr-ui.js /B /Y
move xr.ui.DemoPlugin.js ..\ui\xr.ui.DemoPlugin.js

REM themes目录下的每个特定主题目录下所有css文件合并成xr-ui.css
for /d %%i in (..\ui\themes\*) do del %%i\xr-ui.css & copy %%i\*.css %%i\xr-ui.css /B /Y


REM base目录下的所有js文件合并成xr-base.js
del ..\jsc\xr\xr-base.js
del ..\jsc\xr\xr-base.min.js
::move ..\base\xr.base.Demo.js xr.base.Demo.js
REM merge js files
copy ..\jsc\jquery\jquery.namespace.js + baseInfo.js + ..\base\xr.base.js + ..\base\util\*.js ..\jsc\xr\xr-base.js /B /Y
::move xr.base.Demo.js ..\base\xr.base.Demo.js