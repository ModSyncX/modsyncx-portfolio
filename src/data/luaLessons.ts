export interface LuaLesson {
  id: string
  filename: string
  code: string
}

export const luaLessons: LuaLesson[] = [
  {
    id: 'variables',
    filename: 'variables.lua',
    code: `local playerName = "Nova"
local playerCash = 500
local isAdmin = false

print(playerName, playerCash)`,
  },
  {
    id: 'conditionals',
    filename: 'conditionals.lua',
    code: `local playerCash = 150

if playerCash >= 100 then
  print("Kauf möglich")
else
  print("Nicht genug Geld")
end`,
  },
  {
    id: 'functions',
    filename: 'functions.lua',
    code: `local function heal(player, amount)
  player.health = player.health + amount
  return player.health
end

heal(player, 25)`,
  },
  {
    id: 'events',
    filename: 'server.lua',
    code: `RegisterCommand("heal", function(source)
  TriggerClientEvent("hospital:heal", source)
end)

RegisterNetEvent("hospital:heal")
AddEventHandler("hospital:heal", function()
  print("Spieler wurde geheilt")
end)`,
  },
]
