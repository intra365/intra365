---
id: debugging-addins
title: Debugging Add-Ins
todo: complete
---
Work in progress.

[Debugging Add-ins](https://docs.microsoft.com/en-us/office/dev/add-ins/testing/debug-office-add-ins-on-ipad-and-mac)

## On a Mac
```bash
defaults write com.microsoft.Word OfficeWebAddinDeveloperExtras -bool true

defaults write com.microsoft.Excel OfficeWebAddinDeveloperExtras -bool true

defaults write com.microsoft.Powerpoint OfficeWebAddinDeveloperExtras -bool true

defaults write com.microsoft.Outlook OfficeWebAddinDeveloperExtras -bool true
```