chcp 1251
@echo off
:loop
:: Ќазвание папки
set "FOLDER_NAME=%random%"

:: ѕуть к файлу .dll и индекс иконки
set "ICON_DLL_PATH=G:\icon.dll"
set "ICON_INDEX=0"

:: —оздаем папку
mkdir "%FOLDER_NAME%"

:: —оздаем desktop.ini
(
echo [.ShellClassInfo]
echo IconResource=%ICON_DLL_PATH%,%ICON_INDEX%
echo [ViewState]
echo Mode=
echo Vid=
echo FolderType=Generic
) > "%FOLDER_NAME%\desktop.ini"

:: ƒелаем desktop.ini скрытым
attrib +h "%FOLDER_NAME%\desktop.ini"

:: ƒелаем папку системной
attrib +s "%FOLDER_NAME%"

echo ѕапка "%FOLDER_NAME%" создана с пользовательским значком.
pause
goto loop
