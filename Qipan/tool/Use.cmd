REM 输入
SET /p projectDir=请输入项目根目录(input target project dir):

SET CopyParams=/MIR /NFL /NDL

REM 拷贝jsc目录到项目根目录
robocopy ..\jsc\ %projectDir%\jsc\ %CopyParams%

REM 拷贝themes目录到项目jsc/xr目录，每个特定主题只需要拷贝images目录和xr-ui.css
robocopy ..\ui\themes\ %projectDir%\jsc\xr\themes\ %CopyParams%
for /d %%i in (%projectDir%\jsc\xr\themes\*) do del %%i\xr.ui.*.css