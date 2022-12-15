-- Script: RadioServer
-- FullName: game.ServerScriptService.RadioServer

local HttpService = game:GetService("HttpService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RadioServer = ReplicatedStorage:FindFirstChild("RadioServer")
local UpdateSoundEvent = RadioServer:FindFirstChild("UpdateSound")

local HOST = "localhost"
local PORT = 8000

local duration = 1

while wait(duration) do
	local response = HttpService:JSONDecode(HttpService:GetAsync("http://" .. HOST .. ":".. tostring(PORT) .. "/"))

	UpdateSoundEvent:FireAllClients(response)
	duration = response["Duration"] - response["TimePosition"]
end
