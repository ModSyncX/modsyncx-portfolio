// Setup-Schritte für einen eigenen FiveM-Server (FXServer).
// Die Befehle/Configs sind sprachneutral und leben hier (single source) – nur
// die übersetzbaren Kommentar-Zeilen/Werte stehen als {{token}}-Platzhalter drin
// und werden zur Laufzeit aus server.setup.snippets (i18n) ersetzt, siehe
// ServerSetup.tsx. So bleibt "git clone …" an EINER Stelle, der Kommentar wandert
// mit der Sprache mit. Windows- und Linux-Array müssen dieselbe Länge haben wie
// server.setup.windows / server.setup.linux.
// Quelle: https://docs.fivem.net/docs/server-manual/setting-up-a-server-vanilla/

export interface SetupStep {
  id: string
  /** Titel im Code-Fenster (Terminal-Bar); kann einen {{token}} enthalten */
  filename: string
  /** Code-Template mit {{token}}-Platzhaltern für übersetzbare Zeilen */
  code: string
}

export const windowsSteps: SetupStep[] = [
  {
    id: 'win-structure',
    filename: '{{structureFile}}',
    code: `C:\\FXServer\\
├─ server\\        {{structExtract}}
└─ server-data\\   {{structNext}}`,
  },
  {
    id: 'win-serverdata',
    filename: 'cmd',
    code: `cd C:\\FXServer
git clone https://github.com/citizenfx/cfx-server-data.git server-data`,
  },
  {
    id: 'win-license',
    filename: 'portal.cfx.re',
    code: `{{licLine1}}
{{licLine2}}
{{licLine3}}
sv_licenseKey "cfxk_XXXXXXXX_XXXXX"`,
  },
  {
    id: 'win-cfg',
    filename: 'server.cfg',
    code: `endpoint_add_tcp "0.0.0.0:30120"
endpoint_add_udp "0.0.0.0:30120"

sv_hostname "{{hostname}}"
sv_maxclients 32
sv_licenseKey "cfxk_XXXXXXXX_XXXXX"

ensure mapmanager
ensure chat
ensure spawnmanager
ensure sessionmanager
ensure hardcap`,
  },
  {
    id: 'win-start',
    filename: 'cmd',
    code: `cd /d C:\\FXServer\\server-data
C:\\FXServer\\server\\FXServer.exe +exec server.cfg`,
  },
]

export const linuxSteps: SetupStep[] = [
  {
    id: 'linux-install',
    filename: 'bash',
    code: `sudo apt update && sudo apt install -y git xz-utils
mkdir -p ~/FXServer/server && cd ~/FXServer/server
{{linuxDownload}}
tar xf fx.tar.xz`,
  },
  {
    id: 'linux-serverdata',
    filename: 'bash',
    code: `git clone https://github.com/citizenfx/cfx-server-data.git \\
  ~/FXServer/server-data`,
  },
  {
    id: 'linux-license',
    filename: 'portal.cfx.re',
    code: `{{licLine1}}
{{licLine2}}
{{licLine3}}
sv_licenseKey "cfxk_XXXXXXXX_XXXXX"`,
  },
  {
    id: 'linux-cfg',
    filename: 'server.cfg',
    code: `endpoint_add_tcp "0.0.0.0:30120"
endpoint_add_udp "0.0.0.0:30120"

sv_hostname "{{hostname}}"
sv_maxclients 32
sv_licenseKey "cfxk_XXXXXXXX_XXXXX"

ensure mapmanager
ensure chat
ensure spawnmanager
ensure sessionmanager
ensure hardcap`,
  },
  {
    id: 'linux-start',
    filename: 'bash',
    code: `cd ~/FXServer/server-data
bash ~/FXServer/server/run.sh +exec server.cfg

{{persistComment}}
screen -S fxserver
bash ~/FXServer/server/run.sh +exec server.cfg
{{detachComment}}`,
  },
]
