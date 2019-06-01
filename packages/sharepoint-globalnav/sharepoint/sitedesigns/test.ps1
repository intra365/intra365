#Get-Module -Name Microsoft.Online.SharePoint.PowerShell -ListAvailable | Select Name,Version

# Install-Module -Name Microsoft.Online.SharePoint.PowerShell
Import-Module -Name Microsoft.Online.SharePoint.PowerShell
$adminUPN="niels@jumpto365.com"
$orgName="365adm"
# $userCredential = Get-Credential -UserName $adminUPN -Message "Type the password."
Connect-SPOService -Url https://$orgName-admin.sharepoint.com # -Credential $userCredential