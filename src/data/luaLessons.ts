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
  print("{{canBuy}}")
else
  print("{{notEnough}}")
end`,
  },
  {
    id: 'loops',
    filename: 'loops.lua',
    code: `local players = {"Nova", "Ari", "Kim"}

for i = 1, #players do
  print(i, players[i])
end

for index, name in ipairs(players) do
  print(index, name)
end`,
  },
  {
    id: 'tables',
    filename: 'tables.lua',
    code: `local player = {
  name = "Nova",
  cash = 500,
  jobs = {"police", "mechanic"}
}

print(player.name, player.cash)
print(player.jobs[1])`,
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
  print("{{playerHealed}}")
end)`,
  },
]
